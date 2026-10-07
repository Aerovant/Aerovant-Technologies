import { services, u } from '../site.mjs';
import { pageHead, ctaBand, ledger, go, steps, faq, startHere } from '../layout.mjs';
import { cloudFigure, cloudProblemFigure } from '../figures.mjs';
import { journeySec, vaptPath, lanes, whyItems } from './home.mjs';

const [cloud, vapt, managed] = services;
const crumb = (name) => [['Home', '/'], ['Services', '/services/'], [name]];
const scope = (s) => `
<div class="scope">
  <p class="t-label">In this practice</p>
  <ul>${s.items.map(([n, d]) => `<li><strong>${n}</strong><span>${d}</span></li>`).join('')}</ul>
</div>`;
const problem = (h, paras, graphic = '') => `
<section class="sec sec--white" aria-labelledby="prob-h">
  <div class="wrap split split--problem">
    <div class="split__h"><h2 class="t-label" id="prob-h">The problem</h2>${graphic ? `<figure class="problem__fig">${graphic}<figcaption class="t-note">Small decisions can add up to meaningful exposure.</figcaption></figure>` : ''}</div>
    <div class="split__b"><p class="statement">${h}</p>${paras.map((p) => `<p class="prose">${p}</p>`).join('')}</div>
  </div>
</section>`;
const outcome = (title, items) => `
<section class="sec out" aria-labelledby="out-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="out-h">${title}</h2></div>
    <div class="split__b"><ul class="checks">${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>
  </div>
</section>`;
const faqSec = (items) => `
<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="faq-h">Questions we get asked.</h2></div>
    <div class="split__b">${faq(items)}</div>
  </div>
</section>`;
const others = (id) => `
<nav class="others" aria-label="Other services">
  <div class="wrap others__in">
    ${services.filter((s) => s.id !== id).map((s) => `<a href="${u(`/services/${s.id}/`)}"><span class="t-label">${s.outcome}</span><strong>${s.nav}</strong></a>`).join('')}
  </div>
</nav>`;

/* ---------- /services/ ---------- */
const overview = () => [
  pageHead({
    crumb: [['Home', '/'], ['Services']],
    title: 'Cybersecurity services.',
    lead: 'Three practices, built around what a founder or CTO actually wants to know: what is exposed, whether it can be exploited, and whether anyone would notice if it happened again.',
  }),
  `
<section class="svc" id="${cloud.id}" aria-labelledby="svc-cloud-h">
  <div class="wrap svc__in svc__in--cloud">
    <div class="svc__text">
      <p class="t-label">${cloud.name}</p>
      <h2 class="t-h2" id="svc-cloud-h">${cloud.outcome}</h2>
      <p class="t-lead">${cloud.line}</p>
      ${ledger(cloud.items, 'ledger--stack')}
      ${go(`/services/${cloud.id}/`, 'Cloud security in detail')}
    </div>
    <figure class="svc__fig">${cloudFigure()}<figcaption class="t-note">Flagged in colour: the kind of exposure a configuration review is there to find.</figcaption></figure>
  </div>
</section>
<section class="svc sec--white" id="${vapt.id}" aria-labelledby="svc-vapt-h">
  <div class="wrap svc__in svc__in--vapt">
    <div class="svc__text">
      <p class="t-label">${vapt.name}</p>
      <h2 class="t-h2" id="svc-vapt-h">${vapt.outcome}</h2>
      <p class="t-lead">${vapt.line}</p>
    </div>
    ${vaptPath()}
    <p>${go(`/services/${vapt.id}/`, 'VAPT in detail')}</p>
  </div>
</section>
<section class="svc" id="${managed.id}" aria-labelledby="svc-managed-h">
  <div class="wrap svc__in svc__in--managed">
    <div class="svc__text">
      <p class="t-label">${managed.name}</p>
      <h2 class="t-h2" id="svc-managed-h">${managed.outcome}</h2>
      <p class="t-lead">${managed.line}</p>
      ${go(`/services/${managed.id}/`, 'Managed security in detail')}
    </div>
    <figure class="svc__fig">${lanes(true)}</figure>
  </div>
</section>`,
  journeySec(),
  `
<section class="sec" aria-labelledby="inc-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="inc-h">What every engagement includes.</h2></div>
    <div class="split__b">${ledger(whyItems)}</div>
  </div>
</section>`,
  startHere(),
  ctaBand({ title: 'Tell us what you want to protect.', label: 'Talk to a security expert', href: '/contact/' }),
].join('\n');

