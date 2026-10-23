// One article. Metadata drives the Insights list; body() renders the article page.
import { site, u } from '../site.mjs';
import { table, code } from './kit.mjs';


export default {
  slug: 'php2shell',
  title: 'php2shell: The PHP Bug That Fires Before Your Code Runs',
  date: '2026-10-23',
  seo: 'php2shell PHP Vulnerability (CVE-2026-109618): Fix Guide',
  description: 'php2shell (CVE-2026-109618, CVE-2026-109619): the latest PHP vulnerability allows unauthenticated RCE. Who is affected, a 10-minute check, and the fix.',
  keywords: ['php2shell', 'PHP vulnerability', 'CVE-2026-109618', 'CVE-2026-109619', 'PHP RCE', 'PHP-FPM', 'mod_php', 'WordPress security'],
  category: 'Threat Intelligence',
  author: 'Aerovant Technologies Security Team',
  summary: 'Two critical PHP core flaws, CVE-2026-109618 and CVE-2026-109619, allow unauthenticated remote code execution. Here is who is affected, how to check your exposure in ten minutes, and how to fix it.',
  image: 'img/insights/php2shell.jpg',
  imageAlt: 'A laptop showing a crafted multipart POST request beside a cracked PHP logo, with the title php2shell, CVE-2026-109618, CVE-2026-109619, CVSS 9.2.',
  body: () => `
<p class="art__lede">Most web vulnerabilities live in your code: a forgotten input check, a bad plugin, a weak password. php2shell is different. It lives in PHP itself, and on some servers it fires before a single line of your application runs.</p>
<p>On 21 October 2026, the PHP project shipped emergency fixes for two critical flaws, CVE-2026-109618 and CVE-2026-109619, nicknamed php2shell. An unauthenticated attacker on the internet can send crafted requests and potentially run code on your web server. No login, no user click, no vulnerable plugin required.</p>

<aside class="art__tldr" aria-labelledby="tldr-h">
  <h2 id="tldr-h">TL;DR</h2>
  <dl>
    <div><dt>What</dt><dd>Two memory-safety bugs in PHP core leading to unauthenticated remote code execution (RCE)</dd></div>
    <div><dt>Severity</dt><dd>CVSS v4 9.2 (Critical) for both. Early reports of 10.0 were incorrect</dd></div>
    <div><dt>Who</dt><dd>Any server running PHP to serve web requests: PHP-FPM, Apache mod_php, php-cgi, FrankenPHP, LiteSpeed</dd></div>
    <div><dt>Worst case</dt><dd>Apache with mod_php, where exploitation can happen before application code runs</dd></div>
    <div><dt>Fixed in</dt><dd>PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12</dd></div>
    <div><dt>Exploitation</dt><dd>Attempts confirmed by several vendors, including Amazon; none has confirmed that an attempt succeeded</dd></div>
    <div><dt>Do today</dt><dd>Find every PHP server, patch it, restart every PHP worker</dd></div>
  </dl>
</aside>

<p>If you run WordPress, Laravel, Magento, Drupal or any custom PHP application, read on.</p>

<h2>What happened</h2>
<p>The bugs were found by researchers at Calif and reported to PHP for coordinated disclosure. The plan was a quiet release on 22 October. It did not go to plan: attackers were probing before the patch existed, details leaked, and PHP brought the release forward by a day.</p>
${table(['Date (2026)', 'Event'], [
  ['22 Oct', 'Vendors update advisories. Neither CVE is yet in CISA’s Known Exploited Vulnerabilities catalog'],
  ['21 Oct', 'PHP releases 8.5.12, 8.4.27, 8.3.36 and 8.2.35 (14:00 UTC). Honeypots record exploitation attempts the same day'],
  ['20 Oct', 'Details leak on social media. PHP announces an emergency release, a day earlier than planned. watchTowr publicly confirms the bugs are real'],
  ['17 Oct', 'Amazon’s MadPot honeypot records an attempt, four days before disclosure'],
  ['Earlier', 'Linux distributions and LTS vendors receive patches in advance'],
])}
<p>The 17 October hit is the detail that matters. Someone had a working idea of the attack before most defenders knew there was anything to patch.</p>

<h2>How the two bugs work</h2>
<p>Both flaws are memory-safety bugs in PHP’s C core, in the part that handles each incoming request. That is why they are so dangerous: they sit below every framework and every line of application code.</p>

<h3>CVE-2026-109618: out-of-memory corruption</h3>
<p>When PHP runs out of memory, it can abandon a request halfway through setting up its data. Cleanup code then runs over that half-built data as if it were complete.</p>
<ol>
  <li>The attacker sends a crafted multipart request (the format used for file uploads and forms).</li>
  <li>The request pushes PHP into an out-of-memory condition, even within normal configured size limits.</li>
  <li>PHP stops mid-allocation, leaving partly initialised structures in memory.</li>
  <li>Cleanup trusts those structures, and the resulting memory corruption can be turned into code execution.</li>
</ol>
<p>On Apache mod_php this all happens while the request body is parsed, before your application is called.</p>

<h3>CVE-2026-109619: use-after-free across requests</h3>
<p>PHP workers are reused. One process serves request after request, and it is supposed to wipe its state in between.</p>
<ol>
  <li>Request A triggers a fatal error or timeout that interrupts normal cleanup.</li>
  <li>Some global state still points at memory that has already been freed.</li>
  <li>The same worker picks up request B, which reads that stale pointer.</li>
  <li>The attacker shapes what sits in the freed memory, leading to memory disclosure or code execution.</li>
</ol>
<p>Session upload progress, which is enabled by default, is one known path that consumes this stale state. PHP lists memory disclosure as a confirmed impact.</p>

<h3>What an attacker gets</h3>
<p>Code execution with the privileges of the web server user (often <code>www-data</code>, <code>apache</code> or <code>nginx</code>). From there they can read the application’s configuration, including database passwords and API keys, plant a web shell, and move deeper into the network.</p>

<h2>Who is affected</h2>
<p>Every PHP installation that serves web requests is in scope. The vulnerable code path dates back to at least PHP 5, so age is no protection.</p>
${table(['PHP branch', 'Status', 'Action'], [
  ['8.5', 'Affected below 8.5.12', 'Upgrade to 8.5.12'],
  ['8.4', 'Affected below 8.4.27', 'Upgrade to 8.4.27'],
  ['8.3', 'Affected below 8.3.36', 'Upgrade to 8.3.36'],
  ['8.2', 'Affected below 8.2.35', 'Upgrade to 8.2.35'],
  ['7.4, 8.0, 8.1', 'All versions affected; no official release', 'Distribution or LTS vendor package, or PHP’s source backports. Plan a move to 8.2+'],
  ['5.x to 7.3', 'Affected, no fix at all', 'Upgrade to a supported branch, or isolate the server'],
])}
<p><strong>How PHP runs matters.</strong> PHP-FPM, php-cgi, FrankenPHP and LiteSpeed are all affected. Apache with mod_php is the highest-risk setup, because PHP parses the malicious request inside the web server before any application code, WAF logic in your app, or authentication check gets a chance to run.</p>
<p><strong>A distribution caveat.</strong> Ubuntu, Debian, RHEL and similar distributions often backport security fixes without changing the version number. A server that reports 8.1.2 may be patched; one that reports a newer number may not be. Check your distribution’s advisory or package changelog for the CVE IDs rather than trusting the version string alone.</p>

<h2>Is it being exploited?</h2>
<p>Attackers are trying. Whether they are succeeding at scale is where vendors disagree.</p>
${table(['Source', 'What they report'], [
  ['Amazon Threat Intelligence', 'First attempt on 17 Oct, four days before disclosure; more attempts from several sources on 21 Oct. Amazon says it is unclear whether any of them would have worked'],
  ['watchTowr, Cloudflare', 'Exploitation attempts observed on their sensor networks'],
  ['Rapid7', 'Many attempts, but no confirmed in-the-wild exploitation; public proofs of concept work only on specific OS, PHP version and web server combinations'],
  ['PHP Foundation', 'Found no functional public exploits at release'],
  ['CISA KEV', 'Not listed as of 22 Oct'],
])}
<p>For a defender, the disagreement does not change the decision. Memory-corruption exploits start out fragile and become reliable over time. Rapid7 itself warns a portable technique could appear at any moment. Treat this as an emergency patch, not a next-sprint ticket.</p>

<h2>Why this hits Indian startups and SMEs hard</h2>
<p>PHP quietly runs a large share of India’s business websites: WordPress company sites, WooCommerce stores, school and hospital portals, and Laravel or CodeIgniter apps built by agencies years ago. Three patterns make php2shell especially risky here.</p>
<ul>
  <li><strong>The “built once, never touched” site.</strong> An agency delivered the site, the contract ended, and nobody owns the server. It may still run PHP 7.x, which will never get an official fix.</li>
  <li><strong>Self-managed VPS and cloud servers.</strong> A WordPress site on an EC2 instance, Lightsail, DigitalOcean or Hetzner box is patched by nobody unless you do it. Managed and shared hosts are patching for their customers; a VPS owner is the host.</li>
  <li><strong>Shared servers holding real data.</strong> The same box often hosts the website, an admin panel and a customer database. Code execution as the web user is frequently enough to read <code>wp-config.php</code> or <code>.env</code> and walk away with credentials.</li>
</ul>
<p>If your answer to “which PHP version is our website on?” is “I’d have to ask someone”, start with the next section.</p>

<h2>Check your exposure in 10 minutes</h2>
<p><strong>On WordPress:</strong> go to Tools → Site Health → Info → Server to see the PHP version. <strong>On managed or shared hosting,</strong> check your host’s status page or ask support directly: “Have you applied the 21 October PHP security release?”</p>
<p><strong>On a server you manage,</strong> run these as an admin:</p>
${code('bash', `
# 1. PHP version (CLI)
php -v

# 2. How PHP is served: is Apache loading mod_php? (highest risk)
apachectl -M 2>/dev/null | grep -i php

# 3. Is PHP-FPM running, and which version?
ps aux | grep -E 'php-fpm|php[0-9.]*-fpm' | grep -v grep

# 4. Debian/Ubuntu: installed PHP packages and whether the fix is in
dpkg -l | grep -E '^ii +php'
apt changelog php8.3-fpm 2>/dev/null | grep -E 'CVE-2026-10961[89]'

# 5. RHEL/Rocky/Alma: package changelog
rpm -q --changelog php-fpm | grep -E 'CVE-2026-10961[89]'`)}
<p>Adjust package names to your version (for example <code>php8.2-fpm</code> or <code>libapache2-mod-php8.1</code>).</p>
<p><strong>Watch out for:</strong></p>
<ul>
  <li><strong>More than one PHP.</strong> Servers often run several versions side by side (control panels, old sites). Check each one.</li>
  <li><strong>CLI is not the web.</strong> <code>php -v</code> shows the command-line binary. The web server may use a different version and a different <code>php.ini</code>. Confirm with a temporary <code>phpinfo()</code> page, then delete it immediately.</li>
  <li><strong>Containers.</strong> Check the PHP version inside your images (<code>docker run --rm &lt;image&gt; php -v</code>), not just the host. Rebuild and redeploy; a patched host does not patch the image.</li>
</ul>

<h2>Fix it</h2>
<p>Patching is the only complete fix. Everything else only buys time.</p>

<h3>1. Patch, then restart every worker</h3>
<ul>
  <li><strong>Distribution packages:</strong> update through your package manager (<code>apt upgrade</code> / <code>dnf upgrade</code> on the PHP packages).</li>
  <li><strong>Built from source or official images:</strong> move to 8.5.12, 8.4.27, 8.3.36 or 8.2.35, and rebuild containers.</li>
  <li><strong>PHP 7.4 to 8.1:</strong> use your distribution’s or LTS vendor’s patched package, and schedule the move to 8.2+.</li>
  <li><strong>PHP 7.3 or older:</strong> there is no fix. Upgrade, or take the server off the internet until you can.</li>
</ul>
<p>Then restart PHP-FPM and Apache. Updated files on disk do nothing while old workers are still running in memory.</p>
<p>Internet-facing servers come first, and Apache mod_php servers first among those.</p>

<h3>2. If you cannot patch today</h3>
<p>These settings reduce exposure but do not make a server safe. Set them in <code>php.ini</code>, the FPM pool config or the web server config, then restart all workers:</p>
${code('ini', `
; CVE-2026-109619: close the session upload progress path
session.upload_progress.enabled = 0

; CVE-2026-109618: avoid the out-of-memory path
; (enforce so applications cannot override it)
memory_limit = -1

; PHP 8.5 only
fatal_error_backtraces = 0`)}
<p>Also:</p>
<ul>
  <li>Use container or cgroup memory limits as the outer guard, since <code>memory_limit = -1</code> removes PHP’s own cap.</li>
  <li>Bound request sizes at the edge. Keep <code>post_max_size</code> modest (8M or 32M) with <code>upload_max_filesize</code> below it, and limit body size, multipart parts and headers in Nginx, Apache or your load balancer.</li>
  <li>Block multipart requests on endpoints that never take uploads.</li>
  <li>Turn on WAF rules. Cloudflare has deployed rules on all plans. On paid plans, make sure managed rules are set to block, not just log. This only protects traffic that actually flows through the WAF.</li>
  <li>Isolate what you cannot fix. CERT-EU recommends isolating internet-facing applications until a fix is applied and verified.</li>
</ul>

<h3>3. What not to do</h3>
<ul>
  <li><strong>Don’t use <code>ini_set()</code></strong> in application code or <code>.user.ini</code> for these settings. They apply too late.</li>
  <li><strong>Don’t set <code>RLIMIT_AS</code> or <code>RLIMIT_DATA</code></strong> process limits. They can push PHP into the very allocation-failure path you are trying to avoid.</li>
  <li><strong>Don’t treat silent logs as proof of safety.</strong> Hiding errors with <code>display_errors</code>, <code>log_errors</code> or <code>@</code> does not remove the exposure.</li>
  <li><strong>Don’t assume your host has patched.</strong> Ask, and get a yes in writing.</li>
</ul>

<h2>Detect and verify</h2>
<p>No vendor has published reliable indicators of compromise for php2shell yet. Until they do, hunt for the side effects that memory-corruption attacks and post-exploitation usually leave. Treat these as leads to investigate, not proof.</p>
<p><strong>Signs worth investigating, from 17 October onwards:</strong></p>
<ul>
  <li><strong>Worker crashes.</strong> PHP-FPM logs showing <code>child ... exited on signal 11 (SIGSEGV)</code>, or Apache <code>Segmentation fault</code> entries, especially in bursts.</li>
  <li><strong>Out-of-memory fatals</strong> (<code>Allowed memory size ... exhausted</code>) on endpoints that normally never hit them.</li>
  <li><strong>Unusual multipart POSTs</strong> in access logs: to pages that never accept uploads, from a single IP, or in rapid repetition.</li>
  <li><strong>Unexpected child processes</strong> of the web user, such as <code>sh</code>, <code>bash</code>, <code>curl</code>, <code>wget</code>, <code>python</code> or <code>nc</code> spawned by <code>php-fpm</code> or <code>apache2</code>.</li>
  <li><strong>New or changed files</strong> in the web root or upload folders, especially <code>.php</code> files where none should be.</li>
  <li><strong>Outbound connections</strong> from the web server to unfamiliar IPs.</li>
</ul>
<p><strong>After patching, verify:</strong></p>
<ul class="art__checks">
  <li>Each server’s PHP package or version shows the fix, per the distribution changelog.</li>
  <li>All PHP workers were restarted after the update (check process start times).</li>
  <li>Containers were rebuilt from patched base images and redeployed.</li>
  <li>If you found any of the signs above, rotate secrets: database passwords, API keys and the keys in <code>wp-config.php</code> or <code>.env</code>. Then scan for web shells. A patched server can still have an attacker inside.</li>
</ul>

<h2>The lesson beyond this CVE</h2>
<p>php2shell will be patched and forgotten within weeks. The conditions that make it dangerous will not.</p>
<ul>
  <li><strong>You cannot patch what you don’t know you run.</strong> Keep an inventory of every server, its runtime version and who owns it.</li>
  <li><strong>End-of-life software is a standing liability.</strong> PHP 7.x will never get an official fix for this or the next bug.</li>
  <li><strong>Defence in depth still matters.</strong> The web user should not be able to read every secret; databases should not trust the web server blindly; outbound traffic from web servers should be restricted.</li>
  <li><strong>Someone has to be watching.</strong> The first attack landed four days before the advisory. Only monitoring would have caught it.</li>
</ul>

<section class="art__help" aria-labelledby="help-h">
  <h2 id="help-h">How Aerovant can help</h2>
  <p>If you are unsure where PHP runs in your environment, or whether last week’s traffic was more than noise, our team can help:</p>
  <ul>
    <li><strong>Exposure check:</strong> identify internet-facing PHP servers, versions and how they are served.</li>
    <li><strong>Patch and hardening support</strong> for self-managed servers, cloud VMs and containers on AWS.</li>
    <li><strong>Compromise assessment:</strong> log review and web shell hunting on servers that were exposed.</li>
    <li><strong>VAPT and Managed SOC</strong> to find the next weak point before an attacker does, and to watch for it after hours.</li>
  </ul>
  <p>Write to <a href="mailto:${site.email}">${site.email}</a> or <a href="${u('/contact/')}">get in touch</a>.</p>
</section>

<p class="t-note art__disclaimer">This article reflects public information as of 23 October 2026. Details may change as vendors publish further analysis; always follow your distribution’s and PHP’s official advisories.</p>

<h2>Sources</h2>
<ul class="art__sources">
  <li><a href="https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/">Amazon Threat Intelligence: PHP2Shell exploitation identified in MadPot prior to public disclosure</a></li>
  <li><a href="https://www.bitsight.com/blog/critical-vulnerability-alert-cve-2026-109618-and-cve-2026-109619-php2shell">Bitsight: CVE-2026-109618 and CVE-2026-109619 (PHP2Shell)</a></li>
  <li><a href="https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/">Rapid7: CVE-2026-109618 and CVE-2026-109619, critical unauthenticated RCE in PHP</a></li>
  <li>Tenable: php2shell frequently asked questions</li>
  <li>watchTowr: PHP2Shell FAQ</li>
  <li>Codeable: What WordPress site owners need to do</li>
  <li>Google Cloud: Responding to core PHP vulnerabilities</li>
</ul>`,
};
