export const experiences = [
  {
    id: 'TRP',
    company: 'TRYP México',
    role: 'Strategy & Operations | Marketplace Health & B2B',
    description: 'At Tryp, I connected marketplace operations with vendor performance and commercial priorities. My work covered supplier onboarding, B2B initiatives, quality and compliance, and coordination across distribution centers in Mexico City, Guadalajara, and Monterrey.',
    highlights: [
      'Led a logistics initiative to collect inventory from suppliers and distribute it across the three cities, improving product availability. Participating vendors increased sales by 35%.'
    ],
    tags: ['Marketplace Operations', 'Vendor Performance', 'B2B', 'Logistics'],
    image: '/tryp.png'
  },
  {
    id: 'TRC',
    company: 'TRACELAB CONSULTING',
    role: 'Growth & Business Strategy Consultant',
    description: 'At TraceLab, we combine growth consulting, business strategy, and operational design. We help brands structure SEO, content, acquisition, and measurement around their commercial priorities. My contribution focuses on SEO strategy, process design, and translating business needs into practical execution frameworks.',
    highlights: [
      'Gods Beard Cult: completed growth consulting, including SEO guidance, content planning, and performance measurement.',
      'Happy Bites: ongoing growth engagement covering SEO, paid media, email segmentation, and monthly reporting.'
    ],
    links: [
      { label: 'Explore TraceLab', url: 'https://tracelabconsulting.com.mx/' },
      { label: 'Growth consulting cases', url: 'https://tracelabconsulting.com.mx/services/growth' }
    ],
    tags: ['Growth Strategy', 'SEO & Content', 'Commercial Strategy', 'Measurement'],
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
    tags: ['Technical Sales', 'Biotech Consulting', 'Technology Transfer', 'Lab Setup'],
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
