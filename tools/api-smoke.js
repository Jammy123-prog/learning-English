/* API 冒烟测试 —— 先启动服务器（node server/server.js），再运行：
   node tools/api-smoke.js [port]
   覆盖：health / register / login / 错误口令 / state 读写 / words 词库与模糊检索 / news 新闻 / 鉴权失败 */

const BASE = "http://localhost:" + (process.argv[2] || "8787");
const NAME = "apismoke_" + Date.now().toString(36);

let fails = 0;
const ok = (cond, msg) => { if (cond) console.log("PASS  " + msg); else { fails++; console.error("FAIL  " + msg); } };

async function call(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = "Bearer " + token;
  const r = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  let j = null;
  try { j = await r.json(); } catch (e) {}
  return { status: r.status, j };
}

(async () => {
  /* 1. health */
  const h = await call("GET", "/api/health");
  ok(h.status === 200 && h.j.ok && h.j.version === "1.2.0", "health 返回 1.2.0");
  ok(h.j.words >= 160, "词库种子已入库（" + h.j.words + " 词，含全量目录）");

  /* 2. 注册 */
  const reg = await call("POST", "/api/register", { name: NAME, password: "test123456" });
  ok(reg.status === 200 && reg.j.token, "注册成功并返回令牌");
  const dup = await call("POST", "/api/register", { name: NAME, password: "test123456" });
  ok(dup.status === 409, "重复注册返回 409");
  const badName = await call("POST", "/api/register", { name: "x", password: "test123456" });
  ok(badName.status === 400, "非法用户名返回 400");

  /* 3. 登录 */
  const login = await call("POST", "/api/login", { name: NAME, password: "test123456" });
  ok(login.status === 200 && login.j.token, "登录成功");
  const wrong = await call("POST", "/api/login", { name: NAME, password: "wrong!" });
  ok(wrong.status === 401, "错误口令返回 401");
  const tok = login.j.token;

  /* 4. state 读写 */
  const s1 = { srs: { cards: { ambitious: { ef: 2.5, reps: 1, ivl: 1, lapses: 0, due: 1, intro: "2026-10-19" } } },
               stats: { streak: 3 }, prog: { date: "2026-10-19", words: 2, read: ["a1"], quiz: false },
               settings: { level: "CET-4", newPerDay: 12 } };
  const put = await call("PUT", "/api/state", s1, tok);
  ok(put.status === 200 && put.j.ok, "PUT state 成功");
  const get = await call("GET", "/api/state", null, tok);
  ok(get.status === 200 && get.j.srs && get.j.srs.cards.ambitious.reps === 1, "GET state 读回卡片状态");
  ok(get.j.settings && get.j.settings.newPerDay === 12, "GET state 读回设置");
  const noauth = await call("GET", "/api/state");
  ok(noauth.status === 401, "无令牌访问 state 返回 401");
  const badtok = await call("GET", "/api/state", null, "abc.def");
  ok(badtok.status === 401, "伪造令牌返回 401");

  /* 5. 词库目录与模糊检索 */
  const wAll = await call("GET", "/api/words?limit=200");
  ok(wAll.status === 200 && wAll.j.count === 200 && h.j.words > 5000, "全量目录已入库（health 总量 " + h.j.words + " 词），limit 分页生效");
  const wT8 = await call("GET", "/api/words?level=TEM-8");
  ok(wT8.status === 200 && wT8.j.count === 40 && wT8.j.words[0].level === "TEM-8", "TEM-8 过滤 40 词");
  const wC4 = await call("GET", "/api/words?level=CET-4&limit=200");
  ok(wC4.status === 200 && wC4.j.count === 200 && wC4.j.words.some(x => (x.level || "").includes(",")), "CET-4 过滤含多级别目录词（逗号连接）");
  const wq1 = await call("GET", "/api/words?q=abandon");
  ok(wq1.status === 200 && wq1.j.count > 0 && wq1.j.words[0].headword === "abandon", "精确检索 abandon 命中首位");
  const wq2 = await call("GET", "/api/words?q=resil");
  ok(wq2.status === 200 && wq2.j.count > 0 && /^resil/.test(wq2.j.words[0].headword), "前缀检索 resil 命中 resilience 系");
  const wq3 = await call("GET", "/api/words?q=persistense");
  ok(wq3.status === 200 && wq3.j.count > 0 && /persist/.test(wq3.j.words[0].headword), "容错检索 persistense（编辑距离）命中 persist");
  const wq4 = await call("GET", "/api/words?q=zzzzqqq");
  ok(wq4.status === 200 && wq4.j.count === 0, "无匹配检索返回空集");

  /* 6. 新闻速览 */
  const news = await call("GET", "/api/news?limit=10");
  ok(news.status === 200 && news.j.ok && Array.isArray(news.j.items), "news 接口返回结构正确");
  if (news.j.items && news.j.items.length) {
    const it = news.j.items[0];
    ok(!!(it.title && it.link && it.source), "新闻条目含标题/链接/来源（" + news.j.total + " 条已入库）");
    ok(news.j.items.every(x => !x.summary || x.summary.length <= 200), "新闻摘要均为短片段（不搬运正文）");
  } else {
    ok(news.j.total >= 0, "news 接口可访问（当前源不可达，条目 0，接口不报错）");
  }

  /* 7. 静态页面 */
  const idx = await fetch(BASE + "/");
  ok(idx.status === 200 && (await idx.text()).includes("EverWord"), "静态首页可访问");
  const js = await fetch(BASE + "/js/vocab-catalog.js");
  ok(js.status === 200 && (await js.text()).includes("EV_CATALOG"), "词库目录静态资源可访问");

  console.log(fails ? "\n" + fails + " 项失败" : "\nAPI 冒烟全部通过");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("FAIL  测试执行异常:", e.message); process.exit(1); });
