// Drawing language shared by every figure:
//   filled shape   = something built
//   outline/hatch  = something examined
//   signal colour  = something exposed
// Classes (.f-l line, .f-s solid, .f-d dashed, .f-x signal line, .f-xf signal fill, .f-t text) are styled in site.css.
//
// Diagrams with labels come in two drawings: a wide one, and a narrow one re-laid-out for phones so the
// labels stay readable instead of shrinking with the viewBox. site.css shows one or the other (.fig--wide / .fig--narrow).

import { layers } from './site.mjs';

const A = '604,0 0,977 203,977 603,308 788,601 884,444';
const V = '1214,438 1023,438 798,810 605,498 510,653 712,977 887,977';

let uid = 0;
const hatch = (id, gap = 9, cls = 'f-hx') =>
  `<pattern id="${id}" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse" patternTransform="rotate(-58.3)"><path class="${cls}" d="M0 .5H${gap}"/></pattern>`;

/** Arrow from (x1,y1) to (x2,y2) with a small open head. */
function arrow(x1, y1, x2, y2, cls = 'f-l') {
  const ang = Math.atan2(y2 - y1, x2 - x1), s = 6;
  const p = (d) => `${(x2 - s * Math.cos(ang + d)).toFixed(1)} ${(y2 - s * Math.sin(ang + d)).toFixed(1)}`;
  return `<path class="${cls}" d="M${x1} ${y1}L${x2} ${y2}M${p(0.45)}L${x2} ${y2}L${p(-0.45)}"/>`;
}
const box = (x, y, w, h, label, cls = 'f-l') =>
  `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="f-t${cls === 'f-s-box' ? ' f-t--inv' : ''}" x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle">${label}</text>`;
const flag = (x, y) => `<path class="f-xf" d="M${x - 12} ${y}h12v12z"/>`;
const flagged = (x, y, w, h, label) =>
  `<rect class="f-x" x="${x}" y="${y}" width="${w}" height="${h}"/>${flag(x + w, y)}<text class="f-t" x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle">${label}</text>`;
/** Both drawings of one diagram. Only the visible one is exposed to assistive tech (the other is display:none). */
const pair = (wide, narrow) => wide + narrow;

/* Hero: the Aerovant mark drawn as a construction drawing. One stroke built, one examined. */
export function markFigure() {
  const id = `hx${++uid}`;
  return `
<svg class="fig fig-mark" viewBox="-100 -65 1380 1185" role="img" aria-labelledby="${id}-t">
  <defs>${hatch(id, 26)}</defs>
  <path class="f-d" d="M-70 977H1280"/>
  <polygon class="f-s mark-a" points="${A}"/>
  <polygon class="mark-v-fill" fill="url(#${id})" points="${V}"/>
  <polygon class="f-l mark-v" pathLength="1" points="${V}"/>
  <path class="f-l" d="M0 1002v36M203 1002v36M0 1020H203M712 1002v36M887 1002v36M712 1020H887"/>
  <path class="f-l" d="M604 0L512 -57M0 977L-92 920M512 -57L260 351M160 512L-92 920"/>
  <text class="fig-mark__k" x="0" y="1100">Build</text>
  <text class="fig-mark__k" x="234" y="447" text-anchor="middle" transform="rotate(-58.3 234 447)">Scale</text>
  <text class="fig-mark__k" x="712" y="1100">Secure</text>
</svg>`;
}

