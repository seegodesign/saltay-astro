const getToggle = () => document.querySelector<HTMLButtonElement>('.menu-toggle');
const closeMenu = () => {
  const toggle = getToggle();
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  document.querySelector('#main-nav')?.classList.remove('open');
  document.querySelectorAll<HTMLDetailsElement>('.pricing-navigation').forEach(menu => menu.removeAttribute('open'));
};
const usesHoverNavigation = () => window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches;
// Delegate hover events so the dropdown also works after a Tina preview update.
document.addEventListener('pointerover', event => {
  if (!usesHoverNavigation() || event.pointerType === 'touch') return;
  const menu = (event.target as Element).closest<HTMLDetailsElement>('.pricing-navigation');
  if (menu) menu.open = true;
});
document.addEventListener('pointerout', event => {
  if (!usesHoverNavigation() || event.pointerType === 'touch') return;
  const menu = (event.target as Element).closest<HTMLDetailsElement>('.pricing-navigation');
  if (!menu || (event.relatedTarget instanceof Node && menu.contains(event.relatedTarget))) return;
  if (!menu.querySelector('.pricing-dropdown')?.contains(document.activeElement)) menu.open = false;
});
document.addEventListener('focusout', event => {
  const menu = (event.target as Element).closest<HTMLDetailsElement>('.pricing-navigation');
  if (menu && !(event.relatedTarget instanceof Node && menu.contains(event.relatedTarget))) menu.open = false;
});
// Delegate events so navigation still works after a Tina visual preview update.
document.addEventListener('click', event => {
  const target = event.target as Element;
  const pricingSummary = target.closest('.pricing-navigation summary');
  if (pricingSummary && usesHoverNavigation() && event.detail > 0) {
    event.preventDefault();
    pricingSummary.closest<HTMLDetailsElement>('details')!.open = true;
    return;
  }
  const toggle = target.closest<HTMLButtonElement>('.menu-toggle');
  if (toggle) {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.querySelector('#main-nav')?.classList.toggle('open', open);
  } else if (target.closest('#main-nav a')) {
    closeMenu();
  } else if (!target.closest('.pricing-navigation')) {
    document.querySelectorAll<HTMLDetailsElement>('.pricing-navigation').forEach(menu => menu.removeAttribute('open'));
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const pricingMenu = document.querySelector<HTMLDetailsElement>('.pricing-navigation[open]');
    if (pricingMenu) {
      pricingMenu.removeAttribute('open');
      pricingMenu.querySelector<HTMLElement>('summary')?.focus();
      return;
    }
  }
  if (event.key === 'Escape' && getToggle()?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    getToggle()?.focus();
  }
});
const updateHeader = () => document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', updateHeader, { passive: true });
document.addEventListener('astro:page-load', updateHeader);
updateHeader();
