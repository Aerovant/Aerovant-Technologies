import php2shell from './insights/php2shell.mjs';
import emudhra from './insights/emudhra.mjs';
import nextjs from './insights/nextjs-nodejs-security.mjs';
// Single source of truth for company facts, products, services and navigation.
// Everything here was taken from the previous website repo or the redesign brief.
// Nothing on the site should state a fact that is not in this file.

export const site = {
  name: 'Aerovant Technologies',
  legalName: 'Aerovant Technologies Pvt. Ltd.', // CONFIRM against the certificate of incorporation; ThreatReady uses this form
  url: 'https://aerovanttech.com',
  tagline: 'Where cloud, code and security converge.',
  email: 'admin@aerovanttech.com',         // enquiries, privacy requests and security reports (also in src/static/.well-known/security.txt)
  careersEmail: 'hr@aerovanttech.com',     // job applications only
  replyTime: 'We reply within one business day.',
  phone: '+91&nbsp;90426&nbsp;47714', // HTML: non-breaking spaces keep the number on one line
  phoneHref: '+919042647714',
  address: ['Rayakkottai Road', 'Krishnagiri, Tamil Nadu 635002', 'India'],
  academyUrl: 'https://www.aerovantacademy.com',
  social: [
    ['LinkedIn', 'https://www.linkedin.com/company/aerovant-technologies'],
    ['X', 'https://x.com/aerovant_tech'],
    ['Instagram', 'https://www.instagram.com/aerovant_technologies'],
    ['Facebook', 'https://www.facebook.com/profile.php?id=61587139213075'],
  ],
  // Contact form endpoints carried over from the previous site (index.html).
  form: {
    web3formsKey: 'fdce5957-5ac0-4118-811b-8704da29e5a5',
    sheetUrl: 'https://script.google.com/macros/s/AKfycbyS4di6x8lkv0U16u5o_V7eT7mzMTeINYEGf3VQl9srq3S7ugqu43lTGmlyhwW7bkMD/exec',
  },
};

// ThreatReady, matching the product's own landing page (Think / Do / Prove, 15 role tracks, one published rubric).
// Only links that work on threatready.io today are used: the home page, the demo anchor and the sample report.
// Pilots and team enquiries come through this site's contact form until threatready.io carries its own pilot page.
export const products = [
  {
    id: 'threatready',
    name: 'ThreatReady',
    kind: 'Cybersecurity skills platform',
    line: 'Train, test and hire security engineers on real work, not on certificates.',
    problem: 'A certificate shows what someone studied, not what they can do when an alert fires. Most candidates find the gap in the interview room, and most employers find it after the hire.',
    does: 'Role-based practice and assessment across 15 security role tracks, from Beginner to Expert. People reason through attacks, do the daily work of the role and sit an interview built from a real job description. Every answer is scored on one published rubric.',
    value: 'One report a candidate, a manager or a hiring team can read the same way: what this person can do, and what to fix first.',
    url: 'https://threatready.io/',
    demo: 'https://threatready.io/#trydemo',
    sample: 'https://threatready.io/sample-report.html',
    tracks: 15,
    pillars: [
      { verb: 'Think', name: 'Attack Reasoning Lab', line: 'Adaptive attack scenarios on a real architecture, mapped to MITRE ATT&amp;CK. Each answer is followed up, question by question.' },
      { verb: 'Do', name: 'Lab Simulations', line: 'Step-by-step tasks from the daily work of each role: triage an alert, review a policy, contain a threat, write it up. Levels run Beginner to Expert.', status: 'Rolling out role by role' },
      { verb: 'Prove', name: 'InterviewPrep', line: 'Upload a job description and a resume. Get an interview built for that role, and a report scored on five dimensions.' },
    ],
    audiences: [
      { id: 'hiring', name: 'Hiring teams', line: 'A structured first-round screen. Each candidate gets the same rubric and a report your team can review, so engineers interview only the shortlist.', topic: 'threatready-hiring', cta: 'Request a hiring pilot' },
      { id: 'teams', name: 'Engineering teams', line: 'Role tracks for the security, cloud and DevSecOps engineers you already have, with progress you can see by role and level.', topic: 'threatready-teams', cta: 'Discuss team training' },
      { id: 'colleges', name: 'Colleges and bootcamps', line: 'Real task experience for final-year cohorts before placements, starting at Beginner.', topic: 'threatready-colleges', cta: 'Ask about cohorts' },
      { id: 'people', name: 'Individuals', line: 'Students, freshers and working engineers. The free plan covers Beginner on any role.', href: 'https://threatready.io/', cta: 'Start on threatready.io' },
    ],
    trust: [
      ['Published rubric', 'Five dimensions, each with written score bands. Anyone can read how an answer is judged.'],
      ['Three scoring passes', 'An evaluator, a challenger and a reconciler. Where they disagree, the score carries a confidence flag.'],
      ['Integrity controls', 'Paste disabled, forward-only sessions and a new architecture on every retake.'],
      ['Right to challenge', 'Any score can be disputed within 14 days and is reviewed by a security engineer.'],
    ],
  },
];

