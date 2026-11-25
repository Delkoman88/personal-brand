# Feature Changelog

## 2026-11-25 - Visual Redesign, Brand Unification, WebP/Code-Splitting & Motion System

### Added
- **GSAP ScrollTrigger Pinned Showcase (`Projects.jsx`):** Desktop-only (`>= 1024px`, `prefers-reduced-motion: no-preference`) pinned evidence stage with vertical scroll-scrub progress rail, dynamic accent indicators, and clickable AQVARIVS gallery thumbnails via `useGSAP()` and `gsap.matchMedia()`.
- **Native CSS Motion System:** Choreographed Hero entrance (`clip-path` portrait reveal + non-uniform stagger), smooth `<details>` disclosure with animated geometric `+`/`−` toggle in `/servicios`, blur-softened preview swap in `Blog.jsx`, CSS scroll-driven reading progress bar (`animation-timeline: scroll()`) in `BlogPostPage.jsx`, and progressive View Transitions for blog covers.
- **Native `<dialog>` Lightbox (`ImageLightbox.jsx`):** In-page full-image viewer with `scale(0.96)` entry, `Esc`/backdrop dismiss, and `←`/`→` keyboard gallery navigation for `Selected Projects` and `/servicios`.
- **Copy Email Micro-Interaction (`CopyEmailButton.jsx`):** Clipboard copy buttons in `Contact.jsx` and `ServicesPage.jsx` with `Copy → Copied ✓` blur/opacity confirmation.
- **Architectural 404 Page (`NotFoundPage.jsx`):** Catch-all `*` route matching the dark blueprint design system.
- **Bilingual CV Toolbar (`CvPage.jsx`):** Contextual top bar on `/cv/en` and `/cv/es` with portfolio return link, EN ↔ ES switcher, and Print/Save PDF button (hidden in `@media print`).

### Changed
- **Unified Brand Across `/cv/*` (`cv-page.css`):** Aligned bilingual CV routes to the main site's `#131313` surfaces, `#00F5FF` cyan accent, strict `0px` architectural borders, `Space Grotesk` + `Inter` + `JetBrains Mono`, and high-contrast `#006B73` print theme.
- **Design System Cleanup (`design-system.css` & `index.html`):** Moved Google Fonts to `<link rel="preconnect">` (dropping redundant `Manrope`), consolidated `:root` with custom easing tokens (`--ease-out`, `--ease-in-out`), replaced all `transition: all` and `box-shadow` hover animations, added `:active { scale(0.97) }`, gated `:hover` with `@media (hover: hover) and (pointer: fine)`, refined `prefers-reduced-motion`, fixed accessible contrast (`--secondary-on-dark: #cbaeff`), removed decorative `01 //`–`06 //` numbering (including duplicated `06`), and migrated section inline styles to CSS classes.
- **Navigation & Mobile UX:** Added `IntersectionObserver` scroll-spy and active route indicators to `Navigation.jsx`, hid redundant `SectionDock` below `960px` (revealing it after the Hero on desktop), and removed non-interactive mobile scroll arrows.
- **Performance (WebP & Code-Splitting):** Converted `profile.jpg` (1.8 MB) → upright `profile.webp` (115 KB), project/experience PNGs → WebP (~4 MB saved, duplicate PNGs removed), and added `React.lazy` routes + Rolldown vendor splitting (`vite.config.js`), reducing the main entry chunk from `695 kB` to `73 kB` and clearing the Vite chunk-size warning.
- **AQVARIVS & Workflow Copy (`d2e4689`):** Refined AQVARIVS case study copy across Home and `/servicios`, added internal link `View full case →` (`/servicios#caso-aqvarivs`), and expanded the "How I build" workflow summary.

### Validation
- `npm run lint`, `npm run build`, `prerender.mjs`, `generate-feeds.mjs`, and `validate-prerender.mjs` passed across all 9 routes with zero warnings.
- Visually inspected `profile.webp` (confirmed EXIF upright orientation) and all converted `.webp` project/experience assets.
- Published to `main` (`acf75b1`) and deployed via GitHub Actions to Firebase Hosting.

## 2026-11-12 - VideoVibe in CVs and Services

### Added
- VideoVibe first in both bilingual CV project lists, with equivalent descriptions, contribution bullets, technologies, and public repository links. Both professional summaries now include the project.
- VideoVibe as the first expandable services case, presenting the open-source agentic video editing system and reusing the homepage demo image. Added a self-service FAQ and included creators and content teams in the audience copy; packages and pricing are unchanged.

### Changed
- Services cases support optional `summaryLinkLabel` and `evidenceLabel` in React and prerendered HTML, preserving existing defaults. VideoVibe uses repository and availability labels, with a stacked evidence block sized for text rather than a numeric metric.
- Prerender validation checks the VideoVibe project and repository in both CVs and the services summary/evidence labels.

