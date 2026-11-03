// Building blocks shared by every article body.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { a } from '../site.mjs';

/** Data table; the first cell of each row is its header. */
export const table = (head, rows) => `
<div class="art__tbl"><table class="tbl">
  <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td data-label="${head[i]}">${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody>
</table></div>`;

/** Code block. `src` is escaped here, so paste code as-is. */
export const code = (lang, src) =>
  `<figure class="art__code"><figcaption>${lang}</figcaption><pre><code>${src.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></figure>`;

/** Article image as <picture>: every `<name>-<width>.webp` next to the JPEG becomes a srcset entry (e.g. -800 and -1600);
    with none, just the JPEG. The JPEG stays the og:image because some social previews do not read WebP. */
const assets = fileURLToPath(new URL('../assets/', import.meta.url));
export function picture(p, { sizes, alt = '', attrs = '' }) {
  const base = p.image.replace(/\.(jpe?g|png)$/i, '');
  const dir = base.slice(0, base.lastIndexOf('/') + 1), name = base.slice(dir.length);
  const webp = readdirSync(assets + dir)
    .filter((f) => f.startsWith(`${name}-`) && f.endsWith('.webp'))
    .map((f) => Number(f.slice(name.length + 1, -5)))
    .filter(Number.isInteger).sort((x, y) => x - y);
  const img = `<img src="${a(p.image)}" alt="${alt}" width="${p.imageW ?? 1600}" height="${p.imageH ?? 840}" ${attrs}>`;
  return webp.length
    ? `<picture><source type="image/webp" srcset="${webp.map((w) => `${a(`${base}-${w}.webp`)} ${w}w`).join(', ')}" sizes="${sizes}">${img}</picture>`
    : img;
}
