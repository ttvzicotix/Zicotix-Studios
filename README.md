# Zicotix Studios

Interactive studio portfolio for **Zicotix** — building governed AI, optimization, and applied automation systems.

## Stack

- React
- Vite
- Three.js
- React Three Fiber
- Drei
- GSAP + ScrollTrigger
- GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The Vite build outputs to `dist/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`, which builds the site and publishes the `dist/` artifact to GitHub Pages.

In GitHub, set **Settings → Pages → Source** to **GitHub Actions** if it is not already selected.
