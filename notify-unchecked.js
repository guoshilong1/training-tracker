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

// 区域 ID → 显示名称（与 index.html 的 AREA_CONFIG 保持一致，去掉末尾"带训追踪系统"）
const AREA_NAMES = {
  '666': '白高朋大区',
  '000': '郭士龙区域',
  '001': '李澳区域',
  '002': '韩福亮区域',
  '003': '王萌区域',
  '004': '徐誌良区域',
  '005': '郜一鸣区域',
  '006': '李万玲区域',
  '007': '江秀丽区域',
  '008': '刘海英大区',
  '009': '杨福强大区',
  '010': '刘瑞新大区',
  '011': '刘现勇大区',
  '012': '孙鸿蕊大区',
  '013': '周振华大区',
  '014': '陈双双大区',
  '015': '李肖大区',
  '016': '倪萍萍大区',
  '017': '孙凤现大区',
  '018': '田玲大区',
  '019': '肖敏大区',
  '020': '袁百臣大区',
  '021': '张贺大区',
  '022': '付钟庆大区',
  '023': '沈彦伟大区',
  '024': '王世爽大区',
  '025': '王瑶大区',
  '026': '张国良大区',
  '027': '赵静大区',
  '028': '姜海艳大区',
  '0001': '赵海龙区域',
  '0002': '王晓蕾区域',
  '0003': '赵庆磊区域',
  '0004': '丛雄翔区域',
  '0005': '杨海庆区域',
  '0006': '刘本洋区域',
  '0007': '梁译区域',
  '0008': '宫博区域',
  '0009': '王桂玲区域',
  '0010': '程玲玲区域',
  '0011': '和晓帅区域',
  '0012': '魏魁区域',
  '0013': '张伟区域',
  '0014': '王小红区域',
  '0015': '刘欢区域',
  '0016': '张兴娜区域',
  '0017': '关赞骥区域',
  '0018': '孙国平区域',
  '0019': '温国丽区域',
  '0020': '孙长江区域',
  '0021': '王有刚区域',
  '0022': '张天宇区域',
  '0023': '佟淑晶区域',
  '0024': '姚慧区域',
  '0025': '赵国惠区域',
  '0026': '刘晓强区域',
  '0027': '朱佳区域',
  '0028': '董晓东区域',
  '0029': '顾思怡区域',
  '0030': '王建伟区域',
  '0031': '王元区域',
  '0032': '孙娟区域',
  '0033': '张超区域',
  '0034': '姚洪岩区域',
  '0035': '周林帅区域',
  '0036': '王双双区域',
  '0037': '许霞区域',
  '0038': '张岩哲区域',
  '0039': '周建坤区域',
  '0040': '蔡晓菲区域',
  '0041': '谭家君区域',
  '0042': '路华区域',
  '0043': '张涛区域',
  '0044': '刘现立区域',
  '0045': '王永鑫区域',
  '0046': '张宏伟区域',
  '0047': '孙东梅区域',
  '0048': '张帅区域',
  '0049': '周军英区域',
  '0050': '张永博区域',
  '0051': '刘超区域',
  '0052': '朱云苓区域',
  '0053': '黄晓南区域',
  '0054': '梁清扬区域',
  '0055': '张慧岩区域',
  '0056': '李连合区域',
  '0057': '刘鑫区域',
  '0058': '霍仁洁区域',
  '0059': '蒋成区域',
  '0060': '任纪强区域',
  '0061': '鲁吉区域',
  '0062': '王凤逵区域',
  '0063': '张伟家区域',
  '0064': '刘保延区域',
  '0065': '董雷区域',
  '0066': '吴景强区域',
  '0067': '陈跃洋区域',
  '0068': '姜春莉区域',
  '0069': '李艳玲区域',
  '0070': '田洪斌区域',
  '0071': '张彤区域',
  '0072': '周洋区域',
  '0073': '刘慧区域',
  '0074': '张钧秋区域',
  '0075': '孟波宇区域',
  '0076': '王旭区域',
  '0077': '周思成区域',
  '0078': '那雷区域',
  '0079': '刘思岑区域',
  '0080': '盛菲雪区域',
  '0081': '徐壮壮区域',
  '0082': '黄振振区域',
  '0083': '李广亮区域',
  '0084': '刘光普区域',
  '0085': '林承超区域',
  '0086': '李亚男区域',
  '0087': '刘思佳区域',
  '0088': '刘海娟区域',
  '0089': '张杨区域',
  '0090': '康广昌区域',
  '0091': '王磊区域',
  '0092': '滕雪区域',
  '0093': '张宇升区域',
  '0094': '康艳丽区域',
  '0095': '赵英臣区域',
  '0096': '邱实区域',
  '0097': '徐洪东区域',
  '0098': '高蕾区域',
  '0099': '林彤区域',
  '0100': '冯宝宇区域',
  '0101': '林海区域',
  '0102': '张阳阳区域',
  '0103': '张学奇区域',
  '0104': '赵智博区域',
  '0105': '张江林区域',
  '0106': '刘丽颖区域',
  '0107': '朱柏臣区域',
  '0108': '卜春艳区域',
  '0109': '刘利区域',
  '0110': '刘云龙区域',
  '0111': '宋国帅区域',
  '0112': '宋明双区域',
  '0113': '王华学区域',
  '0114': '董海雷区域',
  '0115': '王丹凤区域',
  '0116': '曹杰区域',
  '0117': '邱佐莲区域',
  '0118': '赵庆区域',
  '0119': '赵宇航区域',
  '0120': '于兴江区域',
  '0121': '刘长龙区域',
  '0122': '常莹区域',
  '0123': '迟炎区域',
  '0124': '崔维强区域',
  '0125': '刘永平区域',
  '0126': '于宪富区域',
  '0127': '王帅区域',
  '0128': '许庆森区域',
  '0129': '邓然区域',
  '0130': '金松花区域',
  '0131': '张浩区域',
  '0132': '杜泊泉区域',
  '0133': '李凌霞区域',
  '0134': '余腊荣区域',
  '0135': '陈佳兴区域',
  '0136': '陈玲玲区域',
  '0137': '李岩区域',
  '0138': '杨金凤区域',
  '0139': '王文会区域',
  '0140': '范安杰区域',
  '0141': '马圣哲区域',
  '0142': '卢家梁区域',
  '0143': '任清泉区域',
  '0144': '刘亚敬区域',
  '0145': '王天蕊区域',
  '0146': '赵志浩区域',
  '0147': '张忠超区域'
};
function areaDisplayName(areaId) {
  if (areaId === 'all') return '全部区域';
  return AREA_NAMES[areaId] || `区域 ${areaId}`;
}

