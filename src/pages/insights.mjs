import { insights, a, u } from '../site.mjs';
import { ctaBand, go } from '../layout.mjs';
import { fmt } from './company.mjs';
import { picture } from '../insights/kit.mjs';
import { articleLd, collectCrumb } from '../seo.mjs';

/* ---------- /insights/<slug>/ ---------- */
const article = (p) => () => (collectCrumb([['Home', '/'], ['Insights', '/insights/'], [p.title]]), [
  `
<article class="art" aria-labelledby="art-h">
  <header class="art__head">
    <div class="wrap">
      <nav class="crumb" aria-label="Breadcrumb"><ol><li><a href="${u('/')}">Home</a></li><li><a href="${u('/insights/')}">Insights</a></li><li><span aria-current="page">${p.category}</span></li></ol></nav>
      <p class="t-label art__meta"><span>${p.category}</span> <time datetime="${p.date}">${fmt(p.date)}</time>${p.updated && p.updated !== p.date ? ` <span class="art__upd">Last updated <time datetime="${p.updated}">${fmt(p.updated)}</time></span>` : ''}</p>
      <h1 class="art__t" id="art-h">${p.title}</h1>
      <p class="art__by">${p.author}</p>
    </div>
  </header>
  ${p.image ? `<figure class="wrap art__fig">${picture(p, { sizes: '(min-width: 82.5rem) 1210px, calc(100vw - 2.5rem)', alt: p.imageAlt, attrs: 'fetchpriority="high"' })}</figure>` : ''}
  <div class="wrap"><div class="art__body">${p.body()}
    <p class="art__back">${go('/insights/', 'All insights')}</p>
  </div></div>
</article>`,
  ctaBand({ title: 'Worried about your own exposure?', text: 'Tell us what you run. We will tell you plainly what to check first.', label: 'Talk to an expert', href: '/contact/' }),
].join('\n'));

export default insights.map((p) => ({
  path: `/insights/${p.slug}/`,
  title: p.title,
  seo: p.seo,
  description: p.description ?? p.summary,
  image: p.image,
  imageW: p.imageW,
  imageH: p.imageH,
  imageAlt: p.imageAlt,
  ogType: 'article',
  published: p.date,
  modified: p.updated ?? p.date,
  ld: (c) => [articleLd(p, c)],
  render: article(p),
}));
