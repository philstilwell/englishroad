'use strict';
const fs = require('node:fs');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const origin = new URL(process.argv[2]);
if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/') throw new Error('Provide a site origin without a path.');
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.cf-site/deployment.json'), 'utf8'));
// An optional IP lets us verify the real domain before old DNS caches expire.
// curl still validates the domain's HTTPS certificate.
const connection = process.argv[3] ? ['--resolve', `${origin.hostname}:${origin.port || (origin.protocol === 'https:' ? 443 : 80)}:${process.argv[3]}`] : [];
const errors = [];
function fingerprint(file, body) {
  if (file.endsWith('.html')) {
    // Cloudflare adds a hidden AI Labyrinth link and a JavaScript-detection
    // bootstrap to some responses. Remove only those observed edge additions;
    // all authored HTML, metadata, scripts and whitespace must still match.
    let html = body.toString('utf8');
    html = html.replace(/<a href="https:\/\/englishroad\.com\/cdn-cgi\/content\?id=[^"<>]+" aria-hidden="true" rel="nofollow noopener" style="display: none !important; visibility: hidden !important"><\/a>/g, '');
    html = html.replace(/<script>[^<]*<\/script>/g, script =>
      script.startsWith('<script>(function(){function c(){var b=a.contentDocument') &&
      script.includes('window.__CF$cv$params=') &&
      script.includes("a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js'") &&
      script.endsWith('}})();</script>') ? '' : script);
    body = Buffer.from(html);
  }
  return crypto.createHash('sha256').update(body).digest('hex');
}
function get(file) {
  return new Promise((resolve, reject) => {
    cp.execFile('curl', [...connection,'--silent','--show-error','--fail','--max-time','30','--user-agent','English-family-deploy-check',new URL(file, origin).href], {encoding:'buffer',maxBuffer:30*1024*1024}, (err, body) => err ? reject(new Error(`Could not fetch ${file}`)) : resolve(body));
  });
}
(async () => {
  const entries = Object.entries(manifest.files);
  let next = 0;
  await Promise.all(Array.from({length:8}, async () => {
    while (next < entries.length) {
      const [file, expected] = entries[next++];
      try {
        const body = await get(file === 'index.html' ? '/' : file);
        const actual = fingerprint(file, body);
        if (actual !== expected) errors.push(`${file}: content mismatch`);
      } catch (e) { errors.push(e.message); }
    }
  }));
  const questionFile = entries.find(([file]) => file.startsWith('data/questions/'))?.[0];
  for (const [file, expected] of [['/', 'public, max-age=0, must-revalidate'], ...(questionFile ? [[questionFile, 'public, max-age=31536000, immutable']] : [])]) {
    const headers = cp.execFileSync('curl', [...connection, '-sSI', '--max-time', '30', new URL(file, origin).href], {encoding:'utf8'});
    const cache = headers.split(/\r?\n/).find(line=>/^cache-control:/i.test(line))?.replace(/^cache-control:\s*/i,'').trim();
    if (cache !== expected) errors.push(`${file}: unexpected cache policy ${cache}`);
  }
  const home = await get('/');
  if (fingerprint('index.html', home) !== manifest.files['index.html']) errors.push('Homepage mismatch');
  const aliases = [['/index.html', '/'], ['/practice', '/practice.html'], ['/level-check', '/level-check.html'], ['/about', '/about.html']];
  for (const [alias, target] of aliases) {
    const headers = cp.execFileSync('curl', [...connection, '-sSI', '--max-time', '30', new URL(alias, origin).href], {encoding:'utf8'});
    const status = headers.match(/^HTTP\/\S+ (\d+)/m)?.[1];
    const location = headers.match(/^location:\s*(.+)$/mi)?.[1].trim();
    if (status !== '301' || !location || new URL(location, origin).href !== new URL(target, origin).href) errors.push(`${alias}: expected permanent redirect to ${target}`);
  }
  // Filters must stay usable and point search engines to the main practice URL.
  const filtered = await get('/practice.html?level=B1&topic=Articles');
  if (fingerprint('practice.html', filtered) !== manifest.files['practice.html']) errors.push('Filtered practice page mismatch');
  if (questionFile) {
    const headers = cp.execFileSync('curl', [...connection, '-sSI', '--max-time', '30', new URL(questionFile, origin).href], {encoding:'utf8'});
    if (!/^x-robots-tag:[^\r\n]*\bnoindex\b/mi.test(headers)) errors.push('Question JSON should be accessible to the quiz but excluded from search results');
  }
  for (const missing of ['/missing-migration-check-74629.html','/.git/config','/README.md','/cloudflare/build.cjs',
    '/editorial/items/articles.json','/editorial/AUDIT-REPORT.md','/scripts/compile-editorial-bank.cjs','/item-bank-data.js','/coverage-bank-data.js']) {
    const status = cp.execFileSync('curl',[...connection,'-sS','-o','/dev/null','-w','%{http_code}','--max-time','30',new URL(missing,origin).href],{encoding:'utf8'});
    if (status !== '404') errors.push(`${missing}: expected 404, got ${status}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Verified ${entries.length} public files (HTML excludes only known Cloudflare protection additions), homepage, canonical redirects, filtered practice, cache/indexing policies, and real 404 responses at ${origin.origin}.`);
})().catch(e => { console.error(e.message); process.exitCode = 1; });
