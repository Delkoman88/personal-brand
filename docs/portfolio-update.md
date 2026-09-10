# Portfolio update — 2026-09-10

## Result

The homepage now introduces a Biotech PhD working across applied AI and operations, explicitly mentions biotechnology and AgTech, and leads directly into two software project cases. The applications are described as operational tools built with AI-assisted development.

Projects precede profile and capabilities. Both project cases remain stacked on mobile. A dedicated Biotechnology & AgTech section contains the existing Baja Biotech, Urbn Leaves, and Urban Beauty Garden experience, with direct navigation from the header and dock. The English and Spanish CV introductions and homepage SEO reflect this broader positioning.

## Changed files

- Homepage composition: `src/pages/HomePage.jsx`.
- Homepage sections: `src/sections/Hero.jsx`, `Projects.jsx`, `About.jsx`, `Capabilities.jsx`, `Experience.jsx`, `Credibility.jsx`, and `Contact.jsx`.
- Navigation and anchors: `src/components/Navigation.jsx`, `SectionDock.jsx`, and `ScrollToTop.jsx`.
- Shared source data: new `src/content/homeContent.js` and `src/content/experience.js`.
- Metadata: `src/config/site.js`, `src/content/cvPageConfig.js`, and `index.html`.
- Styles: `src/styles/design-system.css`.
- CV sources: `edgar-vibe-coder-portfolio.html` and `edgar-vibe-coder-portfolio-es.html`.
- Static rendering and checks: `prerender.mjs` and `validate-prerender.mjs`.
- Delivery notes: this file.

No dependencies, blog posts, route definitions, deployment configuration, or pre-existing untracked application/CV artifacts were changed. The initial delivery was local-only. Publication through the existing GitHub Actions workflow was subsequently authorized after review.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed, including prerender validation for `/`, both CV routes, `/blog`, and all four article routes.
- `git diff --check`: passed.
- App-shell and prerendered homepage title/description match the shared configuration. Browser-rendered metadata was also inspected.
- Sitemap still contains eight routes; RSS contains four articles.
- Visual inspection covered desktop, mobile, and intermediate layouts. Responsive measurements covered widths 320, 390, 768, 1024, and 1280 pixels during the work; the final scientific positioning was reviewed at 320, 390, 1024, and 1280 pixels.
- Project and CV actions fit above the bottom dock at 320 × 740 and 1280 × 720. Project cards have no internal horizontal overflow. The existing sector experience carousel remains available on mobile.
- Project navigation and the sector anchor leave their headings below the fixed header. Direct hash loading and return navigation from both CVs and the blog were checked, including keyboard activation.
- Both CV pages, the blog index, and an existing article were opened. Blog content and comments code remain unchanged; submitting a comment was not tested.
- Keyboard focus is visible. Measured contrast of the updated hero copy, accent heading, project descriptions, and sector role label exceeds 10:1. Reduced-motion styling is included; an OS-level reduced-motion emulation was not performed.
- Contact email and LinkedIn destinations match the existing URLs. Both CV links are present in contact, and the footer can scroll clear of the dock. No email or external message was sent.
- No errors or warnings appeared in the local page console during the inspected navigation.
- Existing Vite warning persists: the main minified JavaScript chunk exceeds 500 kB (approximately 543 kB, previously 556 kB).

## Evidence and remaining confirmations

- Beauty Studio Copilot's existing URL loads a public product overview; access to the application requires sign-in. The repository screenshot shows its sign-in screen, not its management dashboard.
- Viajero Sediento's existing URL loads a public site and working beer catalog currently branded “Viajero Hambriento.” The historical project name is retained, the link is labeled “View live site,” and the current displayed name is noted. Confirm whether the portfolio project itself should be renamed.
- The Viajero image is identified as its original homepage. Neither project has an existing panel walkthrough or demonstration video in this repository. Those assets remain optional follow-up material.
- Conflicting user counts and prominent product/model counters were removed; no performance or business-impact metrics were invented.

## Local preview

The production preview runs at http://127.0.0.1:4173/.

To start it again:

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

Review the project cases at `/#projects` and the sector experience at `/#biotech-agtech`.
