# Search visibility plan, 7 October 2026

## Where we were

Search Console, 17 Sep to 4 Oct 2026 (export in `bloomridgesprings.com-Performance-on-Search-2026-10-07/`):
45 impressions, 1 click, and **only the homepage** ever shown. No service page, guide, fees or
contact page had a single impression. Google had barely crawled past the front door of a
3-week-old site with no inbound links.

The site itself was technically sound (robots, sitemap, canonicals, structured data). What was
missing was everything around it, plus Bangla and Banasree-specific pages.

## What changed on the site today

| Change | Why |
|---|---|
| Bangla section at `/bn/`: home, 5 service pages, FAQ (36 Q&As), 5 guides | Parents search in Bangla; the site had none and competitors do |
| Reciprocal `hreflang` en/bn on every paired page, Bengali fonts, a language switch in the header | So Google serves the right language and treats the pairs as one page |
| `/banasree/` landing page | Targets "speech therapy Banasree", "special education school Banasree", "OT autism Banasree" |
| `/autism-support-dhaka/` (English and Bangla) | Autism is the biggest search in this category; there was no page for it |
| `/faq/` with 34 Q&As and FAQPage schema | One place answering what parents ask before they call |
| "Banasree" in every service title; key titles and descriptions cut to what Google displays | Banasree is winnable now; "Dhaka" alone means fighting Evercare and BPNCC |
| Owner's positioning: integrated early development, all in one place / একই ছাদের নিচে, 8 pillars | The differentiator single-therapy centres cannot claim |

Pages: 25 before, 42 now.

## What only the owner can do, in order of impact

1. **Google Business Profile.** For "speech therapy Banasree" Google shows the map pack before any
   website. The Maps listing exists (cid 870262097240768389) but shows **"No reviews"**.
   - Claim and verify it at business.google.com if not already done.
   - Primary category: *Child development center* (or *Speech pathologist* / *Special education school* as secondary). Add *Occupational therapist*.
   - Website: `https://www.bloomridgesprings.com/banasree/`.
   - Opening hours: set them. They are blank everywhere, including on the site (`site.hours` in `src/lib/site.ts`).
   - Services list, description in English and Bangla, 10+ real photos (entrance, classroom, sensory room; no identifiable children without consent).
   - **Reviews:** ask every current family for an honest Google review. Ten genuine reviews will move the map ranking more than anything on the website. Reply to each one.
2. **Cloudflare: turn on "Always Use HTTPS"** (SSL/TLS, Edge Certificates). Today `http://www.bloomridgesprings.com/` serves a 200 instead of redirecting, which is why Search Console lists an `http://` duplicate. Also note the records are **proxied** (orange cloud) while the README says *DNS only*; either is workable, but pick one deliberately.
3. **Search Console, after this deploy:**
   - Sitemaps: resubmit `https://www.bloomridgesprings.com/sitemap-index.xml`.
   - URL inspection, then Request indexing, for: `/banasree/`, `/bn/`, `/autism-support-dhaka/`, `/speech-therapy-dhaka/`, `/special-education-dhaka/`, `/occupational-therapy-dhaka/`, `/faq/`, `/bn/faq/`.
   - Add the `bloomridgesprings.com` domain property if only the URL-prefix one exists, so http/https/www are all seen.
4. **Facebook page.** In Bangladesh it is the first place parents check. Put the website link in the page's About section, and send the page URL so it goes into `site.social.facebook` (it then appears in the footer and the structured data `sameAs`).
5. **Links and listings (citations).** Same name, address and phone everywhere:
   - Urbashi's LinkedIn: add the website to the profile and the Experience entry. It is currently the strongest search result for the name.
   - Bangladesh directories and "therapy centres in Dhaka" round-ups (for example the lists at physiozonebd.com and autismwing.com) — ask to be included.
   - Local parent groups on Facebook (Banasree, Rampura, Aftabnagar): share the Bangla guides, not ads.
6. **Native review of the Bangla.** It was written carefully, but a Bangla-speaking team member should read `/bn/` and correct anything that sounds off. Specific checks: how "Floor 1" should be said (currently "ফ্লোর ১"), and whether the Bangla names for the 4-step scale match what therapists say to parents.

## What to expect

- 1 to 3 weeks: the new pages appear in Search Console's Pages report as indexed.
- 4 to 8 weeks: impressions for Banasree and Bangla queries. Brand searches should show the site and the map listing together.
- 3 to 6 months: page 1 for Banasree and Rampura-level queries is realistic. "Dhaka"-level queries take longer and depend on reviews and links more than content.

## Keep doing (monthly)

- One new guide a month, alternating English and Bangla, answering a question parents asked that month (README: Publish an article; Bangla files go in `src/content/articles-bn/`).
- Download the Search Console Performance export at the start of each month into `docs/` and compare: impressions, pages with impressions, queries.
