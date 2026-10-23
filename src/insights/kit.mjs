// Building blocks shared by every article body.

/** Data table; the first cell of each row is its header. */
export const table = (head, rows) => `
<div class="art__tbl"><table class="tbl">
  <thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('')}</tbody>
</table></div>`;

/** Code block. `src` is escaped here, so paste code as-is. */
export const code = (lang, src) =>
  `<figure class="art__code"><figcaption>${lang}</figcaption><pre><code>${src.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></figure>`;
