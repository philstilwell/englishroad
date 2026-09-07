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

The audit implementation supersedes the first design release’s scoring and storage behavior:

- Display observed performance and small-sample cautions. Do not restore unvalidated confidence percentages, examination conversions, or measured CEFR claims.
- Draw both tools from the same deduplicated bank and explanation engine. Practice bands describe content, not certified learner ability.
- Keep native radio controls, clear focus, locked checked answers, and explicit correct/incorrect feedback. Keep feedback stationary; scroll the new question into view when Next is chosen.
- Level Check has 100 questions; mixed Practice has 25; focused Practice can be shorter. Both tools show truthful saving status, offer an always-visible Delete my data button, and can resume compatible browser-saved attempts.
- Ask before replacing unfinished attempts. Make obsolete/corrupt data notices visible and clear old incompatible data without offering downloads.
- Show the AI study prompt only after completion, including the learner’s choices. Copying writes to the clipboard only.
- Report topic links carry a practice band and topic, without individual answers. English Ladder links are broad reading-track suggestions with no personal data in the URL.
- Loading failures offer recovery and never silently leave a permanent disabled button.

## Verification

Use the checks in README.md and `node scripts/check.cjs`. Browser verification covers complete sessions, mobile Next positioning, narrow widths, save/restore/failure states, loading errors, translated language metadata, focused topic sets, clipboard, and screenshots. Accessibility scans supplement manual checks; they do not prove complete accessibility.

Use `output/playwright/` for local screenshots. The shared social card is a browser capture of the updated homepage, not generated artwork. The existing legacy banner files are no longer referenced by active page metadata.
