import { initNavigation } from './components/navigation/navigation.js';
import { initBackground } from './components/background/background.js';
import { initHero } from './sections/hero/hero.js';
import { initProjects } from './sections/work/work.js';

// Vite assembles sections at build time. Static servers need this fallback.
async function loadSectionPartials() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
  const placeholders = [];
  while (walker.nextNode()) {
    const match = walker.currentNode.textContent.trim().match(/^include:(.+)$/);
    if (match) placeholders.push({ node: walker.currentNode, file: match[1] });
  }
  await Promise.all(placeholders.map(async ({ node, file }) => {
    const response = await fetch(new URL(file, document.baseURI));
    if (!response.ok) throw new Error('Unable to load section: ' + file);
    const template = document.createElement('template');
    template.innerHTML = await response.text();
    node.replaceWith(template.content);
  }));
}

async function initPortfolio() {
  await loadSectionPartials();
  initHero();
  initProjects();
  initNavigation();
  initBackground();
}

initPortfolio().catch(error => {
  console.error('Portfolio initialization failed:', error);
  const message = document.createElement('p');
  message.textContent = 'Halaman gagal dimuat. Jalankan npm run dev, lalu buka http://127.0.0.1:3000.';
  message.style.cssText = 'position:relative;z-index:20;padding:24px;color:white;background:#191919';
  document.body.prepend(message);
});
