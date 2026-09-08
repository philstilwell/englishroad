'use strict';
// Package committed public files without changing their content or public URLs.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
// Publish only a complete bank that matches its individually reviewed source.
cp.execFileSync(process.execPath, [path.join(root, 'scripts', 'compile-editorial-bank.cjs'), '--check'], { cwd: root, stdio: 'inherit' });
cp.execFileSync(process.execPath, [path.join(root, 'scripts', 'split-question-bank.cjs'), '--check'], {cwd:root, stdio:'inherit'});
const out = path.join(root, '.cf-site');
const domain = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim();
const publicDirs = new Set(['assets', 'pdf', 'prompts', 'news', 'stories', 'grammar-concepts', 'english-for-work', 'sitemaps', 'archive', 'data']);
const extensions = new Set(['.html', '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.pdf', '.txt', '.json', '.xml', '.woff', '.woff2', '.ttf']);
const paths = cp.execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean);
const files = [...new Set(paths)].filter(file => {
  if (file === 'coverage-bank-data.js') return false;
  const parts = file.split('/');
  if (parts.some(part => part.startsWith('.'))) return false;
  if (parts.length > 1) return publicDirs.has(parts[0]) && extensions.has(path.extname(file));
  return ['robots.txt', 'sitemap.xml', 'lesson-data.json'].includes(file) || ['.html', '.css', '.js', '.svg', '.png', '.ico', '.webp'].includes(path.extname(file));
}).sort();
for (const required of ['index.html', '404.html', 'robots.txt', 'sitemap.xml']) {
  if (!files.includes(required)) throw new Error(`Missing public file: ${required}`);
}
if (files.length + 1 > 20000) throw new Error('Cloudflare free static-file limit exceeded.');
fs.rmSync(out, {recursive:true, force:true});
fs.mkdirSync(out, {recursive:true});
let bytes = 0;
const hashes = {};
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.lstatSync(source).isFile()) throw new Error(`Public asset is not a regular file: ${file}`);
  const data = fs.readFileSync(source);
  if (data.length > 25 * 1024 * 1024) throw new Error(`Cloudflare file limit exceeded: ${file}`);
  const dest = path.join(out, file);
  fs.mkdirSync(path.dirname(dest), {recursive:true});
  fs.writeFileSync(dest, data);
  bytes += data.length;
  hashes[file] = crypto.createHash('sha256').update(data).digest('hex');
}
// Fail if an HTML/CSS reference would be omitted from the deployment.
const present = new Set(files);
for (const file of files.filter(f => /\.(html|css)$/.test(f))) {
  const text = fs.readFileSync(path.join(out, file), 'utf8');
  const refs = [...text.matchAll(/(?:href|src)=["']([^"']+)["']|url\(["']?([^\s)'";]+)["']?\)/g)];
  for (const match of refs) {
    const value = (match[1] || match[2]).replaceAll('&amp;', '&');
    if (value.startsWith('https://static.cloudflareinsights.com/')) throw new Error(`${file}: remove the manual analytics snippet; Cloudflare injects it automatically.`);
    if (/^(?:#|data:|mailto:|tel:|javascript:)/i.test(value)) continue;
    const base = `https://${domain}/${file}`;
    let url;
    try { url = new URL(value, base); } catch { continue; }
    if (url.hostname !== domain) continue;
    let target = decodeURIComponent(url.pathname).slice(1);
    if (!target || target.endsWith('/')) target += 'index.html';
    if (!present.has(target)) throw new Error(`${file}: missing public target ${value}`);
  }
}
const revision = cp.execFileSync('git', ['rev-parse', 'HEAD'], {cwd:root,encoding:'utf8'}).trim();
fs.writeFileSync(path.join(out, 'deployment.json'), JSON.stringify({revision, files:hashes}, null, 2) + '\n');
// Exact .html URLs remain canonical. The root is an internal rewrite, with no redirect.
const redirects = ['/ /index.html 200'];
for (const file of files.filter(f => f.endsWith('.html') && f !== '404.html')) {
  if (file === 'index.html') continue;
  redirects.push(`/${file.slice(0, -5)} /${file} 301`);
}
fs.writeFileSync(path.join(out, '_redirects'), redirects.join('\n')+'\n');
fs.writeFileSync(path.join(out, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate

/data/questions/*
  Cache-Control: public, max-age=31536000, immutable

https://:worker.philstilwell.workers.dev/*
  X-Robots-Tag: noindex, nofollow

https://:version.:worker.philstilwell.workers.dev/*
  X-Robots-Tag: noindex, nofollow

/deployment.json
  X-Robots-Tag: noindex

/404.html
  X-Robots-Tag: noindex
`);
console.log(`Packaged ${files.length} public files (${(bytes/1024/1024).toFixed(2)} MiB), with exact URLs and checked local links.`);
