'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '..');
cp.execFileSync(process.execPath, [path.join(__dirname, 'compile-editorial-bank.cjs'), '--check'], { cwd: root, stdio: 'inherit' });
const groups = fs.readdirSync(path.join(root, 'editorial/items')).filter(file => file.endsWith('.json')).sort()
  .map(file => ({ file, ...JSON.parse(fs.readFileSync(path.join(root, 'editorial/items', file), 'utf8')) }));
const sourceHash = crypto.createHash('sha256').update(JSON.stringify(groups)).digest('hex');
const screening = JSON.parse(fs.readFileSync(path.join(root, 'output/editorial/reviewed-screening.json'), 'utf8'));
assert.equal(screening.sourceSha256, sourceHash, 'Regenerate the advisory screening report for the current source before writing the audit report');
const items = groups.flatMap(group => group.items);
const decisions = items.reduce((counts, q) => { counts[q.audit.decision]++; return counts; }, { retained: 0, revised: 0, replaced: 0 });
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const lines = [
  '# Full question-bank audit', '',
  'All 4,200 active items have an individual AI-assisted editorial record. Six parallel review agents covered separate topics; the coordinating review also checked cross-topic repetition, selected revised items, feedback display, and integration.', '',
  'This is an editorial quality review, not independent human validation or a study of actual learner difficulty. A1-C2 remain practice bands rather than empirically calibrated item ratings.', '',
  '## Coverage and decisions', '',
  '- 35 topics, six practice bands, and exactly 20 items in each topic-band set.',
  '- 4,200 distinct question-and-choice combinations, with no generated name or noun substitutions in the compiled bank.',
  '- 4,200 correct-answer explanations and 12,600 distractor-specific feedback records.',
  `- Decisions: ${decisions.retained} retained, ${decisions.revised} revised, and ${decisions.replaced} replaced.`,
  '- Every written set has five correct answers in each of four positions. Live quizzes independently randomize balanced answer positions.', '',
  'Retained means the item survived the individual review; revised means an existing item was edited; replaced means the assessed item was replaced. These labels describe editorial decisions, not measured learning gains.', '',
  '## Read the items', '',
  'Each linked review copy contains every sentence, choice, key, correct-answer explanation, and choice-specific feedback message, followed by the recorded findings, learning value, level rationale, and similarity review.', '',
  '| Topic | A1 | A2 | B1 | B2 | C1 | C2 |',
  '| --- | ---: | ---: | ---: | ---: | ---: | ---: |'
];
for (const group of groups) {
  cp.execFileSync(process.execPath, [path.join(__dirname, 'render-editorial-review.cjs'), path.join(root, 'editorial/items', group.file)], { cwd: root, stdio: 'inherit' });
  lines.push(`| [${group.topic}](reviews/${path.basename(group.file, '.json')}.md) | ${levels.map(level => group.items.filter(q => q.level === level).length).join(' | ')} |`);
}
lines.push('', '## Verification evidence', '',
  'The compiler checks complete review records, exact topic-band counts, distinct choices, answer membership, feedback coverage, stable IDs, and written answer balance. Integration tests verify that the shared quiz engine preserves the authored wording and feedback. Separate tests exercise all 210 focused selections, six mixed practice bands, saved-attempt compatibility, and complete level-check simulations.', '',
  `Advisory screening found ${screening.similarPairs.length} close wording pairs, ${screening.repeatedExplanations.length} repeated explanations, ${screening.itemFlags.length} flagged item messages, and ${screening.cells.filter(cell => cell.lengthCueReview).length} sets with a possible longest-answer cue. These mechanical signals neither establish grammatical correctness nor certify pedagogical quality.`, '',
  'See [the review guide](REVIEW-GUIDE.md), [audit status and language references](AUDIT-STATUS.md), and [browser verification](BROWSER-VERIFICATION.md) for the method, qualifications, and observed interface checks.', '',
  `Editorial source SHA-256: \`${sourceHash}\`. This fingerprint ties this report and the compiled bank to the same source records.`, '');
const destination = path.join(root, 'editorial/AUDIT-REPORT.md');
fs.writeFileSync(destination, lines.join('\n'));
fs.copyFileSync(path.join(root, 'output/editorial/reviewed-screening.json'), path.join(root, 'editorial/final-screening.json'));
console.log(destination);
