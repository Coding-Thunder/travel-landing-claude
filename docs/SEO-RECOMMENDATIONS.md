# SEO recommendations: proposed, not implemented

Everything in this file was **deliberately left undone**. Each item changes the
site's content, dataset or information architecture, and those are the client's
to decide, not something to alter while re-skinning the UI.

Findings were produced by an eight-lens audit of the codebase and each one was
independently re-verified against the file before being listed here. Items the
verification pass refuted have been dropped.

---

## 1. Commercial intents with no landing page

The brief names these keyword themes. The site has no page for any of them, so
they can neither rank nor be used as an Ads destination.

| Intent | Suggested route | Why it is worth a page |
|---|---|---|
| cheap / affordable car rental | `/cheap-car-rental` | Highest-volume modifier in the set |
| one-way car rental | `/one-way-car-rental` | Already covered by a blog post (`/blog/one-way-car-rental-guide`) with no commercial page behind it |
| weekly car rental | `/weekly-car-rental` | Currently one row in a pricing table on 7 pages |
| monthly car rental | `/monthly-car-rental` | Same; long rentals are the highest-value bookings |
| same-day car rental | `/same-day-car-rental` | Named in `siteConfig.whyChooseUs` with nowhere to send the click |
| car rental \<city\> | `/car-rental/[city]` | See §2 |

**Do not** create these as templated stubs. Each needs content that only that
page can carry: the drop-fee mechanics for one-way, the weekly/monthly rate
break for long rentals, what "same day" actually depends on. A set of pages that
differ only by a heading is a doorway network and Google treats it as one.

## 2. Eight city markets are homepage paragraphs, not pages

`config/siteConfig.ts:340-349` holds researched, genuinely distinct copy for New
York, Los Angeles, Miami, Las Vegas, Orlando, Chicago, Dallas and San Francisco.
All eight render as cards **on the home page**, competing with each other and
with the home page's own primary intent.

This is the single largest structural opportunity on the site: the content
already exists and is good. Promoting each to `/car-rental/<city>` gives
*"cheap car rental Miami"* (explicitly named in the brief) a real target,
and gives the airport pages a natural sibling to link to.

## 3. Vehicle classes promised but not built

`siteConfig.featuredVehicles` advertises a **Tesla Model 3 (Electric)** and a
**Ford F-150 (Pickup Truck)**. `config/vehicles.ts` has neither class, so both
have no page.

This is already causing a concrete defect: `content/posts.ts:674` links to
`/vehicles/electric`, which does not exist. **A temporary 307 redirect to
`/vehicles` has been added** in `next.config.ts` so the link in that indexed
article no longer 404s. That is a stopgap, not the fix. The fix is either a
real `/vehicles/electric` and `/vehicles/pickup-truck`, or removing the two
vehicles from the featured list.

`siteConfig` also promises convertibles, and SFO, LaGuardia, Newark, Midway and
Love Field, none of which have pages.

## 4. Blog taxonomy pages are diluting the index

`app/sitemap.ts` submits **26 tag pages and 5 category pages**. Eighteen of the
tag pages contain a **single post**, and all 26 use one boilerplate description.

A tag page holding one article is a duplicate of that article with less content.
Recommended: `noindex, follow` on tag pages, remove them from the sitemap, keep
the five category pages. This concentrates authority on the articles themselves.

## 5. Only 6 of 12 blog posts are reachable from `/blog`

`app/components/blog/BlogExplorer.tsx` paginates in client state. The server
renders page one: six posts. The other six are in the sitemap but have **no
crawlable link from the blog hub**.

Fix: render all posts server-side, or add real paginated routes
(`/blog/page/2`). This is a crawlability defect, not a design preference.

## 6. Internal linking gaps

- **Airport pages link only to other airport pages.** No airport page links to a
  vehicle class or to its own matching blog guide, though eight of the twelve
  posts are airport guides. `/airports/lax` and `/blog/lax-car-rental-guide`
  currently do not link to each other in either direction.
- **`/about` and `/contact` contain no internal links at all**: neither file
  imports `next/link`. Both are dead ends.
- **The homepage "Rental guides" section links to no guides.** Its six cards are
  static text. `/blog` is reachable from the home page only through the header
  dropdown and the footer.
- **Footer "Roadside assistance" → `/#why`**, a section that never mentions
  roadside assistance.
- **Social links are placeholder platform homepages** (`https://facebook.com`),
  and `lib/schema.ts` feeds them straight into `Organization.sameAs`, which
  asserts to Google that those are the brand's profiles. Either set the real
  profile URLs or remove `sameAs`.

## 7. Titles and meta descriptions over the SERP limit

Measured against the served HTML after the rebuild. Google truncates around
~60 characters for titles and ~155-160 for descriptions, so everything past
these numbers is written but never read.

| Route | Title | Description |
|---|---|---|
| `/` | 71 | **240** |
| `/vehicles` | 69 | 193 |
| `/contact` | 66 | 192 |
| `/blog/how-to-save-money-…` | 71 | 150 ✓ |
| `/blog` | 67 | 155 ✓ |
| `/about` | 57 ✓ | 189 |
| `/airports/lax` | 52 ✓ | 183 |
| `/airports` | 60 ✓ | 179 |

The home page is the worst case: the final ~80 characters (*free cancellation,
instant confirmation, all 50 states*) never appear in a search result. They are
also three of the claims listed in `VERIFY-BEFORE-PUBLISHING.md`, so shortening
the description resolves both problems at once.

Several airport and vehicle descriptions are also templated near-duplicates that
differ only by the place or class name.

Separately, the **airport meta descriptions quote a starting price** with no
qualifier attached, unlike the vehicle pages, which carry an "indicative
pricing" note on the page. A price in a SERP snippet has no such qualifier
attached to it. See `docs/VERIFY-BEFORE-PUBLISHING.md` §5.

These are copy edits in `config/siteConfig.ts` and each page's `metadata`
export, which is why they were left for the client rather than reworded here.

## 8. Homepage section order

Fourteen stacked sections. The head-term content (the "Rental guides" block,
the city block and the About block) sits at positions 10, 11 and 14, **below**
the testimonials and the final CTA. Whether to reorder is a judgement call about
the conversion path, which is why it was not changed; but the content most
relevant to *"car rental"* as a query is currently the content furthest down the
page.

## 9. `/airports` and the home page target the same query

Both are optimised for *"airport car rental"*. Pick one as the head-term page
and differentiate the other, or they will split their own signals.

---

## Already fixed (no decision needed)

These were code defects rather than content decisions, and have been repaired:

- Global canonical in the root layout stamped `/` onto **404 and error pages**.
  Removed; the home page now declares its own.
- `lastModified` in the sitemap was the **build timestamp on all 69 URLs**. Now
  reports each post's real `updatedAt`, and each hub the newest date beneath it.
- `robots.txt` emitted an invalid `Host:` directive containing a full URL.
  Removed.
- JSON-LD `publisher` / `seller` referenced `#organization` by `@id` on blog and
  vehicle pages, where that node is never emitted, a dangling reference. The
  organisation is now inlined.
- `AggregateOffer` asserted `availability: InStock` on pages with no purchase
  path. Removed.
- Blog `Article` schema is now `BlogPosting` with `inLanguage` and a proper
  `mainEntityOfPage`.
- `/vehicles/electric` returned a hard 404 from an indexed article. Redirected.
