export function initProjects() {
  const toggle = document.getElementById('view-projects');
  const details = document.getElementById('project-details');
  function setProjects(open) {
    details.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = `${open ? 'CLOSE PROJECTS' : 'VIEW ALL PROJECTS'} <span aria-hidden="true">&#8599;</span>`;
  }
  toggle.addEventListener('click', () => setProjects(details.hidden));
  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', () => setProjects(true));
  });
  if (document.querySelector('[data-project][href="' + CSS.escape(location.hash) + '"]')) setProjects(true);
}
