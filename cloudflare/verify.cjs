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
        const body = await get(file);
        const actual = crypto.createHash('sha256').update(body).digest('hex');
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
  if (crypto.createHash('sha256').update(home).digest('hex') !== manifest.files['index.html']) errors.push('Homepage mismatch');
  for (const missing of ['/missing-migration-check-74629.html','/.git/config','/README.md','/cloudflare/build.cjs',
    '/editorial/items/articles.json','/editorial/AUDIT-REPORT.md','/scripts/compile-editorial-bank.cjs','/item-bank-data.js','/coverage-bank-data.js']) {
    const status = cp.execFileSync('curl',[...connection,'-sS','-o','/dev/null','-w','%{http_code}','--max-time','30',new URL(missing,origin).href],{encoding:'utf8'});
    if (status !== '404') errors.push(`${missing}: expected 404, got ${status}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Verified ${entries.length} files byte for byte, homepage, cache policies, and real 404 responses at ${origin.origin}.`);
})().catch(e => { console.error(e.message); process.exitCode = 1; });
