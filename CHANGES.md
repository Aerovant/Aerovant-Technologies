# Website changes — 13 October 2026 (social links)

- LinkedIn now points to `https://www.linkedin.com/company/aerovant-technologies` (was a `/in/` personal-profile URL).
- YouTube removed from the footer social links on every page. Remaining: LinkedIn, X, Instagram, Facebook.
- Both changes are in `src/site.mjs` → `site.social`; the footer is built from that list.

# Website changes — 13 October 2026 (QA pass)

- **External links:** one rule in `src/layout.mjs` (`externalize`, applied to every built page) gives every link to another domain `target="_blank" rel="noopener noreferrer"` and removes `target` from internal links. Covers ThreatReady, Academy and all five social links (94 link instances). The hand-added `target="_blank"` on the footer Privacy and Terms links, which are internal pages, is removed.
- **Email:** `contact@aerovanttech.com` → `admin@aerovanttech.com` in `src/site.mjs` and `security.txt`, and in every generated page. `hr@` is kept for careers.
- **HTML fixes:** raw `&` encoded ("Network &amp; Endpoints", "MITRE ATT&amp;CK"; the latter rendered as a broken character reference); phone number no longer wraps mid-number; invalid `autocomplete` removed from the hidden anti-spam field.
- **Repo:** deleted `CNAME copy`, `CNAME copy 2` and `.github copy/` (duplicates, not used by the build or deploy).
- **Tested:** 1,636 automated checks across 17 URLs at 1440 / 820 / 390 px: page loads, console/CSP errors, overflow, images, one h1, duplicate ids, canonicals, all internal links and anchors, external-link attributes, new-tab behaviour with no `window.opener`, desktop dropdown + Escape, phone menu, attack-surface buttons, FAQ by mouse and keyboard, contact-form validation, success, failure, double-submit and topic preselection (form endpoints mocked; nothing was sent).

# Website changes — 12 October 2026

Edit the files in `src/`, then run `node build.mjs`. `dist/` and the root copies are rebuilt output.

## Confirm before you push

These are in the code now. Change them if they're wrong.

| Item | Set to | Where |
|---|---|---|
| Registered company name | Aerovant Technologies Pvt. Ltd. | `src/site.mjs` → `legalName` |
| Enquiry email | admin@aerovanttech.com (changed from contact@ on 13 Oct 2026) | `src/site.mjs` → `email` |
| Reply-time promise | "We reply within one business day." | `src/site.mjs` → `replyTime` |
| Managed security hours | Business hours, IST, Mon–Fri; out-of-hours by arrangement | `src/site.mjs` → `services[2].hours` |
| Standards named | Cloud: CIS AWS Foundations, AWS Well-Architected Security Pillar. VAPT: OWASP WSTG, OWASP API Top 10, PTES | `src/site.mjs` → `methods` |
| Privacy: retention | 24 months after last contact | `src/pages/company.mjs` → `privacy` |
| Terms: courts | Krishnagiri, Tamil Nadu | `src/pages/company.mjs` → `terms` |

Have a lawyer read the privacy and terms pages. They now name the DPDP Act 2023, a grievance contact and a retention period, but I'm not a lawyer.

## What changed

**Product page (`/products/`)**, rewritten.
- Describes ThreatReady as it is now: Think (Attack Reasoning Lab), Do (Lab Simulations, marked "rolling out role by role"), Prove (InterviewPrep), across 15 role tracks.
- New section for hiring teams, engineering teams, colleges and individuals, each with its own enquiry link.
- Trust section: published rubric, three scoring passes, integrity controls, 14-day dispute.
- Bridge to services: the scenarios are written by the team that tests client systems.
- Links to threatready.io: home, the live demo and the sample report. Only links that work on the live site today are used.
- Removed: the one-item index, the one-row "Product" table and the old two-branch diagram. A new diagram shows the three parts feeding one rubric and one report.

**Homepage**
- Removed the "Cybersecurity capabilities" section. It was the third time the three services appeared, and the same diagrams are on `/services/`. Phone length drops from about 14.7 to 13.1 screens.
- The product block lists Think / Do / Prove and links to threatready.io.
- New strip, "One company, one idea": Academy trains, ThreatReady proves, services secure.
- Updated copy: the "What we build" fact, and the closing band now speaks to hiring and training teams.

**Every page**
- On phones and tablets, a "Talk to us" button now sits in the header bar; before, it was only inside the closed menu.
- Footer links have larger tap targets (about 44 px, up from about 20 px).
- Company name fixed; the "Pvt. Ltd.." typo in the terms is gone.
- Enquiries go to admin@. Careers keeps hr@.
- Content-Security-Policy and referrer policy are set in meta tags. Every page was tested in Chromium with no blocked requests.

**Services**
- Cloud and VAPT pages name the standards the work follows.
- Managed security states coverage hours and has a new "What hours do you cover?" FAQ entry.
- The activity-lane graphics are captioned "Schematic, not live data".

**Industries.** The opening line no longer says "We don't publish a sector list"; it names the four kinds of organization.

**Contact**
- Promises a reply within one business day.
- Requirement options now include ThreatReady hiring pilot, team training and college cohort.
- `?topic=` links preselect the right option. Old `?topic=products` links still work.

**Security and files**
- Added `/.well-known/security.txt`.
- Deleted the stray `CNAME copy`, `CNAME copy 2` and `.github copy`.

## Still needs you (I couldn't do these from code)

- **Cloudflare (or similar) in front of GitHub Pages.** `frame-ancestors`, `X-Content-Type-Options` and HSTS can only be sent as real headers, not meta tags.
- **LinkedIn.** Done 13 Oct 2026: now the company page `https://www.linkedin.com/company/aerovant-technologies`. Update ThreatReady's footer to the same URL.
- **Screenshots** of the ThreatReady app for the product page. It still uses a concept diagram.
- **A redacted sample VAPT report** and typical engagement timelines for the service pages.
- **Team or founder section** with certifications.
- **Analytics.** If you add any, update the privacy page, which currently says the site sets no analytics cookies.

## Checked

- Built all 14 pages and rendered each one in Chromium at 1440 px and 390 px.
- No console errors or CSP violations, no horizontal scrolling, and no broken internal links.
- Contact form not submitted, because it would send a real enquiry.