// Services: exactly the agreed offering. Do not add items here without a commercial decision.
export const services = [
  {
    id: 'cloud-security',
    name: 'Cloud Security',
    nav: 'Cloud Security',
    outcome: 'Know what is exposed.',
    line: 'A clear picture of how your AWS environment is exposed, and what to change first.',
    // CONFIRM: the references the team actually works to.
    methods: ['CIS AWS Foundations Benchmark', 'AWS Well-Architected Framework, Security Pillar'],
    items: [
      ['AWS Cloud Security', 'Protecting the applications, data and infrastructure you run on AWS.'],
      ['Cloud Security Assessment', 'A structured look at your cloud environment to find what is exposed and what that puts at risk.'],
      ['AWS Security Configuration Review', 'A review of how your AWS services are configured against how they should be.'],
    ],
  },
  {
    id: 'vapt',
    name: 'Vulnerability Assessment &amp; Penetration Testing',
    nav: 'VAPT',
    outcome: 'Prove what is exploitable.',
    line: 'Testing that shows which weaknesses can actually be used against you, with the evidence.',
    // CONFIRM: the references the team actually works to.
    methods: ['OWASP Web Security Testing Guide', 'OWASP API Security Top 10', 'PTES (Penetration Testing Execution Standard)'],
    items: [
      ['Web Application VAPT', 'Your web application tested the way an attacker would approach it.'],
      ['API Security Testing', 'Your APIs tested for what they return, and to whom.'],
      ['Network Security Testing', 'Your network tested for what is reachable that should not be.'],
    ],
  },
  {
    id: 'managed-security',
    name: 'Managed Security Services',
    nav: 'Managed Security Services',
    outcome: 'Know if it happens again.',
    line: 'Security operations run for you, so someone is watching after the test is over.',
    // CONFIRM before merging: this is what the site now promises.
    hours: 'Business hours, IST (Monday to Friday). Out-of-hours cover by arrangement.',
    items: [
      ['SOC-as-a-Service', 'Security monitoring and response run as a service.'],
      ['EDR Management', 'Your endpoint detection and response tooling, managed.'],
      ['Firewall Management', 'Your firewall rules and changes, managed.'],
      ['WAF Management', 'Your web application firewall, managed.'],
      ['Threat Intelligence &amp; Advisories', 'Advisories on the threats that matter to your stack.'],
    ],
  },
];

// The six attack-surface layers and their examples, as given in the brief (top of stack first).
export const layers = [
  ['People', 'A phishing email handing over credentials.'],
  ['Applications', 'An injection flaw or broken access control.'],
  ['APIs', 'An endpoint returning another user’s data.'],
  ['Identity', 'A leaked access key or an account without MFA.'],
  ['Network &amp; Endpoints', 'An exposed admin port or an unpatched laptop.'],
  ['Cloud', 'A public storage bucket or an over-permissive IAM role.'],
];

export const journey = [
  { verb: 'Discover', q: 'What can be attacked?', body: 'Map what you run and how it is exposed, starting with your cloud.', links: [['Cloud Security', '/services/cloud-security/']] },
  { verb: 'Test', q: 'Can it actually be exploited?', body: 'Attempt it, under an agreed scope, and keep the evidence.', links: [['VAPT', '/services/vapt/']] },
  { verb: 'Fix', q: 'What do we change first?', body: 'Findings ranked by risk, written so your engineers can act on them.', links: [] },
  { verb: 'Watch', q: 'Would we know if it happened again?', body: 'Monitoring and managed controls once the testing is done.', links: [['Managed Security', '/services/managed-security/']] },
];

export const startSteps = [
  ['Tell us what you want to protect.', 'A product, a cloud account, a network. A few lines is enough.'],
  ['We review your exposure and requirements.', 'We look at what you run and what you are worried about.'],
  ['You receive a clear recommendation.', 'What we would do, in what order, and what is out of scope.'],
  ['You start with what matters most.', 'One piece of work, not a programme you didn’t ask for.'],
];

export const insightCategories = ['Cybersecurity', 'Cloud Security', 'VAPT', 'Technology', 'SaaS', 'Threat Intelligence'];

// Published articles. Each lives in src/insights/<slug>.mjs and gets its own page at /insights/<slug>/.
// Newest first is applied automatically; same-day articles keep the order listed here.
export const insights = [nextjs, emudhra, php2shell].sort((x, y) => y.date.localeCompare(x.date));

// Add open roles here: { title, location, type, href }
export const openings = [];

/* ---------- path + asset helpers (set per page by build.mjs) ---------- */
let ctx = { depth: 0, mode: 'web', assets: {} };
export const setCtx = (c) => { ctx = { ...ctx, ...c }; };

/** Internal link. Write paths root-absolute ("/services/vapt/"); output adapts to the build mode. */
export function u(path) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // external (https:, mailto:) links pass through untouched
  if (ctx.mode === 'bundle') return '#' + path;
  if (ctx.abs) return path;
  const [, p, query = '', hash = ''] = path.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const rel = '../'.repeat(ctx.depth) + p.replace(/^\//, '');
  const file = ctx.mode === 'file' && (rel === '' || rel.endsWith('/')) ? rel + 'index.html' : rel || './';
  return file + query + hash;
}
/** Asset URL (or inlined data URI in the single-file preview). */
export function a(file) {
  if (ctx.mode === 'bundle') return ctx.assets[file];
  if (ctx.abs) return '/assets/' + file;
  return '../'.repeat(ctx.depth) + 'assets/' + file;
}
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
