# Taha Siddiqi — Portfolio

Personal portfolio / résumé site. Built with **Vite + React + React Router + Tailwind CSS +
Framer Motion**. Design system: see [DESIGN.md](./DESIGN.md) ("Aurora Light").

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Edit content

All text lives in [`src/data/content.js`](./src/data/content.js) — profile, skills, experience,
projects, certifications, education. Change it there and the whole site updates.

Add your files to [`public/`](./public/):
- `resume.pdf` — the "Download Résumé" buttons link to `/resume.pdf`
- LinkedIn URL → set `profile.linkedin` in `content.js`

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow ([.github/workflows/deploy.yml](./.github/workflows/deploy.yml))
that builds and deploys on every push to `main`.

1. Push this to a repo. For the cleanest URL, name it **`siddiqitaha.github.io`** (a *user* page,
   served at `https://siddiqitaha.github.io`). `vite.config.js` `base` is already `/` for that.
   - If you use a *project* repo instead, set `base: '/<repo-name>/'` in `vite.config.js`.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Push to `main`. The Action builds and publishes automatically.

Routing uses `HashRouter`, so deep links work on GitHub Pages with no extra config. When you move
to a custom domain you can switch to `BrowserRouter` for clean URLs.

## Tech notes

- `src/components/ui.jsx` — shared UI primitives (Button, Card, Badge, IconTile, Reveal, …) in the
  shadcn style. Add more shadcn components via the shadcn CLI/MCP when needed.
- Icons: `lucide-react`. Animation: `framer-motion` (respects `prefers-reduced-motion`).
- Accessibility & performance targets are documented in DESIGN.md.
