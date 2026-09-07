(() => {
  function focusQuestion(id) {
    const target = document.getElementById(id);
    target.focus({ preventScroll: true });
    const topInset = 20;
    target.style.scrollMarginTop = `${topInset}px`;
    const rect = target.getBoundingClientRect();
    if (rect.top < topInset || rect.bottom > window.innerHeight - 16) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }

  const storagePrefix = "englishroad-";

  function removeEnglishRoadStorage() {
    try {
      for (const storage of [localStorage, sessionStorage]) {
        const keys = [];
        for (let index = 0; index < storage.length; index += 1) {
          const key = storage.key(index);
          if (key && key.startsWith(storagePrefix)) keys.push(key);
        }
        keys.forEach((key) => storage.removeItem(key));
      }
      return true;
    } catch {
      return false;
    }
  }

  function sessionStore(key, hasWork) {
    const status = document.getElementById("saveStatus");
    const notice = document.getElementById("sessionNotice");
    let failed = false;
    let previousRaw = null;
    let revision = null;
    function message(text, warning = false) {
      status.textContent = text;
      status.classList.toggle("is-warning", warning);
    }
    function failure() {
      failed = true;
      message("Progress is not being saved in this browser. Keep this tab open if you want to finish this attempt.", true);
    }
    function showNotice(text) {
      notice.hidden = false;
      notice.replaceChildren(document.createTextNode(text));
    }
    function hideNotice() {
      notice.hidden = true;
      notice.replaceChildren();
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
      if (!window.confirm("This progress is not saved. Leave this page?")) event.preventDefault();
    });
    return {
      read() {
        try {
          previousRaw = localStorage.getItem(key);
          try { localStorage.removeItem(`${key}-previous`); }
          catch {}
          revision = previousRaw;
          return previousRaw === null ? null : JSON.parse(previousRaw);
        } catch {
          if (previousRaw !== null) this.reject("The saved attempt could not be read. A new attempt is ready.");
          else failure();
          return null;
        }
      },
      reject(text) {
        try { localStorage.removeItem(key); }
        catch { failure(); }
        previousRaw = null;
        revision = null;
        showNotice(text);
      },
      save(payload, replace = false) {
        try {
          if (!replace && changedElsewhere()) {
            failed = true;
            message("A different attempt was saved in another tab. This tab is not saving. Reload to open the saved attempt, or use Delete my data to clear browser data.", true);
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
          localStorage.removeItem(`${key}-previous`);
          sessionStorage.removeItem(key);
          sessionStorage.removeItem(`${key}-previous`);
          revision = null;
          previousRaw = null;
          return true;
        } catch { failure(); return false; }
      },
      clearAll() {
        const cleared = removeEnglishRoadStorage();
        revision = null;
        previousRaw = null;
        failed = !cleared;
        hideNotice();
        message(cleared ? "English Road data has been deleted from this browser." : "This browser did not allow deletion. Use its site-data settings to remove English Road data.", !cleared);
        return cleared;
      },
      restored() { message("Saved attempt restored in this browser."); },
      failed: () => failed
    };
  }

  function validOptions(saved, original) {
    return Array.isArray(saved) && saved.length === original.length &&
      new Set(saved).size === original.length && saved.every((value) => original.includes(value));
  }

  window.EnglishRoadUI = Object.freeze({ focusQuestion, removeEnglishRoadStorage, sessionStore, validOptions });
})();
