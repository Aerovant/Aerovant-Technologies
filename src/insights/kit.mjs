// Building blocks shared by every article body.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { a } from '../site.mjs';

/** Data table; the first cell of each row is its header. */
export const table = (head, rows) => `
<div class="art__tbl"><table class="tbl">
  <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody>
</table></div>`;

/** Code block. `src` is escaped here, so paste code as-is. */
export const code = (lang, src) =>
  `<figure class="art__code"><figcaption>${lang}</figcaption><pre><code>${src.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></figure>`;

/** Article image as <picture>: WebP at 800 and 1600 px when `<name>-800.webp` / `<name>-1600.webp` sit next to the JPEG,
    otherwise just the JPEG. The JPEG stays the og:image because some social previews do not read WebP. */
const assets = fileURLToPath(new URL('../assets/', import.meta.url));
export function picture(p, { sizes, alt = '', attrs = '' }) {
  const base = p.image.replace(/\.(jpe?g|png)$/i, '');
  const webp = [800, 1600].filter((w) => existsSync(`${assets}${base}-${w}.webp`));
  const img = `<img src="${a(p.image)}" alt="${alt}" width="${p.imageW ?? 1600}" height="${p.imageH ?? 840}" ${attrs}>`;
  return webp.length
    ? `<picture><source type="image/webp" srcset="${webp.map((w) => `${a(`${base}-${w}.webp`)} ${w}w`).join(', ')}" sizes="${sizes}">${img}</picture>`
    : img;
}
