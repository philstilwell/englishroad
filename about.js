(() => {
  const storagePrefix = 'englishroad-';
  const status = document.getElementById('dataStatus');
  function removeEnglishRoadStorage() {
    for (const storage of [localStorage, sessionStorage]) {
      const keys = [];
      for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (key && key.startsWith(storagePrefix)) keys.push(key);
      }
      keys.forEach((key) => storage.removeItem(key));
    }
  }
  document.getElementById('deleteProgress').addEventListener('click', () => {
    if (!window.confirm('Delete all English Road data from this browser? This cannot be undone.')) return;
    try {
      removeEnglishRoadStorage();
      status.textContent = 'English Road data has been deleted from this browser. Close or reload other quiz tabs because they may still show old answers until refreshed.';
    } catch { status.textContent = 'This browser did not allow deletion. Use its site-data settings to remove English Road data.'; }
  });
})();
