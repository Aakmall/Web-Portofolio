import { projects } from '../../data/projects.js';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function createProject(project, index) {
  const card = element('article', 'project-card');
  card.id = project.id;
  const url = './project.html?id=' + encodeURIComponent(project.id);
  const cover = element('a', 'project-cover');
  cover.href = url;
  cover.setAttribute('aria-label', 'View project: ' + project.title);
  const placeholder = element('span', 'project-image-pending', 'Gambar belum ditambahkan');
  if (project.images[0]) {
    const image = project.images[0];
    const img = element('img');
    img.src = new URL(image.src, document.baseURI).href;
    img.alt = image.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1920;
    img.height = 976;
    img.addEventListener('error', () => img.replaceWith(placeholder), { once: true });
    cover.append(img);
  } else cover.append(placeholder);
  cover.append(element('span', 'project-number', String(index + 1).padStart(2, '0')));
  const info = element('div', 'project-info');
  info.append(element('h3', '', project.title), element('p', 'project-category', project.category || 'Detail belum ditambahkan'));
  const link = element('a', 'project-view-link', 'View Project \u2197');
  link.href = url;
  info.append(link);
  card.append(cover, info);
  return card;
}

function initCarousel(track) {
  const previous = document.getElementById('projects-prev');
  const next = document.getElementById('projects-next');
  const position = document.getElementById('project-position');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function updateControls() {
    const cards = [...track.children];
    const viewport = track.getBoundingClientRect();
    const visible = cards.map((card, index) => ({ rect: card.getBoundingClientRect(), index }))
      .filter(({ rect }) => rect.right > viewport.left + 8 && rect.left < viewport.right - 8);
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    position.textContent = visible.length ? `${visible[0].index + 1}–${visible.at(-1).index + 1} / ${cards.length} projects` : '';
  }
  function move(direction) {
    const width = track.firstElementChild?.getBoundingClientRect().width || 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (width + gap), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(track);
  updateControls();
}

export function initProjects() {
  const container = document.getElementById('projects-list');
  container.replaceChildren(...projects.filter(project => project.published).map(createProject));
  initCarousel(container);
}
