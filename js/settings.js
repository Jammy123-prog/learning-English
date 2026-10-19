/* EverWord 学习设置 v1.1 —— 词库级别 + 每日新词数量（localStorage 持久化，可云同步）
   level:  全部 / CET-4 / CET-6 / TEM-8 / IELTS
   newPerDay: 1-50 的整数，控制每日引入的新词预算 */

const Settings = (() => {
  const KEY = "ev_settings";
  const LEVELS = ["全部", "CET-4", "CET-6", "TEM-8", "IELTS"];
  const DEF = {
    level: "全部",
    newPerDay: (typeof NEW_PER_DAY === "number") ? NEW_PER_DAY : 8
  };

  const clampN = n => {
    n = parseInt(n, 10);
    if (!Number.isFinite(n)) n = DEF.newPerDay;
    return Math.min(50, Math.max(1, n));
  };
  const norm = v => ({
    level: (v && LEVELS.includes(v.level)) ? v.level : DEF.level,
    newPerDay: clampN(v && v.newPerDay)
  });

  let st = (() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      if (v && typeof v === "object") return norm(v);
    } catch (e) {}
    return Object.assign({}, DEF);
  })();

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
    if (typeof EVSync !== "undefined" && EVSync) EVSync.push();
  };

  return {
    LEVELS,
    get level() { return st.level; },
    get newPerDay() { return st.newPerDay; },
    set(k, v) {
      if (k === "level" && LEVELS.includes(v)) st.level = v;
      else if (k === "newPerDay") st.newPerDay = clampN(v);
      else return false;
      save();
      return true;
    },
    raw() { return Object.assign({}, st); },
    /* 云同步：用服务器状态覆盖内存态（不写盘，由调用方决定是否落盘） */
    reload(v) { if (v && typeof v === "object") st = norm(v); }
  };
})();
