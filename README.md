# Flight Bizz

Multi-service online travel platform, **operated by GlobeVista LLC**.

> Flight Bizz is a trading brand of GlobeVista LLC, not a separate legal entity.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 and Radix UI.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build + typecheck
npm run lint
```

## Brand configuration

**[`config/site.ts`](config/site.ts) is the single source of truth** for every customer-facing
brand, legal, contact and content value. Change it there and it changes everywhere:
header, footer, metadata, structured data, sitemap, manifest, forms and legal pages all
read from it.

The values at the top of that file are the ones most likely to change:

| Constant | Current value |
| --- | --- |
| `SITE_URL` | `https://flightbizz.com` |
| `SUPPORT_PHONE` | `+1 (551) 414-2067` |
| `SUPPORT_EMAIL` | `contact@flightbizz.com` |
| `BUSINESS_ADDRESS` | `1309 Coffeen Ave, Ste 1200, Sheridan, WY 82801` |
| `COMPANY_NUMBER` | **not supplied**, see below |

Any value written as a `[Bracketed placeholder]` is treated as *not supplied*: the UI omits
it entirely rather than printing a placeholder or inventing one. The `site.contact.*` flags
(`hasPhone`, `hasEmail`, `hasAddress`, `hasCompanyNumber`) drive that behaviour, so a missing
phone number degrades to the callback flow instead of rendering a dead `tel:` link.

`COMPANY_NUMBER` is deliberately unsupplied. GlobeVista LLC's own state filing ID has not been
provided, and the previous brand's Wyoming ID belongs to a different legal entity, so the
registration line is omitted from the footer and legal pages until a real value is set.

## Compliance rules baked into the content

These are not stylistic preferences. The copy in `config/site.ts` and across the pages is
written to hold these true. Please keep them true when editing:

- Flight Bizz is a **travel platform**, never presented as an airline, hotel or operator.
- **No IATA or ARC accreditation** is claimed. `site.accreditationNotice` states this plainly
  and is rendered in the footer, on every service page and on every legal page.
- **No live inventory.** The site never displays prices, availability, ratings or reviews.
  `site.bookingNotice` explains that a specialist confirms real options before booking.
- **No fabricated** partnerships, certifications, awards, reviews or trust badges.
- Supplier fulfilment is disclosed via `site.supplierDisclosure` (§27 of the brand spec).

## How the platform actually works

There is no booking engine, database, authentication or payment integration in this
repository. It is a marketing and lead-capture front end:

1. The unified search module (`app/components/trip/search-module.tsx`) captures a structured
   brief across all six travel categories.
2. It hands off to `/contact`, pre-filling the enquiry form from the query string.
3. `EnquiryForm` and `CallbackForm` compose a `mailto:` link to the support inbox and open the
   visitor's own mail client. **Nothing is stored or processed server-side.**

## Structure

```
app/
  page.tsx                    Home: hero, unified search, services, FAQ
  flights|hotels|cars|        The six travel categories, all rendered by the
    transfers|activities|       shared ServicePage template
    packages/
  trip-planner/               Custom trip brief (§13)
  callback/                   Request a Callback (§17)
  business-travel/            Specialist request types, retained from the
  group-travel/                 previous build and rebranded
  about|contact|faq/
  terms|privacy|              Legal: reviewed content, still requires sign-off
    refund-policy|              by qualified counsel before launch
    cookie-policy/
  components/trip/            Brand components (header, footer, search, forms)
components/ui/                Radix primitives (button, select, tabs, sheet, …)
config/site.ts                ← brand source of truth
lib/                          seo, schemas, support-hours
```

## Design language

Defined in [`app/globals.css`](app/globals.css) as a single shadcn token layer. Components
address semantic tokens only (`background`, `card`, `muted`, `primary`, `border`, `ring`) and
never raw palette values, so hierarchy stays consistent and a palette change is a one file
change.

- **Neutrals** carry the interface: deep petrol `foreground` on white, with `muted` for quiet
  surfaces and `muted-foreground` for secondary text.
- **`primary` is coral, and it is rationed.** One dominant action per surface. Coral
  communicates hierarchy, not decoration.
- **The footer runs in a `.dark` scope**, which swaps the token values so the same components
  render on the midnight surface without a parallel set of colour classes.
- **Radius**: `rounded-md` for controls, `rounded-lg` for cards and overlays. `rounded-xl` is
  reserved for the search module, the one primary interaction surface. `rounded-full` is
  reserved for badges.
- **Shadows** mark real elevation only: dropdowns, dialogs, sheets, the floating support
  control and the search module.
- **Type**: Inter throughout, with Fraunces reserved for the single H1 that opens a page.

All token pairs meet WCAG AA in both the light and dark scopes.
