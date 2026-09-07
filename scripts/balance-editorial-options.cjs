'use strict';
// Reorder explicitly authored choices only. This script never creates item prose.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'editorial', 'items');
const groups = fs.readdirSync(directory).filter(file => file.endsWith('.json')).sort()
  .map(file => ({ file, data: JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')) }));
const items = groups.flatMap(group => group.data.items);
assert.equal(groups.length, 35, 'Expected all 35 topics');
assert.equal(items.length, 4200, 'Expected all 4,200 items');
assert(items.every(q => q.audit.status === 'reviewed'), 'Finish every individual review before reordering the source sets');
const checkOnly = process.argv.includes('--check');
const rank = id => crypto.createHash('sha256').update(`editorial-answer-position:${id}`).digest('hex');
let changed = 0;
for (const { data } of groups) {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const cell = data.items.filter(q => q.level === level);
    assert.equal(cell.length, 20, `${data.topic}/${level}: expected 20 items`);
    const counts = [0, 0, 0, 0];
    for (const q of cell) {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, q.id);
      assert(q.options.includes(q.answer), q.id);
      assert.deepEqual(Object.keys(q.rationales).sort(), [...q.options].sort(), q.id);
      counts[q.options.indexOf(q.answer)]++;
    }
    if (checkOnly) {
      assert.deepEqual(counts, [5, 5, 5, 5], `${data.topic}/${level}: written answer positions are not balanced`);
      continue;
    }
    const ranked = [...cell].sort((a, b) => rank(a.id).localeCompare(rank(b.id)));
    for (const [index, q] of ranked.entries()) {
      const options = q.options.filter(option => option !== q.answer);
      options.splice(index % 4, 0, q.answer);
      if (JSON.stringify(options) !== JSON.stringify(q.options)) changed++;
      q.options = options;
    }
  }
}
if (!checkOnly) {
  for (const { file, data } of groups) {
    const destination = path.join(directory, file);
    const temporary = `${destination}.${process.pid}.tmp`;
    try {
      fs.writeFileSync(temporary, JSON.stringify(data, null, 2) + '\n', { flag: 'wx' });
      fs.renameSync(temporary, destination);
    } finally {
      if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    }
  }
}
console.log(checkOnly ? 'All 210 written sets have five correct answers in each of four positions.'
  : `Reordered choices in ${changed} items. All question text, answers, feedback, and audit decisions are unchanged.`);
