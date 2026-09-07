(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  // Navigation can wrap on phones or when learners enlarge the text.
  const measureHeader = () => {
    document.documentElement.style.setProperty("--site-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };
  measureHeader();
  if ("ResizeObserver" in window) new ResizeObserver(measureHeader).observe(header);
  else window.addEventListener("resize", measureHeader);
})();
