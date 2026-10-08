// Drawing language shared by every figure:
//   filled shape   = something built
//   outline/hatch  = something examined
//   signal colour  = something exposed
// Classes (.f-l line, .f-s solid, .f-d dashed, .f-x signal line, .f-xf signal fill, .f-t text) are styled in site.css.

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
  `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="f-t${cls === 'f-s-box' ? ' f-t--inv' : ''}" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${label}</text>`;
const flag = (x, y) => `<path class="f-xf" d="M${x - 12} ${y}h12v12z"/>`;

/* Hero: the Aerovant mark drawn as a construction drawing. One stroke built, one examined. */
export function markFigure() {
  const id = `hx${++uid}`;
  return `
<svg class="fig fig-mark" viewBox="-100 -65 1380 1235" role="img" aria-labelledby="${id}-t">
  <defs>${hatch(id, 26)}</defs>
  <path class="f-d" d="M-70 977H1280"/>
  <polygon class="f-s mark-a" points="${A}"/>
  <polygon class="mark-v-fill" fill="url(#${id})" points="${V}"/>
  <polygon class="f-l mark-v" pathLength="1" points="${V}"/>
  <path class="f-l" d="M1047 977A160 160 0 0 0 970 840"/>
  <text class="f-t fig-mark__deg" x="1068" y="925">58°</text>
  <path class="f-l" d="M0 1002v36M203 1002v36M0 1020H203M712 1002v36M887 1002v36M712 1020H887"/>
  <path class="f-l" d="M604 0L512 -57M0 977L-92 920M512 -57L260 351M160 512L-92 920"/>
  <text class="fig-mark__k" x="0" y="1100">Build</text>
  <text class="f-t fig-mark__s" x="0" y="1152">ThreatReady</text>
  <text class="fig-mark__k" x="234" y="447" text-anchor="middle" transform="rotate(-58.3 234 447)">Scale</text>
  <text class="f-t fig-mark__s" x="278" y="474" text-anchor="middle" transform="rotate(-58.3 278 474)">Where cloud, code and security converge.</text>
  <text class="fig-mark__k" x="712" y="1100">Secure</text>
  <text class="f-t fig-mark__s" x="712" y="1152">Cybersecurity services</text>
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
  return `
<svg class="fig fig-cloud-problem" viewBox="0 0 520 230" role="img" aria-label="A public bucket, broad permissions and an open admin port combine into cloud exposure.">
  <text class="f-t" x="18" y="28">Small decisions</text>
  ${box(18, 48, 190, 42, 'Public bucket')}
  ${box(18, 104, 190, 42, 'Broad permissions')}
  ${box(18, 160, 190, 42, 'Open admin port')}
  ${arrow(208, 69, 342, 116)}${arrow(208, 125, 342, 125)}${arrow(208, 181, 342, 134)}
  ${box(350, 99, 154, 52, 'Cloud exposure', 'f-x')}
</svg>`;
}

/* Product concept diagrams. These are schematics of the idea, not screenshots. */
export const productFigure = {
  threatready: () => `
<svg class="fig fig-prod" viewBox="0 0 320 190" role="img" aria-label="Concept diagram: a system modelled as client, service and data store, with threats marked where data crosses a trust boundary.">
<svg class="fig fig-prod" viewBox="0 0 320 190" role="img" aria-label="Concept diagram: a candidate completes an AI interview and role-specific attack simulation, scored against one skill profile.">
  <rect class="f-d" x="12" y="22" width="296" height="146"/>
  <text class="f-t" x="22" y="40">Candidate profile</text>
  ${box(22, 68, 78, 42, 'Resume + role')}
  ${box(122, 52, 82, 42, 'AI interview')}
  ${box(122, 112, 82, 42, 'Attack sim')}
  ${box(222, 82, 76, 42, 'Skill profile', 'f-s-box')}
  ${arrow(100, 89, 120, 73)}${arrow(100, 89, 120, 132)}
  ${arrow(204, 73, 220, 94)}${arrow(204, 132, 220, 111)}
  <text class="f-t" x="160" y="181" text-anchor="middle">Role-specific readiness</text>
</svg>`,
};

/* Cloud security: an AWS account drawn as architecture, with the kind of thing a review flags. */
export function cloudFigure() {
  const f = (x, y, w, h, label) => `<rect class="f-x" x="${x}" y="${y}" width="${w}" height="${h}"/>${flag(x + w, y)}<text class="f-t" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${label}</text>`;
  return `
<svg class="fig fig-cloud" viewBox="0 0 520 330" role="img" aria-label="Diagram of an AWS account: IAM roles, access keys and a storage bucket beside a VPC with a public and a private subnet. An IAM role, the storage bucket and an admin port are flagged as exposed.">
  <rect class="f-l" x="6" y="6" width="508" height="318"/><text class="f-t" x="20" y="28">AWS account</text>
  ${f(22, 56, 112, 40, 'IAM role')}
  ${box(22, 122, 112, 40, 'Access keys')}
  ${f(22, 188, 112, 40, 'Storage bucket')}
  ${box(22, 254, 112, 40, 'Logs')}
  <rect class="f-d" x="160" y="56" width="338" height="250"/><text class="f-t" x="172" y="76">VPC</text>
  <rect class="f-l" x="176" y="92" width="146" height="198"/><text class="f-t" x="188" y="112">Public subnet</text>
  <rect class="f-l" x="338" y="92" width="146" height="198"/><text class="f-t" x="350" y="112">Private subnet</text>
  ${box(193, 132, 112, 38, 'Load balancer')}
  ${f(193, 222, 112, 38, 'Admin port')}
  ${box(355, 132, 112, 38, 'Application', 'f-s-box')}
  ${box(355, 222, 112, 38, 'Database')}
  ${arrow(305, 151, 354, 151)}${arrow(411, 170, 411, 221)}
</svg>`;
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
