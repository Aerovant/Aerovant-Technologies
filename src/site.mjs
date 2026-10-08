// Single source of truth for company facts, products, services and navigation.
// Everything here was taken from the previous website repo or the redesign brief.
// Nothing on the site should state a fact that is not in this file.

export const site = {
  name: 'Aerovant Technologies',
  legalName: 'Aerovant Technology Pvt. Ltd.', // as written in the previous site footer
  url: 'https://aerovanttech.com',
  tagline: 'Where cloud, code and security converge.',
  email: 'hr@aerovanttech.com',
  phone: '+91 90426 47714',
  phoneHref: '+919042647714',
  address: ['Rayakkottai Road', 'Krishnagiri, Tamil Nadu 635002', 'India'],
  academyUrl: 'https://www.aerovantacademy.com',
  social: [
    ['LinkedIn', 'https://www.linkedin.com/in/aerovant-technologies-7a72bb3aa'],
    ['YouTube', 'https://youtube.com/@aerovanttechnologies'],
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

// Product details supplied for ThreatReady.
export const products = [
  {
    id: 'threatready',
    name: 'ThreatReady',
    kind: 'Cybersecurity job-readiness platform',
    line: 'Find out whether you can do the security job before the interview does.',
    problem: 'A certificate shows what someone studied, not what they can do when an alert fires. Most candidates only discover the gap in the interview room, and most employers after the hire.',
    does: 'A cybersecurity readiness platform that runs AI interviews built from a candidate’s resume and the target job description, puts them through role-specific attack simulations and scores both against one skill profile.',
    value: 'Candidates walk in knowing where they stand for the role and what to fix first.',
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
    items: [
      ['AWS Cloud Security', 'Protecting the applications, data and infrastructure you run on AWS.'],
      ['Cloud Security Assessment', 'A structured look at your cloud environment to find what is exposed and what that puts at risk.'],
      ['AWS Security Configuration Review', 'A review of how your AWS services are configured against how they should be.'],
    ],
  },
  {
    id: 'vapt',
    name: 'Vulnerability Assessment & Penetration Testing',
    nav: 'VAPT',
    outcome: 'Prove what is exploitable.',
    line: 'Testing that shows which weaknesses can actually be used against you, with the evidence.',
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
    items: [
      ['SOC-as-a-Service', 'Security monitoring and response run as a service.'],
      ['EDR Management', 'Your endpoint detection and response tooling, managed.'],
      ['Firewall Management', 'Your firewall rules and changes, managed.'],
      ['WAF Management', 'Your web application firewall, managed.'],
      ['Threat Intelligence & Advisories', 'Advisories on the threats that matter to your stack.'],
    ],
  },
];

// The six attack-surface layers and their examples, as given in the brief (top of stack first).
export const layers = [
  ['People', 'A phishing email handing over credentials.'],
  ['Applications', 'An injection flaw or broken access control.'],
  ['APIs', 'An endpoint returning another user’s data.'],
  ['Identity', 'A leaked access key or an account without MFA.'],
  ['Network & Endpoints', 'An exposed admin port or an unpatched laptop.'],
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

// Add published articles here: { title, date: 'YYYY-MM-DD', category, summary, href }
export const insights = [];

// Add open roles here: { title, location, type, href }
export const openings = [];

/* ---------- path + asset helpers (set per page by build.mjs) ---------- */
let ctx = { depth: 0, mode: 'web', assets: {} };
export const setCtx = (c) => { ctx = { ...ctx, ...c }; };

/** Internal link. Write paths root-absolute ("/services/vapt/"); output adapts to the build mode. */
export function u(path) {
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
