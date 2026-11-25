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
  workflow: [
    'I turn real problems into working AI products. I start by understanding the workflow, then prototype quickly, test with real users, and keep iterating until the solution becomes genuinely useful.',
    'Depending on the problem, I combine AI agents, automations, custom scripts, APIs, and integrations. I work across product and implementation — from the first conversation to a system running in production.',
  ],
};

export const projects = [
  {
    id: 'videovibe',
    name: 'VideoVibe',
    meta: 'Creator · Open-source project · 2026 — Present',
    url: 'https://github.com/Delkoman88/videovibe',
    problem: 'Video editing requires coordinating cuts, captions, visuals, and sound. Creators need a repeatable process that automates production tasks while preserving editorial control.',
    solution: 'An agentic video editing system that uses AI agents to coordinate local transcription, cuts, word-by-word captions, motion graphics, and audio processing. It pauses for human approval of the cut and visual plan, then produces platform-specific videos, covers, and captions.',
    contribution: 'I built VideoVibe around a repeatable production workflow: agent instructions, pipeline orchestration, channel-specific styles, and technical checks for the final deliveries.',
    usage: 'Released as an open-source project. Clone the repository on your machine, follow the setup guide, and start editing your videos with VideoVibe.',
    stack: ['Python', 'Node.js', 'FFmpeg', 'whisper.cpp', 'HyperFrames'],
    image: '/project-videovibe.webp',
    imageWidth: 1100,
    imageHeight: 665,
    imageAlt: 'Example frames from a vertical video edited with VideoVibe',
    caption: 'Example frames from the VideoVibe demo.',
    linkLabel: 'Explore on GitHub',
    accessNote: 'Open source · Apache-2.0 · Released',
  },
  {
    id: 'aqvarivs',
    name: 'AQVARIVS',
    meta: 'AI product builder · Private DJ copilot · 2026 — Present',
    url: '/servicios#caso-aqvarivs',
    internalLink: true,
    problem: 'DJs make decisions across music discovery, playlists, purchases, and live sets, but their preferences and creative context are usually fragmented across different tools.',
    solution: 'A personalized DJ copilot connected to the artist’s music library and Beatport workflow. AQVARIVS discovers and organizes music, adapts recommendations to favorites, discards, purchases, and previous sets, and turns playlists into editable set plans. It can also suggest transitions, mashups, BPM changes, and complete mixing routes, explaining the reasoning behind each combination.',
    contribution: 'I designed and built the product end to end: product definition, architecture, self-hosted deployment, custom Python tools, music integrations, interface, testing, and ongoing operation.',
    usage: 'Used by an electronic music artist to discover new music, organize a growing library, and prepare sets through a dedicated desktop and mobile interface or conversational commands.',
    stack: ['OpenClaw', 'Codex', 'Python', 'SQLite', 'Tailscale', 'Ubuntu', 'Beatport MCP'],
    image: '/project-aqvarivs-library.png',
    imageAlt: 'AQVARIVS personalized music library with artwork and technical track data',
    caption: 'Personalized music library with artwork, BPM, Camelot key, and verified Beatport links.',
    linkLabel: 'View full case',
    accessNote: 'Private product · In active use',
    gallery: [
      {
        image: '/project-aqvarivs-map.png',
        imageAlt: 'AQVARIVS musical map with genre groups and connections between tracks',
        caption: 'Musical map that groups tracks by genre and connects them by affinity.',
      },
      {
        image: '/project-aqvarivs-detail.png',
        imageAlt: 'AQVARIVS track detail with an explained transition recommendation',
        caption: 'Track detail with an explained recommendation for transitions and reference tracks.',
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
    usage: 'Over 200 active users.',
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
  { label: 'Understand the problem', tools: 'Map the workflow, constraints, and real opportunity.' },
  { label: 'Build the right solution', tools: 'Combine AI agents, automations, custom scripts, APIs, and interfaces around the way people actually work.' },
  { label: 'Ship and improve', tools: 'Launch early, observe real usage, and iterate with evidence.' },
];

export const capabilities = [
  { title: 'AI agents & copilots', desc: 'Coordinating agents and operational copilots that work on real data: recommendations, libraries, sets, and daily operations, with documented control and evidence for each task.' },
  { title: 'AI-assisted product development', desc: 'Turning requirements into working applications through implementation, structured debugging, and review, verified against the requirements, not just built.' },
  { title: 'Automation & integrations', desc: 'Connecting systems and designing workflows around operational needs, from calendar sync to reminders.' },
  { title: 'Strategy, growth & operations', desc: 'Connecting commercial priorities, supplier performance, SEO, and measurement with practical processes and useful daily tools.' },
  { title: 'Compliance & quality systems', desc: 'Bringing regulatory discipline, traceability, process design, and documentation into operational workflows.' },
  { title: 'Science & AgTech', desc: 'Applying experience in biotechnology, technical operations, and controlled-environment agriculture.' },
];

export const credibilityHighlights = [
  'AI-assisted Product Development', 'Product Definition & Implementation',
  'Solo Builder — Zero to Production', 'Structured Development & Review',
  'Operations & Process Standardization', 'Compliance & Regulatory Systems',
  'Traceability & Documentation', 'AgTech & Urban Agriculture',
  'Startup & High-Growth Environments',
];
