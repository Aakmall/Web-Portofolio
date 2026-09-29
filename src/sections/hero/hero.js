export function initHero() {
  // Include the existing CV file in both development and production builds.
  document.getElementById("hero-cv").href = new URL("../../assets/documents/CV no fix.docx", import.meta.url).href;
}
