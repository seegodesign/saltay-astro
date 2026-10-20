const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let framePending = false;

const updateFades = () => {
  framePending = false;
  document.querySelectorAll<HTMLElement>('[data-scroll-fade]').forEach(overlay => {
    const section = overlay.parentElement;
    if (!section) return;

    const { top, height } = section.getBoundingClientRect();
    const progress = reducedMotion.matches
      ? 0
      : Math.min(1, Math.max(0, -top / Math.max(height, 1)));
    overlay.style.setProperty('--scroll-fade-solid-stop', `${8 + progress * 92}%`);
    overlay.style.setProperty('--scroll-fade-clear-stop', `${48 + progress * 52}%`);
  });
};

const scheduleUpdate = () => {
  if (framePending) return;
  framePending = true;
  window.requestAnimationFrame(updateFades);
};

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate, { passive: true });
window.addEventListener('pageshow', scheduleUpdate);
document.addEventListener('astro:page-load', scheduleUpdate);
reducedMotion.addEventListener('change', scheduleUpdate);
updateFades();
