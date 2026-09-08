(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const nav = header.querySelector('nav');
  if (nav) {
    nav.id = 'siteNavigation';
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.className = 'mobile-nav-toggle';
    toggle.textContent = 'Menu'; toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls', nav.id);
    header.insertBefore(toggle, nav);
    const close = () => {header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');};
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    header.addEventListener('keydown', event => {if(event.key === 'Escape' && header.classList.contains('menu-open')) {close();toggle.focus();}});
    document.addEventListener('click',event=>{if(!header.contains(event.target)) close();});
    header.addEventListener('focusout', event=>{if(event.relatedTarget && !header.contains(event.relatedTarget)) close();});
    nav.addEventListener('click',event=>{if(event.target.closest('a')) close();});
    window.addEventListener('resize',()=>{if(window.innerWidth>640) close();});
    header.classList.add('menu-ready');
  }
  // Navigation can wrap on phones or when learners enlarge the text.
  const measureHeader = () => {
    document.documentElement.style.setProperty("--site-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };
  measureHeader();
  if ("ResizeObserver" in window) new ResizeObserver(measureHeader).observe(header);
  else window.addEventListener("resize", measureHeader);
})();
