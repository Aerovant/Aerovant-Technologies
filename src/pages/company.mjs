import { site, services, insights, insightCategories, openings, startSteps, u } from '../site.mjs';
import { pageHead, ctaBand, ledger, go, steps, btn } from '../layout.mjs';

/* ---------- /about/ ---------- */
const about = () => [
  pageHead({
    crumb: [['Home', '/'], ['About']],
    title: 'Where cloud, code and security converge.',
    lead: 'Aerovant Technologies is a technology and cybersecurity company based in Krishnagiri, Tamil Nadu. We build ThreatReady, and we secure the systems other companies depend on.',
  }),
  `
<section class="sec sec--white story" aria-labelledby="who-h">
  <div class="wrap">
    <h2 class="t-label" id="who-h">Who we are</h2>
    <p class="statement statement--xl">An engineering company with two jobs. One is building our own software. The other is testing and defending yours.</p>
    <div class="story__cols">
      <div>
        <h3 class="t-h3">What we do</h3>
        <p>On the product side we design, engineer and own ThreatReady, a cybersecurity job-readiness platform. On the services side we run three practices: cloud security, vulnerability assessment and penetration testing, and managed security.</p>
        <p>${go('/products/', 'Product')} &nbsp; ${go('/services/', 'Services')}</p>
      </div>
      <div>
        <h3 class="t-h3">Why both</h3>
        <p>Each side keeps the other honest. Building software teaches us what a fix really costs an engineering team. Attacking software teaches us what a design really needs. We would be worse at either without the other.</p>
      </div>
    </div>
  </div>
</section>`,
  `
<section class="sec" aria-labelledby="appr-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="appr-h">Our approach.</h2><p>How work gets done here, whichever side of the company it belongs to.</p></div>
    <div class="split__b">${ledger([
      ['Design', 'Strategic and user-focused. An interface or a report is designed for the person who has to use it.'],
      ['Engineering', 'Secure, scalable, cloud-native, with security practices built into delivery rather than added at the end.'],
      ['Delivery', 'Agile, with continuous feedback. You can see where the work stands at any point.'],
      ['Collaboration', 'We work with your team to understand the problem before proposing an answer to it.'],
    ])}</div>
  </div>
</section>`,
  `
<section class="mv" aria-label="Mission and vision">
  <div class="mv__half sec--ink"><div class="mv__in">
    <h2 class="t-label">Mission</h2>
    <p class="statement">To give businesses technology that is secure, scalable and worth depending on, and to leave their security measurably stronger than we found it.</p>
  </div></div>
  <div class="mv__half sec--white"><div class="mv__in">
    <h2 class="t-label">Vision</h2>
    <p class="statement">To be a technology partner that organizations trust for innovation, excellence and integrity, wherever they operate.</p>
  </div></div>
</section>`,
  `
<section class="sec" aria-labelledby="val-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="t-h2" id="val-h">What we hold ourselves to.</h2></div>
    <ul class="values">
      <li><h3 class="t-h3">Say what is true.</h3><p>Findings, estimates and limits, stated plainly. Including the ones nobody wants to hear.</p></li>
      <li><h3 class="t-h3">Finish the job.</h3><p>A fix that ships is worth more than a recommendation that doesn’t.</p></li>
      <li><h3 class="t-h3">Scope before work.</h3><p>Everyone knows what is in, what is out, and why, before anything starts.</p></li>
      <li><h3 class="t-h3">Build it properly.</h3><p>Secure and maintainable, including the parts nobody will check.</p></li>
    </ul>
  </div>
</section>`,
  `
<section class="sec sec--white phil" aria-label="Philosophy">
  <div class="wrap phil__grid">
    <article>
      <h2 class="t-h2">Technology philosophy.</h2>
      <p class="t-lead">Software should be secure by construction.</p>
      <p>We build cloud-native. We put security into the delivery pipeline rather than behind it. And we prefer a system small enough to be understood over one large enough to hide things in.</p>
    </article>
    <article>
      <h2 class="t-h2">Security philosophy.</h2>
      <p class="t-lead">Security is an engineering problem, not a paperwork one.</p>
      <p>We look at a system the way an attacker would, prove which weaknesses matter, and judge our own work by what gets fixed afterwards.</p>
    </article>
  </div>
</section>`,
  ctaBand({ title: 'What are you building, or protecting?', label: 'Talk to an expert', href: '/contact/', alt: ['See open roles', '/careers/'] }),
].join('\n');

