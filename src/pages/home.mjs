import { products, services, layers, journey, u } from '../site.mjs';
import { btn, go, startHere, closing } from '../layout.mjs';
import { markFigure, stackFigure, plateGlyph, productFigure, cloudFigure, laneTicks, AS } from '../figures.mjs';

const hero = () => `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1 class="t-display" id="hero-h"><span class="l">Software we build.</span> <span class="l">Systems we secure.</span></h1>
      <p class="t-lead">Aerovant Technologies is two things on purpose: a product company building its own SaaS platform, and a cybersecurity practice that tests and defends the systems other companies run on.</p>
      <div class="hero__cta">
        ${btn('/products/', 'Explore the product')}
        ${btn('/services/', 'Explore cybersecurity', 'btn--line')}
      </div>
    </div>
    <div class="hero__fig">${markFigure()}</div>
  </div>
  <div class="wrap">
    <dl class="tblock">
      <div><dt>Who we are</dt><dd>A technology and cybersecurity company based in Krishnagiri, Tamil Nadu.</dd></div>
      <div><dt>What we build</dt><dd>SaaS product: ${products.map((p) => p.name).join(', ')}.</dd></div>
      <div><dt>What we secure</dt><dd>AWS cloud environments, web applications, APIs and networks.</dd></div>
      <div><dt>Who we help</dt><dd>Founders, CTOs and engineering heads at startups, SaaS companies and SMEs.</dd></div>
    </dl>
  </div>
</section>`;

const pillars = () => `
<section class="pillars" aria-label="The two sides of Aerovant">
  <div class="pillars__half pillars__half--build">
    <div class="pillars__in">
      <p class="t-label">SaaS product</p>
      <h2 class="t-h2">Technology we build.</h2>
      <p>One security product, designed, engineered and owned by Aerovant.</p>
      <ul class="pillars__list${products.length === 1 ? ' pillars__list--solo' : ''}">
        ${products.map((p) => `<li><a href="${u(`/products/#${p.id}`)}"><strong>${p.name}</strong><span>${p.kind}</span>${products.length === 1 ? `<span class="pillars__desc">${p.line}</span>` : ''}</a></li>`).join('')}
      </ul>
      ${btn('/products/', 'Explore the product', 'btn--light')}
    </div>
  </div>
  <div class="pillars__half pillars__half--secure">
    <div class="pillars__in">
      <p class="t-label">Cybersecurity services</p>
      <h2 class="t-h2">Security expertise we deliver.</h2>
      <p>Three practices and eleven services, for teams that need practical security support.</p>
      <ul class="pillars__list">
        ${services.map((s) => `<li><a href="${u(`/services/${s.id}/`)}"><strong>${s.nav}</strong><span>${s.outcome}</span></a></li>`).join('')}
      </ul>
      ${btn('/services/', 'Explore services')}
    </div>
  </div>
</section>`;

export const attackSurface = () => `
<section class="sec as" aria-labelledby="as-h">
  <div class="wrap">
    <div class="as__head">
      <h2 class="t-h2" id="as-h">Your attack surface is bigger than your application.</h2>
      <p class="t-lead">Security effort tends to go where the engineering effort goes: into the application. An attacker looks at six layers and uses whichever one gives way first.</p>
    </div>
    <div class="as__body" data-as style="--as-w:${AS.w}px;--as-pitch:${AS.pitch}px;--as-top:${AS.y0 + AS.hh - AS.pitch / 2}px">
      <div class="as__fig">${stackFigure()}</div>
      <ul class="as__rows">
        ${layers.map(([name, ex], i) => `
        <li class="as__row" data-layer="${i}">
          <span class="as__glyph">${plateGlyph()}</span>
          <button class="as__btn" type="button" aria-pressed="false">${name}</button>
          <p class="as__ex">${ex}</p>
        </li>`).join('')}
      </ul>
    </div>
    <p class="as__foot">One weak layer is enough. ${go('/services/', 'See how we cover all six')}</p>
  </div>
</section>`;

export const journeySec = () => `
<section class="sec sec--white jr" aria-labelledby="jr-h" data-inview>
  <div class="wrap">
    <div class="jr__head">
      <h2 class="t-h2" id="jr-h">Four questions, asked in order.</h2>
      <p class="t-lead">Every piece of security work we do answers one of them. Then your systems change, and the questions start again.</p>
    </div>
    <ol class="jr__track">
      ${journey.map((s, i) => `
      <li class="jr__st" style="--i:${i}">
        <span class="jr__node" aria-hidden="true"></span>
        <h3 class="jr__verb">${s.verb}</h3>
        <p class="jr__q">${s.q}</p>
        <p class="jr__b">${s.body}</p>
        ${s.links.length ? `<p class="jr__l">${s.links.map(([l, h]) => go(h, l)).join('')}</p>` : '<p class="jr__l jr__l--none">Part of every engagement</p>'}
      </li>`).join('')}
    </ol>
    <p class="jr__loop"><span>Systems change. Ask again.</span></p>
  </div>
</section>`;

const productText = (p) => `
          <p class="t-label">${p.kind}</p>
          <h3 class="hp__name">${p.name}</h3>
          <p class="hp__line">${p.line}</p>
          ${go(`/products/#${p.id}`, `Explore ${p.name.replace(' Platform', '')}`)}`;

