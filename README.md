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


## September launch polish

Project buttons now open accessible details with Overview / Workflow / Direction tabs.
The Studio panel introduces Andrew. The Contact CTA opens an in-page form, not a mail app.
The approved artwork and rain layer are unchanged. Header descenders have dedicated clearance.

### Contact delivery: ACTION REQUIRED
The form submits through https://formsubmit.co/ajax/zicotixai@protonmail.com.
It has required fields, consent, timeout handling, a honeypot, draft-copy fallback and no automatic retries.
FormSubmit requires one-time destination inbox activation. One setup POST from the test environment
was refused with HTTP 403; no activation email or inbox delivery was confirmed.

Open the live form, submit your own clearly labeled test, confirm FormSubmit's verification message
in the destination Proton inbox, and verify that a second test arrives. Only then change
`contactDeliveryVerified` in `src/data/site.js` to true. The visible setup notice deliberately stays
until actual delivery is verified. Browser tests intercept form requests; they DO NOT prove inbox delivery.
Do not add secrets, disable provider security to bypass a refusal, or claim delivery from HTTP 200 alone.

### Social profiles
GitHub comes from the connected owner. TikTok @zicotixai was supplied by Andrew.
YouTube @Zicotix resolves to the original Gaming channel UCDU_CBpnuxuvTqcf0FKrPmg.
Instagram uses the first owner-reported candidate @zicotixai; this is provisional and must be confirmed rather than treated as authenticated. Instagram lookup was rate-limited.
All four social buttons are present in Contact, Studio and the footer.
Social profile images/banners are export files only; no accounts were changed.

### Brand exports
The `public/brand/` directory contains transparent PNG logos, a square profile image,
a 2560x1440 YouTube banner, a wide banner and an Open Graph preview. No font files are distributed.
The SVG silhouette and all four original scene images remain unchanged.

### Validation
`docs/launch-polish-validation.json` records tests and known limitations.
`qa/check.cjs` runs against an already-built preview server and uses the Playwright package supplied by the test environment.
Physical iPhone Safari testing remains an owner check. There is no Framer source import claimed.

### Future shop
`shopUrl` is intentionally null. There is no payment collection, paid package download or fake purchase button.
The planned bundle is described as forthcoming; add an external storefront only when it is ready.

## Brand library and downloads
The footer's Brand kit button opens an accessible asset browser. Direct link: `/?panel=brand`.
Individual PNG/JPEG/SVG files and optional draft bios are served from `/brand/`. `npm run build`
first runs the dependency-free `scripts/package-brand.mjs` to package the catalog's allowlisted
files into `/brand/zicotix-brand-kit.zip`. No font files or private code are packaged.

JPEGs and gallery previews are deterministic format conversions of the existing PNG brand exports.
The approved scene assets and navbar SVG are unchanged. White PNG logos retain transparency;
white JPEG logos use near-black, and purple JPEG logos use white.

### Remaining owner checks
Confirm Instagram's exact handle; Metricool currently exposes an older account with no linked profiles.
Activate FormSubmit from the Proton inbox and verify a real test message before removing the contact warning.
Check the site on a physical iPhone; browser emulation is not hardware testing.
