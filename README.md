# InAmigos Foundation — website

Cinematic, frontend-only marketing site for InAmigos Foundation.

**Live site:** https://ayush007naik.github.io/inamigos-foundation/

## Stack

- React 18 + TypeScript + Vite 6
- Tailwind CSS 3 with a custom "Ember & Field" design system (`src/index.css`)
- Framer Motion for motion, `react-router-dom` for routing
- Self-hosted variable fonts (Fraunces / Inter / JetBrains Mono)

No backend, no database. Forms validate client-side and show local success states only.

## Local development

```bash
npm install
npm run dev      # http://localhost:5178
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploying

Pushes to `main` trigger `.github/workflows/pages.yml`, which builds with
`BASE_PATH=/inamigos-foundation/` and publishes the `dist/` folder to GitHub
Pages. `vite.config.ts` writes a copy of `index.html` to `404.html` so deep
links are handled by the client-side router.

To preview the production build under the same base path:

```bash
BASE_PATH=/inamigos-foundation/ npm run build
npx serve dist
```

## Content

All copy, statistics, volunteer names, events and journal posts are verified
against the official site — <https://www.inamigosfoundation.org.in/> — and live
in `src/data/`. The `scripts/` folder holds the reproducible asset and content
pipeline (fonts, image optimisation, post extraction).
