'use strict';
// Dependency-free publishing checks for indexability, discovery, and truthful metadata.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const origin = 'https://englishroad.com/';
const pages = ['index.html', 'level-check.html', 'practice.html', 'about.html'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const decode = text => text.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, entity => ({'&amp;':'&','&quot;':'"','&apos;':"'",'&#39;':"'",'&#x27;':"'",'&lt;':'<','&gt;':'>'}[entity]));
const plain = text => decode(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1], decode(m[2] ?? m[3])]));
const documents = new Map(pages.map(file => [file, read(file)]));
const canonicalUrls = [];
const titles = new Set();
const descriptions = new Set();
const graphIds = new Set();
const references = [];
for (const [file, html] of documents) {
  assert.match(html, /<html lang="en">/, `${file}: declare the actual page language`);
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0]));
  function meta(key) {
    const hits = metas.filter(m => m.name === key || m.property === key);
    assert.equal(hits.length, 1, `${file}: one ${key} entry`);
    return hits[0].content;
  }
  const titleTags = [...head.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(titleTags.length, 1, `${file}: one title`);
  const title = decode(titleTags[0][1]);
  const description = meta('description');
  assert(title.includes('English Road') && title.length < 85, `${file}: descriptive branded title`);
  assert(description.length > 70 && description.length < 200, `${file}: useful page description`);
  assert(!titles.has(title) && !descriptions.has(description), `${file}: unique title and description`);
  titles.add(title); descriptions.add(description);
  const canonical = [...head.matchAll(/<link\b[^>]*>/g)].map(m => attrs(m[0])).filter(a => a.rel === 'canonical');
  assert.equal(canonical.length, 1, `${file}: one canonical`);
  const expected = origin + (file === 'index.html' ? '' : file);
  assert.equal(canonical[0].href, expected);
  canonicalUrls.push(expected);
  assert.equal(meta('og:url'), expected);
  assert.equal(meta('og:site_name'), 'English Road');
  for (const key of ['og:title', 'twitter:title']) assert.equal(meta(key), title);
  for (const key of ['og:description', 'twitter:description']) assert.equal(meta(key), description);
  assert.equal(meta('twitter:card'), 'summary_large_image');
  const image = new URL(meta('og:image'));
  assert.equal(image.origin, new URL(origin).origin);
  assert.equal(meta('twitter:image'), image.href);
  assert(fs.existsSync(path.join(root, image.pathname)), `${file}: social image exists`);
  assert(meta('og:image:alt') && meta('twitter:image:alt'));
  const png = fs.readFileSync(path.join(root, image.pathname));
  assert.equal(png.readUInt32BE(16), Number(meta('og:image:width')));
  assert.equal(png.readUInt32BE(20), Number(meta('og:image:height')));
  assert.match(meta('robots'), /(?:^|,\s*)index(?:,|$)/);
  assert.doesNotMatch(meta('robots'), /noindex|nofollow|nosnippet/);
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  assert.equal(headings.length, 1, `${file}: one main heading`);
  assert(plain(headings[0][1]).length > 12);
  const scripts = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${file}: server-delivered structured data`);
  const data = JSON.parse(scripts[0][1]);
  assert.equal(data['@context'], 'https://schema.org');
  assert(Array.isArray(data['@graph']));
  const website = data['@graph'].find(n => n['@type'] === 'WebSite');
  assert.equal(website.url, origin); assert.equal(website.name, 'English Road');
  const webpage = data['@graph'].find(n => ['WebPage', 'AboutPage'].includes(n['@type']));
  assert.equal(webpage.url, expected); assert.equal(webpage.description, description);
  for (const node of data['@graph']) {
    assert(!['FAQPage','QAPage','Course','Quiz','AggregateRating','Review'].includes(node['@type']), `${file}: do not claim unsupported rich-result eligibility`);
    assert(!node.aggregateRating && !node.review && !node.potentialAction, `${file}: no invented ratings or search actions`);
    assert(node['@id'].startsWith(origin)); graphIds.add(node['@id']);
    if (node['@type'] === 'BreadcrumbList') {
      assert.equal(node.itemListElement[0].item, origin);
      assert.equal(node.itemListElement.at(-1).item, expected);
      assert.deepEqual(node.itemListElement.map(n => n.position), [1,2]);
      assert.match(html, /aria-label="Breadcrumb"/);
    }
    if (node['@type'] === 'LearningResource') {
      assert.equal(node.isAccessibleForFree, true);
      assert.match(node.educationalLevel, /not a measured proficiency level/);
    }
  }
  function collect(value) {
    if (!value || typeof value !== 'object') return;
    if (Object.keys(value).length === 1 && value['@id']) references.push(value['@id']);
    for (const child of Object.values(value)) collect(child);
  }
  collect(data);
  // Check actual HTML links, including fragments, so the new directories stay usable.
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(match[0]).href;
    if (!href) continue;
    const url = new URL(href, expected);
    if (url.origin !== new URL(origin).origin) continue;
    assert.notEqual(url.pathname, '/index.html', `${file}: use the canonical homepage in internal links`);
    const target = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    assert(fs.existsSync(path.join(root, target)), `${file}: missing target ${href}`);
    if (url.hash) {
      const targetHtml = documents.get(target) || read(target);
      assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing fragment ${href}`);
    }
  }
}
for (const id of references) assert(graphIds.has(id), `Structured-data reference has no defined entity: ${id}`);
const sitemap = read('sitemap.xml');
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
assert.equal(listed.length, new Set(listed).size);
assert.deepEqual(listed.sort(), canonicalUrls.sort(), 'Sitemap must list exactly the canonical public pages');
for (const date of [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1])) {
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
  assert(Date.parse(date) <= Date.now(), 'Do not publish future sitemap dates');
}
assert.match(read('robots.txt'), /Sitemap: https:\/\/englishroad\.com\/sitemap\.xml/);
assert.doesNotMatch(read('robots.txt'), /^Disallow:\s*\/(?:\*|data\/|.*\.js)?\s*$/m, 'Crawlers need access to pages and quiz rendering assets');
assert.match(read('404.html'), /<meta name="robots" content="noindex">/);
const source = fs.readdirSync(path.join(root, 'editorial/items')).filter(f => f.endsWith('.json')).map(f => JSON.parse(read(`editorial/items/${f}`)));
const practice = documents.get('practice.html');
const directory = practice.split('id="practice-topics"')[1].split('<section class="learning-section"')[0];
const links = [...directory.matchAll(/<a\b[^>]*>/g)].map(m => new URL(attrs(m[0]).href, origin));
assert.deepEqual(links.map(u => u.searchParams.get('topic')).sort(), source.map(d => d.topic).sort(), 'Every topic needs one valid static discovery link');
const items = new Map(source.flatMap(d => d.items).map(q => [q.id,q]));
const samples = [...practice.matchAll(/<article data-sample-item="([^"]+)">([\s\S]*?)<\/article>/g)];
assert.equal(samples.length, 2);
for (const [,id,markup] of samples) {
  const q = items.get(id); assert(q, `Unknown sample ${id}`);
  const text = plain(markup);
  for (const field of [q.setupText,q.taskText,...q.options,q.answer,q.explanation]) assert(text.includes(field), `${id}: sample must match the reviewed bank`);
}
console.log('SEO checks passed: four canonical pages, unique metadata, structured data, sitemap, internal links, all 35 topics, and faithful quiz samples.');