/* ---------- /industries/ ---------- */
const orgs = [
  { id: 'saas', name: 'SaaS companies', is: 'Your product is the business, and your customers have started asking how you secure it.', worry: 'Customer data in a shared application. APIs that return more than they should. Being able to answer a security question with evidence.', start: ['Web application and API testing', '/services/vapt/'] },
  { id: 'startups', name: 'Startups', is: 'You are shipping fast with a small team, and security belongs to nobody in particular.', worry: 'Not knowing what is exposed. Shortcuts taken early that are still live. Spending on the wrong thing first.', start: ['A cloud security assessment', '/services/cloud-security/'] },
  { id: 'smes', name: 'SMEs', is: 'You run on a mix of cloud services, an office network and staff laptops, without a security team.', worry: 'Phishing. Unpatched devices. Nobody watching the firewall or the alerts.', start: ['Managed security', '/services/managed-security/'] },
  { id: 'aws', name: 'Teams building on AWS', is: 'Your infrastructure is an AWS account that has been growing for years.', worry: 'Permissions nobody has reviewed. Storage that may be public. Ports opened for a reason nobody remembers.', start: ['An AWS security configuration review', '/services/cloud-security/'] },
];
const roles = [
  ['Founders', 'Am I exposed, and what will it take to fix?', 'You get a ranked answer in plain language, and a first step sized to where the company is.'],
  ['CTOs', 'What do we fix first, and what can wait?', 'Findings come ordered by risk, so the plan writes itself.'],
  ['Engineering heads', 'Will the findings be specific enough to act on?', 'Each one says what to change. We build software too, and we write for the person doing the fix.'],
];
const industries = () => [
  pageHead({
    crumb: [['Home', '/'], ['Industries']],
    title: 'Who we work with.',
    lead: 'We don’t publish a sector list. We work with a kind of organization: one that builds or runs technology and needs security that keeps pace with it.',
  }),
  `
<section class="sec sec--white" aria-label="Kinds of organization">
  <div class="wrap orgs">
    <nav class="orgs__nav" aria-label="On this page"><ul>${orgs.map((o) => `<li><a href="#${o.id}">${o.name}</a></li>`).join('')}</ul></nav>
    <div class="orgs__list">
      ${orgs.map((o) => `
      <article class="org" id="${o.id}">
        <h2 class="org__name">${o.name}</h2>
        <p class="t-lead">${o.is}</p>
        <dl class="org__dl">
          <div><dt>What tends to worry you</dt><dd>${o.worry}</dd></div>
          <div><dt>Where we usually start</dt><dd>${go(o.start[1], o.start[0])}</dd></div>
        </dl>
      </article>`).join('')}
    </div>
  </div>
</section>`,
  `
<section class="sec" aria-labelledby="roles-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="t-h2" id="roles-h">What you probably want to know.</h2></div>
    <div class="roles">
      ${roles.map(([r, q, a]) => `<div class="role"><h3 class="t-label">${r}</h3><p class="role__q">“${q}”</p><p>${a}</p></div>`).join('')}
    </div>
  </div>
</section>`,
  ctaBand({ title: 'Not sure you fit any of these?', text: 'Tell us what you run. We will say plainly whether we can help.', label: 'Talk to an expert', href: '/contact/' }),
].join('\n');

/* ---------- /insights/ ---------- */
const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const insightsPage = () => [
  pageHead({
    crumb: [['Home', '/'], ['Insights']],
    title: 'Insights.',
    lead: 'Notes on security and engineering, from the work we do.',
  }),
  `
<section class="sec sec--white" aria-label="Articles">
  <div class="wrap ins">
    <aside class="ins__cats" aria-labelledby="cats-h">
      <h2 class="t-label" id="cats-h">What we write about</h2>
      <ul>${insightCategories.map((c) => `<li>${c}</li>`).join('')}</ul>
    </aside>
    <div class="ins__list">
      ${insights.length ? insights.map((p) => `
      <article class="post">
        <p class="t-label"><time datetime="${p.date}">${fmt(p.date)}</time> <span>${p.category}</span></p>
        <h2 class="post__t"><a href="${p.href}">${p.title}</a></h2>
        <p>${p.summary}</p>
      </article>`).join('') : `
      <div class="empty">
        <h2 class="t-h2">Nothing published yet.</h2>
        <p class="t-lead">We would rather publish nothing than filler. When we have something worth your time, it will be here.</p>
        <p>Until then, if there is a security question you would like answered, ask us directly.</p>
        <p>${go('/contact/', 'Ask a question')}</p>
      </div>`}
    </div>
  </div>
</section>`,
].join('\n');