### Validation
- Lint, build with SEO validation, and diff whitespace checks passed. The existing large-JavaScript-chunk warning remains.
- Browser checks cover 320, 390, 768, and 1280 px, five CV projects, mobile project scrolling, three services disclosures, keyboard toggling, correct repository destinations, and visible FAQ/JSON-LD consistency. Print-media captures of the CV cards and A4 PDF exports were generated.
- Initially delivered locally; publication through the existing GitHub Actions/Firebase workflow was subsequently authorized on 2026-11-12.

## 2026-11-12 - VideoVibe Portfolio Project

### Added
- VideoVibe as the first selected project, using the existing English case-study fields, cyan accent, technology badges, and GitHub action. At Edgar's direction, copy presents an agentic video editing system released as open source and invites visitors to clone the repository, follow the setup guide, and start editing locally.
- Local demo image at `public/project-videovibe.webp` (1100 × 665, 23,372 bytes), converted from the public VideoVibe repository's `docs/img/demo.jpg` without cropping or enlargement. README status and capabilities verified on 2026-11-12.

### Changed
- Project images support optional `imageWidth` and `imageHeight` in both React and prerendered HTML, retaining the 1280 × 800 defaults for existing projects.

### Validation
- `npm run lint`, `npm run build` (including all prerender checks), and `git diff --check` passed. Existing Vite warning about the main JavaScript chunk exceeding 500 kB remains.
- Browser checks at 320, 390, 768, and 1280 px confirmed first-project ordering, all four project cards, no page/card horizontal overflow, and correct image dimensions. Desktop and mobile captures visually inspected.
- Verified GitHub destination attributes, visible keyboard focus, image opening in a new tab, CV/blog navigation, and project content with JavaScript disabled. No page errors during the browser checks.
- Initially delivered locally; publication was subsequently authorized on 2026-11-12. Existing unrelated untracked files were left untouched.

## 2026-04-23 - Bilingual CV Routes, SEO Integration & Sitemap Coverage

### Added
- **Bilingual CV Routes**: Added `/cv/es` and `/cv/en` as first-class site routes powered by the new `CvPage` runtime page and prerendered static HTML output.
- **CV SEO Layer**: Added per-language canonical URLs, `hreflang` alternates (`en`, `es-MX`, and `x-default`), route-level `lang` handling, and `WebPage` + `Person` structured data for both CV pages.
- **CV Styling System**: Added `src/styles/cv-page.css` with namespaced CV styles so the imported CV layouts preserve their look without leaking styles into the rest of the site.

### Changed
- **Hero CTA Strategy**: Replaced the main hero CTA pair with internal CV buttons: `Ver CV en español` and `Read CV in English`.
- **Prerender Scope**: Extended `prerender.mjs` and `validate-prerender.mjs` to cover the bilingual CV routes in addition to home, blog index, and blog posts.
- **Sitemap Coverage**: Extended `generate-feeds.mjs` so `dist/sitemap.xml` now includes `/cv/es` and `/cv/en`.

### Fixed
- **SEO Consistency**: Kept the RSS feed blog-only while preserving RSS autodiscovery on prerendered pages, preventing the CV from being treated like a time-based blog item.
- **Route UX**: Hid the `SectionDock` on `/cv/*` routes so the CV layouts remain clean once the SPA hydrates.

## 2026-04-22 - Mobile UX Optimization & UI Polish

### Added
- **Mobile Horizontal Scroll**: Implemented a "swipe-to-scroll" UI pattern for the **Shipped Projects** and **AI Toolchain** sections on mobile devices. This significantly reduces the vertical footprint of the page and prevents the site from feeling vertically cluttered.
- **Automated Project Thumbnails**: Added `project-beauty.png` and `project-viajero.png` generated via Puppeteer to provide visual anchors for project cards.

### Changed
- **Section Spacing**: Replaced global `.section-spacing` on Capabilities and Projects with specialized `.section-spacing-top` and `.section-spacing-bottom` utility classes. This reduces the excessive 16rem desktop gap between adjacent sections sharing the same background color (`bg-low`).
- **Core Capabilities Order**: Reprioritized "AI-Native Product Development" as the first item (SYS_01) in the Core Capabilities section.
- **Static Prerendering**: Synchronized `prerender.mjs` HTML structures to match the updated React components, ensuring SEO compatibility and preventing hydration mismatches.

### Fixed
- **Mobile Grid Alignment**: Fixed a CSS Grid issue where `.project-item` rows stretched to match the tallest item in horizontal scroll containers. Added `align-content: start` to compact content to the top, eliminating the excessive vertical space between project images and text (which affected shorter projects like "Viajero Sediento").
- **CSS Standard Properties**: Added the standard `line-clamp` property alongside `-webkit-line-clamp` in `design-system.css` to fix linter and IDE compatibility warnings.
