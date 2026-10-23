import { insights, a, u } from '../site.mjs';
import { ctaBand, go } from '../layout.mjs';
import { fmt } from './company.mjs';

/* ---------- /insights/<slug>/ ---------- */
const article = (p) => () => [
  `
<article class="art" aria-labelledby="art-h">
  <header class="art__head">
    <div class="wrap">
      <nav class="crumb" aria-label="Breadcrumb"><ol><li><a href="${u('/')}">Home</a></li><li><a href="${u('/insights/')}">Insights</a></li><li><span aria-current="page">${p.category}</span></li></ol></nav>
      <p class="t-label art__meta"><span>${p.category}</span> <time datetime="${p.date}">${fmt(p.date)}</time></p>
      <h1 class="art__t" id="art-h">${p.title}</h1>
      <p class="art__by">${p.author}</p>
    </div>
  </header>
  ${p.image ? `<figure class="wrap art__fig"><img src="${a(p.image)}" alt="${p.imageAlt}" width="${p.imageW ?? 1600}" height="${p.imageH ?? 840}"></figure>` : ''}
  <div class="wrap"><div class="art__body">${p.body()}
    <p class="art__back">${go('/insights/', 'All insights')}</p>
  </div></div>
</article>`,
  ctaBand({ title: 'Worried about your own exposure?', text: 'Tell us what you run. We will tell you plainly what to check first.', label: 'Talk to an expert', href: '/contact/' }),
].join('\n');

export default insights.map((p) => ({
  path: `/insights/${p.slug}/`,
  title: p.title,
  description: p.summary,
  image: p.image,
  ogType: 'article',
  render: article(p),
}));
