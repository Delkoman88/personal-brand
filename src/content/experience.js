export const experiences = [
  {
    id: 'TRP',
    company: 'TRYP México',
    role: 'Operations & Process Standardization',
    description: 'An accelerated growth marketplace environment where I led operational improvement, reporting workflows, process standardization, and vendor onboarding structure. Directed coordination across three distribution centers in Mexico, integrating quality and compliance initiatives with actionable automation.',
    tags: ['Operational Improvement', 'Workflow Design', 'Automation', 'Logistics'],
    image: '/tryp.png'
  },
  {
    id: 'TRC',
    company: 'TRACELAB CONSULTING',
    role: 'Business Strategy Consultant | Operations, Compliance & Market Readiness',
    description: 'I support early-stage and growth-stage brands with business strategy, process design, and operational structuring. My work focuses on translating technical, regulatory, and commercial needs into practical systems, clear documentation, and actionable execution frameworks. Our approach helps transform science, compliance, and strong brand positioning into real competitive advantages.',
    tags: ['Business Strategy', 'Market Readiness', 'Regulatory Discipline'],
    image: '/tracelab.png'
  },
  {
    id: 'URL',
    company: 'URBN LEAVES',
    role: 'AgTech Venture — Founder / Operations',
    description: 'A Mexican AgTech venture focused on urban agriculture, hydroponics, and controlled-environment systems. The vision was to decentralize food production by enabling people to use available home space to grow and generate income. Explored modular production systems, traceability, sustainability, and blockchain integration.',
    tags: ['AgTech', 'Hydroponics', 'Sustainability', 'Top 20 Green Innovation'],
    highlights: [
      'Selected by Entrepreneur magazine (2019) as one of the "60 rockstars de los emprendedores"',
      'Invited to Shark Tank (2020)'
    ],
    image: '/urbn.png'
  },
  {
    id: 'BJB',
    company: 'Baja Biotech',
    role: 'Biotech Consultant / Co-Founder (2014-2017)',
    description:
      'At Baja Biotech, I designed and commercialized tailored R&D solutions for biotechnology and molecular biology laboratories across Mexico and the United States. My work focused on genetics and molecular biology, helping connect research institutions in La Jolla, California, with laboratories in Mexico to support technology transfer and applied scientific innovation. I led technical sales, client training, and laboratory setup projects, contributing to cross-border collaboration and practical implementation in life sciences research environments.',
    tags: ['Biotech Consulting', 'Molecular Biology', 'Technology Transfer', 'Lab Setup'],
    image: '/baja-biotech.svg'
  },
  {
    id: 'UBG',
    company: 'URBAN BEAUTY GARDEN',
    role: 'Experimental Urban Agriculture',
    description: 'A living, experimental project combining urban agriculture, practical cultivation, and content creation. I am exploring how to integrate 3D printing into localized food systems through the design and testing of tools and growing solutions for small spaces. The long-term ambition is to establish a restaurant chain centered entirely on locally cultivated ingredients.',
    tags: ['3D Printing', 'Maker Culture', 'Localized Food Systems', '@urbanbeautygarden'],
    image: '/ubg.png'
  }
];

export const experienceGroups = [
  { id: 'experience', title: '04 // Operations & Consulting', items: experiences.slice(0, 2) },
  { id: 'biotech-agtech', title: 'Biotechnology & AgTech', items: [experiences[3], experiences[2], experiences[4]] },
];
