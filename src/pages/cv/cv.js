// Resolve the final MagangHub CV in development and production.
const downloadLink = document.getElementById('download-cv');
downloadLink.href = new URL('../../assets/documents/CV_Akmal_Rizki_Anapu_MagangHub.docx', import.meta.url).href;