/* ---------- /careers/ ---------- */
const careers = () => [
  pageHead({
    crumb: [['Home', '/'], ['Careers']],
    title: 'Work on real systems.',
    lead: 'We build ThreatReady and test other people’s systems. Both need engineers who want to understand how a thing actually works before they change it.',
  }),
  `
<section class="sec sec--white" aria-labelledby="mind-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="mind-h">How we work.</h2></div>
    <div class="split__b">${ledger([
      ['Engineers first', 'Whether you write the code or attack it, the job is to understand the system.'],
      ['Security is everyone’s', 'It is part of how we build, not a review at the end.'],
      ['Clear writing', 'A finding, a commit message or a design note should be usable by the next person.'],
      ['Small steps, shown early', 'We work in short cycles and show the work as it goes.'],
    ])}</div>
  </div>
</section>`,
  `
<section class="sec" aria-labelledby="where-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="t-h2" id="where-h">Where you might fit.</h2></div>
    <div class="tracks">
      <div class="track track--build"><h3 class="t-h3">Product engineering</h3><p>Designing and building ThreatReady.</p></div>
      <div class="track"><h3 class="t-h3">Security</h3><p>${services.map((s) => s.nav).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p></div>
      <div class="track track--dash"><h3 class="t-h3">Internships and training</h3><p>Run through Aerovant Academy, our training arm.</p><p><a class="go" href="${site.academyUrl}" target="_blank" rel="noopener">Visit Aerovant Academy<span aria-hidden="true">→</span></a></p></div>
    </div>
  </div>
</section>`,
  `
<section class="sec sec--white" aria-labelledby="open-h">
  <div class="wrap split">
    <div class="split__h"><h2 class="t-h2" id="open-h">Open positions.</h2></div>
    <div class="split__b">
      ${openings.length ? `<ul class="jobs">${openings.map((j) => `<li><a href="${j.href}"><strong>${j.title}</strong><span>${j.location} / ${j.type}</span></a></li>`).join('')}</ul>` : `
      <p class="statement">No positions are listed right now.</p>
      <p class="prose">If you think you should be here anyway, write to us with something you have built or broken, and what you learned from it.</p>
      <p><a class="go" href="mailto:${site.email}?subject=Working%20at%20Aerovant">${site.email}<span aria-hidden="true">→</span></a></p>`}
    </div>
  </div>
</section>`,
].join('\n');

/* ---------- /contact/ ---------- */
const reqs = ['Product', 'Cloud Security', 'VAPT', 'Managed Security Services', 'Not sure yet'];
const contact = () => [
  pageHead({
    crumb: [['Home', '/'], ['Contact']],
    title: 'Talk to an expert.',
    lead: 'Tell us what you are building or protecting. A few lines is enough to start.',
  }),
  `
<section class="sec sec--white contact" aria-label="Contact">
  <div class="wrap contact__grid">
    <form class="form" action="https://api.web3forms.com/submit" method="POST" data-contact data-sheet="${site.form.sheetUrl}">
      <input type="hidden" name="access_key" value="${site.form.web3formsKey}">
      <input type="hidden" name="subject" value="Website enquiry">
      <input type="hidden" name="from_name" value="aerovanttech.com">
      <input type="checkbox" name="botcheck" class="form__hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="form__row">
        <p class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required></p>
        <p class="field"><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" required></p>
      </div>
      <div class="form__row">
        <p class="field"><label for="f-company">Company</label><input id="f-company" name="company" type="text" autocomplete="organization" required></p>
        <p class="field"><label for="f-req">Requirement</label><select id="f-req" name="requirement" required><option value="" selected disabled hidden>Choose one</option>${reqs.map((r) => `<option value="${r}">${r}</option>`).join('')}</select></p>
      </div>
      <p class="field"><label for="f-msg">Message</label><textarea id="f-msg" name="message" rows="6" required aria-describedby="f-msg-h"></textarea><span class="field__hint" id="f-msg-h">What you run, and what you are worried about. Please leave out passwords, keys and other secrets.</span></p>
      <p class="form__foot">
        <button class="btn" type="submit"><span>Talk to an expert</span><span class="btn__arrow" aria-hidden="true">→</span></button>
        <span class="t-note">By sending this you agree to our <a href="${u('/privacy/')}">privacy policy</a>.</span>
      </p>
      <p class="form__status" data-status role="status" tabindex="-1"></p>
    </form>
    <aside class="contact__side" aria-label="Other ways to reach us">
      <dl class="reach">
        <div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href="tel:${site.phoneHref}">${site.phone}</a></dd></div>
        <div><dt>Office</dt><dd>${site.address.join('<br>')}</dd></div>
      </dl>
      <h2 class="t-label">What happens next</h2>
      ${steps(startSteps.map(([t]) => [t, '']), 'steps--col steps--sm')}
    </aside>
  </div>
</section>`,
].join('\n');

