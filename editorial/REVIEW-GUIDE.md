# Full item audit, September 2026

Review the actual 120 items in each topic file, across A1, A2, B1, B2, C1, and C2. Each level must retain 20 items. Read every sentence, all four choices, the answer key, the explanation, and all three incorrect-answer messages. Structural checks alone are not editorial review.

## Editorial standard

- Exactly one answer must satisfy the stated task and context. A grammatical alternative cannot be rejected merely because it differs from a preferred textbook example. Add sufficient context, change the task, or replace the option.
- A grammar-only instruction requires three grammatically incorrect distractors. Meaning and register tasks must explicitly name their criterion. For sentence selection, use "Choose the grammatically correct sentence." only when appropriate.
- Distractors must represent plausible errors or a relevant misreading. Avoid irrelevant dictionary meanings, invented word forms, extreme claims that advertise themselves as wrong, and accidental alternatives in standard English dialects.
- Give each wrong option its own explanation naming the specific mismatch and, when useful, a contrast or correction. The correct-answer explanation must explain the evidence and teach something transferable.
- Check the whole set of 20 for variety of sentence structure, situation, vocabulary, usage distinction, and response demands. Appended location/time phrases and swapped nouns do not make an item pedagogically distinct.
- Keep adult contexts and accessible wording. At A1/A2, advanced topic names refer to foundations; do not force inversion, mandative subjunctives, or academic jargon onto beginners. At C1/C2, add meaningful interpretive or grammatical complexity, not merely longer words. All level assignments are editorial practice judgments, not calibrated CEFR scores.
- Preserve IDs and level coverage. Rewrite inadequate items within their assigned band. Each item needs four distinct options and an answer that exactly equals one option. Keep rationales keyed to the exact option strings.
- Do not retain irrelevant generated context tails. Reconstruct the sentence naturally if removing a tail exposes duplication.
- Do not use loops, substitution lists, or automatic prose generators to author replacements or feedback. Mechanical JSON formatting and structural checks are fine. Hand-author item content using apply_patch.

## Record a decision for each item

Replace `audit: {"status":"pending"}` only after examining the item with:

```json
{
  "status": "reviewed",
  "decision": "retained, revised, or replaced",
  "findings": ["Specific original problem; empty only when the original passed."],
  "microSkill": "The specific tested contrast",
  "pedagogicalValue": "What this example and feedback teach the learner",
  "levelReason": "Why the language and required decision suit this band",
  "similarityNote": "The concrete distinction from other items in the set"
}
```

`reviewed` records this AI-assisted editorial pass, not independent human validation. Never mark a topic or item complete when work remains. Check every replacement again by putting each option into its context.

## Level references

The Council of Europe's CEFR describes communicative proficiency; it is not a rigid grammar-topic list. English Profile supplies English-specific guidance. Use both as guides and record the actual demand of each question.

- [Council of Europe: CEFR levels](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions)
- [Council of Europe: CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)
- [Cambridge: Using CEFR criterial features for grammar instruction](https://www.cambridge.org/elt/blog/2021/06/23/using-cefr-criterial-features-for-grammar-instruction/)

No claim of empirical item difficulty or assessment validity should be inferred from this editorial audit.
