# EnglishRoad

Static Cloudflare Workers site for `englishroad.com`, with source and automatic publishing connected to GitHub.

English Road offers grammar and vocabulary self-study, using 659 distinct question-and-choice combinations selected from 4,200 generated variations.

- **Level Check**: a 100-question review with answer explanations, correct-answer totals, topic counts, and a downloadable/copyable activity report. It does not claim a measured CEFR level, numerical confidence, or predicted examination scores.
- **Practice**: 25-question mixed sets across A1–C2 practice bands, or shorter focused topic sets. No question repeats within an attempt. A completed quiz offers a review and an optional study prompt containing the learner’s actual choices.
- **About and privacy**: the method, limits, ongoing editorial review, browser-data export, and deletion controls.

Both tools can save one attempt in the browser. Save failures are visible and unsaved work has a leave warning. Previous Level Check sessions using obsolete questions/calculations cannot be resumed, but their saved data is retained as one backup when browser storage permits and can be downloaded from the update notice. A content fingerprint detects changed questions even if the saved-session format has not changed. Exported records are not importable quiz sessions. Concurrent changes in another tab are detected before overwriting them.

## Shared code and data

- `item-bank-data.js`: authored templates and answer choices.
- `question-engine.js`: one bank builder, deduplication, shared explanations, display helpers, option ordering, and structural validation. Stable first-entry IDs survive deduplication; repeated entries use one averaged editorial difficulty. Corrected feedback records a reviewer and date where explicitly reviewed. Other entries remain `draft`.
- `learning-summary.js`: whole-history difficulty pacing and conservative, changeable practice suggestions. The logistic pacing cue is internal only; it is not a validated proficiency score. It has no recency weighting, and an incorrect response cannot increase it.
- `site-ui.js`: save status, record downloads, saved-data validation helpers, and question focus/scroll behavior.
- `quiz-loader.js`: concurrent script fetching with ordered execution, bounded waiting, and retry guidance. Each app signals readiness only after initialization succeeds.
- `app.js` / `practice.js`: the distinct activity flows and saved-session handling.

Suggested bands require at least five responses in the band and at least 75% correct; suggestions appear after ten total answers. When no band qualifies, A1 is offered as a starting point. These are transparent practice rules, not psychometric thresholds. Topic links choose an available band closest to the general suggestion, and learners can change it.

## Checks before publishing

Run `node scripts/check.cjs` (Node.js 22 or newer). No dependency installation is needed. It checks the distinct bank, answer metadata, known content regressions, monotonic pacing, order independence for identical responses, full synthetic runs, all six mixed sets, and every topic/band combination. These checks do not establish linguistic correctness or CEFR validity.

For browser verification, test both complete quiz flows, selected/checked/completed restore, ordinary navigation, 320-pixel Next positioning, keyboard focus, nine help languages, clipboard/downloads, blocked storage, obsolete/corrupt saves, script failures and retry, and every public page at 320/390/768/1280 pixels. Use an isolated browser profile; do not clear a learner’s actual progress. Keep temporary evidence under ignored `output/`.

The internal dashboard at `level-check.html?qa=1` distinguishes structural flags from editorial review pending. It offers a JSON export. An absence of automated flags does not mean every answer key is correct. Full independent editorial review, real-learner validation, and manual assistive-technology evaluation remain necessary before making stronger claims.

Cloudflare’s existing page-traffic analytics remains in place. There is no custom answer/report collection and no automatic call to an AI service.

## Hosting and publishing

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
