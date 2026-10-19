/* EverWord 测验引擎 —— 每日测验 / 题库整卷练习 / 错题重练 共用 */

const KEY_L = "ABCD";

class Quiz {
  constructor(mount, opts) {
    this.mount = mount;
    this.o = Object.assign({ questions: [], title: "测验", sub: "", mode: "daily", onDone: null }, opts);
    this.i = 0; this.locked = false; this.answers = [];
  }

  blankify(s) { return String(s).replace(/_{4,}/g, '<span class="blank"></span>'); }

  /* ---------- 开场卡 ---------- */
  intro() {
    const n = this.o.questions.length;
    if (!n) {
      this.mount.innerHTML = `
        <div class="bezel q-card anim-in"><div class="core">
          <span class="eyebrow">${this.o.title}</span>
          <h2 class="q-intro-t">暂无题目</h2>
          <p class="page-sub">今天没有需要练习的内容，去看看文章或稍后再来。</p>
        </div></div>`;
      return;
    }
    const types = [...new Set(this.o.questions.map(q => q.type))].join(" · ");
    this.mount.innerHTML = `
      <div class="bezel q-card anim-in"><div class="core q-intro">
        <span class="eyebrow">${this.o.title}</span>
        <h2 class="q-intro-t">${n} 道题，${n <= 6 ? "约 3" : "约 5"} 分钟</h2>
        <p class="page-sub">${this.o.sub || "题型：" + types + "。答完可一键重练错题。"}</p>
        <button class="btn btn-primary q-start">开始答题
          <span class="btn-ic">${ICONS.arrow}</span>
        </button>
      </div></div>`;
    this.mount.querySelector(".q-start").addEventListener("click", () => { Stats.touch(); this.start(); });
  }

  start() { this.i = 0; this.answers = []; this.renderQ(); }

  /* ---------- 题目卡 ---------- */
  renderQ() {
    const q = this.o.questions[this.i];
    const total = this.o.questions.length;
    const last = this.i === total - 1;
    this.mount.innerHTML = `
      <div class="bezel q-card anim-in"><div class="core">
        <div class="q-head">
          <span class="eyebrow">${q.type}</span>
          <span class="q-count">${this.i + 1} / ${total}</span>
        </div>
        <div class="bar q-bar"><i style="transform:scaleX(${this.i / total})"></i></div>
        ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ""}
        <h2 class="q-stem">${this.blankify(q.stem)}</h2>
        <div class="q-opts">
          ${q.options.map((o, k) => `
            <button class="q-opt" data-k="${k}">
              <span class="q-opt-key">${KEY_L[k]}</span><span>${o}</span>
            </button>`).join("")}
        </div>
        <div class="q-explain" hidden></div>
        <div class="q-actions">
          <button class="btn btn-primary q-next" disabled>${last ? "查看结果" : "下一题"}
            <span class="btn-ic">${ICONS.arrow}</span>
          </button>
        </div>
      </div></div>`;
    this.mount.querySelectorAll(".q-opt").forEach(b =>
      b.addEventListener("click", () => this.choose(+b.dataset.k)));
    this.mount.querySelector(".q-next").addEventListener("click", () => this.next());
    requestAnimationFrame(() => {
      const bar = this.mount.querySelector(".q-bar i");
      if (bar) bar.style.transform = "scaleX(" + (this.i + 0.35) / total + ")";
    });
  }

  choose(k) {
    if (this.locked) return;
    this.locked = true;
    const q = this.o.questions[this.i];
    const correct = k === q.answer;
    this.answers.push({ q, k, correct });
    this.mount.querySelectorAll(".q-opt").forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correct");
      else if (i === k) b.classList.add("wrong");
    });
    const bar = this.mount.querySelector(".q-bar i");
    if (bar) bar.style.transform = "scaleX(" + (this.i + 1) / this.o.questions.length + ")";
    const ex = this.mount.querySelector(".q-explain");
    ex.hidden = false;
    ex.innerHTML = `<b class="${correct ? "ok" : "err"}">${correct ? "回答正确" : "回答错误"}</b><span>${q.explain}</span>`;
    const nb = this.mount.querySelector(".q-next");
    nb.disabled = false;
  }

  next() {
    if (!this.locked) return;
    this.locked = false;
    this.i++;
    if (this.i >= this.o.questions.length) this.finish();
    else this.renderQ();
  }

  /* ---------- 结果卡 ---------- */
  finish() {
    const n = this.o.questions.length;
    const c = this.answers.filter(a => a.correct).length;
    const pct = n ? Math.round(c / n * 100) : 0;
    if (this.o.mode !== "retry") Stats.quiz(c, n);   // 重练不计入正确率
    if (this.o.mode === "daily") Prog.markQuiz();
    // 每日测验错题中的目标词 → 生词本（明日复习）
    if (this.o.mode === "daily")
      this.answers.filter(a => !a.correct && a.q.word).forEach(a => SRS.addWord(a.q.word));
    if (this.o.onDone) this.o.onDone(c, n, this.answers);

    const wrong = this.answers.filter(a => !a.correct);
    this.mount.innerHTML = `
      <div class="bezel q-card anim-in"><div class="core q-result">
        <span class="eyebrow">${this.o.title} · 结果</span>
        <div class="score-wrap">
          <svg class="score" viewBox="0 0 120 120">
            <circle class="score-bg" cx="60" cy="60" r="54"></circle>
            <circle class="score-fg" id="score-fg" cx="60" cy="60" r="54"></circle>
          </svg>
          <div class="score-num"><b>${pct}</b><span>%</span></div>
        </div>
        <h2 class="q-res-t">${c} / ${n} 题正确</h2>
        <p class="page-sub">${wrong.length
          ? "有 " + wrong.length + " 道错题" + (this.o.mode === "daily" ? "，相关词汇已加入生词本，明日复习见。" : "，建议立即重练巩固。")
          : "全对！记忆曲线会替你把间隔拉得更长。"}</p>
        <div class="q-review">
          ${this.answers.map((a, i) => `
          <div class="q-rev ${a.correct ? "" : "bad"}">
            <span class="q-rev-ic">${a.correct ? ICONS.check : ICONS.cross}</span>
            <div>
              <p class="q-rev-stem">${i + 1}. ${this.blankify(a.q.stem)}</p>
              <p class="q-rev-ans">正确答案 ${KEY_L[a.q.answer]} · ${a.q.options[a.q.answer]}</p>
            </div>
          </div>`).join("")}
        </div>
        <div class="q-cta">
          ${wrong.length ? `<button class="btn btn-primary q-retry">${ICONS.refresh}<span>错题重练</span></button>` : ""}
          <button class="btn btn-ghost q-again">${ICONS.refresh}<span>再来一次</span></button>
          <a class="btn btn-ghost" href="index.html">返回首页</a>
        </div>
      </div></div>`;

    const C = 339.292; // 2πr, r=54
    const fg = this.mount.querySelector("#score-fg");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fg.style.strokeDashoffset = String(C * (1 - pct / 100));
    }));
    const retry = this.mount.querySelector(".q-retry");
    if (retry) retry.addEventListener("click", () => {
      new Quiz(this.mount, {
        questions: wrong.map(a => a.q),
        title: "错题重练", mode: "retry",
        onDone: this.o.onDone
      }).intro();
    });
    this.mount.querySelector(".q-again").addEventListener("click", () => this.intro());
  }
}