// 大区账号 → 下辖小区（与 index.html AREA_CONFIG 保持一致）
const MANAGER_SUB_AREAS = {
  '666': ['000', '001', '002', '003', '004', '005', '006', '007'],
  '008': ['0026', '0027', '0028', '0029', '0030', '0031', '0032', '0033', '0034'],
  '009': ['0105', '0106', '0107', '0108', '0109', '0110', '0111', '0112', '0113'],
  '010': ['0035', '0036', '0037', '0038', '0039', '0040', '0041', '0042'],
  '011': ['0043', '0044', '0045', '0046', '0047', '0048', '0049', '0050'],
  '012': ['0071', '0072', '0073', '0074', '0075', '0076', '0077', '0078'],
  '013': ['0140', '0141', '0142', '0143', '0144', '0145', '0146', '0147'],
  '014': ['0001', '0002', '0003', '0004', '0005', '0006', '0007'],
  '015': ['0019', '0020', '0021', '0022', '0023', '0024', '0025'],
  '016': ['0051', '0052', '0053', '0054', '0055', '0056', '0057'],
  '017': ['0064', '0065', '0066', '0067', '0068', '0069', '0070'],
  '018': ['0079', '0080', '0081', '0082', '0083', '0084', '0085'],
  '019': ['0098', '0099', '0100', '0101', '0102', '0103', '0104'],
  '020': ['0114', '0115', '0116', '0117', '0118', '0119', '0120'],
  '021': ['0127', '0128', '0129', '0130', '0131', '0132', '0133'],
  '022': ['0008', '0009', '0010', '0011', '0012', '0013'],
  '023': ['0058', '0059', '0060', '0061', '0062', '0063'],
  '024': ['0086', '0087', '0088', '0089', '0090', '0091'],
  '025': ['0092', '0093', '0094', '0095', '0096', '0097'],
  '026': ['0121', '0122', '0123', '0124', '0125', '0126'],
  '027': ['0134', '0135', '0136', '0137', '0138', '0139'],
  '028': ['0014', '0015', '0016', '0017', '0018']
};
function isManagerOwner(areaId) { return !!MANAGER_SUB_AREAS[areaId]; }

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
  const certCount = trainees.filter(isCertified).length;
  const areaLabels = targetAreas.map(areaDisplayName);
  const areaLabel = targetAreas.includes('all') ? '全部区域' : areaLabels.join('、');
  const isManagerMulti = isManagerOwner(owner) && targetAreas.length > 1;

  const sections = [];

  // 板块渲染辅助函数
  function formatUncheckedSection(label, areaActive) {
    const list = areaActive
      .filter(t => !isCheckedToday(t, todayStr))
      .map(t => ({ ...t, streak: calcNoCheckInStreak(t, todayStr) }))
      .sort((a, b) => b.streak - a.streak);
    if (list.length === 0) return null;
    const lines = list.map((t, i) => {
      const streakLabel = t.streak >= 9999 ? '从未打卡' : `${t.streak}天未打卡`;
      return `${i + 1}. **${t.name}**\n${t.store}｜${streakLabel}`;
    });
    const MAX_ITEMS = 25;
    const shown = lines.slice(0, MAX_ITEMS);
    const more = lines.length > MAX_ITEMS ? `\n……另有 ${lines.length - MAX_ITEMS} 人，详见系统` : '';
    return `**📋 今日未打卡提醒（${todayStr}）**\n区域：${label}\n在训 ${areaActive.length} 人，未打卡 ${list.length} 人\n\n${shown.join('\n')}${more}\n\n👉 [点此处理打卡](${SITE_URL})`;
  }

  function formatAllCheckedSection(label, areaActive) {
    if (areaActive.some(t => !isCheckedToday(t, todayStr))) return null;
    return `**✅ 今日全员已打卡（${todayStr}）**\n区域：${label}\n在训 ${areaActive.length} 人\n\n所有师傅今天都完成了带训打卡，辛苦了 👍`;
  }

  function formatHourWarningSection(label, areaActive) {
    const warnings = areaActive.filter(t => {
      if (isCertified(t)) return false;
      const h = Number(t._workHours) || 0;
      return h > workHoursThreshold(t);
    });
    if (warnings.length === 0) return null;
    const sorted = warnings.slice().sort((a, b) => {
      return workHoursLimit(a) - (Number(a._workHours) || 0) - (workHoursLimit(b) - (Number(b._workHours) || 0));
    });
    const lines = sorted.slice(0, 20).map((t, i) => {
      const h = Number(t._workHours) || 0;
      const limit = workHoursLimit(t);
      const remain = Math.max(0, limit - h);
      return `${i + 1}. ${t.name}｜${t.store}｜${h}/${limit}h（剩余${remain}h）`;
    });
    const more = sorted.length > 20 ? `\n……另有 ${sorted.length - 20} 人` : '';
    return `**⚠️ 工时预警（${todayStr}）**\n区域：${label}\n共 ${warnings.length} 人超过工时阈值（全职>300h / 兼职>200h）\n\n${lines.join('\n')}${more}\n\n👉 [点此查看详情](${SITE_URL})`;
  }

  function formatDailyBriefSection(label, allActive, allCert) {
    const phaseDist = {};
    for (const t of allActive) {
      const cd = getCurrentDay(t);
      let phase = '已完成';
      if (cd) {
        phase = cd.phaseName || '带训中';
      } else if (!isCertified(t)) {
        phase = '未开始/暂停';
      }
      phaseDist[phase] = (phaseDist[phase] || 0) + 1;
    }
    const completed = allActive.filter(t => isCheckedToday(t, todayStr)).length;
    const phaseLines = Object.entries(phaseDist).map(([phase, count]) => `${phase}：${count} 人`).join('\n');
    return `**📊 每日数据简报（${todayStr}）**\n区域：${label}\n在训 ${allActive.length} 人｜已认证 ${allCert} 人｜今日已打卡 ${completed} 人\n\n${phaseLines || '暂无在训学员'}\n\n👉 [打开系统](${SITE_URL})`;
  }

  if (isManagerMulti) {
    // 大区多小区：未打卡合并成一个大板块（区域统计内联一行、名单不显示门店、末尾统一链接）
    const areaOrder = [...targetAreas];
    if (enableUnchecked) {
      const areaBlocks = [];
      for (const areaId of areaOrder) {
        const areaActive = activeTrainees.filter(t => (t.area || '000') === areaId);
        if (areaActive.length === 0) continue;
        const list = areaActive
          .filter(t => !isCheckedToday(t, todayStr))
          .map(t => ({ ...t, streak: calcNoCheckInStreak(t, todayStr) }))
          .sort((a, b) => b.streak - a.streak);
        if (list.length === 0) continue;
        const label = areaDisplayName(areaId);
        const lines = list.map((t, i) => {
          const streakLabel = t.streak >= 9999 ? '从未打卡' : `${t.streak}天未打卡`;
          return `${i + 1}. **${t.name}**\n${streakLabel}`;
        });
        const MAX_ITEMS = 25;
        const shown = lines.slice(0, MAX_ITEMS);
        const more = lines.length > MAX_ITEMS ? `\n……另有 ${lines.length - MAX_ITEMS} 人，详见系统` : '';
        areaBlocks.push(`区域：${label} 在训 ${areaActive.length} 人，未打卡 ${list.length} 人\n${shown.join('\n')}${more}`);
      }
      if (areaBlocks.length > 0) {
        sections.push(`**📋 今日未打卡提醒（${todayStr}）**\n${areaBlocks.join('\n\n')}\n\n👉 [点此处理打卡](${SITE_URL})`);
      }
    }
    // 报平安、工时预警按小区独立板块
    for (const areaId of areaOrder) {
      const areaActive = activeTrainees.filter(t => (t.area || '000') === areaId);
      if (areaActive.length === 0) continue;
      const label = areaDisplayName(areaId);
      if (enableAllChecked) {
        const sec = formatAllCheckedSection(label, areaActive);
        if (sec) sections.push(sec);
      }
      if (enableHourWarning) {
        const sec = formatHourWarningSection(label, areaActive);
        if (sec) sections.push(sec);
      }
    }
    // 每日数据简报整体聚合
    if (enableDailyBrief) {
      sections.push(formatDailyBriefSection(areaLabel, activeTrainees, certCount));
    }
  } else {
    // 单小区/全部区域：保持原有聚合逻辑
    if (enableUnchecked) {
      const sec = formatUncheckedSection(areaLabel, activeTrainees);
      if (sec) sections.push(sec);
    }
    if (enableAllChecked) {
      const sec = formatAllCheckedSection(areaLabel, activeTrainees);
      if (sec) sections.push(sec);
    }
    if (enableHourWarning) {
      const sec = formatHourWarningSection(areaLabel, activeTrainees);
      if (sec) sections.push(sec);
    }
    if (enableDailyBrief) {
      sections.push(formatDailyBriefSection(areaLabel, activeTrainees, certCount));
    }
  }

  if (sections.length === 0) {
    console.log(`[配置 ${owner}] 所有内容均未触发，静默`);
    return { pushed: false, status: 'skip', summary: '所有内容均未触发' };
  }

  const summaryParts = [];
  if (unchecked.length > 0 && enableUnchecked) summaryParts.push(`未打卡${unchecked.length}人`);
  if (unchecked.length === 0 && enableAllChecked) summaryParts.push('全员报平安');
  if (hourWarnings.length > 0 && enableHourWarning) summaryParts.push(`工时预警${hourWarnings.length}人`);
  if (enableDailyBrief) summaryParts.push('数据简报');
  const summary = summaryParts.join(' · ');

  console.log(`[配置 ${owner}] 推送内容：${summary}`);

  // 企业微信单条 markdown 限制 4096 字符，按板块分多条发送
  const MAX_CONTENT_LEN = 4000;
  for (let i = 0; i < sections.length; i++) {
    let content = sections[i];
    if (content.length > MAX_CONTENT_LEN) {
      content = content.slice(0, MAX_CONTENT_LEN) + '\n……（内容过长，已截断）';
    }
    const pushRes = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msgtype: 'markdown', markdown: { content } }),
    });
    const pushJson = await pushRes.json().catch(() => ({}));
    if (pushJson.errcode !== 0) {
      throw new Error(`企业微信推送失败: ${JSON.stringify(pushJson)}`);
    }
    console.log(`[配置 ${owner}] 已推送第 ${i + 1}/${sections.length} 条消息 ✓`);
  }
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

