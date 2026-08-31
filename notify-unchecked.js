// =====================================================
// 每日未打卡提醒 - 推送到企业微信群机器人（配置驱动版）
// 运行环境：GitHub Actions（定时）或本地 node 手动跑
// 新版逻辑：
//   从 Supabase bot_settings 表读取每个账号的配置
//   （开关 / webhook / 推送时间 / 目标区域 / 推送内容），
//   当前北京时间命中该配置的 push_time 才推送。
//   一条配置可推送多个区域，支持每日数据简报、工时预警。
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
function isPartTime(t) {
  return t.route === 'part_time';
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
// 注意：撤销操作会留下最新时间戳（tombstone），必须同时校验状态位，
// 否则"勾了又撤/标了休息又撤"会被误判为今天已打卡而漏推。
function restOnDate(day, ds) {
  if (!day) return false;
  if (Array.isArray(day.restDates)) return day.restDates.includes(ds);
  return !!day.rest && !!day.restAt && localDateStr(day.restAt) === ds;
}
function delayedOnDate(day, ds) {
  if (!day) return false;
  if (Array.isArray(day.delayDates)) return day.delayDates.includes(ds);
  return !!day.delayed && !!day.delayAt && localDateStr(day.delayAt) === ds;
}
function isCheckedToday(trainee, todayStr) {
  const progress = trainee.progress || {};
  for (const day of Object.values(progress)) {
    if (day.completed && day.completedAt && localDateStr(day.completedAt) === todayStr) return true;
    if (restOnDate(day, todayStr)) return true;
    if (delayedOnDate(day, todayStr)) return true;
    const items = day.items || {};
    for (const item of Object.values(items)) {
      if (item.checked && item.checkedAt && localDateStr(item.checkedAt) === todayStr) return true;
    }
  }
  const currentDay = getCurrentDay(trainee);
  if (currentDay) {
    const dp = progress[currentDay.key] || {};
    if (dp.completed) return true;
    if (restOnDate(dp, todayStr) || delayedOnDate(dp, todayStr)) return true;
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

function isCertified(t) {
  const allDays = safeGetAllDays(t.route, t.subRoute);
  if (!allDays.length) return false;
  const progress = t.progress || {};
  return allDays.every(d => progress[d.key]?.completed);
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
    // 休息视同打卡（含历史休息日期数组）
    if (Array.isArray(day.restDates)) day.restDates.forEach(d => dates.add(d));
    else if (day.rest && day.restAt) dates.add(localDateStr(day.restAt));
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
    empId: row.emp_id || '',
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

// 查询指定区域的学员（targetAreas 为数组，含 'all' 则查全部）
async function fetchTrainees(targetAreas) {
  let url;
  if (targetAreas.includes('all')) {
    url = `${SUPABASE_URL}/rest/v1/trainees?select=*&deleted=eq.false`;
  } else {
    const areas = [...new Set(targetAreas)];
    url = `${SUPABASE_URL}/rest/v1/trainees?select=*&area=in.(${areas.map(a => encodeURIComponent(a)).join(',')})&deleted=eq.false`;
  }
  const res = await fetch(url, { headers: sbHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase 查询失败 ${res.status}: ${body.slice(0, 200)}`);
  }
  return (await res.json()).map(rowToTrainee);
}

// 查询工时表
async function fetchWorkHours() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/work_hours?select=*`, { headers: sbHeaders() });
    if (!res.ok) return {};
    const rows = await res.json();
    const map = {};
    for (const r of rows) {
      if (r.emp_id) map[r.emp_id] = r;
    }
    return map;
  } catch (e) {
    console.warn('[WARN] 工时表读取失败:', e.message);
    return {};
  }
}

// 工时上限 / 告警阈值（与前端 getWorkHoursLimit / getWorkHoursThreshold 严格一致）
function workHoursLimit(t) {
  return isPartTime(t) ? 300 : 500;
}
function workHoursThreshold(t) {
  return isPartTime(t) ? 200 : 300;
}

// ---------- 单个配置的推送 ----------
// 返回 { pushed: bool, status: 'ok'|'skip'|'error', summary: string }
async function pushSetting(setting, todayStr) {
  const owner = setting.area;
  const content = setting.push_content || {};
  const targetAreas = Array.isArray(setting.target_areas) && setting.target_areas.length ? setting.target_areas : [owner];
  const webhook = setting.webhook_url;

  const enableUnchecked = content.unchecked !== false;
  const enableAllChecked = content.allChecked !== false;
  const enableHourWarning = !!content.hourWarning;
  const enableDailyBrief = !!content.dailyBrief;

  if (!enableUnchecked && !enableAllChecked && !enableHourWarning && !enableDailyBrief) {
    console.log(`[配置 ${owner}] 未勾选任何推送内容，静默`);
    return { pushed: false, status: 'skip', summary: '未勾选任何推送内容' };
  }

  const trainees = await fetchTrainees(targetAreas);
  console.log(`[配置 ${owner}] 目标区域 ${JSON.stringify(targetAreas)}，共 ${trainees.length} 名学员`);

  // 加载工时
  const workHoursMap = await fetchWorkHours();
  for (const t of trainees) {
    if (t.empId && workHoursMap[t.empId]) {
      t._workHours = workHoursMap[t.empId].hours || 0;
    } else {
      t._workHours = 0;
    }
  }

  const activeTrainees = trainees.filter(t => getCurrentDay(t) !== null);
  const unchecked = activeTrainees
    .filter(t => !isCheckedToday(t, todayStr))
    .map(t => ({ ...t, streak: calcNoCheckInStreak(t, todayStr) }))
    .sort((a, b) => b.streak - a.streak);

  // 工时预警（在训、未认证、工时 > 阈值；阈值 全职 300 / 兼职 200，上限 全职 500 / 兼职 300，与前端严格一致）
  const hourWarnings = activeTrainees.filter(t => {
    if (isCertified(t)) return false;
    const h = Number(t._workHours) || 0;
    return h > workHoursThreshold(t);
  });

  // 全员打卡报平安 & 每日数据简报（基于目标区域总体）
  const totalActive = activeTrainees.length;
  const completedCount = activeTrainees.filter(t => isCheckedToday(t, todayStr)).length;
  const certCount = trainees.filter(isCertified).length;
  const areaLabel = targetAreas.includes('all') ? '全部区域' : targetAreas.join('、');

  const sections = [];

  // 1. 未打卡名单
  if (unchecked.length > 0 && enableUnchecked) {
    const lines = unchecked.map((t, i) => {
      const streakLabel = t.streak >= 9999 ? '从未打卡' : `已连续 **${t.streak}** 天`;
      return `${i + 1}. **${t.name}** · ${t.store}${t.master ? `（师傅：${t.master}）` : ''} — ${streakLabel}未打卡`;
    });
    const MAX_ITEMS = 25;
    const shown = lines.slice(0, MAX_ITEMS);
    const more = lines.length > MAX_ITEMS ? `\n……另有 ${lines.length - MAX_ITEMS} 人，详见系统` : '';
    sections.push(`**📋 今日未打卡提醒（${todayStr}）**\n> 区域 ${areaLabel} 共 **${unchecked.length}** 人未打卡（在训 ${totalActive} 人）：\n${shown.join('\n')}${more}\n> 👉 [点此处理打卡](${SITE_URL})`);
  }

  // 2. 全员打卡报平安
  if (unchecked.length === 0 && enableAllChecked) {
    sections.push(`**✅ 今日全员已打卡**\n> 日期：${todayStr}\n> 区域：${areaLabel}（在训 ${totalActive} 人）\n> 所有师傅今天都完成了带训打卡，辛苦了 👍`);
  }

  // 3. 工时预警（在训、未认证、工时 > 阈值；阈值 全职 300 / 兼职 200，上限 全职 500 / 兼职 300）
  if (hourWarnings.length > 0 && enableHourWarning) {
    // 剩余工时少的排前面（更紧迫）
    const sorted = hourWarnings.slice().sort((a, b) => {
      return workHoursLimit(a) - (Number(a._workHours) || 0) - (workHoursLimit(b) - (Number(b._workHours) || 0));
    });
    const lines = sorted.slice(0, 20).map((t, i) => {
      const h = Number(t._workHours) || 0;
      const limit = workHoursLimit(t);
      const remain = Math.max(0, limit - h);
      const parttime = isPartTime(t);
      return `${i + 1}. **${t.name}** · ${t.store} — ${h}/${limit}h（${parttime ? '兼职' : '全职'}，剩余 **${remain}** h）`;
    });
    const more = sorted.length > 20 ? `\n……另有 ${sorted.length - 20} 人` : '';
    sections.push(`**⚠️ 工时预警（${todayStr}）**\n> 区域：${areaLabel} 共 ${hourWarnings.length} 人超过工时阈值（全职 > 300h / 兼职 > 200h）：\n${lines.join('\n')}${more}\n> 👉 [点此查看详情](${SITE_URL})`);
  }

  // 4. 每日数据简报
  if (enableDailyBrief) {
    const phaseDist = {};
    for (const t of activeTrainees) {
      const cd = getCurrentDay(t);
      let phase = '已完成';
      if (cd) {
        phase = cd.phaseName || '带训中';
      } else if (!isCertified(t)) {
        phase = '未开始/暂停';
      }
      phaseDist[phase] = (phaseDist[phase] || 0) + 1;
    }
    const phaseLines = Object.entries(phaseDist).map(([phase, count]) => `> ${phase}：**${count}** 人`).join('\n');
    sections.push(`**📊 每日数据简报（${todayStr}）**\n> 区域：${areaLabel}\n> 在训学员：**${totalActive}** 人｜已认证：**${certCount}** 人｜今日已打卡：**${completedCount}** 人\n${phaseLines || '> 暂无在训学员'}\n> 👉 [打开系统](${SITE_URL})`);
  }

  if (sections.length === 0) {
    console.log(`[配置 ${owner}] 所有内容均未触发，静默`);
    return { pushed: false, status: 'skip', summary: '所有内容均未触发' };
  }

  const msg = sections.join('\n\n');
  const summaryParts = [];
  if (unchecked.length > 0 && enableUnchecked) summaryParts.push(`未打卡${unchecked.length}人`);
  if (unchecked.length === 0 && enableAllChecked) summaryParts.push('全员报平安');
  if (hourWarnings.length > 0 && enableHourWarning) summaryParts.push(`工时预警${hourWarnings.length}人`);
  if (enableDailyBrief) summaryParts.push('数据简报');
  const summary = summaryParts.join(' · ');

  console.log(`[配置 ${owner}] 推送内容：${summary}`);
  const pushRes = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msgtype: 'markdown', markdown: { content: msg } }),
  });
  const pushJson = await pushRes.json().catch(() => ({}));
  if (pushJson.errcode !== 0) {
    throw new Error(`企业微信推送失败: ${JSON.stringify(pushJson)}`);
  }
  console.log(`[配置 ${owner}] 已推送到企业微信群 ✓`);
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
    console.warn(`[WARN] 更新推送记录失败（配置 ${area}）:`, e.message);
  }
}

