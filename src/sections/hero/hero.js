export function initHero() {
  // Open the website CV page in the current tab, without downloading a document.
  const link = document.getElementById('hero-cv');
  link.href = new URL('./cv.html', document.baseURI).href;
  link.removeAttribute('target');
  link.removeAttribute('download');
}
