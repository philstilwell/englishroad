'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'editorial', 'items');
const groups = fs.readdirSync(directory).filter(name => name.endsWith('.json')).sort()
  .map(name => ({ file: name, ...JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')) }));
const items = groups.flatMap(group => group.items.map(q => ({ ...q, topic: group.topic, category: group.category })));
const progress = groups.map(group => ({ topic: group.topic, total: group.items.length,
  reviewed: group.items.filter(q => q.audit?.status === 'reviewed').length }));
const reviewed = items.filter(q => q.audit?.status === 'reviewed').length;
const validateReviewed = process.argv.includes('--validate-reviewed');
if (process.argv.includes('--progress')) {
  console.log(JSON.stringify({ total: items.length, reviewed, pending: items.length - reviewed, topics: progress }, null, 2));
  process.exit(0);
}
assert.equal(groups.length, 35, 'Expected all 35 topics');
assert.equal(new Set(groups.map(group => group.topic)).size, 35, 'Duplicate topic labels');
assert.equal(items.length, 4200, 'Expected all 4,200 items');
if (!validateReviewed) assert.equal(reviewed, 4200, `Editorial review incomplete: ${reviewed}/4200 items reviewed`);
assert.equal(new Set(items.map(q => q.id)).size, 4200, 'Duplicate IDs');
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const difficulty = { A1: 1.25, A2: 2.1, B1: 3.1, B2: 4.1, C1: 5.05, C2: 5.75 };
const signatures = new Set();
const blueprints = [];
for (const group of groups) {
  assert(['Grammar', 'Vocabulary'].includes(group.category), `${group.topic}: invalid category`);
  for (const level of levels) {
    const cell = group.items.filter(q => q.level === level);
    assert.equal(cell.length, 20, `${group.topic}/${level}: expected 20 items`);
    cell.sort((a, b) => Number(a.id.match(/\d+$/)[0]) - Number(b.id.match(/\d+$/)[0]));
    const firstId = Number(cell[0].id.match(/\d+$/)[0]);
    const code = cell[0].id.replace(/-\d+$/, '');
    assert.equal(code, `coverage-${path.basename(group.file, '.json')}-${level.toLowerCase()}`, `${group.topic}/${level}: ID belongs to a different topic file`);
    for (const [index, q] of cell.entries()) {
      assert.equal(q.id, `${code}-${firstId + index}`, `${group.topic}/${level}: IDs must stay contiguous and in their original cell`);
      assert(code.endsWith(`-${level.toLowerCase()}`), `${q.id}: ID and level differ`);
    }
    for (const q of cell) {
      const label = `${group.topic}/${level}/${q.id}`;
      assert(['pending', 'reviewed'].includes(q.audit?.status), `${label}: invalid review status`);
      if (validateReviewed && q.audit.status === 'pending') continue;
      for (const field of ['setupText', 'taskText', 'answer', 'explanation']) {
        assert.equal(typeof q[field], 'string', `${label}: missing ${field}`);
        assert(q[field].trim(), `${label}: empty ${field}`);
      }
      assert.equal(q.options.length, 4, `${label}: needs four choices`);
      assert.equal(new Set(q.options.map(s => s.replace(/\s+/g, ' ').trim())).size, 4, `${label}: repeated choices`);
      assert(q.options.includes(q.answer), `${label}: answer absent from choices`);
      assert.deepEqual(Object.keys(q.rationales).sort(), [...q.options].sort(), `${label}: feedback keys differ from choices`);
      for (const option of q.options) assert(q.rationales[option]?.trim().length >= 15, `${label}: missing feedback for ${option}`);
      const wrongFeedback = q.options.filter(o => o !== q.answer).map(o => q.rationales[o].trim());
      assert.equal(new Set(wrongFeedback).size, 3, `${label}: identical incorrect-answer feedback`);
      assert(['retained', 'revised', 'replaced'].includes(q.audit.decision), `${label}: missing editorial decision`);
      assert(Array.isArray(q.audit.findings), `${label}: missing original findings`);
      if (q.audit.decision !== 'retained') assert(q.audit.findings.some(finding => typeof finding === 'string' && finding.trim()), `${label}: changed item needs an original finding`);
      assert(q.audit.microSkill?.trim().length >= 3, `${label}: missing microSkill`);
      for (const field of ['pedagogicalValue', 'levelReason', 'similarityNote']) {
        assert(q.audit[field]?.trim().length >= 12, `${label}: missing ${field}`);
      }
      const signature = JSON.stringify([q.taskText.toLowerCase().trim(), q.options.map(o => o.toLowerCase().trim()).sort()]);
      assert(!signatures.has(signature), `${label}: duplicate item`);
      signatures.add(signature);
    }
    if (validateReviewed) continue;
    const answerPositions = [0, 0, 0, 0];
    for (const q of cell) answerPositions[q.options.indexOf(q.answer)]++;
    assert.deepEqual(answerPositions, [5, 5, 5, 5], `${group.topic}/${level}: balance written answer positions with scripts/balance-editorial-options.cjs`);
    blueprints.push({ code: cell[0].id.replace(/-\d+$/, ''), category: group.category, subcategory: group.topic,
      difficulty: difficulty[level], level, perCell: 20, firstId: Number(cell[0].id.match(/\d+$/)[0]),
      items: cell.map(q => ({ text: q.taskText, options: q.options, answer: q.answer, setup: q.setupText,
        focusKey: `${q.id}:${q.audit.microSkill}`, explanation: q.explanation, rationales: q.rationales,
        qaStatus: 'reviewed', reviewer: 'Codex AI-assisted editorial review', reviewDate: '2026-09-07' })) });
  }
}
if (validateReviewed) {
  console.log(`Validated ${reviewed} completed editorial records; ${4200 - reviewed} remain pending. No active files changed.`);
  process.exit(0);
}
blueprints.sort((a, b) => a.firstId - b.firstId);
let ordinal = 1;
for (const blueprint of blueprints) {
  assert.equal(blueprint.firstId, ordinal, `IDs would change for ${blueprint.code}`);
  ordinal += blueprint.perCell;
  delete blueprint.firstId;
}
const sourceHash = crypto.createHash('sha256').update(JSON.stringify(groups)).digest('hex');
const source = '// Compiled from individually reviewed editorial/items/*.json.\n' +
  '// Rebuild with node scripts/compile-editorial-bank.cjs; edit the source items, not this file.\n' +
  `// Editorial source SHA-256: ${sourceHash}\n` +
  '(() => {\n  const groups = ' + JSON.stringify(blueprints) + ';\n' +
  '  window.createEnglishRoadCoverageBlueprints = function () {\n' +
  '    return groups.map(({ items, ...blueprint }) => ({ ...blueprint, make(index) {\n' +
  '      const q = items[index];\n' +
  '      return { ...q, options: [...q.options], rationales: { ...q.rationales } };\n' +
  '    } }));\n  };\n})();\n';
const destination = path.join(root, 'coverage-bank-data.js');
if (process.argv.includes('--check')) {
  assert(fs.readFileSync(destination, 'utf8') === source, 'Compiled bank differs from reviewed source; rebuild before publishing');
  console.log('All 4,200 editorial records are complete and match the active question source.');
} else {
  const temporary = `${destination}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporary, source, { flag: 'wx' });
    fs.renameSync(temporary, destination);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
  console.log(`Compiled 4,200 reviewed items. Editorial source SHA-256: ${sourceHash}`);
}
