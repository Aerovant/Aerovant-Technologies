import { products, u } from '../site.mjs';
import { pageHead, ctaBand, ledger, go } from '../layout.mjs';
import { productFigure } from '../figures.mjs';

const index = `
<nav class="pindex" aria-label="Product on this page">
  <ul>${products.map((p) => `<li><a href="#${p.id}"><strong>${p.name}</strong><span>${p.kind}</span></a></li>`).join('')}</ul>
</nav>`;

const philosophy = () => `
<section class="sec sec--white" aria-labelledby="phil-h">
  <div class="wrap split">
    <div class="split__h">
      <h2 class="t-h2" id="phil-h">How we build.</h2>
      <p>The same rules we give clients, applied to our own code.</p>
    </div>
    <div class="split__b">
      ${ledger([
        ['One problem, addressed fully', 'ThreatReady helps candidates understand their readiness for a cybersecurity role before the interview.'],
        ['Secure by construction', 'Cloud-native architecture, with security built into the delivery pipeline rather than added once the release is done.'],
        ['Owned end to end', 'We design ThreatReady, engineer it and decide where it goes next.'],
      ])}
    </div>
  </div>
</section>`;

const showcase = () => products.map((p, i) => `
<article class="prod ${i % 2 ? '' : 'sec--ink'}" id="${p.id}" aria-labelledby="${p.id}-h">
  <div class="wrap prod__in">
    <header class="prod__head">
      <p class="t-label">${p.kind}</p>
      <h2 class="prod__name" id="${p.id}-h">${p.name}</h2>
      <p class="t-lead">${p.line}</p>
    </header>
    <figure class="prod__fig">${productFigure[p.id]()}<figcaption class="t-note">Concept diagram, not a screenshot.</figcaption></figure>
    <div class="prod__body">
      ${ledger([['The problem', p.problem], ['What it does', p.does], ['Why it matters', p.value]], 'ledger--stack')}
      <p class="prod__go">${go(`/contact/?topic=products`, `Ask about ${p.name.replace(' Platform', '')}`)}</p>
    </div>
  </div>
</article>`).join('\n');

const value = () => `
<section class="sec sec--white" aria-labelledby="val-h">
  <div class="wrap">
    <h2 class="t-h2" id="val-h">What ThreatReady changes.</h2>
    <div class="tbl-wrap" tabindex="0" role="region" aria-labelledby="val-h">
      <table class="tbl">
        <thead><tr><th scope="col">Product</th><th scope="col">Without it</th><th scope="col">With it</th></tr></thead>
        <tbody>
          ${products.map((p) => `<tr><th scope="row"><a href="#${p.id}">${p.name}</a></th><td>${p.problem}</td><td>${p.value}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>`;

export default [{
  path: '/products/',
  title: 'Product',
  description: 'ThreatReady is Aerovant Technologies’ cybersecurity job-readiness platform, combining AI interviews and role-specific attack simulations.',
  render: () => [
    pageHead({
      crumb: [['Home', '/'], ['Product']],
      title: 'Meet ThreatReady.',
      lead: 'A cybersecurity job-readiness platform that helps candidates find out where they stand before the interview.',
      aside: index,
    }),
    showcase(),
    philosophy(),
    value(),
    ctaBand({ title: 'Want a closer look?', text: 'Tell us about the role you are preparing for.', label: 'Ask about ThreatReady', href: '/contact/?topic=products', alt: ['Or explore our security services', '/services/'] }),
  ].join('\n'),
}];
