// Shared by the React homepage and the static prerenderer.
export const homeCopy = {
  eyebrow: 'Biotech PhD · Applied AI · Operations',
  headline: 'I build applications and automations with AI to solve real operational problems.',
  intro: 'My background spans biotechnology, AgTech, and operations. I use AI-assisted development to turn operational needs into useful applications, automations, and connected workflows.',
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
    id: 'beauty-studio-copilot',
    name: 'Beauty Studio Copilot',
    meta: 'Solo builder · Product development · 2026 — Present',
    url: 'https://beauty-studio-copilot--beauty-studio-copilot.us-east4.hosted.app',
    problem: 'Beauty studios need to coordinate clients, appointments, and daily operations across fragmented WhatsApp and spreadsheet workflows.',
    solution: 'A management platform with client CRM, scheduling, Google Calendar integration, automated reminders, and operational dashboards.',
    contribution: 'I built the product solo, from problem definition and UX through implementation, production release, debugging, and ongoing iteration.',
    usage: 'In production, with real users validating the MVP.',
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
  { title: 'Strategy & operations', desc: 'Translating business goals into practical processes, clear responsibilities, and useful daily tools.' },
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
