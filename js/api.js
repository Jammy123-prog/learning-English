/* EverWord 云同步 v1.1 —— 服务器探测 / 账号登录注册 / 学习状态多端同步
   服务器模式：node server/server.js 启动后自动激活（file:// 打开时静默跳过，纯本地模式不受影响）
   同步策略：启动时拉取（有差异则刷新一次）；本地每次变更防抖 1.1s 推送（最后写入胜出） */

const EVSync = (() => {
  const T = "ev_token", N = "ev_name";
  const KEYS = ["ev_srs", "ev_stats", "ev_prog", "ev_settings"];
  const LABELS = { ev_srs: "复习卡片", ev_stats: "统计", ev_prog: "今日进度", ev_settings: "设置" };
  let mode = "local";
  let pushT = null, pushing = false, pending = false, booted = false;

  const canLS = () => { try { localStorage.setItem("__ev", "1"); localStorage.removeItem("__ev"); return true; } catch (e) { return false; } };
  const hasTok = () => { try { return !!localStorage.getItem(T); } catch (e) { return false; } };
  const getName = () => { try { return localStorage.getItem(N) || ""; } catch (e) { return ""; } };

  function fetchTo(url, opts, ms) {
    return new Promise((resolve, reject) => {
      const ctl = ("AbortController" in window) ? new AbortController() : null;
      const to = setTimeout(() => { if (ctl) ctl.abort(); reject(new Error("timeout")); }, ms || 2500);
      fetch(url, Object.assign({}, opts || {}, ctl ? { signal: ctl.signal } : {}))
        .then(r => { clearTimeout(to); resolve(r); })
        .catch(e => { clearTimeout(to); reject(e); });
    });
  }

  async function req(path, opts) {
    const headers = { "Content-Type": "application/json" };
    let tk = null; try { tk = localStorage.getItem(T); } catch (e) {}
    if (tk) headers.Authorization = "Bearer " + tk;
    const r = await fetchTo(path, Object.assign({ headers }, opts || {}), 8000);
    let j = {};
    try { j = await r.json(); } catch (e) {}
    if (!r.ok) {
      const err = new Error(j.error || ("HTTP " + r.status));
      err.code = r.status;
      throw err;
    }
    return j;
  }

  async function detect() {
    if (!/^https?:$/.test(location.protocol)) return;
    try {
      const r = await fetchTo("/api/health", {}, 1800);
      if (r.ok) {
        const j = await r.json();
        if (j && j.ok && j.version) mode = "server";
      }
    } catch (e) { /* 无后端 → 纯本地模式 */ }
  }

  /* 最后成功上传时的本地快照（ev_pushed）：用于判定"本地是否有未上传的修改"
     —— 真正的"最后写入胜出"：云端与本地不一致时，谁更新谁赢 */
  const PUSHED_KEY = "ev_pushed";
  function pushedMap() { try { return JSON.parse(localStorage.getItem(PUSHED_KEY) || "{}") || {}; } catch (e) { return {}; } }

  /* 服务器 → localStorage
     返回 { changed, incomplete, needPush }：
       changed=云端较新已覆盖本地（需刷新页面）；incomplete=云端缺项；needPush=本地有未上传的修改（本地胜出，待补传） */
  async function pullChanged() {
    const j = await req("/api/state");
    const map = { ev_srs: j.srs, ev_stats: j.stats, ev_prog: j.prog, ev_settings: j.settings };
    const pm = pushedMap();
    const eff = {};   // 各键的最终生效数据（供内存态 reload）
    let changed = false, incomplete = false, needPush = false;
    KEYS.forEach(k => {
      const srv = map[k] ? JSON.stringify(map[k]) : null;
      let loc = null; try { loc = localStorage.getItem(k); } catch (e) {}
      if (srv === null) { incomplete = true; eff[k.slice(3)] = null; return; }   // 云端缺项 → 不动本地
      if (loc === srv) { eff[k.slice(3)] = map[k]; return; }
      if (pm[k] != null && loc !== pm[k]) {
        /* 本地自上次成功上传后又被修改过（如保存后 1.1s 内刷新）→ 本地胜出，稍后补传 */
        needPush = true; eff[k.slice(3)] = JSON.parse(loc);
        return;
      }
      try { localStorage.setItem(k, srv); } catch (e) {}
      changed = true; eff[k.slice(3)] = map[k];
    });
    if (typeof SRS !== "undefined" && SRS.reload) SRS.reload(eff.srs);
    if (typeof Stats !== "undefined" && Stats.reload) Stats.reload(eff.stats);
    if (typeof Prog !== "undefined" && Prog.reload) Prog.reload(eff.prog);
    if (typeof Settings !== "undefined" && Settings.reload) Settings.reload(eff.settings);
    return { changed, incomplete, needPush };
  }

  /* localStorage → 服务器（防抖 1.1s；被 srs.js / settings.js 的 save 钩子调用） */
  function push() {
    if (mode !== "server" || !hasTok() || !canLS()) return;
    clearTimeout(pushT);
    pushT = setTimeout(() => { pushNow().catch(() => {}); }, 1100);
  }

  async function pushNow() {
    if (mode !== "server" || !hasTok()) return;
    if (pushing) { pending = true; return; }
    pushing = true;
    try {
      const body = {}, pm = pushedMap();
      /* 服务端 /api/state 的字段为 srs/stats/prog/settings（无 ev_ 前缀），
         本地存储键带 ev_ 前缀，上传前须去掉，否则云端永远存 null */
      KEYS.forEach(k => {
        let s = null;
        try { s = localStorage.getItem(k); if (s != null) body[k.replace(/^ev_/, "")] = JSON.parse(s); } catch (e) {}
        pm[k] = s;
      });
      await req("/api/state", { method: "PUT", body: JSON.stringify(body) });
      try { localStorage.setItem(PUSHED_KEY, JSON.stringify(pm)); } catch (e) {}
    } finally {
      pushing = false;
      if (pending) { pending = false; pushNow().catch(() => {}); }
    }
  }

  /* ---------------- 账号 UI（自含样式，兼容两套主题） ---------------- */
  const STYLE = `
#ev-cloud-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;margin-left:6px;border-radius:999px;
  font:800 13px/1 "Nunito","PingFang SC","Microsoft YaHei",sans-serif;color:#4F46E5;
  background:linear-gradient(175deg,#FFFFFF,#EDF0FF);border:2px solid rgba(255,255,255,.95);
  box-shadow:inset -2px -3px 6px rgba(30,27,75,.08),inset 2px 2px 5px rgba(255,255,255,.9),3px 4px 9px rgba(79,70,229,.22);
  cursor:pointer;transition:transform .2s cubic-bezier(.34,1.56,.64,1),color .2s ease-out;white-space:nowrap;flex:none}
#ev-cloud-btn:hover{transform:translateY(-2px);color:#1E1B4B}
#ev-cloud-btn.on{color:#fff;background:linear-gradient(175deg,#34D399,#1DA851);
  box-shadow:inset -2px -3px 6px rgba(3,74,34,.35),inset 2px 2px 5px rgba(255,255,255,.4),3px 5px 10px rgba(34,197,94,.4)}
#ev-mask{position:fixed;inset:0;z-index:900;background:rgba(30,27,75,.45);backdrop-filter:blur(4px);
  display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .25s ease}
#ev-mask.show{opacity:1;pointer-events:auto}
#ev-modal{width:min(400px,100%);background:linear-gradient(160deg,#FFFFFF,#F3F5FF);border:3px solid rgba(255,255,255,.95);
  border-radius:26px;box-shadow:inset 4px 5px 10px rgba(255,255,255,.95),inset -4px -5px 10px rgba(30,27,75,.08),14px 18px 44px rgba(30,27,75,.3);
  padding:30px 30px 26px;transform:translateY(14px) scale(.97);transition:transform .3s cubic-bezier(.34,1.56,.64,1);font-family:"Nunito","PingFang SC","Microsoft YaHei",sans-serif}
#ev-mask.show #ev-modal{transform:none}
.ev-title{font-family:"Fredoka","PingFang SC","Microsoft YaHei",sans-serif;font-size:21px;font-weight:600;color:#1E1B4B;margin-bottom:4px}
.ev-sub{font-size:12.5px;font-weight:700;color:#4A4690;margin-bottom:18px}
.ev-tabs{display:flex;gap:6px;margin-bottom:16px}
.ev-tabs button{flex:1;padding:9px 0;border-radius:999px;font:800 13px/1 inherit;color:#4A4690;background:#EDF0FF;border:2px solid transparent;cursor:pointer;transition:all .2s ease}
.ev-tabs button.on{color:#fff;background:linear-gradient(175deg,#818CF8,#4F46E5)}
.ev-row{margin-bottom:12px}
.ev-row label{display:block;font-size:11.5px;font-weight:800;color:#4A4690;margin:0 0 5px 2px;letter-spacing:.04em}
.ev-row input{width:100%;padding:11px 14px;border-radius:14px;border:2px solid #C9CDEE;background:#FFFFFF;
  font:700 14px/1.4 inherit;color:#1E1B4B;outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.ev-row input:focus{border-color:#4F46E5;box-shadow:0 0 0 3px rgba(79,70,229,.15)}
.ev-err{display:none;margin:-4px 0 12px;padding:9px 13px;border-radius:12px;background:#FFD9D2;color:#93201A;font-size:12.5px;font-weight:700;line-height:1.5}
.ev-err.show{display:block}
.ev-go{width:100%;padding:13px 0;border-radius:999px;border:2.5px solid rgba(255,255,255,.9);cursor:pointer;
  font:600 15px/1 "Fredoka","PingFang SC","Microsoft YaHei",sans-serif;color:#fff;
  background:linear-gradient(175deg,#1DA851,#178A41);
  box-shadow:inset -4px -6px 10px rgba(3,74,34,.38),inset 4px 5px 10px rgba(255,255,255,.42),6px 9px 18px rgba(34,197,94,.45);
  transition:transform .2s cubic-bezier(.34,1.56,.64,1)}
.ev-go:hover{transform:translateY(-2px)}
.ev-go:disabled{opacity:.55;cursor:not-allowed;transform:none}
.ev-alt{display:flex;gap:8px;margin-top:12px}
.ev-alt button{flex:1;height:42px;padding:0 10px;border-radius:999px;border:2px solid #C9CDEE;background:#fff;color:#4F46E5;
  font:800 12.5px/1 inherit;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:all .2s ease}
.ev-alt button:hover{border-color:#4F46E5;transform:translateY(-1px);box-shadow:3px 4px 9px rgba(79,70,229,.18)}
.ev-admin-link{display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:12px;padding:11px 0;
  border-radius:999px;border:2px solid rgba(255,255,255,.9);text-decoration:none;
  font:800 13px/1 inherit;color:#fff;background:linear-gradient(175deg,#818CF8,#4F46E5);
  box-shadow:inset -4px -6px 10px rgba(30,27,75,.28),inset 4px 5px 10px rgba(255,255,255,.35),5px 7px 14px rgba(79,70,229,.42);
  transition:transform .2s cubic-bezier(.34,1.56,.64,1)}
.ev-admin-link:hover{transform:translateY(-2px);color:#fff}
.ev-admin-link svg{flex:none}
.ev-role-chip{display:inline-block;margin-left:7px;padding:2.5px 9px;border-radius:999px;
  font-size:10px;font-weight:800;letter-spacing:.05em;color:#fff;
  background:linear-gradient(175deg,#818CF8,#4F46E5);border:1.5px solid rgba(255,255,255,.85);vertical-align:2px}
.ev-status{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.ev-status .row{display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:#4A4690}
.ev-status .row b{color:#1E1B4B}
.ev-close-x{position:absolute;top:16px;right:18px;width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;
  background:#EDF0FF;color:#4A4690;font-size:15px;font-weight:800;line-height:1;transition:all .2s ease}
.ev-close-x:hover{background:#DCE7FF;color:#1E1B4B}
#ev-modal{position:relative}
@media (max-width:560px){#ev-cloud-btn span{display:none}#ev-cloud-btn{padding:8px 10px}}
`;

  const SVG_CLOUD = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .42-8.98 7 7 0 0 0-13.36 1.9A4 4 0 0 0 6 19.5h11.5z"/></svg>';

  let mask = null;

  function openModal() {
    if (!mask) build();
    renderAccount() || renderAuth("login");
    mask.classList.add("show");
    const f = mask.querySelector("input");
    if (f) setTimeout(() => f.focus(), 250);
  }
  function closeModal() { if (mask) mask.classList.remove("show"); }

  function build() {
    mask = document.createElement("div");
    mask.id = "ev-mask";
    mask.innerHTML = '<div id="ev-modal" role="dialog" aria-modal="true"></div>';
    mask.addEventListener("click", e => { if (e.target === mask) closeModal(); });
    document.body.appendChild(mask);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }

  function headHTML(t, s) {
    return '<button class="ev-close-x" data-ev="close" aria-label="关闭">✕</button>'
      + '<div class="ev-title">' + t + '</div><div class="ev-sub">' + s + '</div>';
  }

  function bindClose(root) {
    root.querySelectorAll('[data-ev="close"]').forEach(b => b.addEventListener("click", closeModal));
  }

  function renderAuth(tab) {
    const m = mask.querySelector("#ev-modal");
    const isReg = tab === "register";
    m.innerHTML = headHTML("云同步 · EverWord", isReg ? "注册一个账号，学习进度多设备随身同步" : "登录后拉取云端进度，本地数据自动上传")
      + '<div class="ev-tabs">'
      + '<button data-ev="login" class="' + (isReg ? "" : "on") + '">登录</button>'
      + '<button data-ev="register" class="' + (isReg ? "on" : "") + '">注册</button>'
      + '</div>'
      + '<div class="ev-err" id="ev-err"></div>'
      + '<div class="ev-row"><label>用户名（3-24 位字母数字）</label><input id="ev-name" autocomplete="username" maxlength="24"></div>'
      + '<div class="ev-row"><label>密码（至少 6 位）</label><input id="ev-pass" type="password" autocomplete="current-password"></div>'
      + '<button class="ev-go" id="ev-go">' + (isReg ? "注册并同步" : "登录并同步") + '</button>'
      + '<div class="ev-alt"><button data-ev="close">暂不登录，继续本地学习</button></div>';
    bindClose(m);
    m.querySelectorAll(".ev-tabs button").forEach(b =>
      b.addEventListener("click", () => renderAuth(b.dataset.ev)));
    m.querySelector("#ev-go").addEventListener("click", () => submitAuth(isReg));
    m.querySelector("#ev-pass").addEventListener("keydown", e => { if (e.key === "Enter") submitAuth(isReg); });
  }

  /* ---- 本机数据按账号隔离：归档 / 清空 / 恢复 ----
     学习键（ev_srs 等）在本机是全局一份，换账号登录若不切换会把上一账号的数据
     显示给下一账号、甚至被 pushNow 串号上传。故登录/登出时按用户名归档快照。 */
  const ARCH = n => "ev_local:" + n;
  function snapshotKeys(name) {
    if (!name || !canLS()) return;
    try {
      const snap = {};
      KEYS.forEach(k => { snap[k] = localStorage.getItem(k); });
      localStorage.setItem(ARCH(name), JSON.stringify(snap));
    } catch (e) {}
  }
  function clearKeys() {
    KEYS.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    try { localStorage.removeItem(PUSHED_KEY); } catch (e) {}   // 上传快照随账号清空，避免串号误判
  }
  function restoreSnapshot(name) {
    if (!name || !canLS()) return false;
    try {
      const raw = localStorage.getItem(ARCH(name));
      if (!raw) return false;
      const snap = JSON.parse(raw);
      KEYS.forEach(k => { if (snap[k] != null) { try { localStorage.setItem(k, snap[k]); } catch (e) {} } });
      return true;
    } catch (e) { return false; }
  }

  async function submitAuth(isReg) {
    const m = mask.querySelector("#ev-modal");
    const name = m.querySelector("#ev-name").value.trim();
    const pass = m.querySelector("#ev-pass").value;
    const err = m.querySelector("#ev-err");
    const btn = m.querySelector("#ev-go");
    const fail = msg => { err.textContent = msg; err.classList.add("show"); btn.disabled = false; btn.textContent = isReg ? "注册并同步" : "登录并同步"; };
    err.classList.remove("show");
    if (!/^[A-Za-z0-9_-]{3,24}$/.test(name)) return fail("用户名需为 3-24 位字母、数字、下划线或连字符");
    if (pass.length < 6) return fail("密码至少 6 位");
    btn.disabled = true;
    btn.textContent = "连接中…";
    try {
      const j = await req(isReg ? "/api/register" : "/api/login", {
        method: "POST",
        body: JSON.stringify({ name, password: pass })
      });
      const prev = getName();   // 登录前的账号（可能为空 = 匿名学习）
      if (prev && prev !== j.name) {
        /* 换账号：归档上一账号的本机数据 → 清空 → 恢复本账号快照（若有） */
        snapshotKeys(prev);
        clearKeys();
        restoreSnapshot(j.name);
      } else if (!prev) {
        /* 匿名后登录：恢复该账号的本机快照（云端拉取随后覆盖存在的项） */
        restoreSnapshot(j.name);
      }
      localStorage.setItem(T, j.token);
      localStorage.setItem(N, j.name);
      try { localStorage.setItem("ev_role", j.role || "user"); } catch (e) {}
      await pullChanged().catch(() => false);
      /* 账号切换后必须重载：srs/stats 等内存态在页面加载时构建 */
      location.reload();
    } catch (e) {
      fail(e.code === 401 ? "用户名或密码错误" : (e.code === 409 ? "该用户名已被注册" : ("出错了：" + e.message)));
    }
  }

  function renderAccount() {
    if (!hasTok()) return false;
    const m = mask.querySelector("#ev-modal");
    const admin = (() => { try { return localStorage.getItem("ev_role") === "admin"; } catch (e) { return false; } })();
    const synced = "最后写入胜出 · 每次变更约 1 秒后自动上传";
    m.innerHTML = headHTML("云同步已开启", synced)
      + '<div class="ev-status">'
      + '<div class="row"><span>账号</span><b><span id="ev-who"></span>' + (admin ? '<span class="ev-role-chip">管理员</span>' : "") + "</b></div>"
      + '<div class="row"><span>同步范围</span><b>卡片 / 统计 / 进度 / 设置</b></div>'
      + '<div class="row"><span>服务器</span><b>本机 server.js · SQLite</b></div>'
      + "</div>"
      + (admin ? '<a class="ev-admin-link" href="admin.html" title="查看账号使用与学习情况">'
          + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.2 7.7-8 9-4.8-1.3-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>'
          + "<span>进入管理后台</span></a>" : "")
      + '<button class="ev-go" id="ev-syncnow">立即同步</button>'
      + '<div class="ev-alt">'
      + '<button id="ev-logout" title="本地学习数据保留在本机">退出登录</button>'
      + '<button data-ev="close">完成</button>'
      + "</div>";
    bindClose(m);
    m.querySelector("#ev-who").textContent = getName();
    if (!admin) {
      /* 兼容升级前登录的旧会话（本地无 ev_role）：探测一次管理权限，是管理员则就地补上入口 */
      let tk = ""; try { tk = localStorage.getItem(T) || ""; } catch (e) {}
      fetch("/api/admin/overview", { headers: { Authorization: "Bearer " + tk } })
        .then(r => {
          if (!r.ok) return;
          try { localStorage.setItem("ev_role", "admin"); } catch (e) {}
          if (mask.classList.contains("show")) renderAccount();
        })
        .catch(() => {});
    }
    m.querySelector("#ev-syncnow").addEventListener("click", async () => {
      const b = m.querySelector("#ev-syncnow");
      b.disabled = true; b.textContent = "同步中…";
      try {
        await pushNow();
        await pullChanged();
        if (typeof toast === "function") toast("同步完成");
      } catch (e) {
        if (typeof toast === "function") toast("同步失败：" + e.message);
      }
      b.disabled = false; b.textContent = "立即同步";
    });
    m.querySelector("#ev-logout").addEventListener("click", () => {
      /* 归档该账号本机数据 → 清空学习键 → 重载（防止匿名/下一账号读到上一账号数据） */
      snapshotKeys(getName());
      clearKeys();
      localStorage.removeItem(T);
      localStorage.removeItem(N);
      try { localStorage.removeItem("ev_role"); } catch (e) {}
      paintBtn();
      closeModal();
      location.reload();
    });
    return true;
  }

  function paintBtn() {
    const b = document.getElementById("ev-cloud-btn");
    if (!b) return;
    const on = hasTok();
    b.classList.toggle("on", on);
    b.innerHTML = SVG_CLOUD + "<span>" + (on ? (getName() || "已登录") : "云同步") + "</span>";
  }

  function mountUI() {
    if (document.getElementById("ev-cloud-btn")) return;
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const style = document.createElement("style");
    style.id = "ev-sync-style";
    style.textContent = STYLE;
    document.head.appendChild(style);
    const b = document.createElement("button");
    b.id = "ev-cloud-btn";
    b.type = "button";
    b.title = "云同步与账号";
    b.addEventListener("click", openModal);
    nav.appendChild(b);
    paintBtn();
  }

  /* ---------------- 启动 ---------------- */
  (async () => {
    await detect();
    if (mode !== "server") return;
    if (hasTok()) {
      try {
        const r = await pullChanged();
        if (r.changed) { location.reload(); return; }              // 云端较新 → 刷新一次后即为一致
        if (r.needPush || r.incomplete) {                          // 本地有未上传修改（如保存后立刻刷新）或云端缺项 → 补传
          await pushNow().catch(() => {});
        }
      } catch (e) { /* token 失效或网络问题 → 本地继续 */ }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountUI);
    } else mountUI();
    booted = true;
  })();

  return {
    push,
    pushNow,
    get serverMode() { return mode === "server"; },
    get booted() { return booted; }
  };
})();
