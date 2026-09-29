export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = [...document.querySelectorAll('.section')];
  const navItems = document.querySelectorAll('.nav-item');
  let scheduled = false;
  let navigationHeight = navbar.offsetHeight;

  // Keep anchor headings below the menu, including its two-row mobile layout.
  function updateNavigationHeight() {
    navigationHeight = navbar.offsetHeight;
    document.documentElement.style.scrollPaddingTop = `${navigationHeight + 20}px`;
    updateActiveNav();
  }

  function updateActiveNav() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 0);
    const position = window.scrollY + navigationHeight + 24;
    const current = [...sections].reverse().find(section => section.getBoundingClientRect().top + window.scrollY <= position) || sections[0];
    navItems.forEach(link => {
      const active = link.hash === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }

  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveNav);
    }
  }, { passive: true });
  new ResizeObserver(updateNavigationHeight).observe(navbar);
  updateNavigationHeight();
}