/* ---------- legal ---------- */
const legal = (title, updated, body) => [
  pageHead({ crumb: [['Home', '/'], [title]], title: title + '.', mod: 'phead--plain' }),
  `<section class="sec sec--white"><div class="wrap legal"><p class="t-note">Last updated ${updated}</p>${body}</div></section>`,
].join('\n');

const privacy = () => legal('Privacy Policy', '6 October 2026', `
<h2>What this covers</h2>
<p>This policy explains what ${site.legalName} (“Aerovant”, “we”) collects through ${site.url.replace('https://', '')} and what we do with it.</p>
<h2>What we collect</h2>
<p>When you send the contact form we receive what you type into it: your name, work email, company, the requirement you select and your message. We do not ask for anything else, and we ask you not to include passwords, keys or other secrets.</p>
<p>This website does not set advertising or analytics cookies.</p>
<h2>How we use it</h2>
<p>We use what you send only to reply to you and to discuss the work you asked about. We do not sell it or use it for advertising.</p>
<h2>Who processes it</h2>
<p>Form submissions are delivered to us by email through Web3Forms, and a copy is recorded in a Google Sheets spreadsheet that we control. Both providers process the data on our behalf.</p>
<h2>How long we keep it</h2>
<p>We keep enquiries for as long as we need them to respond and to maintain a record of our dealings with you. You can ask us to delete yours at any time.</p>
<h2>Your choices</h2>
<p>To see, correct or delete what we hold about you, write to <a href="mailto:${site.email}">${site.email}</a>.</p>
<h2>Contact</h2>
<p>${site.legalName}, ${site.address.join(', ')}.</p>`);

const terms = () => legal('Terms', '6 October 2026', `
<h2>Using this website</h2>
<p>This website is published by ${site.legalName}. You may read it and share links to it. Please do not copy its content or design for commercial use without asking us first.</p>
<h2>Information on this site</h2>
<p>The content describes our product and services in general terms. It is not a quotation, a security assessment or professional advice about your systems. Any work we do for you is governed by the written agreement for that work, not by these pages.</p>
<h2>Product and services</h2>
<p>Product names, descriptions and service offerings may change. Nothing on this site is a commitment to provide a product or service until it is agreed in writing.</p>
<h2>Security testing</h2>
<p>We carry out security testing only against systems whose owner has authorized it in writing. Do not test this website or our systems without our written permission.</p>
<h2>Links</h2>
<p>Where we link to other websites, we are not responsible for what they contain.</p>
<h2>Liability</h2>
<p>We take care to keep this site accurate, but we provide it as it is and, to the extent the law allows, accept no liability for loss arising from relying on it.</p>
<h2>Governing law</h2>
<p>These terms are governed by the laws of India.</p>
<h2>Contact</h2>
<p>Questions about these terms: <a href="mailto:${site.email}">${site.email}</a>.</p>`);

const notFound = () => `
<section class="sec nf"><div class="wrap">
  <p class="t-label">Error 404</p>
  <h1 class="t-display">This page is not here.</h1>
  <p class="t-lead">The address may have changed when we rebuilt the site. These will get you where you were going.</p>
  <p class="nf__links">${btn('/', 'Go to the homepage')} ${go('/products/', 'Product')} ${go('/services/', 'Services')} ${go('/contact/', 'Contact')}</p>
</div></section>`;

export default [
  { path: '/about/', title: 'About', description: 'Aerovant Technologies is a technology and cybersecurity company based in Krishnagiri, Tamil Nadu. We build ThreatReady and secure the systems other companies depend on.', render: about },
  { path: '/industries/', title: 'Who we work with', description: 'Aerovant works with SaaS companies, startups, SMEs and teams building on AWS that need practical cybersecurity support.', render: industries },
  { path: '/insights/', title: 'Insights', description: 'Notes on cybersecurity, cloud security, VAPT and engineering from Aerovant Technologies.', render: insightsPage },
  { path: '/careers/', title: 'Careers', description: 'Work at Aerovant Technologies: product engineering and security roles, and internships through Aerovant Academy.', render: careers },
  { path: '/contact/', title: 'Contact', description: 'Talk to an expert at Aerovant Technologies about ThreatReady or cybersecurity services.', render: contact },
  { path: '/privacy/', title: 'Privacy Policy', description: 'How Aerovant Technologies handles information sent through this website.', render: privacy },
  { path: '/terms/', title: 'Terms', description: 'Terms of use for the Aerovant Technologies website.', render: terms },
  { path: '/404/', file: '404.html', title: 'Page not found', description: 'This page could not be found.', noindex: true, render: notFound },
];
