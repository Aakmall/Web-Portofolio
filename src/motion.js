// Presentation-only motion; navigation, carousel and portrait behavior stay separate.
export function initMotion() {
  if (document.documentElement.dataset.motionReady) return;
  document.documentElement.dataset.motionReady = 'true';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  const played = new WeakSet();
  const playing = new Set();
  const observers = [];

  function finish(node) {
    node.classList.remove('motion-enter');
    playing.delete(node);
  }

  function reveal(node, { delay = 0, duration = 540, y = 18, effect = '' } = {}) {
    if (!node || played.has(node) || reducedMotion.matches) return;
    played.add(node);
    const focused = document.activeElement;
    if (focused && (node.contains(focused) || focused.closest('.project-card')?.contains(node))) return;
    node.style.setProperty('--motion-opacity', getComputedStyle(node).opacity);
    node.style.setProperty('--motion-delay', `${delay}ms`);
    node.style.setProperty('--motion-duration', `${duration}ms`);
    node.style.setProperty('--motion-y', `${y}px`);
    if (effect) node.classList.add(effect);
    const onEnd = event => {
      if (event.target !== node) return;
      finish(node);
    };
    node.addEventListener('animationend', onEnd);
    node.addEventListener('animationcancel', onEnd);
    playing.add(node);
    node.classList.add('motion-enter');
  }

  function observe(nodes, onVisible) {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      if (reducedMotion.matches) return;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        onVisible(entry.target, nodes.indexOf(entry.target));
      });
    }, { threshold: 0.08 });
    observers.push(observer);
    // No pending/hidden state: content stays readable if observation fails.
    nodes.forEach(node => observer.observe(node));
  }

  document.querySelectorAll('.navbar .logo, .navbar .nav-item, .navbar .btn-connect').forEach((node, index) => {
    reveal(node, { delay: index * 24, duration: 480, y: -18 });
  });

  reveal(document.querySelector('.hero-section .availability'), { delay: 40, duration: 500, y: 14 });
  reveal(document.querySelector('.hero-role'), { delay: 70, duration: 760, y: 28, effect: 'motion-mask' });
  document.querySelectorAll('.hero-right > p, .hero-specialty').forEach((node, index) => {
    reveal(node, { delay: 120 + index * 45, duration: 560, y: 18 });
  });
  document.querySelectorAll('.hero-actions > a').forEach((node, index) => {
    reveal(node, { delay: 270 + index * 50, duration: 500, y: 12 });
  });
  reveal(document.getElementById('hero-name'), { delay: 160, duration: 880, y: 32, effect: 'motion-name' });

  observe([...document.querySelectorAll('#services .glass-card')], (card, index) => {
    reveal(card, { delay: Math.min(index * 40, 120), duration: 460, y: 14 });
  });
  observe([...document.querySelectorAll('.work-heading > *')], (node, index) => {
    reveal(node, { delay: index * 60, duration: 520, y: 16 });
  });
  observe([...document.querySelectorAll('#projects-list .project-card')], (card, index) => {
    const delay = Math.min(index * 55, 165);
    reveal(card, { delay, duration: 600, y: 22, effect: 'motion-depth' });
    reveal(card.querySelector('.project-number'), { delay: delay + 60, duration: 300, y: 6 });
    reveal(card.querySelector('.project-info h3'), { delay: delay + 100, duration: 480, y: 10 });
    reveal(card.querySelector('.project-category'), { delay: delay + 120, duration: 320, y: 0 });
    reveal(card.querySelector('.project-summary'), { delay: delay + 140, duration: 460, y: 8 });
    reveal(card.querySelector('.project-view-link'), { delay: delay + 160, duration: 420, y: 6 });
  });

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observers.forEach(observer => observer.disconnect());
    playing.forEach(finish);
  });
  document.addEventListener('focusin', event => {
    const card = event.target.closest('.project-card');
    playing.forEach(node => {
      if (node.contains(event.target) || card?.contains(node)) finish(node);
    });
  });
}
