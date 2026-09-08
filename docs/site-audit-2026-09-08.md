# English Road site audit — September 8, 2026

English Road has a coherent visual identity, a useful shared question bank, and unusually clear explanations of what its results do and do not mean. Its next stage should make the learning journey shorter, easier to resume, and easier to discover. The immediate work in this audit addresses demonstrated reliability problems and presentation issues without changing the questions or the scoring rules.

## Scope and method

Audited English Road (https://englishroad.com): home, level check, practice, about/privacy, custom error page, shared scripts and styles, question delivery, saved data, reports, AI prompts, search metadata, and the existing Cloudflare publishing setup. English Ladder was considered as a linked sister site, not independently audited in this pass.

Methods included source inspection, the complete existing question-bank checks, new saved-data and clipboard regression checks, desktop and 320-CSS-pixel Chrome checks, a complete 25-question practice quiz, a complete 100-question level check, reload recovery, and controlled download/storage/clipboard failures on an isolated local preview. No live learner answers were changed. No paid service or additional software installation was required.

This is a site-wide product and technical audit, not a new independent linguistic review of all 4,200 questions, a formal accessibility certification, or a penetration test. A 12-item editorial spot check covered Modals and Register at all six bands; additional question feedback was inspected during browser testing. Real learner trials, native-speaker verification of all nine help translations, Safari/Firefox testing, and private Search Console/analytics data were outside this pass.

## Corrections included

| Priority | Finding | Correction and evidence |
| --- | --- | --- |
| High | A tab that initially saw no saved attempt could overwrite an attempt subsequently saved in another tab. Starting again could also delete changed data before the conflict check. | Compare the last observed storage value even when it was empty, and check for conflict before removing an attempt. Both quiz flows preserve their current state when replacement is blocked. The new two-tab regression reproduced the original failure and passes after the fix. |
| High | A restored, selected-but-unchecked first practice answer could be replaced without the unfinished-work confirmation. | Count the saved selection as unfinished work. Reproduced in Chrome before the fix; after the fix, canceling the confirmation preserved the original selection. An automated regression covers this exact case. |
| Medium | If copying a completed level-check report failed, the site only suggested taking a screenshot. That did not provide the complete answer record. | Provide a labeled, read-only text box containing the whole report, focus it, and select its text. Tested ordinary copying and a denied clipboard permission: both retained all 100 answer records; the test report contained 36,275 characters. |
| Medium | The home search description emphasized the sister site, and the quiz metadata did not clearly convey English Road’s own offering. | Rewrite home, practice, and level-check titles/descriptions; synchronize their social previews. Make About’s social title descriptive and update sitemap modification dates for the pages changed. |
| Low | The CEFR table heading broke across lines at a 320-pixel screen width. | Reserve enough width and keep the short heading together. The pop-up remains within the viewport and closes with Escape. |
| Low | README described the shared stylesheet as covering only three pages. | Update the documentation. |

Saved-data safeguards continue to allow an in-memory quiz when storage is unavailable, with a visible warning that progress is not saved. Conflicting data in another tab remains protected. Deleting data is restricted to English Road’s own stored keys.

## Verification results

| Area | Result |
| --- | --- |
| Question bank | 4,200 active, unique items; 35 topics × 6 bands × 20 items. All editorial records match the published question source. This verifies consistency, not universal linguistic correctness. |
| Selection and scoring | All 210 focused topic/band combinations passed; mixed sets contain 25 distinct questions. Five 100-question response-pattern simulations passed the scoring and selection boundaries. |
| Practice journey | Completed 25 questions through the interface; checked answer locking, compact feedback, next-question transitions, recovery before and after checking, completed-review recovery, and all 25 review entries. |
| AI extension | The completed practice quiz provided a full read-only prompt with the learner’s selected answers and explanations. Ordinary copying returned the expected 11,730 characters. Nothing was submitted to an AI service. |
| Level-check journey | Completed 100 questions through the interface. The observed report was 25/100 and restored with the same result. Ordinary copy and the denied-clipboard fallback both worked. |
| Failure recovery | Blocking the bank request produced the retry message; retry restored access to the saved review. Invalid saved JSON produced a clear recovery notice. Denied storage still allowed four answer choices and displayed the unsaved-progress warning. |
| Language help | All nine choices populated their help content and corresponding language attributes. Translation quality was not independently revalidated. |
| Responsive layout | All five public pages were checked at 320 CSS pixels with no horizontal document overflow. Desktop home layout also inspected. Completed report/fallback and practice review remained within the narrow viewport. |
| Structure and navigation | One main heading per page; no duplicate IDs or images missing alternative-text attributes in the checked pages. Packaged local assets/links and static fragment links resolved. Keyboard Escape closed the comparison. These checks do not establish complete screen-reader conformance. |
| Colors | Representative green text on the warm background: 6.16:1; muted text: 6.23:1; white button text on green: 6.48:1. These exceed the usual 4.5:1 normal-text minimum; not every interactive color combination was separately measured. |
| Hosting baseline | Live home returned 200; www and extensionless practice addresses redirected to the canonical address. Question bank was compressed and served from Cloudflare’s cache. Responses included content-type sniffing protection and a restricted referrer policy. |
| Publishing checks | Build validates the public asset list, local references, individual-file limits, and exact content hashes. Development/editorial sources are excluded from the public package. |

The exam-reference table was checked against the current [ETS TOEFL guidance](https://www.ets.org/toefl/institutions/ibt/score-scale-update.html) and [ETS TOEIC mapping](https://www.ets.org/content/dam/ets-org/pdfs/toeic/toeic-mapping-cefr-reference.pdf). It correctly distinguishes reference comparisons from predictions about English Road users.

The contrast reference is [W3C’s minimum-contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Search changes follow [Google’s guidance on clear titles and accurate descriptions](https://developers.google.com/search/docs/fundamentals/seo-starter-guide); they do not guarantee that Google will display the supplied wording or improve rankings.

## Recommendations, in priority order

### 1. Shorten the path to useful practice

Offer an optional short grammar-and-vocabulary check alongside the existing 100-question review. Give a clearly tentative topic recommendation after approximately 15–20 answers, with the option to continue for a broader review. Do not call the shorter route a validated placement test. Pilot the length with learners before settling on it.

Keep direct practice equally prominent. A learner should not feel obliged to complete 100 questions before getting value. Evaluate success by whether learners reach and complete useful practice, rather than by the number of questions they click.

### 2. Turn the review into a next-session plan

Add “Practice my missed topics” and a short follow-up set using different questions. Later, offer an optional browser-only review queue that brings topics back after a delay. Keep a visible explanation that saved history belongs to this browser and can be deleted.

On narrow screens, place a direct route to the AI study prompt beside the completion summary; it currently follows a long review in the page layout. Preserve the fully written prompt. A useful extension would ask the AI to teach one missed pattern at a time, give a brief authentic dialogue, ask the learner to respond, and wait before giving the answer. Learners should never have to invent the prompt themselves.

### 3. Build useful, searchable topic pages

Start with 8–10 high-value topics such as articles, verb tenses, questions, modals, prepositions, phrasal verbs, collocations, and workplace vocabulary. Each page should offer a concise explanation, genuinely distinct examples, a short dialogue where useful, links into the relevant practice bands, and a complete copy-and-paste AI extension.

Use familiar names with standard terminology where helpful: for example, “Who did it? — passive voice.” Link related English Ladder lessons to the corresponding Road practice page and back. This gives the sister sites complementary purposes and provides substantive entry pages beyond the current four-page sitemap. Avoid mass-producing thin pages for every topic/band combination.

Prioritize initial topics using actual learner demand or Search Console evidence when available. Google’s [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) supports useful content, descriptive titles, and understandable internal links; no traffic forecast is justified without data.

### 4. Reduce the first quiz download

The current public package totals approximately 5.32 MiB uncompressed. One live bank request transferred 1,082,727 bytes compressed in approximately 0.51 seconds on the audit connection. A home request transferred approximately 1.95 KB in 0.14 seconds. These are individual request measurements, not whole-page load times or a Core Web Vitals result.

Consider loading practice questions by band/topic and a smaller balanced initial selection for the level check. Preserve question fingerprints, randomness, feedback, saved-attempt recovery, and download-retry behavior. Measure low-end-phone behavior before and after; avoid adding a large application framework for this purpose.

Use real-user evidence from existing Cloudflare data and Search Console where available. [Google’s Core Web Vitals documentation](https://web.dev/articles/vitals) distinguishes user-experience measurements from isolated laboratory requests. No private analytics or real-user performance report was reviewed here.

### 5. Refine the small-screen navigation

At 320 CSS pixels, the fixed-on-scroll header is about 181 pixels tall, roughly 23% of an 800-pixel viewport. Keep the floating behavior requested, but consider a compact mobile navigation layout with the same accessible destinations. Test keyboard access, readable labels, and touch targets before adopting a collapsed menu. The desktop header already works well.

### 6. Strengthen editorial evidence before expanding the bank

Commission or arrange an independent review of a representative sample across all 35 topics and six bands, with special attention to ambiguous distractors and advanced register. Run small learner trials to find confusing instructions and mismatched difficulty. The current 4,200-item quantity is ample; stronger evidence about quality and usefulness would add more value than simply increasing it.

Keep the existing statements that these are approximate practice bands and activity reports. Do not add proficiency certificates or examination-score predictions without supporting validation. Preserve internal correction records without reintroducing the removed “Report a problem” feature.

## Suggested sequence

First: make completion-to-practice and completion-to-AI routes clearer, and pilot a shorter optional check. Next: publish the first carefully edited topic pages and connect matching English Ladder lessons. In parallel with those improvements, gather a performance baseline and independent editorial feedback; use that evidence to guide question loading and subsequent expansion.