// One product: its text sits under the section heading and the diagram takes the wide column.
// Several products: each gets a row of its own in the wide column.
const productsSec = () => (products.length === 1 ? `
<section class="sec sec--ink hp" aria-labelledby="hp-h">
  <div class="wrap hp__grid hp__grid--solo">
    <div class="hp__head">
      <h2 class="t-h2" id="hp-h">The product we build.</h2>
      <p class="t-lead">Our own SaaS platform. We design it, engineer it and own it. Nothing here is resold or relabelled.</p>
    </div>
    <div class="hp__fig">${productFigure[products[0].id]()}</div>
    <article class="hp__text">${productText(products[0])}
    </article>
  </div>
</section>` : `
<section class="sec sec--ink hp" aria-labelledby="hp-h">
  <div class="wrap hp__grid">
    <div class="hp__head">
      <h2 class="t-h2" id="hp-h">The products we build.</h2>
      <p class="t-lead">Our own SaaS platforms. We design them, engineer them and own them. Nothing here is resold or relabelled.</p>
      ${go('/products/', 'All products')}
    </div>
    <div class="hp__list">
      ${products.map((p) => `
      <article class="hp__item">
        <div class="hp__fig">${productFigure[p.id]()}</div>
        <div class="hp__text">${productText(p)}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`);

const [cloud, vapt, managed] = services;
const vaptEx = ['An injection flaw or broken access control.', 'An endpoint returning another user’s data.', 'An exposed admin port.'];

export const vaptPath = () => `
    <ol class="path" aria-label="An attack path, and the test that covers each step">
      <li class="path__n path__n--from" style="--s:0">Internet</li>
      ${vapt.items.map(([n], i) => `<li class="path__n" style="--s:${i + 1}"><strong>${n}</strong><span>${vaptEx[i]}</span></li>`).join('')}
      <li class="path__n path__n--to" style="--s:4">Your data</li>
    </ol>`;
export const lanes = (withText = false) => `
      <ul class="lanes${withText ? ' lanes--text' : ''}">
        ${managed.items.map(([n, d], i) => `<li class="lane"><span class="lane__n">${n}${withText ? `<small>${d}</small>` : ''}</span>${laneTicks(i + 3)}</li>`).join('')}
      </ul>`;

const capabilities = () => `
<section class="sec caps" aria-labelledby="caps-h">
  <div class="wrap caps__head">
    <h2 class="t-h2" id="caps-h">Cybersecurity capabilities.</h2>
    <p class="t-lead">Three practices. Take one, or run them in sequence.</p>
  </div>

  <article class="cap cap--cloud"><div class="wrap cap__in">
    <div class="cap__text">
      <h3 class="cap__name">${cloud.name}</h3>
      <p class="cap__out">${cloud.line}</p>
      <ul class="cap__items">${cloud.items.map(([n]) => `<li>${n}</li>`).join('')}</ul>
      ${go(`/services/${cloud.id}/`, 'Cloud security in detail')}
    </div>
    <figure class="cap__fig">${cloudFigure()}<figcaption class="t-note">Flagged in colour: the kind of exposure a configuration review is there to find.</figcaption></figure>
  </div></article>

  <article class="cap cap--vapt"><div class="wrap cap__in">
    <div class="cap__text">
      <h3 class="cap__name">VAPT</h3>
      <p class="cap__out">${vapt.line}</p>
    </div>
    ${vaptPath()}
    <p class="cap__more">${go(`/services/${vapt.id}/`, 'VAPT in detail')}</p>
  </div></article>

  <article class="cap cap--managed"><div class="wrap cap__in">
    <figure class="cap__fig">
      ${lanes()}
      <figcaption class="t-note">Schematic. One lane per managed service. A raised mark is an event that needs a person.</figcaption>
    </figure>
    <div class="cap__text">
      <h3 class="cap__name">Managed Security</h3>
      <p class="cap__out">${managed.line}</p>
      ${go(`/services/${managed.id}/`, 'Managed security in detail')}
    </div>
  </div></article>
</section>`;

export const whyItems = [
  ['Attacker perspective', 'We start from what someone would actually try, not from a checklist.'],
  ['Engineering depth', 'We build software ourselves, so findings arrive with the context an engineer needs.'],
  ['Outcome first', 'The goal is a system that is harder to attack, not a longer document.'],
  ['Practical remediation', 'Every finding says what to change, and which to change first.'],
  ['Clear scope', 'You know what is being tested, what is not, and why, before work starts.'],
  ['Transparent engagement', 'No surprises about what we are doing or what we found.'],
];

const why = () => `
<section class="sec sec--white why" aria-labelledby="why-h">
  <div class="wrap why__grid">
    <div class="why__head">
      <h2 class="t-h2" id="why-h">Security that goes beyond the report.</h2>
      <p class="t-lead">A report is where a lot of security work stops. It is roughly where the useful part begins.</p>
      <p>We are also a product company. We ship our own security software, which means we know what a fix costs an engineering team, and we write our findings with that in mind.</p>
      ${go('/about/', 'How we think about security')}
    </div>
    <dl class="why__list">
      ${whyItems.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}
    </dl>
  </div>
</section>`;

export default [{
  path: '/',
  title: 'Home',
  description: 'Aerovant Technologies builds ThreatReady, a cybersecurity job-readiness platform, and delivers cloud security, VAPT and managed security services to startups, SaaS companies and SMEs.',
  bodyClass: 'home',
  render: () => [hero(), pillars(), attackSurface(), journeySec(), productsSec(), capabilities(), why(), startHere(), closing()].join('\n'),
}];
