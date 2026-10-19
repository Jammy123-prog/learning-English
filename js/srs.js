/* EverWord SM-2 间隔重复引擎 v1.1 + 学习统计 + 每日进度（localStorage 持久化，可云同步）
   算法依据 SuperMemo 官方 SM-2 文档：
   EF' = EF + (0.1 − (5−q)×(0.08 + (5−q)×0.02))，EF 下限 1.3
   I(1)=1 天，I(2)=6 天，I(n)=I(n−1)×EF（向上取整）；q<3 重置且不改 EF
   v1.1 新增：词库级别过滤、可配置每日新词预算（Settings）、「下一批」加批（bonus）、
             级别维度统计（poolStats）、云同步 reload/push 钩子 */

const Store = {
  get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

const DAY = 86400000;
const pad2 = n => String(n).padStart(2, "0");
const dateStr = ts => { const d = new Date(ts || Date.now()); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); };
const todayStr = () => dateStr();
const startOfDay = ts => { const d = new Date(ts || Date.now()); d.setHours(0, 0, 0, 0); return d.getTime(); };

/* 运行时读取 Settings（settings.js 在 srs.js 之后加载，此处延迟取值） */
function EVSettings() {
  return (typeof Settings === "object" && Settings)
    ? Settings
    : { level: "全部", newPerDay: (typeof NEW_PER_DAY === "number") ? NEW_PER_DAY : 8 };
}
/* 云同步推送钩子（api.js 存在时生效） */
function EVDirt() {
  if (typeof EVSync !== "undefined" && EVSync) EVSync.push();
}

const SRS = (() => {
  const KEY = "ev_srs";
  let st = Store.get(KEY, { cards: {}, extra: {}, bonus: {} });
  if (!st.cards) st.cards = {};
  if (!st.extra) st.extra = {};
  if (!st.bonus) st.bonus = {};
  const save = () => { Store.set(KEY, st); EVDirt(); };

  const clampEf = v => Math.min(3.2, Math.max(1.3, v));
  const delta = q => 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02); // SM-2 官方公式

  /* 纯计算：按评分 q 推演卡片下一状态（不落库） */
  function evolve(card, q) {
    const c = Object.assign({ ef: 2.5, reps: 0, ivl: 0, lapses: 0 }, card);
    if (q < 3) {                       // 忘记：重置为新卡，EF 不变（SM-2 规范）
      c.lapses += 1; c.reps = 0; c.ivl = 1;
    } else {
      c.reps += 1;
      if (c.reps === 1) c.ivl = 1;
      else if (c.reps === 2) c.ivl = 6;
      else c.ivl = Math.max(1, Math.round(c.ivl * c.ef));
      c.ef = clampEf(c.ef + delta(q));
    }
    c.due = startOfDay() + c.ivl * DAY; // 到期日（当日零点 + 间隔天数）
    return c;
  }

  /* 词库（可按级别过滤）+ 生词本附加词（阅读/测验中收藏的非主库词，始终保留） */
  function poolFor(level) {
    const base = (!level || level === "全部") ? WORDS : WORDS.filter(x => x.lv === level);
    return base.concat(Object.values(st.extra || {}));
  }
  /* 清理 10 天前的加批记录 */
  function pruneBonus() {
    const keys = Object.keys(st.bonus);
    if (keys.length <= 10) return;
    const cutoff = dateStr(Date.now() - 10 * DAY);
    keys.forEach(k => { if (k < cutoff) delete st.bonus[k]; });
  }

  return {
    getCard(w) { return st.cards[w] || null; },
    isNew(w) { return !st.cards[w]; },
    isDue(w) { const c = st.cards[w]; return !!c && c.due <= Date.now(); },
    /* 评分按钮的间隔预览 */
    preview(w, q) {
      const c = st.cards[w] || { ef: 2.5, reps: 0, ivl: 0, lapses: 0 };
      return evolve(c, q);
    },
    /* 正式评分：落库并计入连续天数；首次学习标记 intro（当日该级别新词预算依据） */
    grade(w, q) {
      const first = !st.cards[w];
      const c = evolve(st.cards[w], q);
      if (first) {
        c.intro = todayStr();
        c.introLv = EVSettings().level || "全部";
      }
      st.cards[w] = c;
      save(); Stats.touch();
      return c;
    },
    /* 生词本：加入即进入队列（次日到期）；非主词库词附带释义存档 */
    addWord(w, meta) {
      if (!st.cards[w]) {
        st.cards[w] = { ef: 2.5, reps: 0, ivl: 1, lapses: 0, due: startOfDay() + DAY };
        if (meta && !WORDS.some(x => x.w === w)) {
          if (!st.extra[w]) st.extra[w] = meta;
        }
        save(); return true;
      }
      return false;
    },
    /* 每日队列：到期复习优先，其后补足新词。
       预算按「级别 × 日期」独立计算（切换级别即获得该级别当日全新预算）：
       预算 = 每日新词设置 + 该级别当日加批 − 该级别当日已引入 */
    queue() {
      const S = EVSettings();
      const lvKey = S.level || "全部";
      const today = todayStr();
      const bKey = today + "@" + lvKey;
      /* 兼容 v1.0 旧格式（纯日期 key 记在「全部」名下） */
      const bonus = st.bonus[bKey] || st.bonus[today] || 0;
      const introduced = Object.values(st.cards)
        .filter(c => c.intro === today && (c.introLv || "全部") === lvKey).length;
      const cap = Math.max(0, S.newPerDay + bonus - introduced);
      const reviews = [], news = [];
      poolFor(lvKey).forEach(x => {
        const c = st.cards[x.w];
        if (c && c.due <= Date.now()) reviews.push({ word: x, isNew: false });
      });
      for (const x of poolFor(lvKey)) {
        if (news.length >= cap) break;
        if (!st.cards[x.w]) news.push({ word: x, isNew: true });
      }
      return reviews.concat(news);
    },
    /* 「下一批」：为当前级别今天追加 n 个新词预算（立即生效，不改变历史） */
    moreBatch(n) {
      const S = EVSettings();
      const bKey = todayStr() + "@" + (S.level || "全部");
      st.bonus[bKey] = (st.bonus[bKey] || 0) + Math.max(1, parseInt(n, 10) || 1);
      pruneBonus();
      save();
      return st.bonus[bKey];
    },
    /* 某级别词库的统计：total 总词数 / fresh 未学 / learned 已开始学 / due 今日到期 */
    poolStats(level) {
      const p = poolFor(level || EVSettings().level);
      let fresh = 0, learned = 0, due = 0;
      p.forEach(x => {
        const c = st.cards[x.w];
        if (!c) fresh++;
        else {
          if (c.reps >= 1) learned++;
          if (c.due <= Date.now()) due++;
        }
      });
      return { total: p.length, fresh, learned, due };
    },
    /* 以下为全局统计（跨级别） */
    get learnedCount() { return Object.values(st.cards).filter(c => c.reps >= 1).length; },
    get vocabCount() { return Object.keys(st.cards).length; },
    get dueCount() { return Object.values(st.cards).filter(c => c.due <= Date.now()).length; },
    get tomorrowDue() {
      const t = startOfDay() + DAY, e = t + DAY;
      return Object.values(st.cards).filter(c => c.due >= t && c.due < e).length;
    },
    /* 云同步：以服务器状态重建内存态 */
    reload(raw) {
      st = (raw && typeof raw === "object" && raw.cards)
        ? { cards: raw.cards, extra: raw.extra || {}, bonus: raw.bonus || {} }
        : Store.get(KEY, { cards: {}, extra: {}, bonus: {} });
      if (!st.cards) st.cards = {};
      if (!st.extra) st.extra = {};
      if (!st.bonus) st.bonus = {};
    }
  };
})();

