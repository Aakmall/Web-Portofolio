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
  {
    id: 'jewelry-ecommerce',
    published: true,
    title: 'FlamingoShop — Jewelry E-Commerce Website',
    category: 'University Project',
    period: '2025',
    description: 'FlamingoShop is a full-stack jewelry e-commerce website built with React, Java Spring Boot, and MySQL. Developed as a university project, it provides a shopping experience for customers and an administration dashboard for managing products, categories, and orders. The project focuses on REST API integration, database management, and responsive web design.',
    features: [
      'Browse jewelry products with search and category filtering.',
      'Register and log in using role-based authentication.',
      'Add products to a shopping cart and place orders.',
      'Manage products, categories, and stock through an admin dashboard.',
      'Upload and manage product images using Base64 storage.',
      'Store and retrieve application data through Spring Boot REST APIs and MySQL.',
      'Access responsive customer and admin interfaces across desktop and mobile devices.',
    ],
    tags: ['React', 'Java Spring Boot', 'MySQL', 'Tailwind CSS', 'REST API', 'JWT Authentication'],
    images: [
      { src: 'images/projects/e-commerce/Flamingo-KoleksiProduk1.png', alt: 'FlamingoShop jewelry collection page with a diamond ring banner', caption: 'FlamingoShop Homepage — Introduction to the jewelry collection.' },
      { src: 'images/projects/e-commerce/Beranda-FlamingoShop.png', alt: 'FlamingoShop welcome page with customer and administrator sign-in options', caption: 'Welcome Page — Customer and administrator access.' },
      { src: 'images/projects/e-commerce/Flamingo-KoleksiProduk2.png', alt: 'FlamingoShop product catalog with jewelry images, search, prices, stock, and cart buttons', caption: 'Product Catalog — Jewelry listings with search, prices, stock availability, and shopping cart actions.' },
      { src: 'images/projects/e-commerce/Flamingo-HalamanLoginAdmin.png', alt: 'FlamingoShop administrator login form with email and password fields', caption: 'Admin Login — Dedicated sign-in page for administrators.' },
      { src: 'images/projects/e-commerce/Flamingo-HalamanAdmin.png', alt: 'FlamingoShop admin dashboard showing product, category, and out-of-stock statistics', caption: 'Admin Dashboard — Store statistics and access to product and category management.' },
      { src: 'images/projects/e-commerce/Flamingo-HalamanAdmin2.png', alt: 'FlamingoShop product management table with prices, stock, search, and edit or delete actions', caption: 'Product Management — Search and manage jewelry products, prices, stock, and categories.' },
    ],
    links: { demo: '', repository: 'https://github.com/Aakmall' },
  },
  { id: 'pharmacy-inventory', published: true, title: 'Manajemen Stok Apotek', category: '', period: '', description: '', features: [], tags: [], images: [], links: { demo: '', repository: '' } },
];
