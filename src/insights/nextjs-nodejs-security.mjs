// One article. Metadata drives the Insights list; body() renders the article page.
import { site, u } from '../site.mjs';
import { table, code } from './kit.mjs';

export default {
  slug: 'nextjs-nodejs-security',
  title: 'Next.js on Node.js: Four Layers, Four Ways In',
  date: '2026-10-23',
  category: 'Cybersecurity',
  author: 'Aerovant Technologies Security Team',
  summary: 'The most serious Next.js vulnerabilities of the past year were not in application code but in the layers underneath: the framework, React Server Components, Node.js and image libraries. What was fixed in October 2026, who is affected, and how to check and patch your apps.',
  image: 'img/insights/nextjs-nodejs-security.jpg',
  imageW: 1600,
  imageH: 900,
  imageAlt: 'A terminal running next build beside Next.js and Node.js logos and a red warning triangle, with the words Security Alert.',
  body: () => `
<p class="art__lede">When teams think about Next.js security, they think about their own code: an API route without an auth check, a form that trusts its input. Those bugs are real. But over the past year, the most serious Next.js vulnerabilities were not in anyone’s application code.</p>
<p>They were in the layers underneath: the Next.js framework, React Server Components, the Node.js runtime and the C libraries that process images. One of them scored a perfect CVSS 10.0 and was exploited within hours of disclosure. Two more critical flaws were patched in Next.js on 14 October 2026, and the Node.js runtime fixed its own remote code execution bug a week later.</p>

<aside class="art__tldr" aria-labelledby="tldr-h">
  <h2 id="tldr-h">TL;DR</h2>
  <dl>
    <div><dt>What</dt><dd>Critical and high-severity bugs in every layer under a Next.js app: the framework, React Server Components, Node.js and image libraries</dd></div>
    <div><dt>Severity</dt><dd>Up to CVSS 10.0 (React2Shell, December 2025). The October 2026 Next.js RCEs are CVSS v4 9.5; the Node.js Brotli RCE is rated High</dd></div>
    <div><dt>Who</dt><dd>Any team running Next.js on Node.js, especially self-hosted App Router apps</dd></div>
    <div><dt>Worst case</dt><dd>Unauthenticated code execution on the server, with access to every secret in its environment</dd></div>
    <div><dt>Fixed in</dt><dd>Next.js 16.4.1 or 15.5.28, with sharp 0.35.5 or later. Node.js 26.12.1, 24.22.1 or 22.23.4</dd></div>
    <div><dt>Exploitation</dt><dd>React2Shell was mass-exploited within hours. No public reports of exploitation for the October 2026 Next.js or Node.js flaws at release</dd></div>
    <div><dt>Do today</dt><dd>Check Next.js, sharp and Node.js versions on every app; upgrade, rebuild, redeploy and restart</dd></div>
  </dl>
</aside>

<p>If you run a Next.js product, marketing site or internal tool on your own servers or containers, read on.</p>

<h2>What happened</h2>
<p>This is not one incident but a run of them. Each hit a different layer, and each was fixed upstream, outside the code most teams review.</p>
${table(['Date', 'Event'], [
  ['21 Oct 2026', 'Node.js fixes 10 CVEs across 26.x, 24.x and 22.x, including a Brotli decoder out-of-bounds write that permits remote code execution (CVE-2026-111497)'],
  ['14 Oct 2026', 'Next.js 16.4.1 and 15.5.28 fix two critical RCEs (SVG image processing, CVE-2026-96889; <code>use cache</code> typed arrays) and a Server Actions DoS'],
  ['Sep 2026', 'A <code>next/og</code> flaw lets attacker-controlled text change the SVG it generates (reported by The Hacker News)'],
  ['Aug 2026', 'A libheif bug, reached through sharp, allows code execution via crafted AVIF images (reported by The Hacker News)'],
  ['7 May 2026', 'Next.js 16.2.6 and 15.5.18 ship 13 advisories: middleware and proxy bypass, SSRF, cache poisoning, XSS and DoS'],
  ['30 Apr 2026', 'Node.js 20 reaches end of life; it receives no further upstream security fixes'],
  ['3–5 Dec 2025', 'React2Shell (CVE-2025-55182, CVSS 10.0) is disclosed on 3 Dec; Datadog records scanning that evening and 800+ attacking IPs by 5 Dec'],
  ['21 Mar 2025', 'Next.js middleware bypass (CVE-2025-29927) is disclosed'],
])}
<p>The pattern is the detail that matters. Image processing alone produced three code execution flaws in three months, and none of them was in Next.js’s own code.</p>

<h2>How Next.js and Node.js fit together</h2>
<p>Next.js is not a server on its own. It is a framework that runs inside a Node.js process, and Node.js in turn calls native C and C++ libraries for compression, TLS and image processing. Every request travels down through these layers and back up.</p>
<p>A simple way to picture it is a restaurant. The browser is the customer and the CDN is the front door. Node.js is the building and its utilities. Next.js is the kitchen layout and order system, React Server Components are the recipes, and the native libraries are the specialist machines at the back. A fire in any room closes the restaurant, however good the recipes are.</p>
<p>What each layer does, and where untrusted data enters it:</p>
${table(['Layer', 'What it does', 'Where outside data gets in'], [
  ['Next.js framework', 'Middleware (now also called proxy), routing, Route Handlers, the image optimiser at <code>/_next/image</code>', 'Every request; middleware runs first, and many teams put authentication there'],
  ['React Server Components', 'Renders on the server and streams to the browser in React’s Flight format; Server Actions and <code>use cache</code> use the same format', 'Server Action arguments, which arrive from the browser as Flight data'],
  ['Node.js runtime', 'HTTP parsing, TLS, DNS, zlib/Brotli decompression, outbound <code>fetch()</code> (Undici)', 'Request bodies, compressed responses from servers you fetch, hostnames you resolve'],
  ['Native libraries', 'sharp → libvips → librsvg (SVG), libheif (AVIF); OpenSSL for TLS', 'Uploaded or remote images, certificates'],
])}
<p>Two misconceptions cause most of the trouble:</p>
<ul>
  <li><strong>“Server code is private.”</strong> Every exported Server Action is a public HTTP endpoint that anyone can call with any arguments, whether or not your UI shows a button for it.</li>
  <li><strong>“Middleware protects my routes.”</strong> Middleware is a convenience layer. If it can be skipped, every route behind it opens.</li>
</ul>
<p>Some routes can run on the lighter Edge runtime instead of full Node.js. It has no native addons, so sharp-based image bugs do not apply there, but it still parses untrusted input. Know which runtime each route uses.</p>

<h2>How the attacks work</h2>
<p>Five attack paths cover the incidents above. Each one hits a different layer.</p>

<h3>Middleware bypass: skipping the bouncer</h3>
<p>Next.js used an internal header, <code>x-middleware-subrequest</code>, to avoid running middleware twice. In CVE-2025-29927:</p>
<ol>
  <li>The attacker adds <code>x-middleware-subrequest</code> to a request, with the value Next.js expects for that version.</li>
  <li>Next.js treats the request as an internal subrequest and skips middleware.</li>
  <li>Any page whose only authentication check lived in middleware is served to the attacker.</li>
</ol>
<p>Fixed in 15.2.3, 14.2.25, 13.5.9 and 12.3.5. The May 2026 release fixed four more High-severity middleware and proxy bypasses.</p>

<h3>React2Shell: hostile serialised data</h3>
<p>CVE-2025-55182 was an unsafe deserialisation flaw in React’s Flight decoder:</p>
<ol>
  <li>The attacker sends a crafted request to a React Server Components endpoint.</li>
  <li>The server-side decoder accepts values that should only ever come from React itself.</li>
  <li>Those values steer execution, and the attacker runs code on the server.</li>
</ol>
<p>A fresh <code>create-next-app</code> project was exposed by default. Datadog saw payloads that downloaded shell scripts, stole environment files and dropped binaries.</p>

<h3>Poisoned images: native library bugs</h3>
<p>In CVE-2026-96889, a memory bug in librsvg, which Next.js reaches through sharp, can lead to code execution on glibc-based Linux:</p>
<ol>
  <li>The attacker gets a crafted SVG in front of the image pipeline, for example as an uploaded avatar.</li>
  <li>Next.js hands it to sharp, which calls librsvg to render it.</li>
  <li>librsvg mishandles memory while parsing the crafted shapes.</li>
  <li>The attacker’s code runs inside the Node.js server process.</li>
</ol>
<p>Next.js does not optimise SVGs by default. According to The Hacker News, exposure needs <code>images.dangerouslyAllowSVG</code> turned on or <code>next/og</code> running on the Node.js runtime; the official advisory states only the glibc Linux condition.</p>

<h3>Runtime bugs: compressed data that writes back</h3>
<p>In Node.js CVE-2026-111497, the bundled Brotli decoder has an out-of-bounds write that permits remote code execution. Node’s built-in <code>fetch()</code> decompresses Brotli responses automatically, so a feature that fetches user-supplied URLs (link previews, webhooks, importers) can be enough:</p>
<ol>
  <li>The attacker submits a URL that points to a server they control.</li>
  <li>Your Next.js Route Handler or Server Action calls <code>fetch()</code> on it.</li>
  <li>Their server replies with <code>Content-Encoding: br</code> and a crafted body.</li>
  <li>The vulnerable decoder writes out of bounds while decompressing it.</li>
</ol>
<p>The same release fixed a <code>dns.resolve()</code> bug that truncated hostnames at a NUL byte, so the name an SSRF filter checked could differ from the one resolved, plus two TLS hostname verification bypasses.</p>

<h3>Unprotected Server Actions: the forgotten endpoint</h3>
<p>This one is in your code, and it is the most common. Every exported Server Action is reachable by HTTP POST.</p>
${code('TypeScript · vulnerable', `
// Vulnerable: any logged-in user can delete any invoice
'use server';
export async function deleteInvoice(invoiceId: string) {
  await db.invoice.delete({ where: { id: invoiceId } });
}`)}
${code('TypeScript · fixed', `
// Fixed: authenticate, validate input, scope the query to the owner
'use server';
import { z } from 'zod';
import { requireUser } from '@/lib/dal';

const Input = z.object({ invoiceId: z.string().uuid() });

export async function deleteInvoice(raw: unknown) {
  const user = await requireUser();
  const { invoiceId } = Input.parse(raw);
  await db.invoice.deleteMany({ where: { id: invoiceId, ownerId: user.userId } });
}`)}

<h3>What an attacker gets</h3>
<p>Code execution as the user running the Node.js process. In most Next.js deployments that means everything in <code>process.env</code>: database URLs, auth signing secrets such as <code>NEXTAUTH_SECRET</code>, payment and AI API keys, and often cloud credentials. With a session signing secret, an attacker can forge logins for any user. With cloud credentials, they can move from the web tier into storage and databases.</p>

<h2>Who is affected</h2>
${table(['Component', 'Status', 'Action'], [
  ['Next.js 16.x', 'Affected through 16.4.0 (SVG RCE, <code>use cache</code> RCE, Server Actions DoS)', 'Upgrade to 16.4.1'],
  ['Next.js 15.x', 'Affected through 15.5.27 (SVG RCE, Server Actions DoS)', 'Upgrade to 15.5.28 and make sure sharp is 0.35.5+'],
  ['Next.js 10.x–14.x', 'SVG RCE affects 10.0.0 onwards; no patch on these lines', 'Upgrade to 15.5.28 or 16.4.1'],
  ['react-server-dom-*', '19.0.0–19.3.0 affected by the <code>use cache</code> issue upstream', 'Upgrade through the patched Next.js release'],
  ['Node.js 26.x / 24.x / 22.x', 'Affected below 26.12.1 / 24.22.1 / 22.23.4', 'Upgrade and restart'],
  ['Node.js 20.x and older', 'End of life, affected, no upstream fix', 'Move to 22 or 24'],
])}
<p><strong>The sharp caveat.</strong> Next.js 15.5.28 still accepts the vulnerable sharp 0.34.x, and an upgrade over an existing install can leave it in place. Version 16.4.1 requires 0.35.5. On 15.x, always check <code>npm ls sharp</code>.</p>
<p><strong>The scanner caveat.</strong> At release, the <code>use cache</code> and Server Actions advisories had no CVE and were missing from the feed <code>npm audit</code> uses. A clean audit is not proof you are patched.</p>

<h2>Is it being exploited?</h2>
${table(['Source', 'What they report'], [
  ['Datadog Security Labs', 'React2Shell: scanning from about 22:00 UTC on 3 Dec 2025; 800+ attacking IPs by 5 Dec; weaponised payloads observed'],
  ['The Hacker News', 'October 2026 Next.js flaws: no public reports of exploitation as of 15 Oct'],
  ['SecurityOnline', 'October 2026 Node.js flaws: the Node.js team reports no exploitation in the wild and no confirmed public proof of concept'],
])}
<p>React2Shell is the warning. It went from disclosure to mass scanning in hours. The October flaws sit in the same layers, so treat “no attacks yet” as a head start, not a reason to wait.</p>

<h2>Why this hits Indian startups and SMEs hard</h2>
<p>Next.js has become a default choice for Indian SaaS startups, D2C brands and agency-built products. Three patterns make these bugs especially risky here.</p>
<ul>
  <li><strong>The agency-built app nobody owns.</strong> An agency delivered the product, the contract ended, and nobody upgrades its dependencies. It may still be on Next.js 13 or 14, or on Node.js 18 or 20, which get no fix.</li>
  <li><strong>Self-hosted containers on a VPS or EC2.</strong> A Next.js app in Docker on EC2, Lightsail, DigitalOcean or Hetzner is patched by nobody unless you rebuild the image. Managed platforms patch their runtime; a self-hosted container keeps the old one.</li>
  <li><strong>One <code>.env</code> holding everything.</strong> The same app often carries production database credentials, payment keys and broad cloud access keys in environment variables. Code execution in the Node process is enough to take them all.</li>
</ul>
<p>If your answer to “which Next.js and Node.js versions is our app on?” is “I’d have to ask someone”, start with the next section.</p>

<h2>Check your exposure in 10 minutes</h2>
<p><strong>On Vercel, Netlify or another managed platform,</strong> check the Node.js version in your project settings and confirm the platform has applied the October runtime patches. Projects on Node.js 20 must move to 22 or 24.</p>
<p><strong>For a self-hosted app,</strong> run these from the project root and inside the deployed image:</p>
${code('bash', `
# 1. Framework, React and image library versions actually installed
npm ls next react react-dom sharp

# 2. Node.js runtime version
node --version

# 3. Is SVG optimisation switched on?
grep -rn "dangerouslyAllowSVG" next.config.*

# 4. Cache Components and Server Actions in use?
grep -rn "cacheComponents" next.config.*
grep -rln "'use cache'\\|'use server'" app/ src/ 2>/dev/null

# 5. Containers: which Node.js and Next.js are inside each running image?
docker ps -q | xargs -I{} docker exec {} node --version`)}
<p><strong>Watch out for:</strong></p>
<ul>
  <li><strong>The lockfile is not the server.</strong> A patched <code>package.json</code> on a laptop means nothing until a new build is running in production. Check inside the deployed image.</li>
  <li><strong>More than one app.</strong> Monorepos, admin panels and marketing sites often carry their own <code>next</code> dependency. Check each one.</li>
  <li><strong>Old base images.</strong> A <code>node:20</code> or unpinned <code>node:lts</code> image built months ago still contains the old runtime. Rebuild from a fresh, pinned base image.</li>
</ul>

<h2>Fix it</h2>
<p>Patching is the only complete fix. Everything else only buys time.</p>

<h3>1. Patch, rebuild, redeploy, restart</h3>
${code('bash', `
# Next.js 16
npm install next@16.4.1

# Next.js 15.5 — also pin sharp, because 15.5.28 still accepts sharp 0.34.x
npm install next@15.5.28 sharp@^0.35.5

# Confirm
npm ls next sharp`)}
<p>Force a fixed sharp even when another package pulls an older one:</p>
${code('package.json', `
{
  "overrides": { "sharp": "^0.35.5" }
}`)}
<p>Then upgrade Node.js to 26.12.1, 24.22.1 or 22.23.4, rebuild the container with <code>npm ci</code>, redeploy, and restart every Node process. A running process keeps the old code in memory.</p>
<p>On Next.js 13 or 14, or Node.js 20 or older, there is no patch on your line. Upgrade, or take the app off the internet until you can.</p>
<p>Internet-facing apps come first, and among those, apps that accept uploads or fetch user-supplied URLs.</p>

<h3>2. If you cannot patch today</h3>
<p>These settings reduce exposure but do not make an app safe.</p>
${code('next.config.js', `
// next.config.js
module.exports = {
  images: {
    dangerouslyAllowSVG: false, // the default: keep SVGs out of the optimiser
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },
};`)}
<p>Also:</p>
<ul>
  <li>Strip internal headers at the edge, such as <code>x-middleware-subrequest</code>, which a browser should never send.</li>
  <li>Reject <code>Content-Encoding: br</code> on inbound requests at your proxy if you do not need it.</li>
  <li>Validate every URL your server fetches: HTTPS only, an allowlist of hosts, no control characters in the hostname, and no private or link-local IPs.</li>
  <li>Rate-limit POST requests to Server Action routes and alert on sustained high CPU in Node processes.</li>
  <li>Put a WAF in front, and make sure the origin accepts traffic only from it.</li>
</ul>
<p>The <code>use cache</code> RCE and the Server Actions DoS have no workaround. Only the upgrade closes them.</p>

<h3>3. What not to do</h3>
<ul>
  <li><strong>Don’t rely on middleware alone for authorisation.</strong> Check the user again where data is read or changed.</li>
  <li><strong>Don’t treat a clean <code>npm audit</code> as proof.</strong> Two of the October advisories were missing from its feed at release.</li>
  <li><strong>Don’t update <code>package.json</code> and stop.</strong> Without a rebuild and redeploy, production still runs the old code.</li>
  <li><strong>Don’t assume your platform or agency has patched.</strong> Ask, and get a yes in writing.</li>
</ul>

<h2>Detect and verify</h2>
<p>There are no published indicators of compromise for the October 2026 flaws. Hunt for the side effects that code execution in Node.js usually leaves. Treat these as leads, not proof.</p>
<p><strong>Signs worth investigating:</strong></p>
<ul>
  <li>Node.js processes spawning shells or tools such as <code>sh</code>, <code>bash</code>, <code>curl</code>, <code>wget</code> or <code>nc</code>.</li>
  <li>Crashes and restarts, such as segmentation faults or repeated container restarts, in services that process images or fetch external URLs.</li>
  <li>Unusual requests to <code>/_next/image</code> for SVG sources, or bursts of POST requests carrying a <code>Next-Action</code> header.</li>
  <li>Outbound connections from the app to unfamiliar IPs.</li>
  <li>New or changed files in writable directories such as <code>.next/cache</code> or upload folders.</li>
</ul>
<p><strong>After patching, verify:</strong></p>
<ul class="art__checks">
  <li><code>npm ls next sharp</code> and <code>node --version</code> show fixed versions inside every deployed image.</li>
  <li>Every Node process was restarted after the update.</li>
  <li>If you found any of the signs above, rotate every secret the app holds: database credentials, session signing secrets, payment and API keys, and cloud credentials. A patched app can still have an attacker inside.</li>
</ul>

<h2>The lesson beyond these CVEs</h2>
<p>These advisories will be patched and forgotten. The conditions that make them dangerous will not.</p>
<ul>
  <li><strong>Your app is the top of a tall stack.</strong> Next.js, React, Node.js and sharp each need watching and patching, not just your own code.</li>
  <li><strong>You cannot patch what you don’t know you run.</strong> Keep an inventory of every app, its Next.js, Node.js and sharp versions, and who owns it.</li>
  <li><strong>End-of-life software is a standing liability.</strong> Next.js 13 and 14 and Node.js 20 got no fix this time, and will get none next time.</li>
  <li><strong>Defence in depth still matters.</strong> Authorise next to the data, keep secrets out of the browser, give the app least-privilege credentials, and restrict its outbound traffic.</li>
  <li><strong>Someone has to be watching.</strong> React2Shell went from disclosure to mass scanning in hours. Only monitoring catches an attack that lands before your patch does.</li>
</ul>

<section class="art__help" aria-labelledby="help-h">
  <h2 id="help-h">How Aerovant can help</h2>
  <p>If you are unsure which Next.js and Node.js versions run in your environment, or whether last week’s traffic was more than noise, our team can help:</p>
  <ul>
    <li><strong>Exposure check:</strong> identify internet-facing Next.js and Node.js apps, their versions and how they are deployed.</li>
    <li><strong>Patch and hardening support</strong> for self-managed servers, cloud VMs and containers on AWS.</li>
    <li><strong>Compromise assessment:</strong> log review and secret-rotation planning for apps that were exposed.</li>
    <li><strong>VAPT and Managed SOC</strong> to find the next weak point before an attacker does, and to watch for it after hours.</li>
  </ul>
  <p>Write to <a href="mailto:${site.email}">${site.email}</a> or <a href="${u('/contact/')}">get in touch</a>.</p>
</section>

<p class="t-note art__disclaimer">This article reflects public information as of 23 October 2026. Details may change as vendors publish further analysis; always follow the official Next.js, React and Node.js advisories.</p>

<h2>Sources</h2>
<ul class="art__sources">
  <li>Next.js: Security Update for Upstream Vulnerabilities (14 Oct 2026)</li>
  <li>GitHub advisory GHSA-2464-fhr4-w9xw / CVE-2026-96889</li>
  <li>GitHub advisory GHSA-673q-mjm6-r5xr</li>
  <li>Node.js: October 2026 security releases</li>
  <li>Vercel: Next.js May 2026 security release</li>
  <li>Fastly: CVE-2025-29927 authorization bypass in Next.js</li>
  <li>Invicti: React2Shell (CVE-2025-55182 / CVE-2025-66478)</li>
  <li>Datadog Security Labs: React2Shell exploitation</li>
  <li>The Hacker News: Next.js out-of-band patch for caching and SVG RCEs</li>
  <li>SecurityOnline: Node.js security release, October 2026</li>
</ul>`,
};
