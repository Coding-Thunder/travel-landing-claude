# [VERIFY BEFORE PUBLISHING]: unverifiable claims on mybudgetcar.com

**Status: OPEN. Nothing in this list has been changed.**

Every item below is existing My Budget Car copy that was left exactly as written,
because content is the client's to decide. Each one was independently confirmed
against the file by a second reviewer.

They are collected here because they share one property: **the codebase contains
no source that substantiates them.** That matters for two separate reasons.

1. **Google Ads.** Unsubstantiated superlatives, coverage counts, ratings and
   licensing claims on a landing page are the standard trigger for a
   *Misrepresentation* review. That policy suspends the **account**, not the ad,
   and the appeal is slow.
2. **Consistency.** Several claims contradict each other, which is what a
   reviewer notices first. The site describes an owned nationwide fleet in one
   place and a phone reservation service in another.

For each item: if the claim is **true and documented**, keep it and record the
evidence. If it is **not**, use the suggested replacement. Every one is written
to keep the same persuasive job without asserting a fact.

---

## 1. Licensing and insurance status

| Where | Text |
|---|---|
| `app/about/page.tsx:11` | title: *"About Us: Licensed Nationwide Car Rental"* |
| `app/about/page.tsx:12` | meta description: *"a licensed and insured car rental provider serving all 50 US states"* |
| `app/about/page.tsx:25` | *"We operate as a fully licensed and insured rental provider…"* |
| `app/about/page.tsx:72` | *"{legalName} is fully licensed and insured…"* |
| `app/components/Footer.tsx:38` | *"Licensed, insured car rentals nationwide."*, **site-wide, all 79 routes** |
| `app/components/home/Hero.tsx:9` | trust chip: *"Licensed & insured"*, above the fold on the main Ads landing page |

**Why it is the highest risk item.** The About page and the footer are exactly
where a reviewer verifies a business identity, and this is an assertion about
regulatory status. It also appears in the SERP snippet via the meta description.

**Needed to keep it:** the issuing authority and licence/registration number for
each state claimed, plus the insurer and policy type.

**If it cannot be documented:** name what is actually true instead,
*"Car rental reservations by phone. The rental company supplying your vehicle
holds the licences and insurance for the rental itself."*

---

## 2. Coverage and location counts

| Where | Text |
|---|---|
| `app/components/home/Hero.tsx:30` | *"Airport car rental · 300+ US locations"* |
| `app/about/page.tsx:63` | *"…drivers in all 50 states through a network of more than 300 airport and city…"* |
| `config/siteConfig.ts:217` | FAQ: *"our nationwide network of 300+ locations in all 50 states"*, **also emitted as FAQPage JSON-LD** |
| `config/siteConfig.ts:149-151` | trust bar: *"Nationwide Coverage / All 50 states"* |
| `app/opengraph-image.tsx:55` | social card: *"300+ locations · 50 states"* |

**Why.** The repository defines **8 airports**. Nothing supports 300 locations or
50 states, and the FAQ version is served to Google as structured data, where a
claim carries more weight than body copy.

**Suggested replacement:** *"Airport and city pickups across the US, including
LAX, JFK, MCO, MIA, LAS, DFW, ATL and ORD."* Demonstrable, and it names the
pages that actually exist.

---

## 3. Ratings, review counts and customer numbers

| Where | Text |
|---|---|
| `app/components/TrustStats.tsx:8-13` | *250,000+ drivers served · 4.9/5 average rating · 300+ locations · 50 states* |
| `config/siteConfig.ts:237-238` | `trust.rating: "4.9"`, `trust.ratingCount: "12,800+"` |
| `config/siteConfig.ts:151` | *"Thousands of Happy Customers · Rated 4.9 / 5"* |
| `config/siteConfig.ts:203-210` | six named testimonials with stock-photo avatars |
| `lib/schema.ts:67-72` | **`AggregateRating` JSON-LD: `ratingValue: 4.9`, `reviewCount: 12800`** |

**Why this one is different from the others.** The `AggregateRating` is emitted
as structured data on 20+ routes. Google's review-snippet policy requires that
aggregate ratings come from real, collected reviews that are visible on the
page. Self-serving ratings with no underlying review source are a documented
cause of **structured-data manual actions**, which remove all rich results for
the domain.

The six testimonials are presented as real customers, with names, cities, trip
types and photographs.

**Needed to keep it:** an actual review source (Google Business Profile,
Trustpilot, a review platform) and consent for each testimonial.

**If it cannot be documented:** remove `aggregateRating` from `lib/schema.ts`,
and remove the testimonials and the stat counters. Nothing else on the page
depends on them.

---

## 4. Absolute guarantees about terms the rental company sets

| Where | Text |
|---|---|
| `app/components/home/Hero.tsx:9` | *"No hidden fees" · "Free cancellation"* |
| `config/siteConfig.ts:150` | *"Transparent Pricing / No hidden fees, ever"* |
| `config/siteConfig.ts:218` | *"You can cancel any reservation free of charge up to the moment of pickup. There are no cancellation fees and no penalties"* |
| `config/siteConfig.ts:232` | *"No hidden fees · Free cancellation · Instant confirmation · 24/7 support"* |
| `app/components/HowItWorks.tsx` | *"No deposit taken over the phone · Free cancellation up to pickup"* |
| Multiple | *"unlimited miles on most rates"*, *"24/7 roadside assistance"* |

**Why.** Mileage, cancellation, deposits and roadside assistance are set by the
rental company on each individual rate, not by the booking service. Stating them
as universal guarantees is a promise that cannot be kept on every booking, and
one customer complaint that it was not honoured is enough to open a review.

**Suggested replacement:** describe your own conduct instead of their terms,
*"We read you the total, the fuel and mileage policy and the cancellation terms
before anything is booked."* That is a promise you control.

