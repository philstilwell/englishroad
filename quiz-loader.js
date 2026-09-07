(() => {
  const script = document.currentScript;
  const app = script.dataset.app;
  const version = script.dataset.version;
  const status = document.getElementById("loadStatus");
  let finished = false;
  function fail() {
    if (finished) return;
    status.hidden = false;
    document.getElementById("loadMessage").textContent = "The questions could not load. Check your connection and retry. Your saved attempt stays in this browser.";
    status.setAttribute("role", "alert");
  }
  const timeout = setTimeout(fail, 10000);
  window.englishRoadReady = () => {
    finished = true;
    clearTimeout(timeout);
    status.hidden = true;
  };
  const runtimeError = (event) => {
    if (!finished && (!event.filename || event.filename.startsWith(location.origin))) fail();
  };
  window.addEventListener("error", runtimeError);
  async function load(name) {
    await new Promise((resolve, reject) => {
      const tag = document.createElement("script");
      tag.async = false; // Fetch concurrently; execute in the appended dependency order.
      tag.src = `${name}?v=${encodeURIComponent(version)}`;
      tag.onload = resolve;
      tag.onerror = reject;
      document.body.append(tag);
    });
  }
  (async () => {
    try {
      await Promise.all(["site-ui.js", "coverage-bank-data.js", "question-engine.js", "learning-summary.js", app].map(load));
      if (!finished) fail();
    } catch { clearTimeout(timeout); fail(); }
    finally { window.removeEventListener("error", runtimeError); }
  })();
})();
