# Phase 3 Implementation Plan

## Direction
A dark editorial portfolio: near-black charcoal foundation, restrained violet as an identifying accent, generous whitespace, crisp type hierarchy, fine-line borders, and restrained surface depth. Keep the existing content, assets, and working integrations. Avoid animated gradients, unnecessary glass effects, invented claims, and new dependencies.

## Project structure and responsibilities
- `src/pages/`: the existing five Astro route entry points; preserve them and use shared layout/navigation.
- `src/layouts/Layout.astro`: global typography, palette, reduced-motion-aware animation styles, Astro ClientRouter, and shared reveal behavior.
- `src/components/`: existing content sections for home, about, services, projects, skills, education, experience, contact, navigation, and footer. Refine these in place; preserve current feature integrations.
- `src/React/`: retain existing interactive components, including `CodePortrait.tsx`, `SkillsList.tsx`, and `LikeButton.tsx`.
- `public/`: preserve current photos, fonts, CV, project screenshots, and technology marks.

## Implementation approach
1. Update the shared design system and route shell without changing Astro 7, React 19, Tailwind setup, base path, or deployment settings.
2. Redesign the five existing routes in place. Use existing truthful profile, skills, project, education/training, and contact information only.
3. Enhance project display with detailed case-study structure using the two existing projects and their existing local screenshots, descriptions, technologies, GitHub links, and live URLs. Keep the home presentation concise.
4. Add lightweight CSS/native-browser animations and interactive states. Respect reduced motion and avoid new dependencies.
5. Preserve the Formspree endpoint and current successful/error feedback behavior; make the handler compatible with Astro client-side route transitions.
6. Update `PROGRESS_REPORT.md` and a changelog after logical sections; create the requested ZIP excluding dependency/cache/build/git directories.

## Explicit constraints
- Preserve `/dark-minimal` base, route URLs, current project contents/assets/CV, Firebase and LikeButton, Formspree endpoint/form, and useful components.
- Do not change environment files, add dependencies, deploy, or perform final testing.
- Do not invent experience details, dates, achievements, clients, metrics, testimonials, or skill scores.
- Final domain is not confirmed; do not invent an absolute canonical hostname.
