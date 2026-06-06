# EnglishRoad

Static GitHub Pages app for `englishroad.com`.

EnglishRoad has two static tools backed by a generated bank of 4,200 screened ESL multiple-choice items.

- **Level Check**: a 100-question unofficial placement tool. It estimates EnglishRoad level, CEFR, TOEFL iBT, IELTS, and TOEIC L&R ranges; shows confidence language; and creates a screenshot-friendly final report.
- **Practice Quizzes**: 25-question quizzes for A1, A2, B1, B2, C1, and C2. Each quiz uses non-repeating random items from the same bank and includes a copyable AI study prompt for deeper explanations.

Each item is generated from a controlled blueprint with coded difficulty, parent category, practice area, explanation, option rationales, and QA status. Level Check samples across Grammar/Vocabulary, subcategories, and difficulty bands. Missed items are registered under `Grammar` and `Vocabulary` with practice areas beneath each.

The site does not require a login. Level Check can store progress in the browser so a refresh can continue the quiz. Cloudflare Web Analytics is included on the main pages to understand traffic.

## Internal QA

Open `level-check.html?qa=1` or `level-check.html#qa` to view the internal item-bank dashboard. It shows item counts, category coverage, duplicate-risk groups, missing rationales, flagged ambiguity, and QA status issues. The dashboard also includes a JSON export for future audits.

## Deploy on GitHub Pages

1. Push these files to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Choose the branch and root folder as the Pages source.
4. Set the custom domain to `englishroad.com`.
5. Keep the included `CNAME` file in the repository root.

## Namecheap DNS

For the apex domain `englishroad.com`, add four `A` records for host `@`:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.englishroad.com`, add a `CNAME` record for host `www` pointing to your GitHub Pages default domain, such as:

```text
YOUR-GITHUB-USERNAME.github.io
```

After DNS resolves in GitHub Pages, enable **Enforce HTTPS**.
