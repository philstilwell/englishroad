'use strict';
// Apply explicitly authored item records by ID; never generate learner-facing prose.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const [topicFile, revisionsFile] = process.argv.slice(2);
assert(topicFile && revisionsFile, 'Usage: node scripts/apply-editorial-revisions.cjs topic.json revisions.json');
const group = JSON.parse(fs.readFileSync(topicFile, 'utf8'));
const revisions = JSON.parse(fs.readFileSync(revisionsFile, 'utf8'));
const byId = new Map(revisions.map(q => [q.id, q]));
assert.equal(byId.size, revisions.length, 'Duplicate revision IDs');
const known = new Set(group.items.map(q => q.id));
for (const revision of revisions) {
  assert(known.has(revision.id), `Unknown ID: ${revision.id}`);
  const old = group.items.find(q => q.id === revision.id);
  const q = { ...old, ...revision, audit: { ...old.audit, ...revision.audit } };
  assert.equal(q.level, old.level, `Changed level: ${q.id}`);
  assert.equal(q.options.length, 4, q.id);
  assert.equal(new Set(q.options).size, 4, q.id);
  assert(q.options.includes(q.answer), q.id);
  assert.deepEqual(Object.keys(q.rationales).sort(), [...q.options].sort(), q.id);
  assert.equal(q.audit?.status, 'reviewed', q.id);
  byId.set(q.id, q);
}
group.items = group.items.map(q => byId.get(q.id) || q);
const destination = path.resolve(topicFile);
const temporary = `${destination}.${process.pid}.tmp`;
try {
  fs.writeFileSync(temporary, JSON.stringify(group, null, 2) + '\n', { flag: 'wx' });
  fs.renameSync(temporary, destination);
} finally {
  if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
}
console.log(`Applied ${revisions.length} authored revisions to ${group.topic}.`);
