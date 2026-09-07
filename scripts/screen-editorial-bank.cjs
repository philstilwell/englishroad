'use strict';
// Screening locates review priorities; it must never award editorial approval.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {}, console });
for (const name of ['item-bank-data.js', 'coverage-bank-data.js', 'question-engine.js', 'learning-summary.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
}
const bank = context.window.EnglishRoadQuestions.createQuestionBank();
const normaliseFeedback = text => text.replace(/"[^"]*"/g, 'CHOICE').replace(/\s+/g, ' ').trim();
const grammarOnly = /only one (?:choice|sentence).*(?:correct|grammar)|choose the sentence that has clear English grammar/i;
const priorities = [];
for (const q of bank) {
  const flags = [];
  const wrongs = q.options.filter(option => option !== q.answer);
  const reasons = wrongs.map(option => normaliseFeedback(q.rationales[option]));
  if (new Set(reasons).size < reasons.length) flags.push('shared-wrong-feedback');
  if (q.explanation.includes('(nothing)')) flags.push('placeholder-in-completed-feedback');
  if (['Register', 'Hedging and precision'].includes(q.subcategory) && grammarOnly.test(q.setupText)) {
    flags.push('grammar-instruction-for-meaning-task');
  }
  if (/The (?:verb form must match|small word before the noun must|amount word must fit|describing word must fit|pronoun must clearly)|Only this option has natural|This is the only option with correct grammar|word-family form that fits this position|The keyed sentence|That is the role of the highlighted part/.test(q.explanation)) {
    flags.push('explanation-without-specific-reason');
  }
  if (/\b(?:report about the report|schedule about the schedule|form about the form)\b/i.test(q.taskText)) {
    flags.push('repeated-object-in-stem');
  }
  const advanced = /-(?:c1|c2)$/.test(q.blueprint);
  if (advanced && q.subcategory === 'Articles' && ['a', 'an'].includes(q.answer) && q.options.includes('many')) {
    flags.push('advanced-article-item-only-tests-basic-form');
  }
  if (advanced && /(?:Hardly had|^Had) [A-Z][a-z]+ ___/.test(q.taskText) && q.options.some(option => /^to [a-z]+$/.test(option))) {
    flags.push('advanced-item-tests-participle-slot-with-basic-foils');
  }
  priorities.push({ id: q.id, topic: q.subcategory,
    level: q.blueprint.match(/-([abc][12])$/)[1].toUpperCase(), flags });
}
const counts = {};
for (const item of priorities) for (const flag of item.flags) counts[flag] = (counts[flag] || 0) + 1;
const report = {
  scope: 'Automated screening of every active item; this is not individual semantic approval.',
  bankSha256: crypto.createHash('sha256').update(JSON.stringify(bank)).digest('hex'),
  total: bank.length,
  flagged: priorities.filter(q => q.flags.length).length,
  flagCounts: counts,
  items: priorities
};
const destination = process.argv[2] || path.join(root, 'output', 'editorial', 'active-bank-screening.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ total: report.total, flagged: report.flagged, flagCounts: counts, report: destination }, null, 2));
