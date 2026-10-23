import { products, u } from '../site.mjs';
import { pageHead, ctaBand, ledger, go, btn } from '../layout.mjs';
import { productFigure } from '../figures.mjs';
import { productLd } from '../seo.mjs';

const tr = products[0];
const contactFor = (topic) => `/contact/?topic=${topic}`;

/* Header aside: the three things a visitor can do right now on the product's own site. */
const actions = `
<nav class="pact" aria-label="ThreatReady links">
  <ul>
    <li><a href="${tr.url}"><strong>Visit threatready.io</strong><span>Start free on any role</span></a></li>
    <li><a href="${tr.demo}"><strong>Try one question</strong><span>Live demo, no sign-up, about two minutes</span></a></li>
    <li><a href="${tr.sample}"><strong>See a sample report</strong><span>The format every session produces</span></a></li>
  </ul>
</nav>`;

const showcase = () => `
<article class="prod sec--ink" id="${tr.id}" aria-labelledby="${tr.id}-h">
  <div class="wrap prod__in">
    <header class="prod__head">
      <p class="t-label">${tr.kind}</p>
      <h2 class="prod__name" id="${tr.id}-h">${tr.name}</h2>
      <p class="t-lead">${tr.does}</p>
    </header>
    <figure class="prod__fig">${productFigure[tr.id]()}<figcaption class="t-note">How the parts fit together. Concept diagram, not a screenshot.</figcaption></figure>
    <div class="prod__body">
      ${ledger([['The problem', tr.problem], ['What you get', tr.value]], 'ledger--stack')}
      <p class="prod__go">${btn(tr.url, 'Visit threatready.io', 'btn--light')}</p>
    </div>
  </div>
</article>`;

const pillars = () => `
<section class="sec sec--white" aria-labelledby="tr-parts-h">
  <div class="wrap">
    <div class="sec__head">
      <h2 class="t-h2" id="tr-parts-h">Think, do, prove.</h2>
      <p class="t-lead">Three parts of one journey, across ${tr.tracks} role tracks: SOC, cloud, application security, DevSecOps, GRC, red team, AI/LLM security and more.</p>
    </div>
    <ol class="tparts">
      ${tr.pillars.map((p) => `
      <li class="tpart">
        <p class="tpart__verb">${p.verb}</p>
        <h3 class="tpart__name">${p.name}</h3>
        <p>${p.line}</p>
        ${p.status ? `<p class="tpart__status">${p.status}</p>` : ''}
      </li>`).join('')}
    </ol>
  </div>
</section>`;

const audiences = () => `
<section class="sec" id="organisations" aria-labelledby="tr-who-h">
  <div class="wrap">
    <div class="sec__head">
      <h2 class="t-h2" id="tr-who-h">Built for the people who hire and train security engineers.</h2>
      <p class="t-lead">The same rubric reads the same way for a candidate, a manager and a hiring team.</p>
    </div>
    <ul class="aud">
      ${tr.audiences.map((a) => `
      <li class="aud__i" id="for-${a.id}">
        <h3 class="t-h3">${a.name}</h3>
        <p>${a.line}</p>
        <p class="aud__go">${go(a.href || contactFor(a.topic), a.cta)}</p>
      </li>`).join('')}
    </ul>
  </div>
</section>`;

const trust = () => `
<section class="sec sec--white" aria-labelledby="tr-trust-h">
  <div class="wrap split">
    <div class="split__h">
      <h2 class="t-h2" id="tr-trust-h">Every score is explainable.</h2>
      <p>A company trusting a score to shortlist candidates needs to know how it was reached. This is how.</p>
      <p>${go(tr.sample, 'See a sample report')}</p>
    </div>
    <div class="split__b">${ledger(tr.trust)}</div>
  </div>
</section>`;

const bridge = () => `
<section class="sec" aria-labelledby="tr-bridge-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="tr-bridge-h">Written by people who test real systems.</h2></div>
    <div class="split__b">
      <p class="statement">The scenarios in ThreatReady are written by the same team that runs our cloud security reviews and penetration tests.</p>
      <p class="prose">What a candidate reasons through in the lab is what we find in client environments. And when we test a client’s systems, training their engineers on what we found is the natural next step.</p>
      <p>${go('/services/', 'Our security services')}</p>
    </div>
  </div>
</section>`;

export default [{
  path: '/products/',
  title: 'ThreatReady',
  seo: 'ThreatReady: Cybersecurity Skills Platform | Aerovant',
  description: 'ThreatReady by Aerovant: train, test and hire security engineers on real work. Attack Reasoning Lab, Lab Simulations and InterviewPrep across 15 role tracks.',
  ld: () => products.map(productLd),
  render: () => [
    pageHead({
      crumb: [['Home', '/'], ['Product']],
      title: 'Meet ThreatReady.',
      lead: tr.line,
      aside: actions,
    }),
    showcase(),
    pillars(),
    audiences(),
    trust(),
    bridge(),
    ctaBand({ title: 'Run a pilot with your team.', text: 'Tell us whether you are hiring, training engineers or running a cohort, and roughly how many people.', label: 'Talk to us about a pilot', href: contactFor('threatready-hiring'), alt: ['Or start free on threatready.io', tr.url] }),
  ].join('\n'),
}];
