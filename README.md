# EnglishRoad

Static Cloudflare Workers site for `englishroad.com`, with source and automatic publishing connected to GitHub.

English Road offers grammar and vocabulary self-study, using 4,200 available quiz items across 35 topics and six practice bands.

- **Level Check**: a 100-question review with answer explanations, correct-answer totals, topic counts, and a copyable activity report. It does not claim a measured CEFR level, numerical confidence, or predicted examination scores.
- **Practice**: 25-question mixed sets across A1–C2 practice bands, or shorter focused topic sets. No question repeats within an attempt. A completed quiz offers a review and an optional study prompt containing the learner’s actual choices.
- **About and privacy**: the method, limits of the completed AI-assisted editorial review, and deletion controls.

Both tools can save one attempt in the browser. Save failures are visible and unsaved work has a leave warning. Each quiz page has a Delete my data button that clears English Road browser data and resets the current page. Previous sessions using obsolete questions/calculations cannot be resumed. A content fingerprint detects changed questions even if the saved-session format has not changed. Concurrent changes in another tab are detected before overwriting them.

## Shared code and data

- `editorial/items/`: item-level editorial source and audit decisions. The compiler prevents an incomplete audit from replacing the active bank.
- `coverage-bank-data.js`: compiled, individually authored records for all 4,200 items, with 20 per topic and practice band. It does not create question variants by substituting words into templates.
- `question-engine.js`: one bank builder, authored explanations, display helpers, option ordering, and structural validation. Every active item records its AI-assisted review provenance and date.
- `learning-summary.js`: whole-history difficulty pacing and conservative, changeable practice suggestions. The logistic pacing cue is internal only; it is not a validated proficiency score. It has no recency weighting, and an incorrect response cannot increase it.
- `site-ui.js`: save status, saved-data deletion and validation helpers, and question focus/scroll behavior.
- `quiz-loader.js`: concurrent script fetching with ordered execution, bounded waiting, and retry guidance. Each app signals readiness only after initialization succeeds.
- `app.js` / `practice.js`: the distinct activity flows and saved-session handling.

Suggested bands require at least five responses in the band and at least 75% correct; suggestions appear after ten total answers. When no band qualifies, A1 is offered as a starting point. These are transparent practice rules, not psychometric thresholds. Topic links choose an available band closest to the general suggestion, and learners can change it.

## Checks before publishing

Run `node scripts/check.cjs` (Node.js 22 or newer). No dependency installation is needed. It checks the active bank size, unique question-and-choice combinations, answer metadata, known content regressions, minimum topic/band coverage, monotonic pacing, order independence for identical responses, full synthetic runs, all six mixed sets, and every topic/band combination. These checks do not establish linguistic correctness or CEFR validity.

The [full audit report](editorial/AUDIT-REPORT.md) links to all 35 readable item sets and their individual decisions. After editing the source, run `node scripts/balance-editorial-options.cjs`, `node scripts/compile-editorial-bank.cjs`, and `node scripts/check-editorial-bank.cjs --full-checks`. Recreate the screening and review copies with `node scripts/screen-reviewed-items.cjs` followed by `node scripts/write-editorial-report.cjs`. Publishing requires `node scripts/compile-editorial-bank.cjs --check` to confirm the active file matches all 4,200 reviewed records.

For browser verification, test both complete quiz flows, selected/checked/completed restore, ordinary navigation, 320-pixel Next positioning, keyboard focus, nine help languages, clipboard actions, Delete my data, blocked storage, obsolete/corrupt saves, script failures and retry, and every public page at 320/390/768/1280 pixels. Use an isolated browser profile; do not clear a learner’s actual progress. Keep temporary evidence under ignored `output/`.

The internal dashboard at `level-check.html?qa=1` distinguishes structural flags from editorial review pending. It offers a JSON export. An absence of automated flags does not mean every answer key is correct. Full independent editorial review, real-learner validation, and manual assistive-technology evaluation remain necessary before making stronger claims.

Cloudflare’s existing page-traffic analytics remains in place. There is no custom answer/report collection and no automatic call to an AI service.

## Hosting and publishing

Cloudflare Web Analytics uses **Automatic setup** for the public domain. Cloudflare injects the beacon as pages are served; do not embed it in HTML or page generators. The earlier manual analytics record is retained for historical traffic, while new visits appear in the automatic record.

Cloudflare's existing GitHub integration publishes the `main` branch to the `englishroad` Worker. `wrangler.jsonc` runs the question checks and `cloudflare/build.cjs`, which stages only public files under ignored `.cf-site/`. No paid Worker code or databases are required.

Public `.html` addresses are preserved, `/` serves `index.html`, and missing pages return a real 404. Preview addresses on `workers.dev` carry `X-Robots-Tag: noindex, nofollow`; the public domain remains indexable. Files revalidate with browsers so updates do not strand learners on older scripts. Learner storage stays on the same domain.

Validate a deployment with:

```sh
node scripts/check.cjs
node cloudflare/build.cjs
node cloudflare/verify.cjs https://englishroad.philstilwell.workers.dev
node cloudflare/verify.cjs https://englishroad.com
```

The verifier compares every public file with its local SHA-256 fingerprint, checks the homepage, and confirms that missing files and project sources return 404. `deployment.json` records the deployed commit and public-file fingerprints without exposing credentials.

Namecheap remains the domain registrar. Cloudflare manages DNS and serves the site through Worker custom domains for the apex and `www`; the `www` hostname redirects to the apex. Domain registration renewals remain separate from the free static hosting.

### Recovery

Cloudflare retains earlier Worker versions for rollback. The original Namecheap DNS used `dns1.registrar-servers.com` and `dns2.registrar-servers.com`, with four apex A records `185.199.108.153` through `185.199.111.153` and `www` pointing to `philstilwell.github.io`. Preserve GitHub Pages as a temporary fallback during migration and confirm the intended host before changing DNS.

## Design system

The September 2026 redesign aligns English Road with English Ladder's editorial layout while keeping English Road green. See [DESIGN.md](DESIGN.md) for the shared foundation, component rules, current activity behavior, and verification checklist. All three pages load `family.css` before their page-specific stylesheet.

During a DNS handover, the verifier accepts an optional third argument containing the new server IP address. This bypasses old DNS cache entries for the check while still validating the real domain’s HTTPS certificate. Normal daily checks use public DNS.
