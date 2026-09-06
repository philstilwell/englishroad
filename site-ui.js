(() => {
  function focusQuestion(id) {
    const target = document.getElementById(id);
    target.focus({ preventScroll: true });
    const warning = document.querySelector(".save-bar:has(.is-warning)");
    const topInset = warning ? warning.getBoundingClientRect().height + 16 : 20;
    target.style.scrollMarginTop = `${topInset}px`;
    const rect = target.getBoundingClientRect();
    if (rect.top < topInset || rect.bottom > window.innerHeight - 16) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }

  function downloadText(text, filename, type = "text/plain") {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function sessionStore(key, hasWork) {
    const status = document.getElementById("saveStatus");
    const notice = document.getElementById("sessionNotice");
    let failed = false;
    let previousRaw = null;
    let backupRaw = null;
    let archiveBlocked = false;
    const backupKey = `${key}-previous`;
    let revision = null;
    function message(text, warning = false) {
      status.textContent = text;
      status.classList.toggle("is-warning", warning);
    }
    function failure() {
      failed = true;
      message("Progress is not being saved in this browser. Keep this tab open, or download your progress before leaving.", true);
    }
    function showPrevious(text) {
      notice.hidden = false;
      notice.replaceChildren(document.createTextNode(text + " "));
      if (!backupRaw) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "text-action";
      button.textContent = "Download previous saved data";
      button.addEventListener("click", () => downloadText(backupRaw, "englishroad-previous-progress.json", "application/json"));
      notice.append(button);
    }
    // Avoid silently overwriting a different attempt edited in another tab.
    function changedElsewhere() {
      const current = localStorage.getItem(key);
      return revision !== null && current !== revision;
    }
    window.addEventListener("beforeunload", (event) => {
      if (!failed || !hasWork()) return;
      event.preventDefault();
      event.returnValue = "";
    });
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!failed || !hasWork() || !link || link.hasAttribute("download") || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.hash) return;
      if (!window.confirm("This progress is not saved. Download it before leaving if you want to keep a copy. Leave this page?")) event.preventDefault();
    });
    return {
      read() {
        try {
          previousRaw = localStorage.getItem(key);
          revision = previousRaw;
          backupRaw = localStorage.getItem(backupKey);
          if (backupRaw) showPrevious("An older, incompatible attempt is available to download. It cannot be resumed with this question bank.");
          return previousRaw === null ? null : JSON.parse(previousRaw);
        } catch {
          if (previousRaw !== null) this.reject("The saved attempt could not be read. A new attempt is ready.");
          else failure();
          return null;
        }
      },
      reject(text) {
        backupRaw = previousRaw;
        if (backupRaw) {
          try { localStorage.setItem(backupKey, backupRaw); }
          catch { archiveBlocked = true; }
        }
        showPrevious(text);
      },
      save(payload, replace = false) {
        try {
          if (archiveBlocked) {
            failed = true;
            message("Your previous data could not be backed up. Download it using the notice above. This new attempt is not saving; Start again will explicitly replace the previous saved attempt.", true);
            return false;
          }
          if (!replace && changedElsewhere()) {
            failed = true;
            message("A different attempt was saved in another tab. This tab is not saving. Download its progress, or reload to open the saved attempt.", true);
            return false;
          }
          const raw = JSON.stringify(payload);
          localStorage.setItem(key, raw);
          revision = raw;
          failed = false;
          message("Saved in this browser.");
          return true;
        } catch {
          failure();
          return false;
        }
      },
      remove() {
        try {
          localStorage.removeItem(key);
          revision = null;
          archiveBlocked = false;
          return true;
        } catch { failure(); return false; }
      },
      restored() { message("Saved attempt restored in this browser."); },
      failed: () => failed
    };
  }

  function validOptions(saved, original) {
    return Array.isArray(saved) && saved.length === original.length &&
      new Set(saved).size === original.length && saved.every((value) => original.includes(value));
  }

  function questionReportLink(question) {
    const params = new URLSearchParams({
      title: `Question review: ${question.id}`,
      body: `Question ID: ${question.id}\nQuestion: ${question.taskText}\nChoices: ${question.options.join(" | ")}\n\nWhat seems wrong?\n\nSuggested correction (optional):\n\nPlease do not include personal details or your full report.`
    });
    return `https://github.com/philstilwell/englishroad/issues/new?${params}`;
  }
  function updateReportLink(id, question) {
    const link = document.getElementById(id);
    link.hidden = !question;
    if (question) {
      link.href = questionReportLink(question);
      link.textContent = `Report a question problem · ${question.id}`;
    }
  }
  window.EnglishRoadUI = Object.freeze({ focusQuestion, downloadText, sessionStore, validOptions, updateReportLink, questionReportLink });
})();
