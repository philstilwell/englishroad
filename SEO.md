# English Road search discovery

Updated October 17, 2026. This work improves discovery of existing pages; separate topic pages remain deferred.

## Public pages

| Canonical address | Search intent |
| --- | --- |
| `https://englishroad.com/` | Free English grammar and vocabulary practice |
| `https://englishroad.com/level-check.html` | A free 25–50-question grammar and vocabulary check |
| `https://englishroad.com/practice.html` | English quizzes by topic and A1–C2 practice band |
| `https://englishroad.com/about.html` | Methodology, question review, maintainer, and privacy |

Each page has its own descriptive title, description, main heading, matching social-sharing metadata, canonical URL, and static structured data. The shared 1200 × 630 social image has descriptive alternative text. The homepage defines the English Road site name; inner pages include breadcrumbs. The quiz pages describe a free `LearningResource`, with explicit practice-band limitations. Phil Stilwell is identified as the maintainer on the About page.

The homepage now links directly to useful existing topic filters and explains the study workflow. The practice page includes all 35 topic links and two reviewed sample questions with expandable answers. These and the guidance sections are delivered as HTML, so readers and crawlers can access them without running JavaScript. The interactive quizzes continue to load question files only as needed. No new dependencies or large assets were added.

## Indexing and accuracy

- `/index.html` permanently redirects to `/`; inner extensionless addresses redirect to their existing `.html` addresses. Internal homepage links use `/`.
- Topic and band query parameters remain usable. They keep the canonical URL of the main practice page rather than being presented as separate topic pages.
- `sitemap.xml` lists only the four canonical pages. Change `lastmod` and structured-data `dateModified` only when the corresponding page meaningfully changes, not on every deployment.
- Question JSON remains available to render quizzes but receives `X-Robots-Tag: noindex`. Do not block required scripts or question files in `robots.txt`.
- Preview hosts remain excluded from indexing, and missing or private files return real 404 responses.
- Descriptions avoid claims of certified CEFR assessment, predicted examination scores, guaranteed proficiency, or independent validation. Visible FAQs are ordinary helpful content, not a claim to Google's restricted FAQ rich results. The site does not claim ratings, courses, flashcards, or a search feature it does not offer.

## Verification and next steps

`node scripts/check-seo.cjs` checks the four pages, metadata, structured-data references, internal destinations and fragments, sitemap, all topic links, and sample fidelity to the question bank. It runs during the Cloudflare build. `node scripts/check.cjs` checks quiz and loading behavior; `node cloudflare/verify.cjs https://englishroad.com` checks the published files and routing. Browser review covers desktop and narrow mobile layouts, topic selection, answer feedback, next-question navigation, sample answers, and console errors.

Cloudflare's existing protection settings can inject a hidden AI Labyrinth link and a JavaScript-detection bootstrap into HTML responses. The deployment check removes only those recognized additions before comparing the authored HTML exactly. It does not change Cloudflare protection settings or ignore arbitrary page differences.

The next measurement step is to verify ownership in Google Search Console and Bing Webmaster Tools, submit the sitemap, and review indexing, impressions, search queries, and click-through rates. This change does not create those accounts or submit a sitemap through them. Search engines determine when to recrawl pages and what titles and snippets to display.

## Official references

- [Google: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: useful snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: sitemaps and accurate last-modified dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: FAQ rich-result limitations](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Google: education Q&A eligibility](https://developers.google.com/search/docs/appearance/structured-data/education-qa)
- [Schema.org: LearningResource](https://schema.org/LearningResource)
- [Cloudflare: static-asset redirects and rewrites](https://developers.cloudflare.com/workers/static-assets/redirects/)
- [Cloudflare: AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)
- [Cloudflare: JavaScript detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/)
