'use strict';
// Freeze the learner-visible questions so editorial review works on actual items.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {}, console });
for (const file of ['coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const bank = context.window.EnglishRoadQuestions.createQuestionBank();
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const groups = new Map();
for (const q of bank) {
  const slug = q.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!groups.has(slug)) groups.set(slug, { topic: q.subcategory, category: q.category, items: [] });
  groups.get(slug).items.push({
    id: q.id,
    level: levels.find(level => q.blueprint.endsWith(`-${level.toLowerCase()}`)),
    setupText: q.setupText,
    taskText: q.taskText,
    options: q.options,
    answer: q.answer,
    explanation: q.explanation,
    rationales: q.rationales,
    audit: { status: 'pending' }
  });
}
const destination = path.join(root, 'editorial', 'items');
fs.mkdirSync(destination, { recursive: true });
for (const [slug, group] of groups) {
  const filename = path.join(destination, `${slug}.json`);
  if (fs.existsSync(filename)) throw new Error(`Refusing to overwrite editorial work: ${filename}`);
  fs.writeFileSync(filename, JSON.stringify(group, null, 2) + '\n');
}
console.log(`Exported ${bank.length} actual items in ${groups.size} topic files. No review status was inferred.`);
