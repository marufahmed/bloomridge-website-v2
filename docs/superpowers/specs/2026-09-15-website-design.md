# Bloomridge Springs website — design spec

Date: 15 September 2026. Approved in chat by the owner before implementation.

## Purpose

A public website for Bloomridge Springs, a child-development centre in Banasree, Dhaka,
that turns a worried parent's search into a phone call or WhatsApp message. Secondary
purpose: rank on Google for the questions Dhaka parents actually type (speech delay,
autism early intervention, sensory processing, school readiness, therapy centre fees).

## Decisions taken with the owner

| Decision | Choice |
|---|---|
| Domain | `www.bloomridgesprings.com` (Cloudflare DNS, records to be set by owner) |
| Fees | Shown publicly, mirroring the printed brochure |
| Language | English only, site structured so Bengali pages can be added later |
| Stack | Astro 5 static site, GitHub Actions build, GitHub Pages hosting |
| Repository | `maruf-cc/bloomridge-springs`, public, containing only `07-Website/` |

## Constraints

- The business folder holds student names and clinical records. Only `07-Website/` is a
  git repository. Nothing outside it is ever committed.
- Brand is fixed by `01-Brand/design-system/`: pine `#0F3A32`, cream `#FBF8F1`, sand
  `#F3ECDD`, amber `#DE9A3C` (Early Intervention), teal `#2E7D6E` (School Readiness),
  gold `#F2B75F` for small bright details on dark panels only. Lora display, Poppins body.
  Hand-drawn stroke icons, never filled. Never both programme accents on one page.
- Voice per the design system: warm, direct, written to a parent. Sentence case. Numerals
  with `Tk` prefix. No emoji, no exclamation marks. Outcome framing over feature framing.
- Generated images: at most 10 with Azure gpt-image-2. Any image with children is written
  as a gouache picture-book illustration with no photographic vocabulary, because the
  deployment blocks photoreal minors.

## Architecture

```
07-Website/
  astro.config.mjs          site: https://www.bloomridgesprings.com, sitemap integration
  src/content.config.ts     `articles` collection (Markdown + frontmatter schema)
  src/content/articles/     one .md per article, this is the publishing mechanism
  src/layouts/Base.astro    head, SEO tags, JSON-LD, header, footer
  src/components/           Header, Footer, Hero, ProgramCard, PlanCard, WeekStrip,
                            LoopDiagram, ArticleCard, Cta, Icon, LeafRule
  src/pages/                index, early-intervention, school-readiness, therapies,
                            how-we-work, fees, about, contact, resources/[...],
                            rss.xml.ts, 404
  src/styles/global.css     tokens copied from the design system, type scale, layout
  src/lib/site.ts           single source of truth for name, address, phones, fees
  public/                   favicons, brand marks, CNAME, robots.txt
  scripts/gen-images.py     the 10 gpt-image-2 prompts and the Azure client
  .github/workflows/deploy.yml
```

## Pages

1. Home: hero, the two programmes, the three therapies plus group, how the week runs,
   the feedback loop, fees teaser, latest articles, contact strip.
2. Early Intervention Programme (amber accent): who it is for, what is included, how
   the child improves, the therapy team, plans, next step.
3. School Readiness Programme (teal accent): same structure.
4. Therapies: OT, speech and language, special education, psychologist-led group.
5. How we work: strengths-first assessment, the Student Profile, the daily loop, weekly
   review with parents, the trimester rhythm and December assessment month.
6. Fees: the three plans with what every plan includes.
7. Resources: article index plus 12 articles.
8. About: the centre, the approach, the seat count, the location.
9. Contact: call, WhatsApp, email, map, opening hours.
10. 404.

## Publishing mechanism

Add a Markdown file to `src/content/articles/` with frontmatter (`title`, `description`,
`pubDate`, `updatedDate?`, `tags`, `image?`, `draft?`) and push to `main`. The workflow
builds and deploys. Drafts are excluded from the build. The schema is validated at build
time so a malformed post fails the build instead of shipping broken.

## SEO

- One `<title>` and meta description per page, canonical URL, Open Graph and Twitter
  tags, a default OG image and per-article OG images.
- JSON-LD: `LocalBusiness` (with `MedicalBusiness` subtype is avoided; use
  `LocalBusiness` + `ChildCare`-adjacent `EducationalOrganization`), `Article` per post,
  `FAQPage` on programme pages, `BreadcrumbList` on inner pages.
- `sitemap-index.xml`, `robots.txt`, RSS feed.
- Semantic headings, alt text on every image, fast static HTML, fonts preloaded.

## Testing

- `astro build` passes with zero warnings on content schema.
- Every page checked at 390px and 1280px in Chrome; screenshots reviewed.
- Lighthouse on home and one article: performance, accessibility, SEO all at or above 90.
- Links checked with a crawl of the built `dist/`.
- After deploy: the GitHub Pages URL returns 200 for `/`, `/sitemap-index.xml`,
  `/rss.xml`.
