// Resolve the reviewed CV document in development and production.
const downloadLink = document.getElementById('download-cv');
downloadLink.href = new URL('../../assets/documents/CV-Akmal-Rizki-Anapu.docx', import.meta.url).href;
