export function initNavigation() {
  const sections = [...document.querySelectorAll('.section')];
  const navItems = document.querySelectorAll('.nav-item');
  let scheduled = false;
  function updateActiveNav() {
    const position = window.scrollY + 150;
    const current = [...sections].reverse().find(section => section.offsetTop <= position) || sections[0];
    navItems.forEach(link => {
      const active = link.hash === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateActiveNav); }
  }, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();
}
