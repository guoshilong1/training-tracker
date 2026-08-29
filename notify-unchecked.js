// =====================================================
// 每日未打卡提醒 - 推送到企业微信群机器人（配置驱动版）
// 运行环境：GitHub Actions（定时）或本地 node 手动跑
// 新版逻辑：
//   从 Supabase bot_settings 表读取每个小区的配置
//   （开关 / webhook / 推送时间 / 推送内容），
//   当前北京时间命中该小区的 push_time 才推送，各小区独立机器人。
// 旧版兼容（表不存在或没数据时回退）：
//   SUPABASE_SERVICE_KEY=xxx WECOM_WEBHOOK=xxx AREA=000 node notify-unchecked.js
// =====================================================

// 必须在所有 Date 使用之前设置时区（GitHub Actions 服务器是 UTC）
process.env.TZ = 'Asia/Shanghai';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ltjmbmgofjqeezoskqrc.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const WECOM_WEBHOOK = process.env.WECOM_WEBHOOK || '';
const AREA = process.env.AREA || '000';
const SITE_URL = process.env.SITE_URL || 'https://guoshilong1.github.io/training-tracker/';

// ---------- 工具函数（与前端 index.html 逻辑保持一致） ----------
function localDateStr(iso) {
  const d = new Date(iso);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function daysBetween(a, b) {
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
}

// ---------- 加载 training-data.js（浏览器全局脚本，用 vm 注入） ----------
const dataPath = path.join(__dirname, 'training-data.js');
let __getAllDays = null;
try {
  const code = fs.readFileSync(dataPath, 'utf8') + '\n;globalThis.__getAllDays = getAllDays;';
  vm.runInThisContext(code, { filename: 'training-data.js' });
  __getAllDays = globalThis.__getAllDays;
} catch (e) {
  console.error('[WARN] training-data.js 加载失败，已认证学员将无法精确排除：', e.message);
}
function safeGetAllDays(route, subRoute) {
  if (!__getAllDays) return [];
  try { return __getAllDays(route, subRoute) || []; } catch (e) { return []; }
}

// ---------- 核心：判断今天是否打过卡（与前端 isCheckedToday 完全一致） ----------
function isCheckedToday(trainee, todayStr) {
  const progress = trainee.progress || {};
  for (const day of Object.values(progress)) {
    if (day.completedAt && localDateStr(day.completedAt) === todayStr) return true;
    if (day.restAt && localDateStr(day.restAt) === todayStr) return true;
    if (day.delayAt && localDateStr(day.delayAt) === todayStr) return true;
    const items = day.items || {};
    for (const item of Object.values(items)) {
      if (item.checked && item.checkedAt && localDateStr(item.checkedAt) === todayStr) return true;
    }
  }
  const currentDay = getCurrentDay(trainee);
  if (currentDay) {
    const dp = progress[currentDay.key] || {};
    if (dp.completed || dp.rest || dp.delayed) return true;
  }
  return false;
}

function getCurrentDay(trainee) {
  const allDays = safeGetAllDays(trainee.route, trainee.subRoute).filter(d => d.items && d.items.length > 0);
  const progress = trainee.progress || {};
  for (const day of allDays) {
    const dp = progress[day.key];
    if (!dp || !dp.completed) return day;
  }
  return null;
}

// 连续未打卡天数（与前端 calcNoCheckInStreak 一致）
function calcNoCheckInStreak(t, todayStr) {
  const dates = new Set();
  const progress = t.progress || {};
  Object.values(progress).forEach(day => {
    if (day._meta) return;
    Object.values(day.items || {}).forEach(item => {
      if (item.checked && item.checkedAt) dates.add(localDateStr(item.checkedAt));
    });
    if (day.completed && day.completedAt) dates.add(localDateStr(day.completedAt));
    if (day.rest && day.restAt) dates.add(localDateStr(day.restAt));
  });
  if (dates.size === 0) {
    if (t.startDate) {
      return Math.max(1, daysBetween(t.startDate, todayStr));
    }
    return 9999;
  }
  const sorted = [...dates].sort();
  const lastDate = sorted[sorted.length - 1];
  if (lastDate >= todayStr) return 0;
  return daysBetween(lastDate, todayStr);
}

// ---------- DB row → trainee（与前端 rowToTrainee 一致） ----------
function rowToTrainee(row) {
  let subRoute = row.sub_route || row.progress?._meta?.subRoute || '';
  if (!subRoute && row.route === 'part_time' && row.progress) {
    const keys = Object.keys(row.progress).filter(k => k.startsWith('part_time_'));
    if (keys.length > 0) {
      const m = keys[0].match(/^part_time_(.+?)_\d+-\d+-\d+$/);
      if (m) subRoute = m[1];
    }
  }
  return {
    id: row.id,
    name: row.name,
    store: row.store,
    route: row.route,
    subRoute: subRoute || '',
    startDate: row.start_date,
    master: row.master,
    area: row.area || '000',
    progress: row.progress || {},
  };
}

function sbHeaders() {
  return {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  };
}

// ---------- 单个区域的推送 ----------
// 返回 { pushed: bool, status: 'ok'|'skip'|'error', summary: string }
async function pushArea(area, webhook, pushContent, todayStr) {
  const content = pushContent || {};
  const enableUnchecked = content.unchecked !== false;
  const enableAllChecked = content.allChecked !== false;

  const url = `${SUPABASE_URL}/rest/v1/trainees?select=*&area=eq.${encodeURIComponent(area)}&deleted=eq.false`;
  const res = await fetch(url, { headers: sbHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase 查询失败 ${res.status}: ${body.slice(0, 200)}`);
  }
  const rows = await res.json();
  console.log(`[区域 ${area}] 共 ${rows.length} 名学员`);

  const trainees = rows.map(rowToTrainee);
  const unchecked = trainees
    .filter(t => getCurrentDay(t) !== null)
    .filter(t => !isCheckedToday(t, todayStr))
    .map(t => ({ ...t, streak: calcNoCheckInStreak(t, todayStr) }))
    .sort((a, b) => b.streak - a.streak);

  const totalActive = trainees.filter(t => getCurrentDay(t) !== null).length;
  let msg = '';
  let summary = '';

  if (unchecked.length === 0) {
    if (!enableAllChecked) {
      console.log(`[区域 ${area}] 全员已打卡且未开启报平安，静默`);
      return { pushed: false, status: 'skip', summary: '全员已打卡（未开报平安，静默）' };
    }
    msg =
      `**✅ 今日全员已打卡**\n` +
      `> 日期：${todayStr}\n` +
      `> 区域：${area}（在训 ${totalActive} 人）\n` +
      `> 所有师傅今天都完成了带训打卡，辛苦了 👍`;
    summary = `全员打卡报平安（在训${totalActive}人）`;
  } else {
    if (!enableUnchecked) {
      console.log(`[区域 ${area}] ${unchecked.length} 人未打卡但未开名单推送，静默`);
      return { pushed: false, status: 'skip', summary: `${unchecked.length}人未打卡（未开名单，静默）` };
    }
    const lines = unchecked.map((t, i) => {
      const streakLabel = t.streak >= 9999 ? '从未打卡' : `已连续 **${t.streak}** 天`;
      return `${i + 1}. **${t.name}** · ${t.store}${t.master ? `（师傅：${t.master}）` : ''} — ${streakLabel}未打卡`;
    });
    const MAX_ITEMS = 25;
    const shown = lines.slice(0, MAX_ITEMS);
    const more = lines.length > MAX_ITEMS ? `\n……另有 ${lines.length - MAX_ITEMS} 人，详见系统` : '';
    msg =
      `**📋 今日未打卡提醒（${todayStr}）**\n` +
      `> 区域 ${area} 共 **${unchecked.length}** 人未打卡（在训 ${totalActive} 人）：\n` +
      shown.join('\n') + more + `\n` +
      `> 👉 [点此处理打卡](${SITE_URL})`;
    summary = `推送未打卡名单${unchecked.length}人`;
  }

  console.log(`[区域 ${area}] 推送内容：${summary}`);
  const pushRes = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msgtype: 'markdown', markdown: { content: msg } }),
  });
  const pushJson = await pushRes.json().catch(() => ({}));
  if (pushJson.errcode !== 0) {
    throw new Error(`企业微信推送失败: ${JSON.stringify(pushJson)}`);
  }
  console.log(`[区域 ${area}] 已推送到企业微信群 ✓`);
  return { pushed: true, status: 'ok', summary };
}

// ---------- 更新推送记录 ----------
async function updateSetting(area, status, summary) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/bot_settings?area=eq.${encodeURIComponent(area)}`, {
      method: 'PATCH',
      headers: sbHeaders(),
      body: JSON.stringify({
        last_push_at: new Date().toISOString(),
        last_push_status: status,
        last_push_summary: summary || '',
      }),
    });
  } catch (e) {
    console.warn(`[WARN] 更新推送记录失败（区域 ${area}）:`, e.message);
  }
}

// ---------- 主流程 ----------
async function main() {
  if (!SERVICE_KEY) { console.log('[SKIP] 未配置 SUPABASE_SERVICE_KEY，跳过推送。'); return; }

  const now = new Date();
  const todayStr = localDateStr(now.toISOString());
  const nowHHMM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  console.log(`当前北京时间: ${todayStr} ${nowHHMM}`);

  // 读取小区机器人配置表
  let settings = [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bot_settings?select=*`, { headers: sbHeaders() });
    if (res.ok) {
      settings = await res.json();
      console.log(`读取 bot_settings ${settings.length} 条配置`);
    } else {
      console.warn(`[WARN] bot_settings 表读取失败（${res.status}），回退旧模式`);
    }
  } catch (e) {
    console.warn('[WARN] bot_settings 表不存在或网络错误，回退旧模式：', e.message);
  }

  if (settings.length > 0) {
    let matched = 0;
    for (const s of settings) {
      const area = s.area;
      if (!s.enabled) { console.log(`[区域 ${area}] 未启用，跳过`); continue; }
      if (!s.webhook_url) { console.log(`[区域 ${area}] 未配置 webhook，跳过`); continue; }
      const st = (s.push_time || '22:00');
      if (st !== nowHHMM) { console.log(`[区域 ${area}] 配置时间 ${st} ≠ 当前 ${nowHHMM}，跳过`); continue; }
      matched++;
      try {
        const r = await pushArea(area, s.webhook_url, s.push_content, todayStr);
        await updateSetting(area, r.status, r.summary);
      } catch (e) {
        console.error(`[区域 ${area}] 推送失败:`, e.message);
        await updateSetting(area, 'error', e.message.slice(0, 200));
      }
    }
    console.log(`本轮命中 ${matched} 个小区的推送时间，处理完毕`);
    return;
  }

  // ---------- 旧模式回退（表没有配置时） ----------
  if (!WECOM_WEBHOOK) { console.log('[SKIP] 未配置 WECOM_WEBHOOK 且无 bot_settings 配置，跳过推送。'); return; }
  console.log(`[回退模式] 推送区域 ${AREA}`);
  try {
    const r = await pushArea(AREA, WECOM_WEBHOOK, null, todayStr);
    console.log('结果:', r.status, r.summary);
  } catch (e) {
    console.error('[ERROR]', e.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('[ERROR]', err.message);
  process.exit(1);
});
