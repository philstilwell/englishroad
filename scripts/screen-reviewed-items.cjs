'use strict';
// This report finds patterns for an editor to inspect; it never grants approval.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'editorial', 'items');
const groups = fs.readdirSync(directory).filter(f => f.endsWith('.json')).sort()
  .map(f => ({ file: f, ...JSON.parse(fs.readFileSync(path.join(directory, f), 'utf8')) }));
const items = groups.flatMap(g => g.items.filter(q => q.audit.status === 'reviewed').map(q => ({ ...q, topic: g.topic })));
const normalize = text => text.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim();
const words = text => normalize(text).match(/[a-z]+(?:'[a-z]+)?|___|\d+/g) || [];
const grams = (text, size = 3) => {
  const tokens = words(text);
  return new Set(tokens.slice(size - 1).map((_, i) => tokens.slice(i, i + size).join(' ')));
};
function surface(q) {
  if (q.taskText.includes('___')) return q.taskText;
  if (/^(Choose|Which|Pick|Find)\b/.test(q.taskText) && !/["'\u201c\u201d]/.test(q.taskText) && /[.!?]$/.test(q.answer)) return q.answer;
  return `${q.setupText} ${q.taskText}`;
}
const entries = items.map(q => ({ id: q.id, topic: q.topic, level: q.level, text: surface(q), grams: grams(surface(q)) }));
const index = new Map();
for (const [i, entry] of entries.entries()) {
  for (const gram of entry.grams) {
    if (!index.has(gram)) index.set(gram, []);
    index.get(gram).push(i);
  }
}
const candidates = new Set();
for (const matches of index.values()) {
  if (matches.length > 40) continue;
  for (let i = 0; i < matches.length; i++) {
    for (let j = i + 1; j < matches.length; j++) candidates.add(`${matches[i]}:${matches[j]}`);
  }
}
const similarPairs = [];
for (const pair of candidates) {
  const [a, b] = pair.split(':').map(i => entries[Number(i)]);
  if (Math.min(a.grams.size, b.grams.size) < 6) continue;
  const common = [...a.grams].filter(gram => b.grams.has(gram)).length;
  const similarity = common / (a.grams.size + b.grams.size - common);
  if (similarity >= 0.6) similarPairs.push({ ids: [a.id, b.id], similarity: Number(similarity.toFixed(3)), texts: [a.text, b.text] });
}
similarPairs.sort((a, b) => b.similarity - a.similarity);
const feedbackGroups = new Map();
const itemFlags = [];
for (const q of items) {
  const flags = [];
  const wrongs = q.options.filter(o => o !== q.answer).map(o => q.rationales[o]);
  const withoutQuotes = text => normalize(text).replace(/"[^"\n]*"|'[^'\n]{2,}'/g, 'TERM');
  if (new Set(wrongs.map(withoutQuotes)).size < 3) flags.push('wrong-feedback-same-after-quoted-terms-removed');
  if (/does not fit the grammar or meaning|the keyed sentence|best answer for this item|only this option has natural/i.test(q.explanation + ' ' + wrongs.join(' '))) flags.push('generic-feedback-phrase');
  if (/completed sentence[^\n]*\(nothing\)/i.test(q.explanation)) flags.push('zero-article-label-in-completed-sentence');
  if (/(?:clearest|best) short sentence/i.test(q.setupText + ' ' + q.taskText)) flags.push('obsolete-shortness-instruction');
  const key = normalize(q.explanation);
  if (!feedbackGroups.has(key)) feedbackGroups.set(key, []);
  feedbackGroups.get(key).push(q.id);
  if (flags.length) itemFlags.push({ id: q.id, flags });
}
const repeatedExplanations = [...feedbackGroups.entries()].filter(([, ids]) => ids.length > 1)
  .map(([explanation, ids]) => ({ ids, explanation }));
const cells = [];
for (const group of groups) {
  for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const reviewed = group.items.filter(q => q.level === level && q.audit.status === 'reviewed');
    const sentenceChoices = reviewed.filter(q => q.options.every(o => words(o).length >= 5));
    const longestCorrect = sentenceChoices.filter(q => {
      const correctLength = words(q.answer).length;
      return q.options.filter(o => o !== q.answer).every(o => words(o).length < correctLength);
    });
    const skills = new Map();
    for (const q of reviewed) {
      const skill = normalize(q.audit.microSkill);
      if (!skills.has(skill)) skills.set(skill, []);
      skills.get(skill).push(q.id);
    }
    cells.push({ topic: group.topic, level, reviewed: reviewed.length,
      decisions: reviewed.reduce((counts, q) => { counts[q.audit.decision] = (counts[q.audit.decision] || 0) + 1; return counts; }, {}),
      repeatedMicroSkills: [...skills.entries()].filter(([, ids]) => ids.length > 1).map(([microSkill, ids]) => ({ microSkill, ids })),
      sentenceChoiceItems: sentenceChoices.length, longestCorrect: longestCorrect.length,
      lengthCueReview: sentenceChoices.length >= 6 && longestCorrect.length / sentenceChoices.length > 0.6,
      longestCorrectIds: longestCorrect.map(q => q.id) });
  }
}
const report = { purpose: 'Advisory similarity, feedback and answer-cue screening of individually reviewed items. Every flag needs contextual judgment; passing is not pedagogical certification.',
  sourceSha256: crypto.createHash('sha256').update(JSON.stringify(groups)).digest('hex'),
  reviewed: items.length, pending: 4200 - items.length, similarPairs, repeatedExplanations, itemFlags, cells };
const destination = process.argv[2] || path.join(root, 'output', 'editorial', 'reviewed-screening.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ reviewed: report.reviewed, pending: report.pending, similarPairs: similarPairs.length,
  repeatedExplanations: repeatedExplanations.length, itemFlags: itemFlags.length,
  lengthCueCells: cells.filter(cell => cell.lengthCueReview).map(cell => `${cell.topic}/${cell.level}`), report: destination }, null, 2));
