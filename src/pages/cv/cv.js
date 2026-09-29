// Resolve the original CV document in development and production.
const downloadLink = document.getElementById('download-cv');
downloadLink.href = new URL('../../assets/documents/CV no fix.docx', import.meta.url).href;