/* ---------- /services/cloud-security/ ---------- */
const cloudPage = () => [
  pageHead({ crumb: crumb('Cloud Security'), title: 'Cloud security for teams building on AWS.', lead: cloud.line, aside: scope(cloud) }),
  problem('Cloud accounts grow one quick decision at a time.', [
    'A bucket opened for a demo. A role given broad permissions to unblock a release. An admin port left reachable after a late fix. None of these looks like a security decision when it is made.',
    'Added together, they are how most cloud exposure is created, and nobody on the team has the full list.',
  ], cloudProblemFigure()),
  `
<section class="sec" aria-labelledby="assess-h">
  <div class="wrap assess">
    <div class="assess__head">
      <h2 class="t-h2" id="assess-h">What we look at.</h2>
      <p class="t-lead">We read your AWS account the way an attacker would: what is reachable, what is over-permitted, and what would be quietly useful to someone who got in.</p>
    </div>
    <figure class="assess__fig">${cloudFigure()}</figure>
    ${ledger([
      ['Identity and access', 'Who and what can do what. Over-permissive IAM roles, leaked access keys, accounts without MFA.'],
      ['Storage and data', 'What is readable from outside. A storage bucket that is public and should not be.'],
      ['Network exposure', 'What is reachable from the internet. An admin port that was never meant to be.'],
    ], 'ledger--stack assess__list')}
  </div>
</section>`,
  `
<section class="sec sec--white" aria-labelledby="proc-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="proc-h">How it runs.</h2><p>Four steps. You know the scope before any of it starts.</p></div>
    <div class="split__b">${steps([
      ['Agree the scope.', 'Which AWS accounts and environments are in, and which are out.'],
      ['We review.', 'Configuration and exposure, across the areas above.'],
      ['Findings, ranked.', 'What we found, ordered by the risk it carries.'],
      ['Go through it together.', 'We take your engineers through what to change first.'],
    ], 'steps--col')}</div>
  </div>
</section>`,
  outcome('What you have at the end.', [
    'A clear answer to “what can be attacked?” for your AWS environment.',
    'A list of what is exposed, ranked by risk.',
    'A first set of changes your engineers can start on.',
  ]),
  faqSec([
    ['Is this only for AWS?', 'Our cloud security practice is built around AWS. If you run workloads elsewhere, tell us, and we will say plainly whether we are the right fit.'],
    ['What is the difference between the assessment and the configuration review?', 'The assessment is the broad view: how your cloud environment is exposed and what that puts at risk. The configuration review is the close view: how your AWS services are set up, compared with how they should be.'],
    ['Do we have to fix everything you find?', 'No. Findings are ranked so you can start with the ones an attacker would use first and schedule the rest.'],
  ]),
  others(cloud.id),
  ctaBand({ title: 'Start with your AWS account.', text: 'Tell us roughly what you run. We will suggest where to begin.', label: 'Talk to a security expert', href: '/contact/?topic=cloud' }),
].join('\n');

/* ---------- /services/vapt/ ---------- */
const vaptPage = () => [
  pageHead({ crumb: crumb('VAPT'), title: 'Find out what can actually be exploited.', lead: vapt.line, aside: scope(vapt) }),
  `
<section class="sec sec--white" aria-labelledby="path-h">
  <div class="wrap">
    <div class="sec__head">
      <h2 class="t-h2" id="path-h">We follow the path an attacker would.</h2>
      <p class="t-lead">From the internet, through your application and its APIs, into your network, toward the data. Each test covers one stretch of that path.</p>
    </div>
    ${vaptPath()}
  </div>
</section>`,
  `
<section class="sec" aria-labelledby="prob-h">
  <div class="wrap">
    <h2 class="t-label" id="prob-h">The problem</h2>
    <p class="statement">A scanner tells you what might be wrong. It does not tell you what someone could do with it.</p>
    <div class="versus">
      <div><h3 class="t-h3">Vulnerability assessment</h3><p>Finds and lists the weaknesses across what is in scope. Wide coverage. Answers “what is wrong here?”</p></div>
      <div><h3 class="t-h3">Penetration testing</h3><p>Tries to use those weaknesses, as an attacker would, to show what they lead to. Answers “does it matter?”</p></div>
    </div>
    <p class="prose">You need both. The first without the second gives you a long list and no priorities. The second without the first gives you one path and no coverage.</p>
  </div>
</section>`,
  `
<section class="sec sec--white" aria-labelledby="proc-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="t-h2" id="proc-h">How a test runs.</h2></div>
    ${steps([
      ['Scope.', 'Targets, limits and testing windows, agreed with you before anything is touched.'],
      ['Test.', 'Assessment first, then exploitation of what the assessment turns up.'],
      ['Report.', 'Findings ranked by risk, each with evidence and what to change.'],
      ['Review.', 'We go through the findings with the engineers who will fix them.'],
    ], 'steps--row')}
  </div>
</section>`,
  outcome('What you have at the end.', [
    'Proof of which weaknesses can be exploited, and which cannot.',
    'Findings ranked by risk, with evidence.',
    'Fix guidance written for the people doing the fixing.',
  ]),
  faqSec([
    ['Will testing disrupt our production systems?', 'Targets, limits and testing windows are agreed with you before any testing starts. Nothing outside that scope is touched.'],
    ['Can we test only the API, or only the web application?', 'Yes. The three tests can be taken separately. If you are not sure which matters most, tell us what you run and we will recommend one.'],
    ['What do we receive?', 'A report of findings ranked by risk. Each one has the evidence for it and guidance on the fix.'],
  ]),
  others(vapt.id),
  ctaBand({ title: 'Tell us what you want tested.', text: 'An application, an API, a network. A few lines is enough to scope it.', label: 'Talk to a security expert', href: '/contact/?topic=vapt' }),
].join('\n');

