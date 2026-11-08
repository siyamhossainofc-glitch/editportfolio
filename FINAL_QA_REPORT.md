# Part 4 — Technical Cleanup, QA & Delivery Report

## Scope and preserved project

This delivery continues the existing portfolio; it does not replace or redesign it. Astro 7.2.9, React 19.2.8, the five existing routes, static output, and the `/dark-minimal/` base path remain in place. Existing components, screenshots, CV, portfolio identity, links, Formspree endpoint, and Firebase LikeButton behavior are retained.

## Changes made

- Selected pnpm as authoritative because `package.json`, `packageManager`, `pnpm-workspace.yaml`, and both GitHub Actions workflows already use pnpm. Regenerated `pnpm-lock.yaml` so it matches the manifest and passes frozen-lockfile installation; removed the stale, conflicting `package-lock.json`.
- Updated `sharp` to the compatible patch release and added narrowly scoped same-major transitive security overrides in `pnpm-workspace.yaml`. These updates address the audited Firebase and toolchain advisories without changing the required Astro or React versions.
- Changed project screenshot and portrait references to use Astro's `BASE_URL`, preserving `/dark-minimal/` while avoiding hardcoded deployment paths.
- Bundled the existing Montserrat variable font from `src/assets` so Vite emits a base-aware hashed asset URL instead of relying on the hardcoded `/dark-minimal/fonts/...` CSS path. Original public font files remain preserved.
- Made canonical and absolute social URLs conditional on a verified `Astro.site` origin. No production hostname was invented. Without that origin, invalid relative canonical/social URL values are omitted.
- Preserved the Formspree endpoint `https://formspree.io/f/mdeeyogy`; added name, email, subject, and message length constraints while retaining required fields and the existing asynchronous success/error UI.
- Added a missing-Firebase-configuration guard. If the public Firebase config is absent, the LikeButton shows its existing unavailable state rather than attempting to initialize an incomplete app. The Firestore counter operations and rules were not changed.
- Removed two unused-code diagnostics found by `astro check` and replaced the template README with setup/deployment instructions for this actual project.

## Files changed

- `README.md`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `FINAL_QA_REPORT.md` (new)
- `src/React/CodePortrait.tsx`
- `src/React/LetterGlitch.tsx`
- `src/React/LikeButton.tsx`
- `src/assets/montserrat-latin-wght-normal.woff2` (new, copied from the existing public font asset for Vite bundling)
- `src/components/contact.astro`
- `src/components/projects.astro`
- `src/firebase.ts`
- `src/layouts/Layout.astro`
- Removed stale `package-lock.json` after confirming pnpm conventions.

## Before / after

Before: two lockfiles disagreed with the manifest, causing `pnpm install --frozen-lockfile` to fail; several public image/font paths hardcoded `/dark-minimal/`; SEO URLs were relative despite requiring absolute canonical/social URLs; and Firebase initialization did not handle absent configuration explicitly.

After: pnpm is authoritative and its lockfile passes frozen installation; image/font output follows Astro's configured base; canonical/social URLs are omitted rather than incorrect until a production origin is configured; and Firebase degrades gracefully when not configured. Existing routes, branding, components, and project content remain intact.

## Tests actually performed

- `pnpm install --no-frozen-lockfile` to reconcile the authoritative lock after manifest/override changes, followed by `pnpm install --frozen-lockfile` — passed.
- `pnpm run build` (which runs `astro check && astro build`) — passed with **0 errors, 0 warnings, 0 hints**; the static build generated all five pages.
- `pnpm audit` — 2 remaining advisories: one moderate and one low, both in the explicitly retained Astro 7.2.9 dependency (details below).
- Development site opened in Chromium and checked at desktop and mobile sizes. All five routes returned HTTP 200 with page titles: `/`, `/skills/`, `/projects/`, `/experience/`, and `/contact/`.
- Both local project images loaded; generated page references to local assets were checked under `/dark-minimal/`, with no broken local references. The font was emitted as a Vite-bundled `_astro` asset.
- Both GitHub repository URLs returned HTTP 200 to read-only HEAD requests. The two live project hosts returned HTTP 406 to HEAD requests in this environment, so their current availability was not confirmed.
- The contact form's exact Formspree action, POST method, required fields, empty-form rejection, malformed-email rejection, and valid client-side values were checked. **The form was not submitted and no message was sent.**
- Mobile viewport at 390px: document width remained 390px; the contact layout collapsed to one column and the form fit within the viewport. The mobile menu was keyboard-tested: open, focus entry, Tab and Shift+Tab wrapping, Escape close, and focus restoration all passed.
- Desktop and mobile screenshots were captured and visually inspected. No Lighthouse report or score was run; none is claimed.

## Remaining issues / owner confirmation

1. **Astro security advisories remain due to the explicit version constraint.** The audit reports a moderate Astro XSS advisory patched in `>=7.3.2` and a low Astro CSS-injection advisory patched in `>=7.3.3`. The project was required to preserve Astro 7.2.9, so it was not upgraded. Owner approval is needed to move to a patched Astro version in a later change.
2. **Production hostname:** no verified production `site` origin is configured. Provide the intended public origin to enable absolute canonical URLs and absolute Open Graph/Twitter image URLs. No hostname was guessed or changed.
3. **Firebase setup:** `.env.example` contains blank public Firebase settings. Provide the intended Firebase web configuration to enable a live Firestore test. Firestore rules were not reviewed or changed, and no LikeButton write was attempted.
4. **Live project availability:** GitHub repository links returned 200; project-host HEAD checks returned 406 from this environment. Verify the two live application URLs from a normal browser if their current availability is important.

## Local setup

Requirements: Node.js 20+ and pnpm 9+ (the project declares pnpm 11.2.2).

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Fill the Firebase values only if you want to connect the LikeButton.
pnpm dev
```

Build and preview:

```sh
pnpm run build
pnpm preview
```

The build is static and retains `/dark-minimal/`. Deploy `dist/` under that path. Do not set `Astro.site` until the production origin is confirmed.
