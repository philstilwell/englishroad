# English Family design foundation, version 1

English Road follows the English Ladder editorial style, using the September 6, 2026 family design guide and the live English Ladder `editorial.css` as references. English Road keeps its green identity and its distinct assessment and practice flows.

`family.css` is the common foundation for Home, Level Check, Practice, and their reports. Load it before the relevant page stylesheet (`hub.css`, `styles.css`, or `practice.css`). It contains the neutral palette, system font stack, header, spacing, controls, answer states, focus treatment, and basic print rules. Page styles contain only the layout and components particular to each tool.

| Role | Shared value |
| --- | --- |
| Canvas / surface | `#FAF9F6` / `#FFFFFF` |
| Text / secondary text | `#20242B` / `#555E6B` |
| Divider / control edge | `#D8DCE2` / `#6B7280` |
| Typeface | Avenir Next, Segoe UI, Arial, sans-serif |
| Outer width / question width | 1200 px / up to 760 px |
| Side padding | 32 px desktop / 20 px mobile |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64 px |
| Primary button / answer option | At least 46 px / 52 px high |
| Focus | 3 px primary-color outline, 4 px separation |

English Road defaults to `#52651F` for primary actions, `#35430F` on hover, and `#EEF2E2` for unchecked selections. The optional `[data-family-theme="ladder"]` setting documents the blue counterparts (`#234DEB`, `#193CC2`, `#EDF1FF`). This repository does not deploy English Ladder or change its stylesheet. Coordinate future shared changes deliberately across the two repositories rather than assuming they share a deployed file.

The existing green ER favicon is reused as the compact brand mark. No new image, image service, or web font dependency is required. Large illustrated title banners remain as legacy assets but are no longer used in page headers.

## Behavior to preserve

- The 4,200-question bank, item generation, scoring, balanced question selection, and answer ordering remain unchanged.
- Level Check retains its first estimate at five answers and final report at 100. Existing browser storage keys, session format, restoration, and report calculations remain unchanged.
- Practice begins with the six-level setup. Each quiz still contains 25 non-repeating questions. Answers are locked when checked, with explicit correct/incorrect text and the existing item explanation.
- Native radio buttons and labeled selectors remain keyboard accessible. Feedback uses polite status regions. Checking an answer never changes its scored result through a retry.
- Restart controls ask before discarding an unfinished attempt. Level Check also asks before clearing a completed saved report.
- The study-prompt disclosure retains its existing availability once a practice quiz starts. It includes the answer key and clearly recommends using it after the quiz. Copying only writes text to the clipboard; it never contacts an AI service.
- Practice answers exist only on the current page; Level Check can save progress in this browser. The sites do not share stored answers or personal data.
- Completed practice offers a broad English Ladder reading-track link: A1/A2 → beginner, B1/B2 → intermediate, C1/C2 → advanced. No answers or personal information are added to URLs.

## Verification

Check all three routes at 320, 390, 768, and 1280 px, including active questions, feedback, expanded help, and completed reports. Check 200% scaling, long text, native keyboard selection, visible focus, and copy controls. Complete both quiz lengths with mixed correct and incorrect answers; verify no repeats, score totals, five- and 100-answer thresholds, and selection/answer/completion restoration.

Use `output/playwright/` for local screenshots and verification logs; those files and `.playwright-cli/` are excluded from commits. Report printing uses the shared typography and green accent. There is no new PDF export.

Verified on September 6, 2026 in Chromium: complete 25-question practice session (16 correct) and 100-question level check (75 correct), unique questions, answer locking, five-answer estimates, final reports, all six practice level choices, all nine language-help choices, refresh/resume before and after checking and after completion, clipboard output, keyboard controls, visible focus, the four target widths, 200% scaling, expanded help, long answers, and print styling. All checked text/background pairs exceed 4.5:1 contrast; green button text measures 6.48:1. No application JavaScript errors occurred. Local verification suppresses the existing analytics script, which otherwise rejects localhost traffic.
