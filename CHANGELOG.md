# Changelog

## Phase 2 foundation completion

- Fixed route-active navbar matching and retained the five required route links under `/dark-minimal`.
- Corrected Astro ClientRouter markup and removed malformed literal newline text in the document head.
- Replaced template-owner social metadata with the portfolio owner's provided details and corrected base-aware static asset URLs.
- Removed stray Markdown fences from the About component.
- Preserved current routes, content, project screenshots, CV, Firebase functionality, Formspree contact form, dependencies, and deployment configuration.
- No tests, build, browser validation, or deployment were run/performed, as requested.

## Phase 3 — Dark-premium UI redesign

- Reworked the five existing routes and shared components in place; added responsive dark editorial styling with restrained violet accents.
- Added scroll reveals and subtle transitions, optional pointer tilt for project case studies, and reduced-motion handling.
- Preserved/reused existing project assets, profile image/CodePortrait, capability accordion, technology logo wall, Firebase/LikeButton, CV, and Formspree contact endpoint.
- Added Phase 3 `plan.md`, `TODO.md`, and updated `PROGRESS_REPORT.md`.
- Final testing and deployment were not performed, as requested.


## Phase 4 — Advanced animation and interaction refinement

- Added a restrained staggered Home hero reveal and CTA entrance, with reduced-motion overrides.
- Added a named Astro main-content view transition and made reveal observation one-shot, route-swap-aware, and responsive to live motion-preference changes.
- Reduced CodePortrait sampling and made its finite entrance animation pause when offscreen or when the document is hidden; retained a real-photo fallback and reduced-motion static rendering.
- Improved project image zoom, keyboard focus behavior, accessible gallery grouping, and project-link touch targets.
- Refined navbar, skills, service rows, LikeButton and CTA hover/focus/pressed states without adding skill scores; removed hover padding shifts and disabled LikeButton pulse/scaling under reduced motion.
- Moved the preserved Formspree submission behavior to one shared delegated listener for ClientRouter resilience; preserved the existing endpoint and feedback.
- No dependencies, environment files, routes, base-path/deployment settings, project content, or integrations were changed. No site tests/build/deployment were run.


## Phase 5 — Portfolio content and functionality refinement

- Added a shared skill taxonomy for Frontend (HTML5, CSS3, Bootstrap, JavaScript, jQuery, React), Backend (PHP, Laravel, REST API), Database (MySQL, SQL), and Tools (Git, GitHub, VS Code, Postman, XAMPP); aligned Home's capability accordion, Skills route, and technology strip to that data.
- Removed unverified personal technology claims and capabilities (including Astro/Tailwind/TypeScript as personal skills, React Native, Figma/Canva, and Sanctum); canonicalized HTML5/CSS3 names in training/service content. The footer's “Built with” label remains about the portfolio implementation stack, not Siyam's personal skills.
- Consolidated the repeated IDB-BISEW training item into the Experience timeline, added the supplied POS vendor-management capability, and clarified the POS overview without adding results or metrics.
- Kept the supplied owner details, GitHub/LinkedIn URLs, email, Formspree endpoint, route set, `/dark-minimal` base path, screenshots, and CV asset. Added verified owner email to Person structured data.
- Added a form in-flight guard to the existing single delegated ClientRouter-safe submit handler. Kept required inputs, native validation, async Formspree submission, and feedback.
- Refined LikeButton loading, success, and error feedback; retained the environment-based Firebase configuration, disabled repeat likes while loading/processing/liked, unsubscribed its Firestore listener on unmount, cleared its animation timeout, and synchronized pending like success/error state across route remounts.
- Reviewed source link strings, new-tab security attributes, CV filename/file, project screenshot assets, and all five route source files. External URL reachability and Firebase/Formspree runtime behavior were not tested.
- No dependencies, environment files, routes, base-path/deployment configuration, screenshots, or other assets were changed or removed. No build, final tests, or deployment were performed.


## Phase 6 — SEO, accessibility, performance, and responsive-readiness refinement

- Added unique route descriptions and expanded shared SEO metadata with base-aware canonical paths, Open Graph, Twitter summary-card fields, image alt metadata, favicon/apple-touch-icon paths, theme metadata, and page-level JSON-LD.
- Removed the inherited ThemeWagon `site` host from Astro config without inventing a production domain; preserved the `/dark-minimal` base path.
- Added a keyboard-accessible skip link and main-content landmarks across all five routes; made the fixed wordmark a labeled home link.
- Improved contact form semantics and status association while preserving the Formspree endpoint, validation, asynchronous submission, and feedback behavior.
- Added image decoding and dimension hints for project/portrait assets to reduce layout shifts; preserved descriptive image alt text and decorative empty-alt behavior.
- Preserved reduced-motion behavior and added an explicit non-script reveal fallback. No new dependencies or environment changes were introduced.
- No build, automated tests, browser/visual QA, responsive device checks, runtime integration checks, or deployment were performed; these remain intentionally deferred until integrated QA.

## Final QA — 2026-11-04
- Recovered the latest available Phase 6 source and preserved the verified `/dark-minimal` Astro base path.
- Preserved the complete Phase 2–6 changelog and appended this QA record.
- `npx astro check` passed with 0 errors and 3 non-blocking TypeScript hints.
- `npm run build` passed and generated all five static routes. Vite emitted one non-fatal unresolved-at-build-time font URL warning for the configured `/dark-minimal/fonts/montserrat-latin-wght-normal.woff2` runtime path.
- Firebase live behavior, reduced-motion behavior, and complete responsive breakpoint testing remain unverified, as do other browser/runtime checks not run in this pass.
- Final packaging excludes `node_modules/`, `.astro/`, `dist/`, and `.git/`; no deployment was performed.
