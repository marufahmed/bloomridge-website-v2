# Bloomridge Springs website

Static site for [www.bloomridgesprings.com](https://www.bloomridgesprings.com), built with
Astro and deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every
push to `main`.

## Publish an article

1. Add a Markdown file to `src/content/articles/`, for example `my-guide.md`. The file name
   becomes the URL: `/resources/my-guide/`.
2. Start it with this frontmatter (all keys except `updatedDate` and `draft` are required):

   ```yaml
   ---
   title: "Is your child ready for school? A checklist that is not about the alphabet"
   description: "One plain sentence, 60 to 200 characters, that a parent would click on in Google."
   pubDate: 2026-09-16
   tags: ["school-readiness", "parents"]
   cover: "school-readiness"
   draft: false
   ---
   ```

   `cover` must be one of: `hero-classroom`, `early-intervention`, `school-readiness`,
   `speech-therapy`, `occupational-therapy`, `special-education`, `group-session`,
   `parent-review`, `home-practice`, `centre-exterior`.
3. Write the article below the frontmatter in Markdown. Use `##` for section headings, never `#`.
4. Commit and push to `main`. The site rebuilds and the article appears on `/resources/`, on the
   home page if it is one of the three newest, in the sitemap and in the RSS feed. A malformed
   frontmatter fails the build instead of publishing a broken page.

Set `draft: true` to keep a piece out of the build while you work on it.

## Change the facts

Name, address, phones, fees, plan names, program copy and the FAQ all live in
`src/lib/site.ts`. Change them there and every page, the footer and the structured data follow.

## Run locally

```
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
```

## Images

The ten illustrations in `src/assets/img/` were generated once with `scripts/gen-images.py`
(Azure gpt-image-2; needs `URL_GPT_IMAGE_2` and `KEY_GPT_IMAGE_2`). Astro resizes and converts
them at build time. The Open Graph cards in `public/og/` are made from them with
`node scripts/make-og.mjs`; rerun it if an illustration changes.

## Domain

`public/CNAME` holds `www.bloomridgesprings.com`. DNS at Cloudflare must point:

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | www | marufahmed.github.io | DNS only |
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |

Then in the repository, Settings, Pages, set the custom domain to `www.bloomridgesprings.com`
and tick Enforce HTTPS once the certificate is issued.
