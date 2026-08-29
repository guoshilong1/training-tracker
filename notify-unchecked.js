// =====================================================
// 每日未打卡提醒 - 推送到企业微信群机器人
// 运行环境：GitHub Actions（定时）或本地 node 手动跑
// 用法：
//   SUPABASE_SERVICE_KEY=xxx WECOM_WEBHOOK=xxx node notify-unchecked.js
// 环境变量：
//   SUPABASE_URL        Supabase 项目地址（有默认值）
//   SUPABASE_SERVICE_KEY service_role 密钥（必填，绕过 RLS 读全部区域）
//   WECOM_WEBHOOK       企业微信群机器人 Webhook 完整地址（必填）
//   AREA                推送哪个区域，默认 000
//   SITE_URL            带训系统页面地址（用于消息里的跳转链接）
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
  // 1) 任意 day 的时间戳命中今天
  for (const day of Object.values(progress)) {
    if (day.completedAt && localDateStr(day.completedAt) === todayStr) return true;
    if (day.restAt && localDateStr(day.restAt) === todayStr) return true;
    if (day.delayAt && localDateStr(day.delayAt) === todayStr) return true;
    const items = day.items || {};
    for (const item of Object.values(items)) {
      if (item.checked && item.checkedAt && localDateStr(item.checkedAt) === todayStr) return true;
    }
  }
  // 2) 兜底：当前应处理的天被标记为 完成/休息/延迟，也算今日已处理
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
  return null; // 全部完成 = 已认证
}

// 连续未打卡天数（与前端 calcNoCheckInStreak 一致）
function calcNoCheckInStreak(t, todayStr) {
  const dates = new Set();
  const progress = t.progress || {};
  Object.values(progress).forEach(day => {
    if (day._meta) return; // 元数据不算
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

// ---------- 主流程 ----------
async function main() {
  if (!SERVICE_KEY) { console.log('[SKIP] 未配置 SUPABASE_SERVICE_KEY，跳过推送。'); return; }
  if (!WECOM_WEBHOOK) { console.log('[SKIP] 未配置 WECOM_WEBHOOK，跳过推送。'); return; }

  const todayStr = localDateStr(new Date().toISOString());
  console.log(`[${todayStr}] 拉取区域 ${AREA} 的学员数据...`);

  // 查询 Supabase（rest/v1，service_role 绕过 RLS）
  const url = `${SUPABASE_URL}/rest/v1/trainees?select=*&area=eq.${encodeURIComponent(AREA)}&deleted=eq.false`;
  const res = await fetch(url, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase 查询失败 ${res.status}: ${body.slice(0, 200)}`);
  }
  const rows = await res.json();
  console.log(`共 ${rows.length} 名在训学员（区域 ${AREA}）`);

  const trainees = rows.map(rowToTrainee);
  // 未打卡 = 未认证 且 今天没操作
  const unchecked = trainees
    .filter(t => getCurrentDay(t) !== null) // 排除已认证
    .filter(t => !isCheckedToday(t, todayStr))
    .map(t => ({ ...t, streak: calcNoCheckInStreak(t, todayStr) }))
    .sort((a, b) => b.streak - a.streak); // 连续未打卡越久越靠前

  const totalActive = trainees.filter(t => getCurrentDay(t) !== null).length;
  let content;

  if (unchecked.length === 0) {
    content =
      `**✅ 今日全员已打卡**\n` +
      `> 日期：${todayStr}\n` +
      `> 区域：${AREA}（在训 ${totalActive} 人）\n` +
      `> 所有师傅今天都完成了带训打卡，辛苦了 👍`;
  } else {
    const lines = unchecked.map((t, i) => {
      const streakLabel = t.streak >= 9999 ? '从未打卡' : `已连续 **${t.streak}** 天`;
      return `${i + 1}. **${t.name}** · ${t.store}${t.master ? `（师傅：${t.master}）` : ''} — ${streakLabel}未打卡`;
    });
    // 企业微信 markdown 上限 4096 字节，超长截断
    const MAX_ITEMS = 25;
    const shown = lines.slice(0, MAX_ITEMS);
    const more = lines.length > MAX_ITEMS ? `\n……另有 ${lines.length - MAX_ITEMS} 人，详见系统` : '';
    content =
      `**📋 今日未打卡提醒（${todayStr}）**\n` +
      `> 区域 ${AREA} 共 **${unchecked.length}** 人未打卡（在训 ${totalActive} 人）：\n` +
      shown.join('\n') + more + `\n` +
      `> 👉 [点此处理打卡](https://guoshilong1.github.io/training-tracker/)`;
  }

  console.log('----- 推送内容预览 -----');
  console.log(content);
  console.log('----------------------');

  const pushRes = await fetch(WECOM_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msgtype: 'markdown', markdown: { content } }),
  });
  const pushJson = await pushRes.json().catch(() => ({}));
  if (pushJson.errcode !== 0) {
    throw new Error(`企业微信推送失败: ${JSON.stringify(pushJson)}`);
  }
  console.log('[OK] 已推送到企业微信群 ✓');
}

main().catch(err => {
  console.error('[ERROR]', err.message);
  process.exit(1);
});