/* ---------- /services/managed-security/ ---------- */
const managedPage = () => [
  pageHead({ crumb: crumb('Managed Security Services'), title: 'Someone watching, after the test is over.', lead: managed.line, mod: 'phead--flush' }),
  `
<section class="ops" aria-labelledby="ops-h">
  <div class="wrap">
    <h2 class="t-label" id="ops-h">What we run for you</h2>
    <figure>${lanes(true)}<figcaption class="t-note">Schematic. One lane per managed service. A raised mark is an event that needs a person.</figcaption></figure>
  </div>
</section>`,
  problem('Security work has a short shelf life.', [
    'The day after an assessment, someone ships a change. A new endpoint goes live, a rule is loosened, a laptop misses a patch. The report describes a system that no longer quite exists.',
    'Testing tells you where you stood. Somebody still has to watch where you are.',
  ]),
  `
<section class="sec" aria-labelledby="proc-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="t-h2" id="proc-h">How it works.</h2><p class="t-lead">You keep the decisions. We take the watching and the day-to-day running.</p></div>
    ${steps([
      ['Agree what we watch and manage.', 'Which of the five services, covering which systems.'],
      ['We take on the day-to-day.', 'Monitoring, and the management of the controls you hand over.'],
      ['You hear from us when it matters.', 'When something needs a decision from you, not for every event.'],
      ['Advisories, as threats change.', 'Notes on the threats that are relevant to what you run.'],
    ], 'steps--stair')}
  </div>
</section>`,
  outcome('What changes for you.', [
    'An answer to “would we know if it happened again?”',
    'Security controls that are looked after, not just installed.',
    'Your engineers spend their time on the product.',
  ]),
  faqSec([
    ['Do we have to take all five services?', 'No. Start with the one that covers your biggest gap. If you are not sure which that is, tell us what you run and we will recommend one.'],
    ['What does “Threat Intelligence & Advisories” mean in practice?', 'Advisories about threats that are relevant to your stack, so you hear about what matters to you rather than everything that happened this week.'],
    ['We have not had an assessment or a penetration test. Can we start here?', 'You can. Most teams get more from monitoring once they know what they are protecting, so we may suggest a short assessment first.'],
  ]),
  others(managed.id),
  ctaBand({ title: 'Tell us what needs watching.', label: 'Talk to a security expert', href: '/contact/?topic=managed' }),
].join('\n');

export default [
  { path: '/services/', title: 'Cybersecurity services', description: 'Cloud security, VAPT and managed security services from Aerovant Technologies, for startups, SaaS companies and SMEs.', render: overview },
  { path: '/services/cloud-security/', title: 'Cloud Security', description: 'AWS cloud security, cloud security assessment and AWS security configuration review. Know what is exposed in your AWS environment and what to change first.', render: cloudPage },
  { path: '/services/vapt/', title: 'VAPT: Vulnerability Assessment & Penetration Testing', description: 'Web application VAPT, API security testing and network security testing. Find out which weaknesses can actually be exploited.', render: vaptPage },
  { path: '/services/managed-security/', title: 'Managed Security Services', description: 'SOC-as-a-Service, EDR, firewall and WAF management, and threat intelligence advisories from Aerovant Technologies.', render: managedPage },
];
