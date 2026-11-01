export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = [...document.querySelectorAll('.section')];
  const navItems = document.querySelectorAll('.nav-item');
  let scheduled = false;
  let anchorPadding = 0;
  let targetSection = null;
  let scrollIdleTimer;

  // Keep anchor headings below the menu, including its two-row mobile layout.
  function updateNavigationHeight() {
    anchorPadding = navbar.offsetHeight + 20;
    document.documentElement.style.scrollPaddingTop = `${anchorPadding}px`;
    updateActiveNav();
  }

  function updateActiveNav() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 0);
    // Anchor scrolling combines root scroll-padding and each section's scroll-margin.
    // Allow one pixel for fractional layout/scroll rounding at the landing position.
    const current = targetSection || [...sections].reverse().find(section => {
      const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      return section.getBoundingClientRect().top <= anchorPadding + margin + 1;
    }) || sections[0];
    const atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    const activeSection = !targetSection && atBottom ? sections.at(-1) : current;
    navItems.forEach(link => {
      const active = link.hash === `#${activeSection.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveNav);
    }
  }

  function finishNavigation() {
    clearTimeout(scrollIdleTimer);
    targetSection = null;
    scheduleUpdate();
  }

  // This is an idle delay after the latest scroll event, not an animation duration.
  function waitForScrollIdle() {
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(finishNavigation, 160);
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const section = sections.find(item => link.hash === `#${item.id}`);
    if (!section) return;
    targetSection = section;
    updateActiveNav();
    waitForScrollIdle();
    // Leave the native anchor, URL history, and CSS smooth scrolling intact.
  });

  window.addEventListener('scroll', () => {
    scheduleUpdate();
    if (targetSection) waitForScrollIdle();
  }, { passive: true });
  window.addEventListener('hashchange', () => {
    targetSection = sections.find(section => location.hash === `#${section.id}`) || null;
    updateActiveNav();
    if (targetSection) waitForScrollIdle();
  });
  // Manual input takes priority over a clicked target, including touch/scrollbar drags.
  window.addEventListener('wheel', finishNavigation, { passive: true });
  window.addEventListener('pointerdown', finishNavigation, { passive: true });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) finishNavigation();
  });
  window.addEventListener('resize', updateNavigationHeight);
  new ResizeObserver(updateNavigationHeight).observe(navbar);
  updateNavigationHeight();
}
