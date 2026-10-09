// Zero-dependency static build.  node build.mjs [--file] [--bundle]
//   (default)  dist/ with clean URLs, for any static host (GitHub Pages, Netlify, S3…)
//   --file     same, but links end in index.html so dist/ can be opened straight from disk
//   --bundle   additionally writes preview.html: every page in one self-contained file
import { mkdir, writeFile, readFile, rm, cp, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { site, setCtx } from './src/site.mjs';
import { doc, header, footer } from './src/layout.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src'), out = join(root, 'dist');
const args = new Set(process.argv.slice(2));
const mode = args.has('--file') ? 'file' : 'web';

const pageFiles = (await readdir(join(src, 'pages'))).filter((f) => f.endsWith('.mjs')).sort();
// pathToFileURL: on Windows an absolute path like C:\\... is not a valid import specifier.
const pages = (await Promise.all(pageFiles.map((f) => import(pathToFileURL(join(src, 'pages', f)).href)))).flatMap((m) => m.default);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(src, 'assets'), join(out, 'assets'), { recursive: true });
await cp(join(src, 'static'), out, { recursive: true });

for (const p of pages) {
  const file = p.file ?? join(p.path, 'index.html');
  setCtx({ depth: p.file ? 0 : p.path.split('/').filter(Boolean).length, mode, abs: Boolean(p.file) });
  const html = doc({ ...p, body: p.render() });
  await mkdir(dirname(join(out, file)), { recursive: true });
  await writeFile(join(out, file), html);
}

// Old URLs from the previous site keep working.
const redirects = { 'abt.html': '/about/', 'pd.html': '/products/', 'serv.html': '/services/' };
for (const [from, to] of Object.entries(redirects)) {
  await writeFile(join(out, from), `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${site.url}${to}"><meta http-equiv="refresh" content="0;url=${to}"><a href="${to}">This page has moved.</a>\n`);
}

const indexable = pages.filter((p) => !p.noindex && !p.file);
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${site.url}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`built ${pages.length} pages → dist/ (${mode})`);

if (args.has('--bundle')) {
  const b64 = async (f, mime) => `data:${mime};base64,${(await readFile(join(src, 'assets', f))).toString('base64')}`;
  const assets = {
    'img/logo.svg': await b64('img/logo.svg', 'image/svg+xml'),
    'img/logo-white.svg': await b64('img/logo-white.svg', 'image/svg+xml'),
  };
  setCtx({ depth: 0, mode: 'bundle', assets, abs: false });
  const css = (await readFile(join(src, 'assets/css/site.css'), 'utf8')).replace(/url\("\.\.\/fonts\/archivo-var\.woff2"\)/, `url("${await b64('fonts/archivo-var.woff2', 'font/woff2')}")`);
  const js = await readFile(join(src, 'assets/js/site.js'), 'utf8');
  const tpl = pages.filter((p) => !p.file).map((p) => `<template data-path="${p.path}" data-title="${p.title}">${p.render()}</template>`).join('\n');
  const router = `
(function(){
  var main=document.getElementById('main');
  function show(){
    var h=location.hash.slice(1)||'/'; if(h.charAt(0)!=='/'){var t0=document.getElementById(h); if(t0)t0.scrollIntoView(); return;} var parts=h.split('#'), path=parts[0].split('?')[0], anchor=parts[1];
    var t=document.querySelector('template[data-path="'+path+'"]')||document.querySelector('template[data-path="/"]');
    main.innerHTML=''; main.appendChild(t.content.cloneNode(true));
    document.title=t.dataset.title+' | Aerovant Technologies (preview)';
    document.querySelectorAll('.nav a[aria-current]').forEach(function(a){a.removeAttribute('aria-current')});
    document.querySelectorAll('.nav__a').forEach(function(a){var p=a.getAttribute('href').slice(1); if(p===path||(p!=='/'&&path.indexOf(p)===0))a.setAttribute('aria-current','page')});
    window.AerovantInit&&window.AerovantInit(main);
    var el=anchor&&document.getElementById(anchor);
    if(el){el.scrollIntoView()}else{window.scrollTo(0,0)}
  }
  window.addEventListener('hashchange',show); show();
})();`;
  const html = `<!doctype html><html lang="en" class="js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Aerovant Technologies (preview)</title><style>${css}</style></head><body>
${header('/')}
<main id="main" tabindex="-1"></main>
${footer()}
${tpl}
<script>${js}</script><script>${router}</script></body></html>`;
  await writeFile(join(root, 'preview.html'), html);
  console.log(`bundle → preview.html (${(html.length / 1024).toFixed(0)} kB)`);
}
