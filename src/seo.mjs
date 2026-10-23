// Search and AI-engine metadata: schema.org structured data (JSON-LD), robots.txt and llms.txt.
// Everything is derived from src/site.mjs and the page list, so a new page or article gets it automatically.
import { site, products, services, insights } from './site.mjs';

const ORG = `${site.url}/#org`;

// The phrases people in India search for each offering (Google India autocomplete, October 2026).
// Used as alternateName / keywords in structured data and in llms.txt, never as visible copy.
export const searchTerms = {
  'cloud-security': ['AWS security audit', 'AWS security assessment', 'cloud security assessment services', 'AWS cloud security services'],
  vapt: ['VAPT services in India', 'VAPT audit', 'penetration testing services', 'web application penetration testing', 'API security testing', 'network penetration testing'],
  'managed-security': ['managed security services provider (MSSP)', 'SOC as a Service', 'managed SOC services', 'managed EDR', 'WAF management'],
  threatready: ['cybersecurity interview preparation', 'cyber security mock interview', 'SOC analyst interview preparation', 'cybersecurity skills assessment', 'cybersecurity hands-on labs'],
};
const WEBSITE = `${site.url}/#website`;

/** HTML fragment → plain text for metadata (tags stripped, entities decoded). */
export const plain = (s) => String(s)
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();

/* ---------- collected while a page renders ---------- */
// pageHead() reports its breadcrumb and faq() its questions; page$() drains them into the page's JSON-LD.
let bag = { crumb: null, faq: [] };
export const collectCrumb = (crumb) => { bag.crumb = crumb; };
export const collectFaq = (items) => { bag.faq.push(...items); };
function drain() { const b = bag; bag = { crumb: null, faq: [] }; return b; }

/* ---------- building blocks ---------- */
const [street, cityLine, country] = site.address;
const [, city, region, postcode] = /^(.*?),\s*(.*?)\s+(\d{6})$/.exec(cityLine) || [];

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG,
  name: site.name,
  legalName: site.legalName,
  url: site.url + '/',
  logo: `${site.url}/assets/img/apple-touch-icon.png`,
  image: `${site.url}/assets/img/og.png`,
  description: plain(site.summary),
  slogan: site.tagline,
  email: site.email,
  telephone: site.phoneHref,
  address: { '@type': 'PostalAddress', streetAddress: street, addressLocality: city, addressRegion: region, postalCode: postcode, addressCountry: country === 'India' ? 'IN' : country },
  sameAs: site.social.map(([, href]) => href),
  knowsAbout: ['Cybersecurity', 'Cloud security', 'AWS security audit', 'Vulnerability assessment and penetration testing (VAPT)', 'Web application penetration testing', 'API security testing', 'Network penetration testing', 'Managed security services', 'SOC as a Service', 'Cybersecurity skills assessment'],
  makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': `${site.url}/services/${s.id}/#service` } })),
  brand: products.map((p) => ({ '@type': 'Brand', name: p.name, url: p.url })),
});

const webpageType = (path) => ({ '/about/': 'AboutPage', '/contact/': 'ContactPage', '/insights/': 'CollectionPage' })[path] || 'WebPage';

function breadcrumb(crumb, canonical) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: crumb.map(([name, href], i) => ({
      '@type': 'ListItem', position: i + 1, name: plain(name),
      item: href ? site.url + href.replace(/[?#].*$/, '') : canonical,
    })),
  };
}

export const serviceLd = (s) => ({
  '@type': 'Service',
  '@id': `${site.url}/services/${s.id}/#service`,
  name: plain(s.name),
  serviceType: plain(s.name),
  alternateName: searchTerms[s.id],
  areaServed: { '@type': 'Country', name: 'India' },
  description: plain(s.line),
  url: `${site.url}/services/${s.id}/`,
  provider: { '@id': ORG },
  audience: { '@type': 'BusinessAudience', name: 'Startups, SaaS companies and SMEs' },
  hasOfferCatalog: s.items ? {
    '@type': 'OfferCatalog', name: plain(s.name),
    itemListElement: s.items.map(([n, d]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: plain(n), ...(d ? { description: plain(d) } : {}) } })),
  } : undefined,
});

export const productLd = (p) => ({
  '@type': 'SoftwareApplication',
  '@id': `${site.url}/products/#${p.id}`,
  name: p.name,
  applicationCategory: 'EducationalApplication',
  keywords: (searchTerms[p.id] || []).join(', '),
  operatingSystem: 'Web',
  url: p.url,
  description: plain(`${p.line} ${p.does}`),
  publisher: { '@id': ORG },
});

