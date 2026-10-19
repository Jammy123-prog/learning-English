/* EverWord TTS —— Web Speech API 语音合成（单词 / 例句 / 文章段落） */

const TTS = (() => {
  const ok = typeof window !== "undefined" && "speechSynthesis" in window;
  let voice = null, run = 0; // run：会话序号，用于打断旧播放队列

  function pick() {
    if (!ok) return;
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /en[-_]US/i.test(v.lang) && /(Google|Samantha|Zira|Aria|Jenny|Guy|Female)/i.test(v.name))
         || vs.find(v => /en[-_]US/i.test(v.lang))
         || vs.find(v => /^en/i.test(v.lang))
         || null;
  }
  if (ok) { pick(); try { speechSynthesis.onvoiceschanged = pick; } catch (e) {} }

  function one(text, rate) {
    return new Promise(res => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = rate;
      if (voice) u.voice = voice;
      u.onend = res; u.onerror = res;
      speechSynthesis.speak(u);
    });
  }

  return {
    ok,
    stop() {
      run++;
      if (ok) { try { speechSynthesis.cancel(); } catch (e) {} }
    },
    /* 单条播放（单词 / 例句） */
    speak(text, rate = 0.95) {
      if (!ok) return false;
      this.stop();
      const id = ++run;
      one(text, rate).then(() => { if (id === run) run = 0; });
      return true;
    },
    /* 队列播放（文章：句级切片，规避长文本被截断） */
    async speakSeq(texts, rate = 0.95) {
      if (!ok) return false;
      this.stop();
      const id = ++run;
      for (const t of texts) {
        if (id !== run) return true;
        await one(t, rate);
      }
      return true;
    }
  };
})();