---

## 4b. Response-time and availability promises

| Where | Text |
|---|---|
| `config/siteConfig.ts` `callResponse` | *"Avg. wait under 30 seconds"*, rendered on the floating call card, the contact page, the call band and inside the callback popup |
| `config/siteConfig.ts` `callModal.response` | *"Typical callback time: under 2 minutes"* |
| `config/siteConfig.ts` `hours` | *"Live agents · 24/7"* |

**Why.** These are measurable operational claims shown next to the phone number,
which is exactly where a customer forms an expectation. "Under 30 seconds" and
"under 2 minutes" are the kind of figure a complaint can disprove with a single
call recording, and an unanswered "24/7" line is both a bad experience and an
Ads misrepresentation risk.

**Needed to keep them:** call-centre statistics for the period being claimed,
and confirmation the desk is genuinely staffed around the clock.

**If they cannot be evidenced:** state the commitment rather than the metric,
*"We answer every call"*, or drop the figure and keep the hours.

---

## 5. Published prices

| Where | Text |
|---|---|
| `config/vehicles.ts` | 7 classes × 3 tiers, e.g. *"from $28/day"*, *"from $175/week"*, *"from $620/month"*, plus a `priceFrom` scalar |
| `config/airports.ts` | *"from $X/day"* per airport (`priceFrom: 32` etc.), on-page **and in each meta description** |
| `lib/schema.ts:113` | `AggregateOffer.lowPrice` emitted as structured data |

**Why.** No rate source exists in the repository. A price in a meta description
that is not achievable on arrival is the single most common car-rental Ads
complaint. The vehicle pages carry an *"indicative pricing"* qualifier; **the
airport pages do not.**

**Note:** the vehicle pages' disclaimer materially reduces the risk there. The
airport `from $X/day` badges are the exposed ones.

**Suggested minimum:** carry the same qualifier onto the airport pages, and
remove the price from the airport **meta descriptions**, which appear in search
results with no qualifier attached.

---

## 6. Terms & Conditions contradict the marketing

`app/terms-and-conditions/page.tsx:80`

> *"Daily and weekly rates typically include unlimited miles within {siteConfig.region}, basic liability coverage as required by law, and standard 24/7 roadside support."*

`siteConfig.region` is **"Wyoming"**, the company's registered state. So the
Terms limit unlimited mileage to Wyoming while the marketing pages offer it at
LAX and MCO. In a dispute, the Terms are the document that governs.

**This is a genuine legal inconsistency, not just a marketing one.** It should be
resolved regardless of what happens to the rest of this list.

---

## 7. Business address presented as a location

`config/siteConfig.ts:103-108` and `lib/schema.ts:10-17`

`1309 Coffeen Ave, Ste 1200, Sheridan, WY 82801` is emitted as a
`PostalAddress` inside `AutoRental` / `LocalBusiness` schema on 20+ pages,
including all 8 airport pages.

`LocalBusiness` schema tells Google this is a physical place customers visit. If
that address is a registered-agent or mail-forwarding address rather than a
staffed rental location, the markup is inaccurate and it is also what a Google
Business Profile verification failure looks like.

**Decide:** if there is no premises customers attend, drop `LocalBusiness` /
`AutoRental` and keep `Organization` only. `Organization` carries the phone
number and the brand without asserting a place.

---

## 8. Vehicle class images do not show the vehicle class

Separate from the claims above, and equally visible to a customer. Each entry in
`config/vehicles.ts` carries an image, and three of the seven show a vehicle
from a different class. These render on `/vehicles`, on each
`/vehicles/[slug]` page and in the home page class grid.

| Class page | Image actually shows | Verdict |
|---|---|---|
| `/vehicles/economy` | Red Hyundai performance hatch | Wrong register for "the cheapest way to get where you're going" |
| `/vehicles/compact` | Blue Volkswagen hatchback | Correct |
| `/vehicles/mid-size` | Blue Chevrolet Camaro, a two-door coupe | Wrong: the class is described as seating four adults with luggage |
| `/vehicles/full-size` | **Red Ferrari, in a showroom** | Wrong: a hypercar illustrating a full-size sedan |
| `/vehicles/suv` | White Honda CR-V | Correct |
| `/vehicles/luxury` | White BMW M5 | Correct |
| `/vehicles/minivan` | **Silver Tesla Model 3** | Wrong: a sedan illustrating a seven-seat minivan |

**Why this was reported rather than fixed.** Correcting it needs one of two
things, and both were out of scope:

- a different image for those three classes, and no correct image for them
  exists anywhere in the project; or
- renaming or removing the classes, which would change the rental categories
  the business offers.

**What is needed:** a correct photograph for mid-size, full-size and minivan.
The Ferrari on the full-size page is the most damaging of the three: a customer
who books "full-size" after seeing it has been shown something the business
cannot supply.

The four featured-vehicle cards on the home page had the same problem and have
been corrected, because there the vehicle name could be brought into line with
the photograph without changing what is offered. Two of those cards were removed
outright: one showed a second photograph of the Tesla already featured, and one
showed a motorcycle.

---

## Suggested order of work

1. **§6**: the Terms contradiction. Legal exposure, and a five-minute fix.
2. **§3**: remove `aggregateRating` from the schema. Highest penalty risk.
3. **§1**: the licensing claim. Highest Ads-review risk.
4. **§2**: the location counts, including the JSON-LD FAQ answer.
5. **§5**: prices in airport meta descriptions.
6. **§4 / §4b**: the absolute guarantees and the response-time figures.
7. **§7**: the LocalBusiness address decision.
8. **§8**: supply correct images for the mid-size, full-size and minivan classes.

Every one is a copy or config edit. None requires a rebuild of the site.
