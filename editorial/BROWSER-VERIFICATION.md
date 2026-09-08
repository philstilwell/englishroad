# Browser verification

## Quotation correction, 7 September 2026

Two parallel reviewers inspected the question instructions and setups in all 35 topic files for unmarked references to words or phrases. Corrections affected 492 items in 30 topics: 164 questions, 304 setups, 413 explanations, and 1,187 choice-feedback messages. This was a quotation/style pass, not another semantic or level audit. Three questions were minimally reworded to ask explicitly about a quoted term; one feedback message gained "refers to". Other changes only added quotation marks or adjusted their placement.

- Compared every source record with the preceding version: IDs, levels, item counts, answer choices, correct answers, feedback keys, and previous audit decisions remained unchanged.
- Added a regression check that reproduces the unquoted `What does studies mean here?` failure, requires `What does 'studies' mean here?`, and distinguishes word references from ordinary references to people or situations.
- Recompiled all 4,200 items and passed the full shared-engine and selection checks. Advisory screening reported no similarity, repeated-explanation, generic-feedback, or answer-length flags.
- Completed all 20 A1 Academic vocabulary items through the browser, including the reported item. Verified exact context, quoted question wording, answer explanations, and selected-distractor feedback.
- Reloaded the answered `studies` item and resumed it; the same quoted wording and feedback survived. Verified all 20 entries in the completed review and study prompt.
- Confirmed that a saved attempt from before the correction could not restore stale wording after the bank revision changed.
- Checked the completed review at 320, 390, 768, and 1280 pixels without horizontal overflow. Visually inspected the reported question at 390 pixels, with the newer sticky navigation preserved.
- Repeated the complete practice test after integrating the separately published menu and save-control changes. The quotation test passed again. The earlier completed run produced no console errors or warnings.
- Verified all 26 final public files byte-for-byte against the local deployment, plus the homepage and internal-path 404 responses.

Final quotation-review source SHA-256: `ca639955a2de767d690cd1ce10a4e238dd563a84bd50533ec2d798819ee4ed2b`. Quiz asset version: `20260907-quotes-v1`. Temporary evidence is under ignored `output/playwright/`.

## Final compiled bank, 7 September 2026

These checks used the exact 25 public files built by `cloudflare/build.cjs`, served locally without editorial overlays. The compiled bank matched editorial source SHA-256 `a64912d4a44747f55d4d6c9d34ed457e91769242c42c42abc738be2ba9c45a0d`.

- Completed all 20 C2 Articles questions through the visible practice controls, deliberately selecting seven incorrect answers. The final result was 13/20.
- Checked each displayed task and context against its authored record, and verified the exact correct-answer explanation and selected-distractor feedback immediately after checking an answer.
- Reloaded and resumed an answered practice item; the same diagnostic feedback returned.
- Verified all 20 completed-review entries preserved the original context, task, answer, and feedback. The optional study prompt correctly covered the seven missed items with their context and selected-answer feedback.
- Verified 20 progress segments in answer order: seven red and 13 light green. The bar was 12 pixels thick.
- Completed a 100-question Level Check through its controls with 100 distinct questions, deliberately missing every tenth answer. The final result was 90/100. Reloading an answered question preserved its state and exact feedback.
- Checked the Level Check report text against all 100 responses, including every context, task, answer explanation, and selected-distractor message.
- Checked the completed practice review and Level Check report at viewport widths 320, 390, 768, and 1280 pixels: no horizontal page overflow. Visually inspected mobile feedback, desktop practice review, and the desktop Level Check report.
- Verified both saved test attempts existed, then used Delete my data and accepted its confirmation. Both local and session storage were empty afterward; the current responses and selection were cleared.
- Preserved the separately added CEFR score-comparison feature. Its dialog fit a 390-pixel viewport and closed with Escape.
- Recorded zero console errors or warnings in normal operation before the intentional failure test.
- Aborted the question-bank download in the isolated browser. The site displayed its loading-error message, kept Start quiz disabled, and did not request the retired bank. Restored the connection and used Retry loading to recover the complete 4,200-item bank.
- Verified the `20260907-audited-v2` asset version and absence of requests for `item-bank-data.js`.
- Ran `cloudflare/verify.cjs` against the local deployment: all 25 public files matched byte-for-byte, the homepage passed, and retired and internal editorial paths returned real 404 responses.

These browser checks establish delivery and interaction behavior, not empirical learner difficulty or independent validation of the language judgments. Screenshots and temporary test scripts are under ignored `output/editorial/`.

## Interim local preview, 7 September 2026

This check used a local preview containing the then-completed editorial records alongside the unchanged pending items. It was not a publication of the partial bank. The C2 Articles quiz used all 20 revised Articles records.

- Completed the 20-item C2 Articles quiz through the visible controls.
- Verified that a selected distractor's specific feedback appears immediately, alongside the correct answer and its explanation.
- Reloaded an answered item, resumed the saved quiz, and confirmed preservation of the same diagnostic feedback.
- Verified all 20 completed-review entries retained their setup/context and unaltered task wording.
- Verified that the optional study prompt includes the context and feedback on the learner's selected answer.
- Checked question, option, feedback, and review widths at 390 pixels: no horizontal overflow. Inspected mobile full-page feedback and a desktop review-entry screenshot at a 1280-pixel viewport.
- Exercised the same immediate-feedback path in Level Check. Its randomly selected Pronouns item was still pending editorial review, so this was a delivery check, not approval of that item's prose.
- The browser reported no console errors or warnings during the completed practice quiz.
- Used Delete my data to remove the two local test attempts; verified that local storage was empty.
- Closed the isolated test browser and stopped the local preview server.

This interim check was superseded by the final compiled-bank checks above.
