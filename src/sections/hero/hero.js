export function initHero() {
  const link = document.getElementById('hero-cv');
  link.href = new URL('./cv.html', document.baseURI).href;
  link.removeAttribute('target');
  link.removeAttribute('download');

  const hero = document.getElementById('hero');
  const name = document.getElementById('hero-name');
  let scheduled = false;

  // Fade fully after scrolling 70% of the hero height. A larger value fades slower.
  const fadeDistanceRatio = 0.7;

  function updateNameFade() {
    const heroTop = hero.getBoundingClientRect().top + window.scrollY;
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const start = Math.max(0, heroTop - navbarHeight);
    const distance = Math.max(1, hero.offsetHeight * fadeDistanceRatio);
    const progress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
    name.style.setProperty('--name-scroll-opacity', String(1 - progress));
    scheduled = false;
  }

  function scheduleNameFade() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateNameFade);
  }

  window.addEventListener('scroll', scheduleNameFade, { passive: true });
  window.addEventListener('resize', scheduleNameFade);
  new ResizeObserver(scheduleNameFade).observe(hero);
  updateNameFade();
}
