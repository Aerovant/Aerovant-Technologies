import { site, products, services, startSteps, u, a, esc } from './site.mjs';

/* ---------- small components ---------- */
export const btn = (href, label, mod = '') =>
  `<a class="btn ${mod}" href="${u(href)}"><span>${label}</span><span class="btn__arrow" aria-hidden="true">→</span></a>`;

export const go = (href, label, mod = '') =>
  `<a class="go ${mod}" href="${u(href)}">${label}<span aria-hidden="true">→</span></a>`;

/** Page header used by every inner page. `aside` is optional HTML placed beside the title. */
export const pageHead = ({ crumb, title, lead, aside = '', mod = '' }) => `
<header class="phead ${mod}">
  <div class="wrap phead__in">
    <div class="phead__text">
      ${crumb ? `<nav class="crumb" aria-label="Breadcrumb"><ol>${crumb.map(([l, h]) => `<li>${h ? `<a href="${u(h)}">${l}</a>` : `<span aria-current="page">${l}</span>`}</li>`).join('')}</ol></nav>` : ''}
      <h1 class="t-display">${title}</h1>
      ${lead ? `<p class="t-lead phead__lead">${lead}</p>` : ''}
    </div>
    ${aside ? `<div class="phead__aside">${aside}</div>` : ''}
  </div>
</header>`;

/** Numbered steps. Only used for real sequences. mod: "steps--stair" | "steps--row" | "steps--col" */
export const steps = (items, mod = 'steps--row') => `
<ol class="steps ${mod}">
  ${items.map(([t, d], i) => `<li class="steps__i" style="--n:${i}"><span class="steps__n" aria-hidden="true">${i + 1}</span><h3 class="steps__t">${t}</h3>${d ? `<p>${d}</p>` : ''}</li>`).join('')}
</ol>`;

export const faq = (items) => `
<div class="faq">
  ${items.map(([q, ans]) => `<details class="faq__i"><summary><span>${q}</span><span class="faq__mark" aria-hidden="true"></span></summary><div class="faq__a"><p>${ans}</p></div></details>`).join('')}
</div>`;

/** "Not sure where to start?" block, shared by home and services pages. */
export const startHere = () => `
<section class="sec start" aria-labelledby="start-h">
  <div class="wrap">
    <div class="start__head">
      <h2 class="t-h2" id="start-h">Not sure where to start? Start here.</h2>
      <p class="t-lead">You don’t need a brief, a budget line or the right vocabulary. Four steps, and you can stop after any of them.</p>
    </div>
    ${steps(startSteps, 'steps--stair')}
    <p class="start__cta">${btn('/contact/', 'Tell us what you want to protect')}</p>
  </div>
</section>`;

/** Closing two-route call to action. */
export const closing = () => `
<section class="close" aria-label="Next steps">
  <div class="close__half close__half--build">
    <div class="close__in">
      <h2 class="t-h2">What are you building?</h2>
      <p>See the SaaS platform we design, build and own.</p>
      ${btn('/products/', 'Explore ThreatReady', 'btn--light')}
    </div>
  </div>
  <div class="close__half close__half--protect">
    <div class="close__in">
      <h2 class="t-h2">What are you protecting?</h2>
      <p>Tell us what it is. We’ll tell you where we would start.</p>
      ${btn('/contact/', 'Talk to a security expert')}
    </div>
  </div>
</section>`;

/** Ink band with one action. Used at the end of inner pages. */
export const ctaBand = ({ title, text = '', label, href, alt }) => `
<section class="cta sec--ink" aria-label="Next step">
  <div class="wrap cta__in">
    <div><h2 class="t-h2">${title}</h2>${text ? `<p class="t-lead">${text}</p>` : ''}</div>
    <div class="cta__act">${btn(href, label, 'btn--light')}${alt ? go(alt[1], alt[0]) : ''}</div>
  </div>
</section>`;

