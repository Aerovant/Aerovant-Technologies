# Aerovant Technologies website

Static site. No framework, no runtime dependencies. Node 18+ is only needed to build.

## Run it

```bash
node build.mjs            # builds dist/ with clean URLs
npx serve dist            # or: python3 -m http.server --directory dist
node build.mjs --file     # builds dist/ so index.html opens straight from disk
node build.mjs --bundle   # also writes preview.html (every page in one file)
```

## Deploy

`dist/` is the whole site. Two ways to ship it to GitHub Pages:

1. **Actions (recommended).** Push this folder as the repo. In the repo settings set
   Pages → Source → *GitHub Actions*. `.github/workflows/pages.yml` builds and deploys on every push to `main`.
2. **By hand.** Run `node build.mjs` and publish the contents of `dist/` (it already contains `CNAME`).

Old URLs (`abt.html`, `pd.html`, `serv.html`) redirect to the new pages.

## Where things live

| To change…                                   | Edit                         |
| -------------------------------------------- | ---------------------------- |
| Email, phone, address, social links, form keys | `src/site.mjs` → `site`      |
| Products (add, rename, reword)               | `src/site.mjs` → `products`  |
| Services and their line items                | `src/site.mjs` → `services`  |
| Publish an article                           | `src/site.mjs` → `insights`  |
| List a job                                   | `src/site.mjs` → `openings`  |
| Header, footer, shared components            | `src/layout.mjs`             |
| Diagrams                                     | `src/figures.mjs`            |
| Page content                                 | `src/pages/*.mjs`            |
| All styling                                  | `src/assets/css/site.css`    |
| All behaviour                                | `src/assets/js/site.js`      |

Adding a product needs an entry in `products` and a matching diagram function in
`productFigure` (`src/figures.mjs`). Nav, footer, homepage and Products page update themselves.

## Design system in one paragraph

One typeface, Archivo (variable, self-hosted, OFL): expanded for headings and names,
normal for reading, condensed for labels. Indigo `#1A1648` is sampled from the logo.
Filled shapes mean *built*, outlines mean *examined*, the red means *exposed* and is used
for nothing else. The 58° diagonal on buttons and the homepage split is the angle of the
strokes in the logo mark. Tokens are at the top of `site.css`.

## Contact form

Posts to Web3Forms (email) and to the Google Apps Script sheet used by the previous site.
Fields are now `name, email, company, requirement, message` (`phone` was dropped), so the
sheet needs `company` and `requirement` columns. Links like `/contact/?topic=vapt`
preselect the requirement.

## Before launch

- Confirm product status and copy in `src/site.mjs` (written from the one-line descriptions on the old site).
- Confirm process steps, FAQs and outcomes on the three service pages.
- Have Privacy and Terms reviewed. The privacy page says the site sets no analytics cookies; update it if you add analytics.
- Replace `hr@aerovanttech.com` if a different address should receive security enquiries.
