# Zicotix

React + Vite portfolio with the approved cinematic artwork and a transparent WebGL rain layer. The public site is https://ttvzicotix.github.io/.

## Run

Use Node.js 22 or 24 LTS.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`dist/` is a self-contained static deployment. GitHub Actions builds and deploys `main`; Vite's base is `/` for the renamed user-site repository.

## Visual restoration

- `public/art/hero.webp`, `aegis.webp`, `optima.webp`, and `about.webp` are the exact optimized artwork files from the approved portfolio v2 archive, not recreated graphics or crops of a webpage. `public/art/provenance.json` records their hashes.
- The navbar/footer use the earlier approved SVG silhouette instead of a font-based Z.
- Art fills section backgrounds with soft edge blending. All headings, descriptions, buttons and quotes remain real HTML.
- The hero Z is part of the original artwork. Pointer motion gently shifts that composition; it is intentionally NOT represented as an independently rotatable 3D model.
- React Three Fiber renders only rain on a transparent canvas. No procedural planet, replacement Z or opaque canvas hides the artwork.
- Atmosphere pauses when the hero leaves view or the tab is hidden. The page offers a pause button and responds to reduced-motion preferences. The art remains available if WebGL fails.
- Below-the-fold art and the WebGL module are lazy-loaded. All artwork is served from this repository: no live dependency on an external media account and no paid image/video generation at runtime.

## Scope

This repository contains only the public portfolio frontend. It does not include private Aegis or Optima implementation, credentials, provider keys or private infrastructure details. Contact uses the owner's brand email. The displayed products describe projects, not a checkout or hosted agent service.

See `docs/visual-restoration-validation.json` for the tested source revision, browser checks and dependency audit snapshot. A passing build is not a guarantee of performance on every physical device; review real iPhone/Android devices before making device-specific performance claims.
