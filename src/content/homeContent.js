// Shared by the React homepage and the static prerenderer.
export const homeCopy = {
  eyebrow: 'Biotech PhD · Strategy & Operations · Applied AI',
  headline: 'I turn business challenges into growth strategies and useful tools with AI.',
  intro: 'My background spans biotechnology, AgTech, and marketplace operations. I connect commercial priorities with practical processes, growth strategy, and AI-assisted applications and automations.',
  profileTitle: 'Operational judgment. Scientific rigor. Hands-on building.',
  profile: [
    'My Biotech PhD gave me analytical rigor and systems thinking. Work in high-growth operations, regulated environments, and AgTech taught me how to define problems, structure processes, and build around the people who use them.',
    'I bring that experience into product development: shaping requirements, making UX decisions, integrating systems, and iterating on working software. AI supports my development workflow; each project describes the functions actually built into the product.',
  ],
  contactTitle: 'Let’s build useful tools.',
  contact: 'Interested in working together? I welcome conversations about roles in applied AI, automation, biotechnology, AgTech, and innovation, as well as consulting projects that connect science, software, and operational needs.',
  workflow: 'I use AI to support architecture, implementation, debugging, and review, with clear requirements and project context guiding the work.',
};

export const projects = [
  {
    id: 'aqvarivs',
    name: 'AQVARIVS / AQUARIUS',
    meta: 'Agent developer · Private project · 2026 — Present',
    problem: 'MRLN, an electronic music artist, needs a persistent personal intelligence system to think, create, and finish more, without losing control of his attention.',
    solution: 'AQVAR1VS, a coordinating agent built on OpenClaw and self-hosted on an Ubuntu server. It includes a music feed with verified Beatport discovery, a library, sets, a musical map, and integrated chat, with documented control, handoffs, and evidence for each task.',
    contribution: 'I was hired by MRLN to develop the system: architecture, deployment, a Python toolkit, testing, and ongoing operation with Codex from the server.',
    usage: 'In active development. Music feed at v58 (1 November 2026); library, sets, map, and chat published and pending the artist’s confirmation on mobile.',
    stack: ['OpenClaw', 'Codex', 'Python', 'SQLite', 'Tailscale', 'Ubuntu', 'Beatport MCP'],
    image: '/project-aqvarivs-library.png',
    imageAlt: 'MRLN Music Space library with 489 received tracks',
    caption: 'Music library, 10 November 2026: 489 received tracks with covers, BPM, and Beatport links.',
    accessNote: 'Private project · In development · No public link',
    gallery: [
      {
        image: '/project-aqvarivs-map.png',
        imageAlt: 'Musical map with 514 tracks in 20 genre groups',
        caption: 'Musical map: 514 tracks in 20 genre groups and 500 connections.',
      },
      {
        image: '/project-aqvarivs-detail.png',
        imageAlt: 'Track detail for Cristalis by TroniKol with a grounded recommendation',
        caption: 'Track detail: grounded recommendation with tempo, label, and reference tracks.',
      },
    ],
  },
  {
    id: 'beauty-studio-copilot',
    name: 'Beauty Studio Copilot',
    meta: 'Solo builder · Product development · 2026 — Present',
    url: 'https://beauty-studio-copilot--beauty-studio-copilot.us-east4.hosted.app',
    problem: 'Beauty studios need to coordinate clients, appointments, and daily operations across fragmented WhatsApp and spreadsheet workflows.',
    solution: 'A management platform with client CRM, scheduling, Google Calendar integration, automated reminders, and operational dashboards.',
    contribution: 'I built the product solo, from problem definition and UX through implementation, production release, debugging, and ongoing iteration.',
    usage: 'Over 200 active users; preparing for market launch.',
    stack: ['Next.js', 'TypeScript', 'Firebase Auth', 'Firestore', 'Cloud Functions', 'Google Calendar API'],
    image: '/project-beauty.png',
    imageAlt: 'Beauty Studio Copilot sign-in page',
    caption: 'Sign-in page. Access to the management platform requires an account.',
    linkLabel: 'View Beauty Studio Copilot',
    accessNote: 'Public overview · App requires sign-in',
  },
  {
    id: 'viajero-sediento',
    name: 'Viajero Sediento',
    meta: 'Product builder · Client project · 2026',
    url: 'https://sitioviajerosediento--sitioviajerosediento.us-central1.hosted.app',
    problem: 'A tap room needs a digital catalog for customers and a practical way for staff to maintain products, images, and availability.',
    solution: 'A mobile-first catalog with individual product pages and an admin panel for creating, editing, and deleting products, uploading images, and managing product states.',
    contribution: 'I built the customer catalog and product administration platform for a real tap room client.',
    usage: 'Staff use the admin panel in daily operations.',
    stack: ['Next.js', 'TypeScript', 'Firebase Auth', 'Firestore', 'Firebase Storage'],
    image: '/project-viajero.png',
    imageAlt: 'Viajero Sediento homepage with an Explore the catalog button',
    caption: 'Original Viajero Sediento homepage, leading into the tap room’s catalog.',
    linkLabel: 'View live site',
    accessNote: 'Current site: Viajero Hambriento',
  },
];

export const projectFields = [
  ['problem', 'The need'], ['solution', 'What I built'],
  ['contribution', 'My contribution'], ['usage', 'In use'],
];

export const toolGroups = [
  { label: 'Development & review', tools: 'Claude Code, Codex, Google Antigravity, Gemini' },
  { label: 'Research & design', tools: 'ChatGPT, NotebookLM, Stitch' },
  { label: 'Project context', tools: 'Obsidian, Notion' },
];

export const capabilities = [
  { title: 'AI-assisted product development', desc: 'Turning requirements into working applications through implementation, structured debugging, and review.' },
  { title: 'Automation & integrations', desc: 'Connecting systems and designing workflows around operational needs, from calendar sync to reminders.' },
  { title: 'Strategy, growth & operations', desc: 'Connecting commercial priorities, supplier performance, SEO, and measurement with practical processes and useful daily tools.' },
  { title: 'Compliance & quality systems', desc: 'Bringing regulatory discipline, process design, and documentation into operational workflows.' },
  { title: 'Traceability & documentation', desc: 'Structuring records and standard operating procedures so teams can understand and run their processes.' },
  { title: 'Science & AgTech', desc: 'Applying experience in biotechnology, technical operations, and controlled-environment agriculture.' },
];

export const credibilityHighlights = [
  'AI-assisted Product Development', 'Product Definition & Implementation',
  'Solo Builder — Zero to Production', 'Structured Development & Review',
  'Operations & Process Standardization', 'Compliance & Regulatory Systems',
  'Traceability & Documentation', 'AgTech & Urban Agriculture',
  'Startup & High-Growth Environments',
];