// HH:MM → 分钟数（支持 '9:30' 这类未补零写法）
function hhmmToMinutes(hhmm) {
  const parts = String(hhmm || '22:00').split(':').map(Number);
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

// 把 push_time 解析为 HH:MM 数组（兼容旧版单字符串 '22:00' 和新版 JSON 数组 ["09:00","21:00"]）
function parsePushTimes(pt) {
  if (!pt) return ['22:00'];
  if (Array.isArray(pt)) return pt.filter(Boolean).map(String);
  const s = String(pt).trim();
  if (!s) return ['22:00'];
  if (s.startsWith('[')) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr) && arr.length) return arr.filter(Boolean).map(String);
    } catch (e) { /* 回退按单字符串处理 */ }
  }
  return [s];
}

// ---------- 主流程 ----------
async function main() {
  if (!SERVICE_KEY) { console.log('[SKIP] 未配置 SUPABASE_SERVICE_KEY，跳过推送。'); return; }

  const now = new Date();
  const todayStr = localDateStr(now.toISOString());
  const nowHHMM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const nowMin = now.getHours() * 60 + now.getMinutes();
  console.log(`当前北京时间: ${todayStr} ${nowHHMM}`);

  // 读取机器人配置表
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
      if (!s.enabled) { console.log(`[配置 ${s.area}] 未启用，跳过`); continue; }
      if (!s.webhook_url) { console.log(`[配置 ${s.area}] 未配置 webhook，跳过`); continue; }
      const pushTimes = parsePushTimes(s.push_time);

      // 去重逻辑改为：仅在上次推送成功后 60 分钟内跳过，防止群里刷屏；改时间后允许重新推
      if (s.last_push_status === 'ok' && s.last_push_at) {
        const minutesSinceLast = (Date.now() - new Date(s.last_push_at).getTime()) / 60000;
        if (minutesSinceLast < 60) {
          console.log(`[配置 ${s.area}] 上次推送成功距今 ${Math.round(minutesSinceLast)} 分钟，60 分钟内不重复推送，跳过`);
          continue;
        }
      }

      // 到点判定：当前时间 >= 任一配置时间才推（GitHub Actions cron 有几分钟延迟，用窗口而非精确匹配分钟）
      const matchedTime = pushTimes.find(t => nowMin >= hhmmToMinutes(t));
      if (!matchedTime) {
        console.log(`[配置 ${s.area}] 所有配置时间 ${JSON.stringify(pushTimes)} 还未到（当前 ${nowHHMM}），跳过`);
        continue;
      }
      // 失败重试保护：仅到点后 30 分钟内重试，避免坏 webhook 全天轰炸
      if (s.last_push_status === 'error' && s.last_push_at) {
        const lastPushDay = localDateStr(s.last_push_at);
        if (lastPushDay === todayStr && (nowMin - hhmmToMinutes(matchedTime)) > 30) {
          console.log(`[配置 ${s.area}] 今天推送失败且已超过 30 分钟重试窗口，跳过`); continue;
        }
      }
      matched++;
      try {
        const r = await pushSetting(s, todayStr);
        await updateSetting(s.area, r.status, r.summary);
      } catch (e) {
        console.error(`[配置 ${s.area}] 推送失败:`, e.message);
        await updateSetting(s.area, 'error', e.message.slice(0, 200));
      }
    }
    console.log(`本轮命中 ${matched} 条配置的推送时间，处理完毕`);
    return;
  }

  // ---------- 旧模式回退（表没有配置时） ----------
  if (!WECOM_WEBHOOK) { console.log('[SKIP] 未配置 WECOM_WEBHOOK 且无 bot_settings 配置，跳过推送。'); return; }
  console.log(`[回退模式] 推送区域 ${AREA}`);
  try {
    const r = await pushSetting({ area: AREA, webhook_url: WECOM_WEBHOOK, push_content: {}, target_areas: [AREA] }, todayStr);
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
