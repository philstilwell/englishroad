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
for (const file of ['coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) {
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
const engine = c.window.EnglishRoadQuestions;
assert.equal(preview.length, 4200);
assert.deepEqual(preview.map(q => q.id), baseline.map(q => q.id));
if (process.argv.includes('--full-checks')) {
  const groups = new Map();
  for (const q of preview) {
    if (!groups.has(q.blueprint)) groups.set(q.blueprint, { code: q.blueprint, category: q.category,
      subcategory: q.subcategory, difficulty: q.difficulty, perCell: 20, items: [] });
    groups.get(q.blueprint).items.push({ text: q.taskText, setup: q.setupText, options: q.options,
      answer: q.answer, explanation: q.explanation, rationales: q.rationales, focusKey: q.focusKey,
      qaStatus: q.qaStatus, reviewer: q.reviewer, reviewDate: q.reviewDate });
  }
  const payload = `window.createEnglishRoadCoverageBlueprints = () => ${JSON.stringify([...groups.values()])}.map(({items,...group}) => ({...group, make(index) { const q=items[index]; return {...q, options:[...q.options], rationales:{...q.rationales}}; }}));`;
  const previewFs = { ...fs, readFileSync(file, options) {
    if (typeof file === 'string' && path.resolve(file) === path.join(root, 'coverage-bank-data.js')) {
      const encoding = typeof options === 'string' ? options : options?.encoding;
      return encoding ? payload : Buffer.from(payload);
    }
    return fs.readFileSync(file, options);
  } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'check.cjs'), 'utf8'), {
    require: name => name === 'node:fs' ? previewFs : require(name), console, URL, URLSearchParams
  }, { filename: 'check-reviewed-preview.cjs' });
}
for (const q of preview) {
  const record = reviewed.get(q.id);
  if (!record) continue;
  for (const field of ['taskText', 'setupText', 'answer', 'explanation']) assert.equal(q[field], record[field], `${q.id}: ${field} changed in the engine`);
  assert.equal(JSON.stringify(q.options), JSON.stringify(record.options), `${q.id}: options changed`);
  assert.equal(JSON.stringify(q.rationales), JSON.stringify(record.rationales), `${q.id}: feedback changed`);
  assert.equal(c.window.EnglishRoadLearning.levelForDifficulty(q.difficulty), record.level, `${q.id}: level changed`);
}
const revision = engine.bankRevision(preview);
for (const field of ['setupText', 'taskText', 'answer', 'explanation']) {
  const changed = preview.map((q, index) => index ? q : { ...q, [field]: `${q[field]} Changed` });
  assert.notEqual(engine.bankRevision(changed), revision, `Changing ${field} must invalidate a saved attempt`);
}
const feedbackChange = preview.map((q, index) => index ? q : { ...q, rationales: { ...q.rationales, [q.options[0]]: 'Updated diagnostic feedback.' } });
assert.notEqual(engine.bankRevision(feedbackChange), revision, 'Feedback changes must invalidate a saved attempt');
const reorderedFeedback = preview.map(q => ({ ...q, rationales: Object.fromEntries(Object.entries(q.rationales).reverse()) }));
assert.equal(engine.bankRevision(reorderedFeedback), revision, 'Object-key order alone must not invalidate an attempt');

// Regression fixtures distinguish an editorial warning from corrupt question data.
const article = { ...preview[0], taskText: 'I have just joined ___ university. You have not heard of it.',
  sentence: 'I have just joined ___ university. You have not heard of it.', setupText: 'Choose the article that introduces the university as new information.',
  options: ['a', 'an', 'the', '(nothing)'], answer: 'a', rationales: { a: 'A new singular referent with a consonant sound.', an: 'University starts with the consonant sound /j/.', the: 'This task asks for a new, unidentified referent.', '(nothing)': 'A singular count noun needs a determiner here.' } };
assert(engine.editorialWarnings(article).some(warning => warning.includes('article reference')));
assert.doesNotThrow(() => engine.validateBank([article, ...preview.slice(1)]), 'A context-dependent article warning must not disable the bank');
for (const broken of [
  { ...article, answer: 'some' },
  { ...article, options: ['a', 'a', 'the', '(nothing)'] },
  { ...article, rationales: { ...article.rationales, extra: 'Stale feedback.' } },
  { ...article, rationales: { ...article.rationales, the: '' } },
  { ...article, qaStatus: 'reviewed', reviewer: '' }
]) assert.throws(() => engine.validateBank([broken, ...preview.slice(1)]), /Question bank failed QA/);
const explicit = { text: 'I bought a new car. ___ car is red.', setup: 'Choose the article that keeps the same reference.',
  options: article.options, answer: 'the', explanation: 'An individually authored explanation must survive the legacy correction table.',
  rationales: article.rationales, qaStatus: 'reviewed', reviewer: 'Regression fixture', reviewDate: '2026-09-07' };
const built = engine.buildQuestion({ code: 'fixture', category: 'Grammar', subcategory: 'Articles', make: () => explicit }, 0, 0, 1.25);
assert.equal(built.explanation, explicit.explanation);
const zeroArticle = engine.explainAnswer({ subcategory: 'Prepositions', taskText: 'We travel ___ home.', answer: '(nothing)' });
assert(zeroArticle.includes('The completed sentence is: We travel home.'), 'The zero-article label must not appear inside a completed sentence');

for (const group of fs.readdirSync(directory).filter(f => f.endsWith('.json'))) {
  const records = JSON.parse(fs.readFileSync(path.join(directory, group))).items;
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const counts = [0, 0, 0, 0];
    for (const q of records.filter(q => q.level === level)) {
      const ordered = engine.orderOptionsWithBalancedAnswerPosition(q.options, q.answer, counts);
      assert.equal(new Set(ordered).size, 4);
      engine.recordAnswerPosition(ordered, q.answer, counts);
      assert(Math.max(...counts) - Math.min(...counts) <= 1, `${group}/${level}: unbalanced displayed answer positions`);
    }
    assert.deepEqual(counts, [5, 5, 5, 5], `${group}/${level}: a full quiz must balance all four displayed positions`);
  }
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
console.log(`${reviewed.size} revised items pass the real question engine with their IDs, instructions, choices and feedback preserved.${reviewed.size < 4200 ? ' Incomplete-publication guard passed.' : ''}`);