/* ---------------- 连续天数 / 测验正确率统计 ---------------- */
const Stats = (() => {
  const KEY = "ev_stats";
  let st = Store.get(KEY, { streak: 0, best: 0, last: "", quizTotal: 0, quizCorrect: 0 });
  const save = () => { Store.set(KEY, st); EVDirt(); };
  return {
    touch() {
      const t = todayStr();
      if (st.last === t) return;
      const y = dateStr(Date.now() - DAY);
      st.streak = (st.last === y) ? st.streak + 1 : 1;
      st.best = Math.max(st.best, st.streak);
      st.last = t; save();
    },
    quiz(correct, total) {
      st.quizTotal += total; st.quizCorrect += correct;
      save(); this.touch();
    },
    get streak() { return st.streak; },
    get best() { return st.best; },
    get acc() { return st.quizTotal ? Math.round(st.quizCorrect / st.quizTotal * 100) : null; },
    reload(raw) {
      st = (raw && typeof raw === "object" && "streak" in raw)
        ? { streak: raw.streak | 0, best: raw.best | 0, last: raw.last || "", quizTotal: raw.quizTotal | 0, quizCorrect: raw.quizCorrect | 0 }
        : Store.get(KEY, { streak: 0, best: 0, last: "", quizTotal: 0, quizCorrect: 0 });
    }
  };
})();

/* ---------------- 每日进度（首页任务卡数据源） ---------------- */
const Prog = (() => {
  const KEY = "ev_prog";
  const fresh = () => ({ date: todayStr(), words: 0, read: [], quiz: false });
  let st = Store.get(KEY, null);
  if (!st || st.date !== todayStr()) st = fresh();
  if (!Array.isArray(st.read)) st.read = [];
  const save = () => { Store.set(KEY, st); EVDirt(); };
  return {
    get words() { return st.words; },
    get read() { return st.read.slice(); },
    get quiz() { return st.quiz; },
    addWords(n) { st.words += n; save(); },
    markRead(id) { if (!st.read.includes(id)) { st.read.push(id); save(); } },
    markQuiz() { st.quiz = true; save(); },
    reload(raw) {
      st = (raw && typeof raw === "object" && raw.date) ? raw : fresh();
      if (st.date !== todayStr()) st = fresh();
      if (!Array.isArray(st.read)) st.read = [];
    }
  };
})();
