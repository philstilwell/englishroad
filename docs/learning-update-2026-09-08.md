# English Road learning update — September 8, 2026

## Learner-facing changes

- New grammar and vocabulary checks produce a report after 25 answers. Learners can stop there or continue to 50. The extension preserves their first 25 answers and its progress survives a refresh. Reports remain available during the extension.
- The report shows correct/attempted counts for each practice band, flags limited evidence, and explains that extra answers can confirm or change the suggested starting band. It makes no numerical-confidence or certified-proficiency claim. The question-selection pacing now allows consistently strong responses to reach advanced practice within the short check.
- A prominent “Your next step” section appears in assessment reports and before completed practice answer reviews. Learners can select missed answers, all reviewed answers, a topic, or one item, and copy a fully written prompt for coaching, vocabulary, grammar, or authentic dialogue/role-play practice. Review entries have a direct “Ask AI about this item” button. Manual selection remains available when clipboard access is denied.
- Targeted follow-ups offer up to 10 unseen questions for the selected focus, excluding the source attempt and preceding questions in the follow-up chain. A focus with fewer remaining questions shows its actual count; exhausted focuses point to the ready-made AI prompt or another focus. Topic pages and independent editorial review remain deferred.
- On phones, the header remains sticky but shrinks to about 61 CSS pixels, with a Menu button. All navigation destinations retain approximately 44-pixel tap targets. Escape, outside clicks, and navigation close the menu; links remain visible without JavaScript.

## Loading and compatibility

The public quiz pages now load a small question catalogue and only the needed topic/band files. All 4,200 questions remain available, without changing their wording, answers, or explanations. The 210 generated files have content-based names, SHA-256 integrity checks, a maximum of four parallel downloads, and retry after failures. The original full-bank file remains an internal compilation input and is omitted from public hosting.

A representative gzip comparison measured 13,444 bytes for the catalogue plus 5,223 bytes for the first question group, against 1,086,484 bytes for the former bank: approximately 98% less initial question data. This is not a whole-page speed or Core Web Vitals claim. Mixed quizzes fetch more groups as needed; immutable caching lets later visits reuse unchanged question files.

Saved attempts retain the same content fingerprint. Older 100-question attempts remain resumable; the 25/50 limit applies to new checks. Failed downloads do not clear saved attempts. A follow-up selection is transferred locally between tools and consumed after starting, so reloading resumes the resulting quiz rather than starting another one. Browser data deletion remains limited to English Road’s own keys. No new analytics events or automatic AI requests were added.

## Verification

Automated checks cover all 4,200 source records, all 210 topic/band combinations, simulated 25-, 50-, and legacy 100-question checks, access to advanced bands, saved-work conflicts, targeted question exclusion, prompt content, failed/corrupt question downloads, integrity verification, request reuse, and clipboard-denial report recovery.

Browser checks exercised the 25-question checkpoint, extension and refresh recovery, the complete 50-question report, legacy-save compatibility, a 10-question targeted follow-up, completed-review recovery, individual-item AI focus, failed downloads preserving the previous review, and the compact mobile menu. All question content was preserved; this work did not perform the deferred independent editorial review or learner trials.
