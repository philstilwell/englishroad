(() => {
  const activeKeys = ['englishroad-level-check-session-v1', 'englishroad-practice-session-v1'];
  const keys = activeKeys.flatMap((key) => [key, `${key}-previous`]);
  const status = document.getElementById('dataStatus');
  document.getElementById('deleteProgress').addEventListener('click', () => {
    if (!window.confirm('Delete saved Level Check and Practice progress from this browser? This cannot be undone. Download a copy first if you want to keep it.')) return;
    try {
      keys.forEach((key) => localStorage.removeItem(key));
      status.textContent = 'Saved English Road progress has been deleted from this browser. Close other quiz tabs; they may still hold answers in memory.';
    } catch { status.textContent = 'This browser did not allow deletion. Use its site-data settings to remove English Road data.'; }
  });
  document.getElementById('exportProgress').addEventListener('click', () => {
    try {
      const saved = Object.fromEntries(keys.map((key) => [key, localStorage.getItem(key)]));
      const url = URL.createObjectURL(new Blob([JSON.stringify(saved, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'englishroad-browser-data.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = 'Browser-data download prepared. This backup is for your records; it cannot be imported into the quizzes.';
    } catch { status.textContent = 'This browser did not allow access to saved data. An open quiz may still let you download a progress summary.'; }
  });
})();