/* Attack surface: six stacked plates. Rendered 1:1 so the HTML rows beside it line up with each plate. */
export const AS = { cx: 292, hw: 220, hh: 66, t: 11, y0: 20, pitch: 86, w: 522 };
export function stackFigure() {
  const { cx, hw, hh, t, y0, pitch } = AS;
  const id = `as${++uid}`;
  const plates = [];
  for (let i = layers.length - 1; i >= 0; i--) {
    const y = y0 + pitch * i;
    const top = `${cx},${y} ${cx + hw},${y + hh} ${cx},${y + 2 * hh} ${cx - hw},${y + hh}`;
    const side = `${cx - hw},${y + hh} ${cx},${y + 2 * hh} ${cx + hw},${y + hh} ${cx + hw},${y + hh + t} ${cx},${y + 2 * hh + t} ${cx - hw},${y + hh + t}`;
    plates.push(`<g class="as-plate" data-layer="${i}"><polygon class="as-side" points="${side}"/><polygon class="as-top" points="${top}"/><polygon class="as-hatch" fill="url(#${id})" points="${top}"/></g>`);
  }
  const yc = (i) => y0 + hh + pitch * i;
  const appTop = yc(1) - 34, appBot = yc(1) + 34, allTop = yc(0) - 34, allBot = yc(5) + 34;
  return `
<svg class="fig fig-stack" viewBox="0 0 ${AS.w} ${y0 + pitch * 5 + 2 * hh + t + 14}" width="${AS.w}" height="${y0 + pitch * 5 + 2 * hh + t + 14}" aria-hidden="true" focusable="false">
  <defs>${hatch(id, 7, 'f-hx f-hx--signal')}</defs>
  <path class="f-l" d="M22 ${allTop}h-8v${allBot - allTop}h8"/>
  <text class="f-t" transform="translate(9 ${(allTop + allBot) / 2}) rotate(-90)" text-anchor="middle">Your attack surface</text>
  <path class="f-l" d="M60 ${appTop}h-8v${appBot - appTop}h8"/>
  <text class="f-t" transform="translate(47 ${(appTop + appBot) / 2}) rotate(-90)" text-anchor="middle">Your app</text>
  ${plates.join('\n  ')}
</svg>`;
}
/** Small plate glyph used beside each row on narrow screens. */
export const plateGlyph = () => '<svg class="as-glyph" viewBox="0 0 44 22" width="44" height="22" aria-hidden="true"><polygon points="22,1 43,9 22,17 1,9"/><path d="M1 9v4l21 8 21-8V9"/></svg>';

export function cloudProblemFigure() {
  const label = 'A public bucket, broad permissions and an open admin port combine into cloud exposure.';
  return pair(`
<svg class="fig fig--wide fig-cloud-problem" viewBox="0 0 520 214" role="img" aria-label="${label}">
  <text class="f-t" x="18" y="22">Small decisions</text>
  ${box(18, 38, 190, 44, 'Public bucket')}
  ${box(18, 96, 190, 44, 'Broad permissions')}
  ${box(18, 154, 190, 44, 'Open admin port')}
  ${arrow(208, 60, 342, 110)}${arrow(208, 118, 342, 118)}${arrow(208, 176, 342, 126)}
  ${box(350, 92, 154, 52, 'Cloud exposure', 'f-x')}
</svg>`, `
<svg class="fig fig--narrow fig-cloud-problem" viewBox="0 0 340 206" role="img" aria-label="${label}">
  <text class="f-t" x="6" y="20">Small decisions</text>
  ${box(6, 36, 164, 44, 'Public bucket')}
  ${box(6, 96, 164, 44, 'Broad permissions')}
  ${box(6, 156, 164, 44, 'Open admin port')}
  ${arrow(170, 58, 196, 106)}${arrow(170, 118, 196, 118)}${arrow(170, 178, 196, 130)}
  ${box(198, 92, 136, 52, 'Cloud exposure', 'f-x')}
</svg>`);
}

/* Product concept diagrams. These are schematics of the idea, not screenshots. */
export const productFigure = {
  threatready: () => {
    const b = (x, y, w, h, label, cls = 'f-l') =>
      `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="f-t${cls === 'f-s-box' ? ' f-t--inv' : ''}" x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle">${label}</text>`;
    const label = 'Concept diagram: two paths. Interview ready: resume plus job description leads to an AI interview and a skill profile. Skill ready: a role leads to attack reasoning and an enhanced skill. Both outcomes feed ThreatReady.';
    return pair(`
<svg class="fig fig--wide fig-prod" viewBox="0 0 680 300" role="img" aria-label="${label}">
  <text class="f-t fig-prod__k" x="12" y="34">Interview ready</text>
  ${b(12, 46, 136, 56, 'Resume + JD')}
  ${b(196, 46, 148, 56, 'AI interview')}
  ${b(392, 46, 136, 56, 'Skill profile')}
  ${arrow(148, 74, 194, 74)}${arrow(344, 74, 390, 74)}
  <text class="f-t fig-prod__k" x="12" y="190">Skill ready</text>
  ${b(12, 202, 136, 56, 'Role')}
  ${b(196, 202, 148, 56, 'Attack reasoning')}
  ${b(392, 202, 136, 56, 'Enhanced skill')}
  ${arrow(148, 230, 194, 230)}${arrow(344, 230, 390, 230)}
  ${b(560, 116, 112, 72, 'ThreatReady', 'f-s-box')}
  ${arrow(528, 74, 558, 128)}${arrow(528, 230, 558, 176)}
  <text class="f-t" x="340" y="292" text-anchor="middle">Role-specific readiness</text>
</svg>`, `
<svg class="fig fig--narrow fig-prod" viewBox="0 0 340 386" role="img" aria-label="${label}">
  <text class="f-t fig-prod__k" x="6" y="20">Interview ready</text>
  ${b(6, 32, 156, 50, 'Resume + JD')}
  ${b(6, 108, 156, 50, 'AI interview')}
  ${b(6, 184, 156, 50, 'Skill profile')}
  ${arrow(84, 82, 84, 106)}${arrow(84, 158, 84, 182)}
  <text class="f-t fig-prod__k" x="178" y="20">Skill ready</text>
  ${b(178, 32, 156, 50, 'Role')}
  ${b(178, 108, 156, 50, 'Attack reasoning')}
  ${b(178, 184, 156, 50, 'Enhanced skill')}
  ${arrow(256, 82, 256, 106)}${arrow(256, 158, 256, 182)}
  ${b(98, 282, 144, 56, 'ThreatReady', 'f-s-box')}
  ${arrow(84, 234, 126, 280)}${arrow(256, 234, 214, 280)}
  <text class="f-t" x="170" y="372" text-anchor="middle">Role-specific readiness</text>
</svg>`);
  },
};