/** Ruled term / description rows. */
export const ledger = (rows, mod = '') => `<dl class="ledger ${mod}">${rows.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;

/* ---------- header ---------- */
const chevron = '<svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';

function nav(current) {
  const is = (p) => (current === p || (p !== '/' && current.startsWith(p)) ? ' aria-current="page"' : '');
  const sub = (id, label, top, items, showAll = true) => `
    <li class="nav__has">
      <a class="nav__a" href="${u(top)}"${is(top)}>${label}</a>
      <button class="nav__more" type="button" aria-expanded="false" aria-controls="sub-${id}" aria-label="Show ${label.toLowerCase()} menu">${chevron}</button>
      <div class="nav__sub" id="sub-${id}">
        <ul>
          ${items.map(([n, d, h]) => `<li><a href="${u(h)}"><strong>${n}</strong><span>${d}</span></a></li>`).join('')}
        </ul>
        ${showAll ? `<a class="nav__all" href="${u(top)}">All ${label.toLowerCase()} <span aria-hidden="true">→</span></a>` : ''}
      </div>
    </li>`;
  return `
  <nav id="nav" class="nav" aria-label="Primary">
    <ul class="nav__list">
      <li><a class="nav__a" href="${u('/about/')}"${is('/about/')}>About</a></li>
      ${sub('products', 'Product', '/products/', products.map((p) => [p.name, p.kind, `/products/#${p.id}`]), false)}
      ${sub('services', 'Services', '/services/', services.map((s) => [s.nav, s.outcome, `/services/${s.id}/`]))}
      <li><a class="nav__a" href="${u('/industries/')}"${is('/industries/')}>Industries</a></li>
      <li><a class="nav__a" href="${u('/insights/')}"${is('/insights/')}>Insights</a></li>
      <li><a class="nav__a" href="${u('/careers/')}"${is('/careers/')}>Careers</a></li>
    </ul>
    <a class="btn btn--sm nav__cta" href="${u('/contact/')}"><span>Talk to an expert</span></a>
  </nav>`;
}

export const header = (current) => `
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap hdr__in">
    <a class="hdr__logo" href="${u('/')}" aria-label="${site.name}, home"><img src="${a('img/logo.svg')}" width="154" height="50" alt=""></a>
    <button class="hdr__toggle" type="button" aria-expanded="false" aria-controls="nav"><span class="hdr__bars" aria-hidden="true"></span><span class="hdr__label">Menu</span></button>
    ${nav(current)}
  </div>
</header>`;

/* ---------- footer ---------- */
export const footer = () => `
<footer class="ftr">
  <div class="wrap">
    <div class="ftr__top">
      <a class="ftr__logo" href="${u('/')}" aria-label="${site.name}, home"><img src="${a('img/logo-white.svg')}" width="172" height="56" alt=""></a>
      <p class="ftr__tag">${site.tagline}</p>
    </div>
    <div class="ftr__cols">
      <nav aria-label="Company"><h2>Company</h2><ul>
        <li><a href="${u('/about/')}">About</a></li>
        <li><a href="${u('/industries/')}">Industries</a></li>
        <li><a href="${u('/careers/')}">Careers</a></li>
        <li><a href="${u('/contact/')}">Contact</a></li>
      </ul></nav>
      <nav aria-label="Product"><h2>Product</h2><ul>
        ${products.map((p) => `<li><a href="${u(`/products/#${p.id}`)}">${p.name}</a></li>`).join('')}
      </ul></nav>
      <nav aria-label="Services"><h2>Services</h2><ul>
        ${services.map((s) => `<li><a href="${u(`/services/${s.id}/`)}">${s.nav}</a></li>`).join('')}
        <li><a href="${u('/services/')}">All services</a></li>
      </ul></nav>
      <nav aria-label="Resources"><h2>Resources</h2><ul>
        <li><a href="${u('/insights/')}">Insights</a></li>
        <li><a href="${site.academyUrl}" rel="noopener">Aerovant Academy</a></li>
        <li><a href="${u('/privacy/')}">Privacy Policy</a></li>
        <li><a href="${u('/terms/')}">Terms</a></li>
      </ul></nav>
      <div><h2>Contact</h2>
        <address>
          <a href="mailto:${site.email}">${site.email}</a><br>
          <a href="tel:${site.phoneHref}">${site.phone}</a><br>
          ${site.address.join('<br>')}
        </address>
      </div>
    </div>
    <div class="ftr__base">
      <p>© ${new Date().getFullYear()} ${site.legalName}</p>
      <ul class="ftr__social">${site.social.map(([n, h]) => `<li><a href="${h}" rel="noopener">${n}</a></li>`).join('')}</ul>
    </div>
  </div>
</footer>`;

/* ---------- document ---------- */
export function doc({ path, title, description, body, bodyClass = '', noindex = false }) {
  const full = path === '/' ? `${site.name}: ThreatReady and cybersecurity services` : `${title} | ${site.name}`;
  const canonical = site.url + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1A1648">
<link rel="icon" href="${a('img/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${a('img/apple-touch-icon.png')}">
<link rel="preload" href="${a('fonts/archivo-var.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${a('css/site.css')}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${bodyClass}">
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
<script src="${a('js/site.js')}" defer></script>
</body>
</html>
`;
}
