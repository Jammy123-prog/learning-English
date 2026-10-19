/* 冒烟测试 v1.1：SM-2 数学 / 每日新词预算（可配置）/ 级别过滤 / 「下一批」加批 / 生词本流转
   运行：node tools/smoke.js
   （无 DOM 环境下直接求值 data.js + srs.js + settings.js，localStorage 缺失时自动降级为内存态） */

const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const data = fs.readFileSync(path.join(root, "js", "data.js"), "utf8");
const srs = fs.readFileSync(path.join(root, "js", "srs.js"), "utf8");
const set = fs.readFileSync(path.join(root, "js", "settings.js"), "utf8");
const api = new Function(data + "\n" + srs + "\n" + set + "\n;return {WORDS:WORDS,SRS:SRS,Stats:Stats,Settings:Settings,NEW_PER_DAY:NEW_PER_DAY};")();
const { WORDS, SRS, Stats, Settings, NEW_PER_DAY } = api;

let fails = 0;
const ok = (cond, msg) => {
  if (cond) console.log("PASS  " + msg);
  else { fails++; console.error("FAIL  " + msg); }
};

/* 1. SM-2 连续秒认：间隔 1 → 6 → 16 → 45 → 131（EF 逐次 +0.1） */
const w0 = WORDS[0].w;
const seq = [];
for (let i = 0; i < 5; i++) seq.push(SRS.grade(w0, 5).ivl);
ok(JSON.stringify(seq) === JSON.stringify([1, 6, 16, 45, 131]),
  "SM-2 秒认间隔序列 1→6→16→45→131（实际 " + seq.join("→") + "）");

/* 2. 忘记：重置 reps/ivl，EF 不变 */
const w1 = WORDS[1].w;
SRS.grade(w1, 5);
const efBefore = SRS.getCard(w1).ef;
SRS.grade(w1, 2);
const c1 = SRS.getCard(w1);
ok(c1.reps === 0 && c1.ivl === 1 && c1.ef === efBefore, "忘记：reps 归零、间隔 1 天、EF 不变");

/* 3. preview 与 grade 一致 */
const pv = SRS.preview(WORDS[2].w, 4);
const gv = SRS.grade(WORDS[2].w, 4);
ok(pv.ivl === gv.ivl && Math.abs(pv.ef - gv.ef) < 1e-9, "preview 与 grade 结果一致");

/* 4. 默认预算 8：已引入 3 个 → 队列只补 5 个新词 */
const q1 = SRS.queue();
ok(q1.length === NEW_PER_DAY - 3 && q1.every(x => x.isNew),
  "默认预算 8，中途状态下队列只补剩余新词（实际 " + q1.length + "）");

/* 5. 学满 8 个后刷新不再补新词 */
q1.forEach(x => SRS.grade(x.word.w, 3));
const q2 = SRS.queue();
ok(q2.length === 0, "当日新词学满后队列为空（实际 " + q2.length + "）");

/* 6. 明日待复习 = 今日 ivl=1 的卡片数 */
ok(SRS.tomorrowDue === NEW_PER_DAY - 1, "明日待复习数正确（实际 " + SRS.tomorrowDue + "，w0 间隔 131 天不计入）");

/* 7. 调大每日预算：8 → 12，队列立即多出 4 个新词 */
Settings.set("newPerDay", 12);
const q3 = SRS.queue();
ok(q3.length === 4 && q3.every(x => x.isNew), "预算调到 12 后队列补 4 个新词（实际 " + q3.length + "）");
q3.forEach(x => SRS.grade(x.word.w, 3));

/* 8. 「下一批」加批：追加 5 个 → 队列多 5 个新词 */
SRS.moreBatch(5);
const q4 = SRS.queue();
ok(q4.length === 5 && q4.every(x => x.isNew), "下一批 +5 后队列补 5 个新词（实际 " + q4.length + "）");
q4.forEach(x => SRS.grade(x.word.w, 3));
ok(SRS.queue().length === 0, "加批学完后队列再次清空");

/* 9. 级别过滤：切到 TEM-8 → 新词全部来自专八词库 */
Settings.set("level", "TEM-8");
const q5 = SRS.queue();
ok(q5.length > 0 && q5.every(x => x.isNew && x.word.lv === "TEM-8"),
  "TEM-8 级别过滤：队列新词全部来自专八词库（实际 " + q5.length + "）");
const ps8 = SRS.poolStats("TEM-8");
ok(ps8.total === 40 && ps8.fresh === 40 && ps8.learned === 0,
  "poolStats(TEM-8) 统计正确（total " + ps8.total + " / fresh " + ps8.fresh + " / learned " + ps8.learned + "）");
const first8 = q5[0].word.w;
SRS.grade(first8, 4);
const ps8b = SRS.poolStats("TEM-8");
ok(ps8b.learned === 1 && ps8b.fresh === 39, "学习后 poolStats(TEM-8) 更新（learned 1 / fresh 39）");

/* 10. 生词本：非主库词入库，次日到期、今日队列不含；且不受级别过滤影响 */
const added = SRS.addWord("aurora", { w: "aurora", ipa: "", pos: "n.", def: "极光", ex: "", exZh: "", lv: "阅读" });
ok(added && !SRS.isDue("aurora") && !SRS.queue().some(x => x.word.w === "aurora"),
  "生词本词入库且明日到期（今日队列不含）");
ok(SRS.addWord("aurora") === false, "重复加入返回 false");
const psAll = SRS.poolStats("全部");
ok(psAll.total === 160 + 1, "全部词库统计包含生词本附加词（实际 " + psAll.total + "）");

/* 11. Settings 边界：越界值收敛到 1-50 */
Settings.set("newPerDay", 999);
ok(Settings.newPerDay === 50, "新词数量越界收敛为 50（实际 " + Settings.newPerDay + "）");
Settings.set("newPerDay", 0);
ok(Settings.newPerDay === 1, "新词数量下限收敛为 1（实际 " + Settings.newPerDay + "）");
Settings.set("level", "GRE");
ok(Settings.level === "TEM-8", "非法级别被拒并保持原值");

/* 12. 统计：touch 后连续天数为 1 */
Stats.touch();
ok(Stats.streak === 1, "连续天数 streak = 1");

console.log(fails ? "\n" + fails + " 项失败" : "\n全部通过");
process.exit(fails ? 1 : 0);
