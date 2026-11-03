// One article. Metadata drives the Insights list; body() renders the article page.
import { site, u } from '../site.mjs';
import { table, code } from './kit.mjs';

export default {
  slug: 'binance-hack-2026',
  title: 'One Laptop, $6 Billion: What the Binance Heist Teaches Every Business',
  date: '2026-11-03',
  seo: 'Binance Hack 2026 Explained: One Laptop, $6 Billion',
  description: 'The Binance hack explained: how one compromised engineer laptop led to a US$6B theft, what is confirmed, and the 10-minute check every business should run.',
  keywords: ['Binance hack', 'Binance hack 2026', 'TraderTraitor', 'crypto exchange hack', 'hot wallet', 'developer laptop security', 'AWS IAM Identity Center', 'North Korea hackers'],
  category: 'Threat Intelligence',
  author: 'Aerovant Technologies Security Team',
  summary: 'On 29 October 2026, attackers got Binance’s own systems to sign away roughly US$6 billion in minutes, reportedly starting from one compromised DevOps engineer’s laptop. What is confirmed, what is disputed, and the controls every business with production access should check today.',
  image: 'img/insights/binance-hack-2026.jpg',
  imageW: 1122,
  imageH: 1402,
  ogImage: 'img/insights/binance-hack-2026-og.jpg',
  imageAlt: 'A laptop showing the Binance logo beside a padlock shield, with the headline One laptop. $6 billion. What the Binance heist teaches every business.',
  body: () => `
<p class="art__lede">Most crypto hacks start with a stolen private key. This one, according to Binance’s early findings, didn’t need one. On 29 October 2026, attackers got the world’s largest crypto exchange’s own systems to sign away roughly US$6 billion in a matter of minutes. Binance’s first explanation pointed to a single compromised DevOps engineer’s laptop.</p>
<p>It’s the largest crypto theft on record, more than four times the US$1.5 billion Bybit heist of February 2025. The FBI has attributed it to TraderTraitor, a North Korean state-backed group. Binance says it will cover customer losses, and about US$2.85 billion has been frozen.</p>

<aside class="art__tldr" aria-labelledby="tldr-h">
  <h2 id="tldr-h">TL;DR</h2>
  <dl>
    <div><dt>What</dt><dd>Unauthorised withdrawals from Binance hot wallets, signed by Binance’s own systems</dd></div>
    <div><dt>Confirmed impact</dt><dd>About US$6.3B in assets affected (Binance’s figure); withdrawals suspended, then restored in phases on 1 November</dd></div>
    <div><dt>Scale</dt><dd>US$5.9B–6.43B depending on the analytics firm, spread across 10+ blockchains</dd></div>
    <div><dt>Attribution</dt><dd>FBI: North Korea’s TraderTraitor (also tracked as Jade Sleet and UNC4899). Binance has not independently confirmed it</dd></div>
    <div><dt>Binance’s response</dt><dd>Contained the infrastructure, revoked the affected authorisations, engaged law enforcement, about US$2.85B frozen, losses covered from its SAFU fund and own reserves</dd></div>
    <div><dt>Still unknown</dt><dd>The full root cause, how the laptop was compromised, and the “additional points of breach” Binance later reported</dd></div>
    <div><dt>Do today</dt><dd>Find out which engineer laptops hold standing production access, and add independent limits to any system that can move money or data automatically</dd></div>
  </dl>
</aside>

<p>If your business has engineers with production access from their own laptops, or runs any system that automatically approves transfers, payouts or exports, read on.</p>

<h2>What happened</h2>
<p>The timeline below is built from Binance’s public statements, the FBI’s alert and blockchain analytics firms’ reports, as published by established security and business outlets. Times are UTC.</p>
${table(['Date (2026)', 'Event', 'Source'], [
  ['~27–28 Oct', 'Preparation begins at least 36 hours before the theft. An operator wallet is funded through three small Tornado Cash withdrawals, and the code is tested on three wallets a few hours before the attack', 'The Hacker News (TRM Labs, Elliptic)'],
  ['29 Oct, ~20:20', 'A single transaction carries 50 pre-signed authorisations. About 3.5 minutes later, a hot wallet sends its entire balance (167,464 ETH and 63 tokens, including 1.615B USDT) to an attacker address', 'The Hacker News (TRM Labs)'],
  ['29–30 Oct', 'Binance discloses a “security incident”. It says a compromised DevOps engineer’s laptop let an attacker reach a service container and submit unauthorised withdrawals. It reports no evidence of a private key leak, suspends withdrawals, and promises to cover losses', 'The Hacker News, Bitdefender'],
  ['30 Oct', 'Analytics firms publish estimates: Chainalysis US$5.912B, TRM Labs US$6.36B, Elliptic US$6.43B. TRM and Chainalysis point to North Korea; Elliptic urges caution. Co-CEO Richard Teng says the attacker “did not simply use one engineer’s permissions”', 'The Hacker News'],
  ['30 Oct (late)', 'Binance reports about US$3B traced and frozen, including 1.567B USDT (Tether) and more than 800M USDC (Circle). Binance: “We take full responsibility”', 'The Hacker News, CNBC'],
  ['Undated', 'Binance says its investigation has “uncovered additional points of breach”', 'The Hacker News'],
  ['1 Nov, 06:00', 'Phased withdrawal restart begins; all 15 initial networks are live by 12:36', 'CNBC'],
  ['1 Nov', 'The FBI, with the US Secret Service and IRS-CI, attributes the theft to TraderTraitor. It says the stolen assets are being converted mainly into Ether, and publishes attacker wallet addresses', 'The Hacker News'],
  ['1 Nov, 06:00–15:30', 'US$4.649B withdrawn and US$1.01B deposited, for a net outflow of about US$3.64B (2.1% of Binance’s US$171B reported assets)', 'CNBC'],
  ['By 2 Nov', 'Binance says it has covered about 95% of the impacted amount. Circle’s freeze rises to more than 1.1B USDC; total frozen about US$2.85B', 'CNBC, The Hacker News'],
])}

<h3>Confirmed by Binance</h3>
<ul>
  <li>A compromised DevOps engineer’s laptop let an attacker reach a service container and submit unauthorised withdrawal transactions.</li>
  <li>There is no evidence of a wallet private key leak.</li>
  <li>The attacker “did not simply use one engineer’s permissions” (co-CEO Richard Teng). The investigation has not attributed responsibility to any individual employee.</li>
  <li>The investigation has since “uncovered additional points of breach”.</li>
  <li>Binance contained the compromised infrastructure, revoked the affected address authorisations and engaged law enforcement.</li>
  <li>Customer losses will be covered from the SAFU fund and Binance’s own funds. About 95% had been covered by 2 November; the remainder is in less liquid tokens.</li>
</ul>
<p>Binance has not published a full root cause or a final loss figure.</p>

<h3>Confirmed by third parties</h3>
<ul>
  <li><strong>FBI</strong> (with USSS and IRS-CI): attributes the theft to TraderTraitor, also tracked as Jade Sleet, Pressure Chollima, Slow Pisces and UNC4899. It expects laundering through DeFi and instant swap services (The Hacker News).</li>
  <li><strong>TRM Labs:</strong> high confidence in North Korean attribution. It notes similarities to the Bybit theft (Tornado Cash funding, staging, a burst of pre-signed transactions), but a different laundering pattern (The Hacker News).</li>
  <li><strong>Elliptic:</strong> the attacker appears to have got Binance’s own systems to sign transactions on their behalf. It urges caution on attribution because of differences in speed and method (The Hacker News).</li>
  <li><strong>Tether and Circle:</strong> froze about 1.567B USDT and more than 1.1B USDC respectively (CNBC).</li>
</ul>

<h3>Unverified or disputed</h3>
${table(['Claim', 'Status'], [
  ['The engineer’s laptop was the sole entry point', 'Preliminary. Binance’s own wording is “may have”, and it later reported additional points of breach'],
  ['One engineer’s permissions were enough to drain the wallet', 'Disputed by Binance. Teng says the attacker did not simply use one engineer’s permissions'],
  ['North Korea / TraderTraitor is responsible', 'Attributed by the FBI, TRM Labs and Chainalysis. Binance hasn’t independently confirmed it; Elliptic urged caution'],
  ['The attacker still controls about 420,000 ETH and 18,270 BTC (about US$2.4B)', 'Conflicting. Elliptic counts 511,861 ETH and 18,270 BTC as unfreezable'],
])}
<p><strong>On the numbers:</strong> the loss estimates (US$5.9B, 6.3B, 6.36B, 6.43B) differ mainly because firms priced the assets at different times and counted different chains and tokens. They describe the same theft. Quote a range, or name the source of the figure you use.</p>

<h2>How the attack worked</h2>
<p>Binance hasn’t published a root cause. What follows is our analysis, built from the confirmed facts and from TraderTraitor’s well-documented tradecraft. Where it goes beyond confirmed facts, treat it as a possibility to check, not a finding.</p>

<h3>Why an exchange’s hot wallet is a prize</h3>
<p>A hot wallet is an always-online wallet that pays out customer withdrawals automatically. To do that at scale, an exchange runs an internal service that receives withdrawal requests and signs them without a human in the loop. That puts three valuable things in one place:</p>
<ul>
  <li><strong>Signing authority.</strong> Whoever can talk to the signing service as a trusted caller can move funds. No private key theft is needed.</li>
  <li><strong>Speed.</strong> Automated signing means a drain can finish in minutes, faster than most teams can react.</li>
  <li><strong>A huge balance.</strong> The wallet held enough to pay out the entire balance in one transfer.</li>
</ul>
<p>That combination is what turned one foothold into the largest theft on record.</p>

<h3>The likely attack chain</h3>
<ol>
  <li><strong>Compromise an engineer.</strong> TraderTraitor has a long record of targeting engineers with fake job offers, trojanised trading or developer apps, and poisoned packages (CISA AA22-108A).</li>
  <li><strong>Ride trusted access inward.</strong> From the DevOps laptop, reach a service container inside production.</li>
  <li><strong>Stage carefully.</strong> Fund an operator wallet through Tornado Cash, deploy the tooling and test it on a few wallets, starting at least 36 hours ahead.</li>
  <li><strong>Get the system to sign.</strong> Submit withdrawal requests the platform treats as legitimate. TRM describes a single transaction carrying 50 pre-signed authorisations.</li>
  <li><strong>Drain and launder.</strong> Move the entire hot-wallet balance in minutes, then convert to ETH and route it through DeFi and swap services.</li>
</ol>

<h3>Two weak points worth understanding</h3>
<p><strong>1. The signer trusts the caller.</strong> If an internal signing or payout service approves anything an authenticated internal service asks for, compromising any trusted caller compromises the money. The fix is for the signer to enforce its own limits, independent of the caller: per-transaction caps, velocity limits, destination allowlists, and a human approval above a threshold. A single transfer of a wallet’s entire balance should be impossible without one.</p>
<p><strong>2. The engineer’s laptop is a production key.</strong> Many teams still keep standing cloud access on developer machines. A static key in <code>~/.aws/credentials</code> looks like this, and it never expires:</p>
${code('~/.aws/credentials · static key', `
[default]
aws_access_key_id = AKIA................
aws_secret_access_key = ........................................`)}
<p>Compare it with a short-lived SSO profile, which must be renewed with MFA and expires on its own:</p>
${code('~/.aws/config · SSO profile', `
[profile prod-readonly]
sso_session = company
sso_account_id = 111122223333
sso_role_name = ProdReadOnly`)}
<p>If malware lands on a laptop holding the first kind, the attacker gets the same access, for as long as the key lives.</p>

<h3>This has happened before</h3>
<ul>
  <li><strong>Bybit, February 2025, US$1.5B:</strong> the FBI attributed it to TraderTraitor (FBI PSA). The intrusion began with a compromised developer machine at the third-party wallet provider Safe{Wallet}.</li>
  <li><strong>TraderTraitor advisory, 2022:</strong> CISA, the FBI and Treasury described the group spear-phishing crypto-company employees, often with recruitment lures, to deliver trojanised apps (CISA AA22-108A).</li>
</ul>
<p>The playbook hasn’t changed. Target a person, inherit their access, and let your systems do the rest.</p>

<h3>What an attacker gets</h3>
<p>Everything the compromised identity can reach: cloud consoles, Kubernetes clusters, CI/CD pipelines, source code and internal services. At Binance, that path led to a system that could sign withdrawals. At most companies, it leads to customer data, payment and payout systems, or the ability to push code to production.</p>

<h2>Who is affected</h2>
${table(['Group', 'Status', 'Action'], [
  ['Binance users', 'Withdrawals restored in phases from 1 November; Binance says it will cover losses', 'Follow Binance’s official notices only. Ignore “refund” or “recovery” messages, which are a common follow-on scam'],
  ['Other exchanges, DeFi platforms and stablecoin issuers', 'May receive stolen funds', 'Screen against the FBI’s published wallet addresses; freeze and report matches'],
  ['Crypto, fintech and payments companies', 'Not affected by this incident, but run the same kind of automated signing and payout systems', 'Work through the checks below, starting with independent transaction limits'],
  ['Any business whose engineers have production access', 'Not affected, but exposed to the same entry route', 'Work through the checks below'],
])}

<h2>Why this hits Indian startups and SMEs hard</h2>
<p>Binance is a global exchange, but the setup that made it vulnerable is common in Indian tech companies. Three patterns stand out:</p>
<ul>
  <li><strong>Production keys on laptops.</strong> In fast-moving startups, engineers often hold permanent AWS keys, kubeconfigs and database passwords on their own machines, and sometimes on personal ones.</li>
  <li><strong>Automated money movement.</strong> UPI payouts, refunds, lending disbursements, wallet top-ups and crypto withdrawals often run through internal APIs that trust any authenticated internal caller.</li>
  <li><strong>Recruiter lures on LinkedIn.</strong> North Korean groups are known to approach developers with fake job offers and “take-home” coding tests. India’s large developer workforce is an obvious target. India has felt this directly: the July 2024 WazirX theft of about US$230M was attributed to North Korea-linked hackers.</li>
</ul>
<p>If your answer to “what could someone do with our lead engineer’s laptop?” is “I’d have to check”, start with the next section.</p>

<h2>Check your exposure in 10 minutes</h2>
<p><strong>On an engineer’s laptop</strong> (macOS, Linux, or Git Bash/WSL on Windows):</p>
${code('bash', `
# 1. Static AWS keys stored on this laptop? (any output = permanent keys on disk)
grep -n "aws_access_key_id" ~/.aws/credentials

# 2. Which AWS identity is this laptop signed in as right now?
aws sts get-caller-identity

# 3. Which Kubernetes clusters can this laptop reach?
kubectl config get-contexts

# 4. Which GitHub tokens are stored, and with what scopes?
gh auth status

# 5. SSH private keys with no passphrase
for k in ~/.ssh/id_*; do [ "\${k%.pub}" = "$k" ] && ssh-keygen -y -P "" -f "$k" >/dev/null 2>&1 && echo "NO PASSPHRASE: $k"; done`)}
<p><strong>In your AWS account</strong> (run with an admin or security-audit role):</p>
${code('bash', `
# 6. Who has full administrator access?
aws iam list-entities-for-policy --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# 7. Every IAM user: MFA status, and access keys with their last rotation date
#    (the report takes a few seconds to generate; if the second command says it isn't ready, run it again)
aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 --decode | cut -d, -f1,8,9,10,14,15`)}
<p>For any system that moves money or data automatically, ask the owning team in writing: “If a trusted internal service sends a valid-looking request, what stops it from moving everything at once?”</p>
<p><strong>Watch out for:</strong></p>
<ul>
  <li><strong>Permanent keys.</strong> Any output from step 1, or access keys in step 7 that haven’t been rotated in 90+ days.</li>
  <li><strong>Admin everywhere.</strong> More than a handful of people or roles in step 6, or production clusters reachable from everyday laptops in step 3.</li>
  <li><strong>No limits on automation.</strong> A payout, withdrawal or export service with no cap, velocity limit or human approval above a threshold.</li>
</ul>

<h2>Fix it</h2>

<h3>1. Remove standing production access</h3>
<ul>
  <li>Move people to AWS IAM Identity Center (SSO) with short sessions (1–4 hours) and MFA, then delete static keys with <code>aws iam delete-access-key</code>.</li>
  <li>Give everyday roles read-only access, and grant write or admin access just in time, time-limited and logged.</li>
  <li>For remaining IAM users, deny everything except MFA set-up until they sign in with MFA. Attach this to users or groups, never to roles. The listed actions stay allowed so a user can still enrol a device and get an MFA session from the CLI:</li>
</ul>
${code('IAM policy statement', `
{
  "Sid": "DenyAllExceptMfaSetupWithoutMfa",
  "Effect": "Deny",
  "NotAction": [
    "iam:CreateVirtualMFADevice",
    "iam:EnableMFADevice",
    "iam:GetUser",
    "iam:ListMFADevices",
    "iam:ListVirtualMFADevices",
    "iam:ResyncMFADevice",
    "sts:GetSessionToken"
  ],
  "Resource": "*",
  "Condition": { "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" } }
}`)}

<h3>2. Put independent limits on anything that moves money or data</h3>
<ul>
  <li>Enforce per-transaction caps, velocity limits and destination allowlists inside the signing, payout or export service, not in the caller.</li>
  <li>Require a second person, approving through a separate channel, above a set threshold.</li>
  <li>For deployments, use protected branches, CODEOWNERS review and GitHub Environments with required reviewers for production.</li>
</ul>

<h3>3. Treat engineer laptops as Tier-0 assets</h3>
<ul>
  <li>Require EDR, full-disk encryption and automatic updates on every machine with production access. No production access from personal devices.</li>
  <li>Use a separate browser profile, or a dedicated device, for production consoles.</li>
  <li>Brief engineers on fake recruiter approaches, coding “assessments” and unsolicited trading or developer tools sent over LinkedIn, Telegram or Discord.</li>
</ul>

<h3>4. Harden the developer supply chain</h3>
<ul>
  <li>Pin and verify dependencies: <code>pip install --require-hashes -r requirements.txt</code> and <code>npm ci --ignore-scripts</code>.</li>
  <li>Replace long-lived cloud secrets in CI with OIDC federation, scoped to a specific repository and branch:</li>
</ul>
${code('IAM role trust policy condition', `
"Condition": {
  "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
  "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main" }
}`)}

<h3>5. What not to do</h3>
<ul>
  <li><strong>Don’t blame one engineer.</strong> Binance itself says the attacker didn’t simply use one person’s permissions. The design let one foothold go far; fix the design.</li>
  <li><strong>Don’t rotate credentials from a compromised machine.</strong> Use a clean device, or the attacker sees the new secrets too.</li>
  <li><strong>Don’t rely on MFA alone.</strong> MFA protects the login, not a session or token that has already been issued on an infected laptop.</li>
  <li><strong>Don’t wait for the root-cause report.</strong> The controls above are worth having whatever Binance finds.</li>
</ul>

<h2>Detect and verify</h2>
<p>No indicators of compromise relevant to non-crypto businesses have been published. Look instead for the side effects that abuse of a trusted identity usually leaves, and treat them as leads to investigate, not proof.</p>
${code('bash', `
# Console sign-ins since a given date (CloudTrail is per region; repeat for each region you use)
aws cloudtrail lookup-events --start-time 2026-10-27 \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=ConsoleLogin \\
  --query 'Events[].[EventTime,Username]' --output table

