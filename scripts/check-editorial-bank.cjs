'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'editorial', 'items');
const source = fs.readdirSync(directory).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(fs.readFileSync(path.join(directory, f))).items);
const reviewed = new Map(source.filter(q => q.audit.status === 'reviewed').map(q => [q.id, q]));
cp.execFileSync(process.execPath, [path.join(__dirname, 'compile-editorial-bank.cjs'), '--validate-reviewed'], { cwd: root, stdio: 'inherit' });
const c = vm.createContext({ window: {}, console });
for (const file of ['item-bank-data.js', 'coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c);
}
const original = c.window.createEnglishRoadCoverageBlueprints;
const baseline = c.window.EnglishRoadQuestions.createQuestionBank();
const byBlueprint = new Map();
for (const q of baseline) {
  if (!byBlueprint.has(q.blueprint)) byBlueprint.set(q.blueprint, []);
  byBlueprint.get(q.blueprint).push(q.id);
}
c.window.createEnglishRoadCoverageBlueprints = helpers => original(helpers).map(blueprint => ({
  ...blueprint,
  make(index) {
    const q = reviewed.get(byBlueprint.get(blueprint.code)[index]);
    if (!q) return blueprint.make(index);
    return { text: q.taskText, setup: q.setupText, options: q.options, answer: q.answer,
      explanation: q.explanation, rationales: q.rationales, focusKey: q.id,
      qaStatus: 'reviewed', reviewer: 'Codex AI-assisted editorial review', reviewDate: '2026-09-07' };
  }
}));
const preview = c.window.EnglishRoadQuestions.createQuestionBank();
assert.equal(preview.length, 4200);
assert.deepEqual(preview.map(q => q.id), baseline.map(q => q.id));
for (const q of preview) {
  const record = reviewed.get(q.id);
  if (!record) continue;
  for (const field of ['taskText', 'setupText', 'answer', 'explanation']) assert.equal(q[field], record[field], `${q.id}: ${field} changed in the engine`);
  assert.equal(JSON.stringify(q.options), JSON.stringify(record.options), `${q.id}: options changed`);
  assert.equal(JSON.stringify(q.rationales), JSON.stringify(record.rationales), `${q.id}: feedback changed`);
}
if (reviewed.size < 4200) {
  const filename = path.join(root, 'coverage-bank-data.js');
  const fingerprint = () => crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
  const before = fingerprint();
  const attempt = cp.spawnSync(process.execPath, [path.join(__dirname, 'compile-editorial-bank.cjs')], { cwd: root, encoding: 'utf8' });
  assert.notEqual(attempt.status, 0, 'Incomplete audit must not overwrite the active bank');
  assert(attempt.stderr.includes('Editorial review incomplete'), 'Compilation should fail specifically because review is incomplete');
  assert.equal(fingerprint(), before, 'The incomplete compile changed the active bank');
}
console.log(`${reviewed.size} revised items pass the real question engine with their IDs, instructions, choices and feedback preserved. Incomplete-publication guard passed.`);
