# Feature Changelog

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