# Common persistence steps: new access keys, new policies, new console passwords
for e in CreateAccessKey AttachUserPolicy AttachRolePolicy PutRolePolicy CreateLoginProfile; do
  aws cloudtrail lookup-events --start-time 2026-10-27 \\
    --lookup-attributes AttributeKey=EventName,AttributeValue=$e \\
    --query 'Events[].[EventTime,Username,EventName]' --output table
done

# High-severity GuardDuty findings
aws guardduty list-detectors
aws guardduty list-findings --detector-id <DETECTOR_ID> \\
  --finding-criteria '{"Criterion":{"severity":{"Gte":7}}}'`)}
<p><strong>Signs worth investigating:</strong></p>
<ul>
  <li>An engineer’s identity taking actions it has never taken before, especially outside working hours.</li>
  <li>New access keys, new admin policy attachments or new roles nobody requested.</li>
  <li>Production access from a new device, country or IP range.</li>
  <li>A burst of payouts, withdrawals, exports or deployments in a short window.</li>
  <li>Unexpected new packages, IDE extensions or binaries on developer machines.</li>
</ul>
<p><strong>After fixing, verify:</strong></p>
<ul class="art__checks">
  <li>No static AWS keys remain on laptops; everyone uses SSO with MFA.</li>
  <li>Payout, withdrawal and export services enforce their own caps and approvals.</li>
  <li>Production deploys need a second reviewer.</li>
  <li>If you found any of the signs above, revoke the identity’s sessions, rotate everything it could reach from a clean device, and review what it did.</li>
</ul>

<h2>The lesson beyond this incident</h2>
<p>The Binance heist will be remembered for its size. The design choices behind it are everywhere.</p>
<ul>
  <li><strong>Your engineers’ access is your attack surface.</strong> Attackers don’t need to break your perimeter if they can become someone you already trust.</li>
  <li><strong>Automation needs its own brakes.</strong> Any system that signs, pays or exports on request must enforce limits that a trusted caller can’t override.</li>
  <li><strong>Speed beats response.</strong> The drain took minutes, so prevention and hard limits matter more than how fast you can react.</li>
  <li><strong>Freezes and compensation are a response, not a defence.</strong> Binance could absorb a multi-billion-dollar loss; most companies can’t.</li>
  <li><strong>Training must match the lure.</strong> Fake recruiters and “coding tests” are a known entry route. Train engineers on those, not just on phishing links.</li>
</ul>

<section class="art__help" aria-labelledby="help-h">
  <h2 id="help-h">How Aerovant can help</h2>
  <p>If your engineers have production access, or your platform moves money or data automatically, our team can help:</p>
  <ul>
    <li><strong>Cloud access review:</strong> standing privileges, static keys, SSO and MFA coverage, and just-in-time access design for AWS.</li>
    <li><strong>Assumed-breach VAPT:</strong> we start from one compromised developer laptop and show how far an attacker could get, as a risk-ranked path, not a 200-page report.</li>
    <li><strong>Payout and transaction-flow review:</strong> independent limits, approvals and abuse cases for payment, payout and signing services.</li>
    <li><strong>Managed SOC:</strong> monitoring for misuse of valid accounts, new-device access and unusual privileged activity.</li>
  </ul>
  <p>Test your team on this scenario with ThreatReady: an engineer’s session starts acting out of character, and you’re on call. What’s your next move? Try it at <a href="https://threatready.io/">threatready.io</a>.</p>
  <p>Write to <a href="mailto:${site.email}">${site.email}</a> or <a href="${u('/contact/')}">get in touch</a>.</p>
</section>

<p class="t-note art__disclaimer">This article reflects public information as of 3 November 2026. Binance has not yet published a root cause, and details may change as the investigation continues. Attributions and disputed figures are reported as such. If you are a Binance customer, follow Binance’s official notices only.</p>

<h2>Sources</h2>
<p><strong>Government advisories</strong></p>
<ul class="art__sources">
  <li><a href="https://www.ic3.gov/PSA/2025/PSA250226">FBI / IC3: public service announcement on the Bybit theft (February 2025)</a></li>
  <li><a href="https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-108a">CISA, FBI and US Treasury: TraderTraitor advisory AA22-108A (2022)</a></li>
</ul>
<p><strong>News and analysis</strong></p>
<ul class="art__sources">
  <li><a href="https://thehackernews.com/2026/10/binance-suffers-security-breach.html">The Hacker News: Binance suffers security breach</a></li>
  <li><a href="https://thehackernews.com/2026/11/fbi-links-north-koreas-tradertraitor-to.html">The Hacker News: FBI links North Korea’s TraderTraitor to the Binance theft</a></li>
  <li><a href="https://www.cnbc.com/2026/11/02/binance-outflow-hack-bitcoin.html">CNBC: Binance outflows after the hack</a></li>
  <li><a href="https://www.bitdefender.com/en-au/blog/hotforsecurity/binance-hack-6-3-billion-laptop-breach">Bitdefender: Binance hack, US$6.3 billion, laptop breach</a></li>
  <li><a href="https://securityaffairs.com/?p=202119">Security Affairs</a></li>
  <li><a href="https://www.upi.com/Top_News/World-News/2026/11/02/binance-tradertraitor-fbi-cryptocurrency-hack/3931793653251/">UPI: FBI attributes Binance cryptocurrency hack to TraderTraitor</a></li>
  <li><a href="https://en.wikipedia.org/wiki/WazirX">Wikipedia: WazirX</a></li>
</ul>`,
};
