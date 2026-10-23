// One article. Metadata drives the Insights list; body() renders the article page.
import { site, u } from '../site.mjs';
import { table, code } from './kit.mjs';


const root = '<em>emSign ECC Root CA - G3</em>';

export default {
  slug: 'emudhra-certificate-incident',
  title: 'eMudhra: The Certificate Scare That Ended in a Day, and the Deadline That Didn’t',
  date: '2026-10-23',
  seo: 'eMudhra Certificate Incident: Act Before 27 Oct | Aerovant',
  description: 'Chrome drops eMudhra’s emSign ECC Root CA - G3 on 27 October. Who is affected, why GST and MCA DSCs are safe, and a 10-minute check for your domains.',
  category: 'Cybersecurity',
  author: 'Aerovant Technologies Security Team',
  summary: 'A flaw in eMudhra’s key ceremony left eight certificate authority keys weak. Browsers shut it down within hours and nobody appears to have been harmed, but Chrome drops an eMudhra root on 27 October. Who is affected, why your DSC is safe, and the 10-minute check to run now.',
  image: 'img/insights/emudhra.jpg',
  imageW: 1672,
  imageH: 941,
  imageAlt: 'A cracked padlock in front of a browser address bar showing a warning on https, beside a calendar page reading 27 October. Title: The eMudhra Certificate Incident, Chrome root removal 27 October 2026.',
  body: () => `
<p class="art__lede">Every padlock in your browser rests on a promise. Somewhere, a certificate authority guards a secret key so carefully that nobody else could ever reproduce it.</p>
<p>Last week, that promise failed for eight of eMudhra’s certificates. eMudhra is one of India’s best-known names in digital trust. A flaw in how eMudhra generated its keys left them weak, so weak that, by researchers’ accounts, one of them was simply <strong>the number 4</strong>.</p>
<p>What happened next is a rare piece of good news in security. The browser makers blocked the certificates the same day, eMudhra revoked them the next, and public records show nobody used them. But the clean-up comes with a deadline. On <strong>27 October</strong>, Chrome stops trusting one of eMudhra’s root certificates, and any website still depending on it will start showing errors.</p>

<aside class="art__tldr" aria-labelledby="tldr-h">
  <h2 id="tldr-h">TL;DR</h2>
  <dl>
    <div><dt>What</dt><dd>A flaw in eMudhra’s April 2025 key ceremony left the keys of eight intermediate certificate authorities weak</dd></div>
    <div><dt>Severity</dt><dd>No CVE. For web trust, a compromised CA key is as serious as it gets</dd></div>
    <div><dt>Who</dt><dd>Websites and APIs whose certificate chains to <strong>emSign ECC Root CA - G3</strong>, and software that carries its own list of trusted roots</dd></div>
    <div><dt>Not affected</dt><dd>DSCs for GST, MCA and income tax filings, and eSign (according to eMudhra)</dd></div>
    <div><dt>Worst case</dt><dd>Trusted-looking certificates for sites the holder doesn’t own. None were found</dd></div>
    <div><dt>Fixed by</dt><dd>Browser blocks (17 Oct), eMudhra revocation (18 Oct), Chrome root removal (27 Oct)</dd></div>
    <div><dt>Exploitation</dt><dd>None found. eMudhra says the eight never issued a certificate, and public Certificate Transparency logs show none</dd></div>
    <div><dt>Do today</dt><dd>Check your domains and the partner APIs you call. Replace anything chaining to emSign ECC Root CA - G3 before 27 October</dd></div>
  </dl>
</aside>

<p>If you run a website, an app with a backend, or integrations with partners’ APIs, read on. If you only use a DSC token for filings, skip to <a href="#who">Who is affected</a>: you can relax.</p>

<h2>What happened</h2>
${table(['Date (2026)', 'Event'], [
  ['27 Oct', `Chrome removes <strong>emSign ECC Root CA - G3</strong> from the Chrome Root Store`],
  ['22 Oct', 'eMudhra’s board decides to leave the global SSL/TLS certificate business'],
  ['21 Oct', 'Node.js releases security updates that remove the compromised intermediates from its built-in trust list. CERT-In issues advisory CIAD-2026-0050'],
  ['20 Oct', 'Mozilla ships Firefox 158.0.1, ESR 115.43.1 and ESR 153.5.1, and removes the root from NSS 3.131.1, the certificate library behind Firefox'],
  ['18 Oct', 'eMudhra revokes all eight intermediates'],
  ['17 Oct', 'A researcher reports the problem to the browser root programs. Mozilla blocks the certificates within three hours; Chrome’s block goes out at 19:45 UTC, Android’s shortly after'],
  ['Apr 2025', 'eMudhra holds the key generation ceremony where the flaw occurred'],
])}
<p>Read the table from the bottom up and two numbers stand out. The weak keys existed for <strong>eighteen months</strong>. Once someone reported them, it took the internet about <strong>a day</strong> to neutralise them.</p>

<h2>How it went wrong, in plain terms</h2>
<p>A certificate authority’s key is only safe if it is created at random from an enormous range of possibilities. That randomness is what makes it impossible for anyone else to reproduce.</p>
<p>eMudhra says a flaw in one step of its April 2025 key ceremony meant that step produced a second, weak set of keys alongside the strong ones. Key ceremonies are the tightly scripted, witnessed procedures in which certificate authorities create their keys. The weak keys were the ones behind these eight intermediate certificates. A key that isn’t properly random can be worked out from public information, and then it protects nothing.</p>
<p>That’s all you need to know about the mechanics. What matters for your business is what was done about it, and what’s left for you to do.</p>

<h2>Was anyone harmed?</h2>
<p>As far as anyone can tell, no.</p>
${table(['Source', 'What they report'], [
  ['eMudhra', 'The eight intermediates <strong>never issued a certificate</strong>. eMudhra says the impact was limited to the TLS infrastructure of a single customer ecosystem in the United States'],
  ['Google', 'No certificates chaining to these intermediates appeared in public Certificate Transparency logs before Chrome blocked them, so Chrome users were not exposed'],
  ['Mozilla', 'Blocked the certificates in Firefox in under three hours, then removed the root'],
  ['CERT-In', 'Issued advisory CIAD-2026-0050 for Indian organizations'],
])}
<p>The Google evidence is the strongest, because it doesn’t rely on anyone’s word. Chrome only accepts a certificate that has been recorded in <strong>Certificate Transparency</strong> logs: public, append-only records that anyone can search. A forged certificate that nobody logged would not have worked in Chrome. A logged one would have been visible to the world. Neither happened.</p>

<h2 id="who">Who is affected</h2>
${table(['What you use', 'Status', 'Action'], [
  ['DSCs for GST, MCA and income tax', '<strong>Not affected</strong> (eMudhra)', 'None'],
  ['eSign, emSigner and eMudhra’s enterprise services', '<strong>Not affected</strong> (eMudhra)', 'None'],
  [`Websites and APIs whose certificate chains to ${root}`, '<strong>Affected</strong>', 'Replace the certificate before 27 October'],
  ['Partner APIs you call that chain to that root', '<strong>Affected</strong>', 'Ask the partner; your integration breaks too'],
  ['Apps and servers with their own trust list (Java, Python, Node.js, some Android and IoT builds)', '<strong>Depends on version</strong>', 'Update, then check'],
])}
<p>DSCs and website certificates are both called “certificates”, and both can come from eMudhra, but they live in different trust systems. Indian DSCs chain to the root of India’s Controller of Certifying Authorities (CCA). They are not part of the browser trust stores that are dropping eMudhra’s root. Your finance team can keep filing.</p>

<h2>Why this matters for Indian businesses</h2>
<p>The meme going round said “don’t use eMudhra”. The real risks are quieter than that.</p>
<ul>
  <li><strong>The DSC panic.</strong> Finance and compliance teams hear “eMudhra compromised” and assume their filings are at risk. They aren’t. Make sure the right people hear that, so nobody cancels tokens or delays filings for nothing.</li>
  <li><strong>Integrations nobody remembers.</strong> Payment gateways, SMS providers, logistics partners and government-facing APIs are often wired up once and never revisited. If a partner’s certificate chains to the removed root, the integration fails, and the error lands in your logs, not theirs.</li>
  <li><strong>Old trust lists inside your own systems.</strong> Enterprise software often runs on Java, scripts on Python, and backends on Node.js. Each keeps its own list of trusted roots, and each updates on its own schedule.</li>
</ul>
<p>We saw that last point on our own machines. On 23 October, one of our Ubuntu workstations had already dropped emSign ECC Root CA - G3 from its system trust list. On the same machine, the <strong>Java trust store still trusted it</strong>, and so did the <strong>Python <code>certifi</code> package</strong> (version 2026.07.22). The operating system had moved on; the software running on it had not.</p>

<h2>Check your exposure in 10 minutes</h2>
<p><strong>1. In a browser.</strong> Open your site, click the padlock, open the certificate details and look at the certificate hierarchy. Any “emSign” name in the chain needs a closer look.</p>
<p><strong>2. For all your domains at once.</strong> List your domains and partner endpoints in this loop and run it from any Linux or Mac terminal:</p>
${code('bash', `
for d in example.com www.example.com api.example.com; do
  chain=$(echo | timeout 15 openssl s_client -connect "$d:443" -servername "$d" -showcerts 2>/dev/null)
  if [ -z "$chain" ] || ! echo "$chain" | grep -q "BEGIN CERTIFICATE"; then echo "ERROR  $d (no certificate returned)"
  elif echo "$chain" | grep -qi emsign; then echo "CHECK  $d (emSign in the chain)"
  else echo "ok     $d"; fi
done`)}
<p><code>CHECK</code> means replace that certificate. <code>ERROR</code> means the domain didn’t answer, so check it by hand. On a Mac without <code>timeout</code>, delete <code>timeout 15</code>.</p>
<p><strong>3. In public records.</strong> Search your domain on <a href="https://crt.sh/">crt.sh</a> (<code>https://crt.sh/?q=example.com</code>). It lists every certificate ever logged for your domain and who issued it. Any certificate you don’t recognise is worth a question.</p>
<p><strong>4. Inside your own systems.</strong> Check the trust lists your software uses. A result that mentions G3 means that software still trusts the removed root.</p>
${code('bash', `
# Linux system trust list (Debian/Ubuntu)
ls /etc/ssl/certs | grep -i emsign

# Java trust store
keytool -list -cacerts -storepass changeit | grep -i emsign

# Python (requests and many other libraries use certifi)
python3 -c "import certifi; print(open(certifi.where()).read().count('emSign ECC Root CA - G3'))"

# Node.js: 22.23.4, 24.22.1 or 26.12.1 and later include the update
node -v`)}

<h2>Fix it</h2>

<h3>1. Replace affected certificates before 27 October</h3>
<ul>
  <li>Get a new certificate from another certificate authority in the Chrome Root Store. A free ACME authority such as Let’s Encrypt works for most sites, or use your commercial CA.</li>
  <li>Install it wherever the certificate actually lives. That might be the web server, but it is often the load balancer, CDN or cloud certificate manager (for example AWS Certificate Manager or Cloudflare).</li>
  <li>Serve the full chain, then re-run the check above.</li>
</ul>

<h3>2. Update trust lists on your servers</h3>
<ul>
  <li><strong>Operating systems:</strong> apply the latest <code>ca-certificates</code> updates.</li>
  <li><strong>Java:</strong> update the JDK. On Debian or Ubuntu, <code>sudo update-ca-certificates --fresh</code> also rebuilds the Java keystore installed by <code>ca-certificates-java</code>. Check again afterwards.</li>
  <li><strong>Python:</strong> upgrade <code>certifi</code> once a release without the root is available, and re-run the check.</li>
  <li><strong>Node.js:</strong> upgrade to 22.23.4, 24.22.1 or 26.12.1. This is also an important security release in its own right.</li>
</ul>

<h3>3. Check mobile apps that pin certificates</h3>
<p>If your Android or iOS app pins your server’s certificate or its chain, changing the certificate can break the app. Ship an app update that trusts the new chain before or alongside the server change.</p>

<h3>What not to do</h3>
<ul>
  <li><strong>Don’t switch off certificate checks</strong> to “fix” a broken integration. That means no <code>NODE_TLS_REJECT_UNAUTHORIZED=0</code>, no <code>verify=False</code>, no <code>curl -k</code>. That trades a temporary error for a permanent hole.</li>
  <li><strong>Don’t add the removed root back</strong> into a trust store by hand.</li>
  <li><strong>Don’t tell customers to click through</strong> a certificate warning. Tell staff never to do it either.</li>
  <li><strong>Don’t cancel DSC or eSign workflows.</strong> eMudhra says they are unaffected.</li>
  <li><strong>Don’t wait for 27 October</strong> to find out. Errors in production are the most expensive way to run this check.</li>
</ul>

<h2>Detect and verify</h2>
<p><strong>After replacing certificates:</strong></p>
<ul class="art__checks">
  <li><strong>Test from outside.</strong> Run each public domain through an external checker such as <a href="https://www.ssllabs.com/ssltest/">SSL Labs</a> and confirm the chain no longer mentions emSign.</li>
  <li><strong>Watch for trust errors from 27 October.</strong> Search logs and monitoring for the errors each platform shows when it no longer trusts a chain:
    <ul>
      <li>Chrome: <code>NET::ERR_CERT_AUTHORITY_INVALID</code></li>
      <li>Java: <code>PKIX path building failed</code></li>
      <li>Python: <code>CERTIFICATE_VERIFY_FAILED</code></li>
      <li>Node.js: <code>unable to get local issuer certificate</code></li>
    </ul>
    A spike in outbound calls points to a partner who hasn’t switched.</li>
  <li><strong>Monitor Certificate Transparency for your domains.</strong> Free tools such as crt.sh or Cert Spotter can alert you whenever a new certificate is issued for your domain. It’s the simplest way to learn about a certificate you didn’t ask for.</li>
</ul>

<h2>The lesson beyond this incident</h2>
<p>The eMudhra incident will be forgotten in a month. The conditions that make the clean-up painful will not.</p>
<ul>
  <li><strong>You can’t replace what you can’t find.</strong> Keep a list of every certificate you own, where it is installed, who issued it and when it expires.</li>
  <li><strong>Make switching cheap.</strong> Issue certificates automatically (ACME), so that moving to another certificate authority takes minutes, not a week of emails.</li>
  <li><strong>Your trust lists are software too.</strong> Java, Python, Node.js and container base images each carry their own copy of “who to trust”. Keep them updated like any other dependency.</li>
  <li><strong>Watch the public record.</strong> Certificate Transparency is how the world proved nobody was harmed this time. The same logs can tell you, for free, the moment someone gets a certificate for your domain.</li>
</ul>

<section class="art__help" aria-labelledby="help-h">
  <h2 id="help-h">How Aerovant can help</h2>
  <p>If you’re not sure which of your domains, APIs or systems depend on eMudhra’s root, our team can help before the deadline:</p>
  <ul>
    <li><strong>Certificate exposure check:</strong> we map your public domains, APIs and partner endpoints, and flag anything chaining to emSign ECC Root CA - G3.</li>
    <li><strong>Replacement and automation:</strong> moving to a new certificate authority and setting up automatic issuance on your servers, load balancers and AWS.</li>
    <li><strong>Trust-store review:</strong> finding the Java, Python, Node.js and container images still carrying outdated root lists.</li>
    <li><strong>Managed Security Services:</strong> advisories like this one, matched to your stack, so you hear about the next deadline before your customers do.</li>
  </ul>
  <p>Write to <a href="mailto:${site.email}">${site.email}</a>, or get in touch through our <a href="${u('/contact/')}">contact page</a>.</p>
</section>

<p class="t-note art__disclaimer">This article reflects public information as of 23 October 2026. Details may change as vendors publish further updates. Always follow your certificate authority’s and browser vendors’ official guidance.</p>

<h2>Sources</h2>
<ol class="art__sources">
  <li><a href="https://emudhra.com/en/post/certificate-security-incident">eMudhra: Certificate security incident</a></li>
  <li><a href="https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/">Google: Protecting Chrome and Android users from compromised eMudhra intermediate CA certificates</a></li>
  <li><a href="https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/">Mozilla: Protecting Firefox users following the compromise of eMudhra intermediate certificates</a></li>
  <li><a href="https://thehackernews.com/2026/10/eight-emudhra-ca-keys-compromised.html">The Hacker News: Eight eMudhra CA keys compromised</a></li>
  <li><a href="https://nodejs.org/en/blog/vulnerability/october-2026-security-releases">Node.js: October 2026 security releases</a></li>
  <li><a href="https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES02&amp;VLCODE=CIAD-2026-0050">CERT-In advisory CIAD-2026-0050</a></li>
  <li><a href="https://www.businesstoday.in/technology/news/story/emudhra-to-exit-global-ssltls-certificate-business-after-security-incident-563155-2026-10-22">Business Today: eMudhra to exit global SSL/TLS certificate business</a></li>
</ol>`,
};
