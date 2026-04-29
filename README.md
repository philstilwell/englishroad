# EnglishRoad ESL Assessment

Static GitHub Pages app for `englishroad.com`.

The assessment uses a generated bank of 1,500 original TOEFL, IELTS, TOEIC, and CEFR-mirrored multiple-choice questions. Each item is generated from a controlled blueprint with coded difficulty, parent category, and sub-weakness. Sessions draw non-repeating questions from the full bank, start with easy items, and only move sharply upward after strong recent accuracy. Missed items are registered under parent weakness categories, `Grammar` and `Vocabulary`, with sub-weaknesses beneath each.

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