export const articleLd = (p, canonical) => ({
  '@type': 'BlogPosting',
  '@id': `${canonical}#article`,
  headline: plain(p.title).slice(0, 110),
  description: plain(p.description ?? p.summary),
  image: [`${site.url}/assets/${p.image}`],
  datePublished: p.date,
  dateModified: p.updated ?? p.date,
  articleSection: p.category,
  ...(p.keywords ? { keywords: p.keywords.join(', ') } : {}),
  inLanguage: 'en',
  author: { '@type': 'Organization', name: p.author, url: site.url + '/' },
  publisher: { '@id': ORG },
  mainEntityOfPage: { '@id': canonical },
  isAccessibleForFree: true,
});

export const articleListLd = (canonical) => ({
  '@type': 'ItemList',
  '@id': `${canonical}#articles`,
  itemListElement: insights.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.url}/insights/${p.slug}/`, name: plain(p.title) })),
});

/** The page's full JSON-LD graph, as a <script> tag. */
export function jsonLd({ path, title, description, ld }) {
  const canonical = site.url + path;
  const { crumb, faq } = drain();
  const graph = [
    organization(),
    { '@type': 'WebSite', '@id': WEBSITE, url: site.url + '/', name: site.name, publisher: { '@id': ORG }, inLanguage: 'en' },
    {
      '@type': webpageType(path), '@id': `${canonical}#webpage`, url: canonical, name: plain(title), description: plain(description),
      isPartOf: { '@id': WEBSITE }, about: { '@id': ORG }, inLanguage: 'en',
      ...(crumb ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    },
    ...(crumb ? [breadcrumb(crumb, canonical)] : []),
    ...(faq.length ? [{
      '@type': 'FAQPage', '@id': `${canonical}#faq`,
      mainEntity: faq.map(([q, ans]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(ans) } })),
    }] : []),
    ...(ld ? ld(canonical) : []),
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

/* ---------- robots.txt ---------- */
// Search engines and AI assistants are all welcome. They are named explicitly so the policy is unambiguous;
// to opt out of AI training while staying in AI search, move GPTBot, ClaudeBot, Google-Extended and
// Applebot-Extended into a group with "Disallow: /".
const aiAgents = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot',
];
export const robotsTxt = () => [
  'User-agent: *', 'Allow: /', '',
  '# Search and AI assistant crawlers are welcome',
  ...aiAgents.map((a) => `User-agent: ${a}`), 'Allow: /', '',
  `Sitemap: ${site.url}/sitemap.xml`, '',
].join('\n');

/* ---------- llms.txt (https://llmstxt.org) ---------- */
export function llmsTxt(pages) {
  const line = (path, fallback) => {
    const p = pages.find((x) => x.path === path);
    return `- [${plain(p?.title ?? fallback)}](${site.url}${path}): ${plain(p?.description ?? '')}`;
  };
  const [cloud, vapt, managed] = services;
  return `# ${site.name}

> ${plain(site.summary)}

Based in ${plain(site.address.join(', '))}. Contact: ${site.email}, ${plain(site.phone)}. ${plain(site.replyTime)}

Key facts:
- What we build: ${products.map((p) => `${p.name} (${p.kind.toLowerCase()}, ${p.url})`).join('; ')}.
- What we secure: AWS cloud environments, web applications, APIs and networks.
- Who we help: founders, CTOs and engineering heads at startups, SaaS companies and SMEs.
- Services: ${services.map((s) => `${plain(s.name)} (also: ${searchTerms[s.id].join(', ')})`).join('; ')}.
- ThreatReady covers: ${searchTerms.threatready.join(', ')}.

## Services
${line('/services/', 'Cybersecurity services')}
${line(`/services/${cloud.id}/`, cloud.name)}
${line(`/services/${vapt.id}/`, vapt.name)}
${line(`/services/${managed.id}/`, managed.name)}

## Product
${line('/products/', 'ThreatReady')}
${products.map((p) => `- [${p.name} website](${p.url}): ${plain(p.line)}`).join('\n')}

## Insights
${line('/insights/', 'Insights')}
${insights.map((p) => `- [${plain(p.title)}](${site.url}/insights/${p.slug}/): ${plain(p.description ?? p.summary)} (${p.category}, ${p.updated ?? p.date})`).join('\n')}

## Company
${line('/about/', 'About')}
${line('/industries/', 'Who we work with')}
${line('/careers/', 'Careers')}
${line('/contact/', 'Contact')}

## Optional
${line('/privacy/', 'Privacy Policy')}
${line('/terms/', 'Terms')}
`;
}