// 找当前时间最接近的配置时间点，返回 { matched, minDiff }（单位：分钟）
function nearestPushTimeMinutes(pushTimes, nowMin) {
  let matched = null;
  let minDiff = Infinity;
  for (const t of pushTimes) {
    const targetMin = hhmmToMinutes(t);
    const diff = Math.abs(nowMin - targetMin);
    if (diff < minDiff) {
      minDiff = diff;
      matched = t;
    }
  }
  return { matched, minDiff };
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

      // 到点判定：只在配置时间前后 30 分钟窗口内命中（兼容 GitHub Actions cron 延迟/抖动，GitHub 实际执行经常偏离整点）
      const TIME_WINDOW = 30; // 分钟
      const { matched: matchedTime, minDiff } = nearestPushTimeMinutes(pushTimes, nowMin);
      if (!matchedTime || minDiff > TIME_WINDOW) {
        console.log(`[配置 ${s.area}] 当前 ${nowHHMM} 不在任何推送时间 ±${TIME_WINDOW} 分钟窗口内（${JSON.stringify(pushTimes)}），跳过`);
        continue;
      }
      console.log(`[配置 ${s.area}] 命中推送时间 ${matchedTime}（当前 ${nowHHMM}，差 ${minDiff} 分钟）`);

      // 失败重试保护：上次失败后，在最近一个推送时间点 35 分钟内继续重试，避免坏 webhook 全天轰炸
      if (s.last_push_status === 'error' && s.last_push_at) {
        const lastPushDay = localDateStr(s.last_push_at);
        if (lastPushDay === todayStr) {
          const { minDiff: retryDiff } = nearestPushTimeMinutes(pushTimes, nowMin);
          if (retryDiff > 35) {
            console.log(`[配置 ${s.area}] 上次推送失败且已超过最近推送时间 35 分钟重试窗口，跳过`); continue;
          }
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
