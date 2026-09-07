(() => {
  const help = document.getElementById('cefrHelp');
  const trigger = document.getElementById('cefrComparisonTrigger');
  const panel = document.getElementById('cefrComparison');
  const closeButton = document.getElementById('closeCefrComparison');
  if (!help || !trigger || !panel || !closeButton) return;

  let pinned = false;
  let overHelp = false;
  let overPanel = false;
  let dismissed = false;
  let closeTimer;
  function cancelClose() { clearTimeout(closeTimer); }
  function position() {
    if (panel.hidden) return;
    const anchor = trigger.getBoundingClientRect();
    const margin = 16, gap = 8;
    const below = window.innerHeight - anchor.bottom - gap - margin;
    const above = anchor.top - gap - margin;
    const useBelow = below >= 420 || below >= above;
    panel.style.maxHeight = `${Math.min(window.innerHeight - margin * 2, Math.max(180, useBelow ? below : above))}px`;
    const box = panel.getBoundingClientRect();
    panel.style.left = `${Math.max(margin, Math.min(anchor.left, window.innerWidth - box.width - margin))}px`;
    const top = useBelow ? anchor.bottom + gap : anchor.top - box.height - gap;
    panel.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - box.height - margin))}px`;
  }
  function show() {
    cancelClose();
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    position();
  }
  function hide(restoreFocus = false) {
    cancelClose();
    panel.hidden = true;
    pinned = false;
    overPanel = false;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }
  function scheduleClose() {
    cancelClose();
    closeTimer = setTimeout(() => {
      if (!pinned && !overHelp && !overPanel && !panel.contains(document.activeElement)) hide();
    }, 250);
  }
  // Hovering the explanation opens the comparison without moving keyboard focus.
  help.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'mouse') return;
    overHelp = true;
    if (!dismissed) show();
  });
  help.addEventListener('pointerleave', () => { overHelp = false; dismissed = false; scheduleClose(); });
  panel.addEventListener('pointerenter', () => { overPanel = true; cancelClose(); });
  panel.addEventListener('pointerleave', () => { overPanel = false; scheduleClose(); });
  trigger.addEventListener('click', (event) => {
    if (pinned && !panel.hidden) { dismissed = true; hide(); return; }
    dismissed = false;
    pinned = true;
    show();
    if (event.detail === 0) closeButton.focus({ preventScroll: true });
  });
  closeButton.addEventListener('click', () => { dismissed = true; hide(true); });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || panel.hidden) return;
    event.preventDefault();
    dismissed = true;
    hide(panel.contains(document.activeElement));
  });
  document.addEventListener('pointerdown', (event) => {
    if (!panel.hidden && !panel.contains(event.target) && !trigger.contains(event.target)) hide();
  });
  document.addEventListener('focusin', (event) => {
    if (panel.hidden) return;
    if (panel.contains(event.target) || trigger.contains(event.target)) cancelClose();
    else hide();
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, { passive: true });
})();
