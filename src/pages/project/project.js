import { projects } from '../../data/projects.js';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function externalLink(url, label) {
  const link = element('a', 'project-link', label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function renderProject(project) {
  document.title = project.title + ' | Akmal Rizki Anapu';
  const header = element('header', 'project-header');
  header.append(element('p', 'eyebrow', project.category || 'PROJECT'), element('h1', '', project.title));
  if (project.period) header.append(element('p', 'period', project.period));
  const links = element('div', 'project-links');
  links.append(externalLink(project.links.repository || 'https://github.com/Aakmall', project.links.repository ? 'GitHub Repository ↗' : 'GitHub Profile ↗'));
  if (project.links.demo) links.append(externalLink(project.links.demo, 'Live Demo ↗'));
  header.append(links);

  const overview = element('section', 'overview');
  overview.append(element('h2', '', 'About this project'), element('p', '', project.description || 'Deskripsi proyek belum ditambahkan.'));
  if (project.tags.length) {
    const tags = element('ul', 'tags');
    project.tags.forEach(tag => tags.append(element('li', '', tag)));
    overview.append(tags);
  }
  if (project.features.length) {
    overview.append(element('h2', '', 'Features'));
    const features = element('ul', 'features');
    project.features.forEach(feature => features.append(element('li', '', feature)));
    overview.append(features);
  }

  const gallery = element('section', 'gallery');
  gallery.append(element('h2', '', 'Project screenshots'));
  if (!project.images.length) gallery.append(element('p', 'pending', 'Gambar belum ditambahkan.'));
  project.images.forEach(image => {
    const figure = element('figure');
    const url = new URL(image.src, document.baseURI).href;
    const link = externalLink(url, '');
    link.className = 'screenshot-link';
    link.setAttribute('aria-label', image.caption + ' - open full image');
    const img = element('img');
    img.src = url;
    img.alt = image.alt;
    img.width = 1920;
    img.height = 976;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => link.replaceWith(element('p', 'pending', 'Gambar belum tersedia.')), { once: true });
    link.append(img);
    figure.append(link, element('figcaption', '', image.caption));
    gallery.append(figure);
  });
  return [header, overview, gallery];
}

const id = new URLSearchParams(location.search).get('id');
const project = projects.find(item => item.id === id && item.published);
const page = document.getElementById('project-page');
if (project) {
  page.replaceChildren(...renderProject(project));
} else {
  document.title = 'Project not found | Akmal';
  page.replaceChildren(element('h1', '', 'Project not found'), element('p', '', 'Kembali ke daftar proyek untuk memilih proyek yang tersedia.'));
}
