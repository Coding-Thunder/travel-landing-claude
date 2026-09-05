# My Budget Car

Car rental lead-generation site for **mybudgetcar.com**. Next.js 16 App Router,
React 19, Tailwind v4 (CSS-first), TypeScript strict.

The conversion model is **phone-first**: the primary action on every page is a
call to the reservations line. Soft CTAs ("Check Availability", "Get a Quote",
"Reserve by Phone") open a call/callback popup rather than a self-service
booking flow.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run check      # typecheck + lint
```

`next build` no longer runs linting in Next 16, so `npm run check` is the gate
to run before pushing.

## Layout

```
app/
  components/
    ui/          layout + presentational primitives, and Icon.tsx (the icon family)
    site/        the brand lockup
    call/        the phone-first conversion surfaces
    nav/         header
    blog/        article rendering
    home/        home page hero
    analytics/   the measurement bootstrap
    seo/         JSON-LD renderer
components/ui/   shadcn primitives (button, card, badge, input, sheet, …)
config/          brand registry, site content, airports, vehicles
content/         blog posts and authors
lib/             cn, blog helpers, schema builders, analytics
docs/            pre-launch checklists and recommendations
```

## Design system

One semantic token layer in `app/globals.css`. Components address tokens
(`background`, `card`, `muted`, `primary`, `border`, `ring`) and never raw
palette values, so a palette change is a one-file change.

- **Colour** is My Budget Car's own brand blue `#2563eb` on slate neutrals — the
  same value as `app/icon.svg` and the PWA theme colour. Blue is reserved for the
  single primary action on a surface, which on this site is almost always the
  call CTA.
- **Inverted scope**: put `dark` on a section and the token values swap. That is
  how the hero, the footer and the stats band render on the deep surface without
  a parallel set of colour classes.
- **Type**: Inter throughout; Fraunces (`.font-display`) is reserved for the one
  H1 that opens a page.
- **Radius** is `0.5rem` (`--radius`). **Container** is `max-w-6xl` with
  `px-5 sm:px-8`. **Section rhythm** is `py-14 sm:py-16`.

Contrast is verified: foreground 17.9:1, muted-foreground 7.6:1 and primary
5.2:1 on the page surface; 16.6:1, 8.3:1 and 8.0:1 inverted. `--border` is a
decorative hairline — `--input` (3.5:1) carries the 3:1 boundary on controls.

### Icons

`app/components/ui/Icon.tsx` is a **custom SVG family**, not an icon library:
24×24, outline only, `currentColor` at 1.75 stroke weight, round caps and joins.
The five vehicle glyphs share a baseline and wheel geometry so the classes read
as one fleet. Icons are decorative (`aria-hidden`) by default; pass `title` only
when the glyph is the sole carrier of meaning.

No icon package is installed. Adding one to render a chevron is the thing this
file exists to prevent.

## White-label

`config/brands.ts` holds the brand presets; `config/brand.ts` selects the active
one from `NEXT_PUBLIC_BRAND`, falling back to `DEFAULT_BRAND_ID`. Everything
else derives from there. Never hardcode a brand name or a phone number in a
component.

## Before launching

Read these in order:

1. **`docs/VERIFY-BEFORE-PUBLISHING.md`** — unverifiable claims currently on the
   site. Open; nothing has been changed. This gates any Google Ads spend.
2. **`docs/CONVERSION-TRACKING.md`** — what is wired up, and the IDs that must be
   set before launch.
3. **`docs/SEO-RECOMMENDATIONS.md`** — proposed content and IA work, not done.
