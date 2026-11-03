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

function listSection(title, items) {
  if (!items?.length) return null;
  const section = element('section', 'project-study');
  const list = element('ul', 'features');
  items.forEach(item => list.append(element('li', '', item)));
  section.append(element('h2', '', title), list);
  return section;
}

function challengesSection(challenges) {
  const entries = challenges?.filter(item => item.title && item.challenge && item.approach);
  if (!entries?.length) return null;
  const section = element('section', 'project-study');
  section.append(element('h2', '', 'Engineering Challenges'));
  entries.forEach(item => {
    const article = element('article');
    const approach = element('p');
    approach.append(element('strong', '', 'Approach: '), document.createTextNode(item.approach));
    article.append(element('h3', '', item.title), element('p', '', item.challenge), approach);
    section.append(article);
  });
  return section;
}

function evidenceSection(evidence) {
  const entries = evidence?.filter(item => item.label && item.url);
  if (!entries?.length) return null;
  const section = element('section', 'project-study');
  const list = element('ul', 'features');
  entries.forEach(item => {
    const row = element('li');
    const link = externalLink(item.url, item.label + ' ↗');
    link.className = 'project-evidence-link';
    row.append(link);
    if (item.description) row.append(element('p', '', item.description));
    list.append(row);
  });
  section.append(element('h2', '', 'Technical Evidence'), list);
  return section;
}

function renderProject(project) {
  document.title = project.title + ' | Akmal Rizki Anapu';
  const canonicalUrl = new URL('https://akmal-portfolioo.vercel.app/project.html');
  canonicalUrl.searchParams.set('id', project.id);
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = canonicalUrl.href;
  document.head.append(canonical);
  document.querySelector('meta[property="og:url"]').content = canonicalUrl.href;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[name="twitter:title"]').content = document.title;
  const header = element('header', 'project-header');
  header.append(element('p', 'eyebrow', project.category || 'PROJECT'), element('h1', '', project.title));
  if (project.period) header.append(element('p', 'period', project.period));
  const links = element('div', 'project-links');
  const repositoryLabel = project.links.backendRepository ? 'GitHub Frontend ↗' : 'GitHub Repository ↗';
  links.append(externalLink(project.links.repository || 'https://github.com/Aakmall', project.links.repository ? repositoryLabel : 'GitHub Profile ↗'));
  if (project.links.backendRepository) links.append(externalLink(project.links.backendRepository, 'GitHub Backend ↗'));
  if (project.links.demo) links.append(externalLink(project.links.demo, 'Live Demo ↗'));
  header.append(links);

  const overview = element('section', 'overview');
  overview.append(element('h2', '', 'About this project'), element('p', '', project.description || 'Deskripsi proyek belum ditambahkan.'));
  if (project.role) overview.append(element('p', '', 'Role: ' + project.role));
  if (project.developmentStatus) {
    const status = element('p');
    status.append(element('strong', '', 'Development status: '), document.createTextNode(project.developmentStatus));
    overview.append(status);
  }
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
  return [
    header,
    overview,
    listSection('Technical Contributions', project.technicalContributions),
    listSection('Technical Approach', project.technicalApproach),
    challengesSection(project.engineeringChallenges),
    evidenceSection(project.technicalEvidence),
    gallery,
  ].filter(Boolean);
}

const id = new URLSearchParams(location.search).get('id');
const project = projects.find(item => item.id === id && item.published);
const page = document.getElementById('project-page');
if (project) {
  page.replaceChildren(...renderProject(project));
} else {
  document.title = 'Project not found | Akmal Rizki Anapu';
  page.replaceChildren(element('h1', '', 'Project not found'), element('p', '', 'Kembali ke daftar proyek untuk memilih proyek yang tersedia.'));
}
