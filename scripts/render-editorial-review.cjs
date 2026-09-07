'use strict';
// Produce a readable review copy directly from the authored records.
const fs = require('node:fs');
const path = require('node:path');
const topicFile = process.argv[2];
if (!topicFile) throw new Error('Provide a topic JSON file.');
const group = JSON.parse(fs.readFileSync(topicFile, 'utf8'));
const lines = [`# ${group.topic}: editorial review`, '', 'This is an AI-assisted editorial review copy. Publication and independent validation are separate steps.', ''];
for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
  const items = group.items.filter(q => q.level === level);
  lines.push(`## ${level}`, '', `${items.filter(q => q.audit.status === 'reviewed').length} of ${items.length} items individually reviewed.`, '');
  for (const [index, q] of items.entries()) {
    if (q.audit.status !== 'reviewed') continue;
    lines.push(`### ${index + 1}. ${q.audit.microSkill}`, '', `ID: \`${q.id}\``, '', q.setupText, '', q.taskText, '');
    q.options.forEach((option, i) => lines.push(`${i + 1}. ${option}${option === q.answer ? ' **[Correct]**' : ''}`));
    lines.push('', `**Explanation:** ${q.explanation}`, '', '**Choice feedback:**', '');
    for (const option of q.options) lines.push(`- **${option}:** ${q.rationales[option]}`);
    lines.push('', `**Decision:** ${q.audit.decision}.`, '', `**Original findings:** ${q.audit.findings.join(' ') || 'No defect recorded.'}`, '',
      `**Learning value:** ${q.audit.pedagogicalValue}`, '', `**Level rationale:** ${q.audit.levelReason}`, '', `**Similarity review:** ${q.audit.similarityNote}`, '');
  }
}
const destination = path.resolve('editorial', 'reviews', path.basename(topicFile, '.json') + '.md');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, lines.join('\n').trimEnd() + '\n');
console.log(destination);
