# Siyam Hossain — Portfolio

This is the existing Astro portfolio project. It uses Astro 7.2.9, React 19.2.8, static output, and the `/dark-minimal/` base path. Keep that base path when deploying to a matching subpath.

## Requirements

- Node.js 20 or newer
- pnpm 9 or newer (the project declares pnpm 11.2.2)

## Local setup

```sh
pnpm install --frozen-lockfile
cp .env.example .env
# Fill in the Firebase values if you want the LikeButton to connect to its counter.
pnpm dev
```

Open the local URL printed by Astro. No contact-form test message is sent during development or build checks. The Formspree endpoint is configured in `src/components/contact.astro`.

## Firebase LikeButton

The public Firebase web-app configuration is read from the `PUBLIC_FIREBASE_*` variables listed in `.env.example`. Add the values for the intended Firebase project to an untracked `.env` file before running the site. When the configuration is not present, the LikeButton reports that its count is unavailable instead of attempting to initialize an incomplete Firebase app. Firebase web configuration is public by design; Firestore security rules must still be configured in Firebase Console to match the intended counter behavior. This project does not contain or change those rules.

## Production build

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm preview
```

The build emits static files into `dist/`. The Astro configuration retains `base: "/dark-minimal/"`; deploy the contents of `dist/` at that path. Fonts are bundled from `src/assets` by Vite so their generated URLs follow the configured base path. Public project and portrait images also use Astro's configured `BASE_URL`.

## Canonical and social URLs

No production site hostname is configured in this source. Canonical URLs and absolute Open Graph image/URL fields are emitted only when Astro's `site` option is set to a verified production origin. Supply and verify the production origin before setting that option; do not substitute a local or guessed hostname.
