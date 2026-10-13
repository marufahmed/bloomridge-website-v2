# Infographics for social posts and site pages

12 October 2026

## Goal

One single-image infographic per page of the site. Each is posted on Facebook and Instagram
with a link to its page, and shown on that page. The posts bring parents to the site; the
links and visits help the pages get crawled and indexed.

English only for now. Bangla versions can be added later from the same templates.

## Principle: the model paints, code typesets

The image model produces a text-free illustration. All words, the logo and the URL are laid out
in code with the site's fonts and colours. Image models misspell text and cannot be trusted with
ages, fees or phone numbers, and a typo should be a one-line edit, not a regeneration. This is
the same split the repo already uses for the Open Graph cards (`scripts/gen-images.py` then
`scripts/make-og.mjs`).

## Format

1080 x 1350 px (4:5 portrait), JPEG. Both Facebook and Instagram show 4:5 in full in the feed,
and it takes more of the screen than a square. Everything that matters (headline, points, logo)
stays inside the central 1080 x 1080 square, so a square crop in a grid or preview loses nothing.

Layout, top to bottom:

- cream top area with the headline in Lora
- the points, arranged by the template
- the illustration in the lower part
- a pine footer strip with the logo and `bloomridgesprings.com`

## Components

### 1. Content: `src/lib/infographics.json`

JSON, not TypeScript, so the Node render script and the Astro component read the same file.

One entry per infographic:

| Field | Meaning |
|---|---|
| `page` | Site path it belongs to, for example `/resources/speech-delay-signs-by-age/` |
| `id` | File name stem, for example `speech-delay-signs` |
| `template` | `checklist`, `steps`, `versus`, `myth-fact` or `card` |
| `headline` | At most 8 words |
| `points` | 3 to 5 items, at most 10 words each (`versus` and `myth-fact` take pairs) |
| `alt` | Alt text that states the headline and the points |
| `caption` | Two or three sentences for the social post |

The points come from the text already on the page. No new clinical claims are introduced in
an infographic.

### 2. Illustrations: `scripts/gen-images.py`

A second scene set, `INFOGRAPHIC_SCENES`, keyed by infographic `id`, written to
`src/assets/infographic/<id>.png` at 1024 x 1536. Same deployment and keys as today.

The existing `STYLE`, `PEOPLE`, `SECULAR` and `NEGATIVE` blocks are reused word for word, except
that the framing sentence in `STYLE` is replaced for this set with a portrait one. Scene rules:

- one subject doing one visible action, not a full room
- a plain flat cream or sand background, no furniture or horizon
- one compact, centred group in the lower half, clear margin left and right, nothing cut by an edge
- illustration vocabulary only; never "photo", "realistic" or "portrait of"
- no text of any kind (already in `NEGATIVE`)

The model keeps figures to roughly the lower half whatever it is told, so the renderer measures
where they are instead of relying on the prompt for exact placement.

### 3. Renderer: `scripts/make-infographics.mjs`

sharp and SVG, as in `make-og.mjs`; no new dependency. For each entry it draws the template,
finds the group of figures in the illustration, scales it to fit under the words, blends it
onto a canvas of the same ground colour, adds the logo, and writes `public/infographics/<id>.jpg`. It wraps text
itself and fails with a clear message if a headline or point is too long to fit, so nothing is
ever silently cut off. Output is committed.

The same run writes `docs/social-posts.md`: per image, the file name, the caption and the page
link with `?utm_source=facebook|instagram&utm_medium=social&utm_campaign=infographic`.

### 4. On the site: `src/components/Infographic.astro`

Looks up the entry for the current path and, if there is one, shows the image near the end of
the page with its alt text and a link to open the full-size file. Pages without an entry render
nothing. Used in the guide template, the service template and the standalone pages.

The points are already in the page's own text, so search engines read them there.

## Templates and pages

| Template | Pages |
|---|---|
| `checklist` | speech delay signs, school readiness checklist, choosing a therapy centre |
| `steps` | first assessment, 3-month plan, how we work, what happens in speech therapy |
| `versus` | meltdowns vs tantrums |
| `myth-fact` | bilingual late talker, why early intervention matters |
| `card` | the five services, two programs, fees, FAQ, Banasree, remaining guides |

## Order of work

1. Pilot: three infographics, one per template.
   - `/resources/speech-delay-signs-by-age/` (checklist)
   - `/resources/first-assessment-what-to-expect/` (steps)
   - `/resources/meltdowns-vs-tantrums/` (versus)
2. Owner and a therapist review the pilot: look, wording, claims.
3. `myth-fact` and `card` templates, then the remaining pages.

## Checks

- `npm run build` passes.
- Each rendered image is opened and checked for cut-off or overlapping text, text over the
  illustration's subject, and facts that differ from the page.
- Each page with an entry shows its image; a page without one is unchanged.
- A therapist reads every infographic before it is posted.

## Not in this work

Bangla versions, automatic posting to Facebook or Instagram, carousels and video.