/* Cloud security: an AWS account drawn as architecture, with the kind of thing a review flags. */
export function cloudFigure() {
  const label = 'Diagram of an AWS account: IAM roles, access keys and a storage bucket beside a VPC with a public and a private subnet. An IAM role, the storage bucket and an admin port are flagged as exposed.';
  return pair(`
<svg class="fig fig--wide fig-cloud" viewBox="0 0 520 330" role="img" aria-label="${label}">
  <rect class="f-l" x="6" y="6" width="508" height="318"/><text class="f-t" x="20" y="29">AWS account</text>
  ${flagged(22, 56, 112, 40, 'IAM role')}
  ${box(22, 122, 112, 40, 'Access keys')}
  ${flagged(22, 188, 112, 40, 'Storage bucket')}
  ${box(22, 254, 112, 40, 'Logs')}
  <rect class="f-d" x="160" y="56" width="338" height="250"/><text class="f-t" x="172" y="77">VPC</text>
  <rect class="f-l" x="176" y="92" width="146" height="198"/><text class="f-t" x="188" y="114">Public subnet</text>
  <rect class="f-l" x="338" y="92" width="146" height="198"/><text class="f-t" x="350" y="114">Private subnet</text>
  ${box(193, 132, 112, 38, 'Load balancer')}
  ${flagged(193, 222, 112, 38, 'Admin port')}
  ${box(355, 132, 112, 38, 'Application', 'f-s-box')}
  ${box(355, 222, 112, 38, 'Database')}
  ${arrow(305, 151, 354, 151)}${arrow(411, 170, 411, 221)}
</svg>`, `
<svg class="fig fig--narrow fig-cloud" viewBox="0 0 340 400" role="img" aria-label="${label}">
  <rect class="f-l" x="4" y="4" width="332" height="392"/><text class="f-t" x="16" y="29">AWS account</text>
  ${flagged(16, 44, 146, 42, 'IAM role')}
  ${box(178, 44, 146, 42, 'Access keys')}
  ${flagged(16, 100, 146, 42, 'Storage bucket')}
  ${box(178, 100, 146, 42, 'Logs')}
  <rect class="f-d" x="16" y="160" width="308" height="222"/><text class="f-t" x="28" y="183">VPC</text>
  <rect class="f-l" x="26" y="196" width="140" height="174"/><text class="f-t" x="36" y="219">Public subnet</text>
  <rect class="f-l" x="174" y="196" width="140" height="174"/><text class="f-t" x="184" y="219">Private subnet</text>
  ${box(36, 236, 120, 42, 'Load balancer')}
  ${flagged(36, 314, 120, 42, 'Admin port')}
  ${box(184, 236, 120, 42, 'Application', 'f-s-box')}
  ${box(184, 314, 120, 42, 'Database')}
  ${arrow(156, 257, 183, 257)}${arrow(244, 278, 244, 313)}
</svg>`);
}

/* Managed security: one lane of events per managed service. Deterministic, so builds are reproducible. */
export function laneTicks(seed, n = 56) {
  let s = seed * 9301 + 49297;
  const r = () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
  let out = '';
  const hot = new Set([Math.floor(r() * n), Math.floor(r() * n)]);
  for (let i = 0; i < n; i++) {
    const h = 4 + Math.floor(r() * 14), x = 4 + i * 8, isHot = hot.has(i);
    if (r() < 0.22 && !isHot) continue;
    out += `<path class="${isHot ? 'f-x lane-hot' : 'f-l'}" d="M${x} ${isHot ? 1 : 23 - h}V23"/>`;
  }
  return `<svg class="fig fig-lane" viewBox="0 0 ${n * 8} 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">${out}</svg>`;
}
