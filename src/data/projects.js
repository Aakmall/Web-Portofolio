// Edit content here. published controls visibility; images[0] is the cover.
// Images live in public/images/projects/; paths below are relative to the website root.
export const projects = [
  {
    id: 'ai-coding-assistant',
    published: true,
    title: 'AI Coding Assistant',
    category: 'Undergraduate thesis',
    period: 'December 2025 - May 2026',
    description: 'A browser-based Python coding platform with a notebook editor and an AI assistant. Developed as my undergraduate thesis project.',
    features: [
      'Write and run Python in a notebook-style editor.',
      'Use AI assistance to generate, explain, and debug code.',
      'Switch between Code, Split, and Chat views.',
      'Import and export Python scripts and notebooks.',
    ],
    tags: ['Python', 'AI Assistant', 'Notebook Editor'],
    images: [
      { src: 'images/projects/ai-coding-assistant/unklab-aicode1.png', alt: 'AI Code Assistant landing page with Python coding platform introduction', caption: 'Tampilan awal' },
      { src: 'images/projects/ai-coding-assistant/unklab-aicode2.png', alt: 'Python notebook editor and AI assistant in split view', caption: 'Editor & AI Assistant' },
    ],
    links: { demo: '', repository: '' },
  },
  { id: 'stunting-care', published: true, title: 'Stunting-Care', category: '', period: '', description: '', features: [], tags: [], images: [], links: { demo: '', repository: '' } },
  { id: 'jewelry-ecommerce', published: true, title: 'E-commerce Perhiasan', category: '', period: '', description: '', features: [], tags: [], images: [], links: { demo: '', repository: '' } },
  { id: 'pharmacy-inventory', published: true, title: 'Manajemen Stok Apotek', category: '', period: '', description: '', features: [], tags: [], images: [], links: { demo: '', repository: '' } },
];
