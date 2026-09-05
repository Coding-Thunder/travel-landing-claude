# Conversion tracking and Google Ads setup

Primary conversion: **a qualified phone call to 855-761-6979.**
Everything below is built around measuring that, not page views.

## What is wired up in code

`lib/analytics.ts` is the only place that talks to a tag. Nothing else calls
`gtag` or touches `dataLayer` directly.

| Function | Fires | Where |
|---|---|---|
| `trackPhoneCall(source)` | GA4 `phone_call_click` **and** the Google Ads conversion | every `tel:` link, site-wide |
| `trackEvent("cta_click", …)` | GA4 + `dataLayer` | any element with `data-cta` |
| `trackEvent("callback_open", …)` | GA4 + `dataLayer` | the callback popup opens |
| `trackEvent("callback_submit", …)` | GA4 + `dataLayer` | callback form submitted |
| `trackEvent("quote_request", …)` | GA4 + `dataLayer` | a soft CTA opens the popup |
| `trackAdsConversion()` | Google Ads only | called by `trackPhoneCall` and on callback submit |

**Every event is pushed to `window.dataLayer` unconditionally**, whether or not a
tag is configured. That means a Google Tag Manager container can be dropped in
later and it will see the full event stream with no code change.

### How phone clicks are captured

`app/components/analytics/GoogleTag.tsx` attaches **one delegated listener** to
the document. Any `<a href="tel:…">` anywhere on the site is caught, including
links added in future. Per-component handlers were deliberately avoided: they
are how a new phone link silently stops being measured.

The CTA that fired is identified by the nearest `data-cta` attribute, so reports
distinguish `hero-call` from `sticky-mobile-call` from `footer-call`. A `tel:`
link with no `data-cta` still reports, as `unlabelled:<pathname>`.

`data-cta` values currently in place: `header-call`, `hero-call`,
`mobile-menu-call`, `sticky-mobile-call`, `floating-call`,
`floating-call-number`, `callband-call`, `callband-number`, `final-cta-call`,
`final-cta-number`, `how-it-works-call`, `faq-call`, `guides-call`,
`about-call`, `footer-call`, `modal-call`, `modal-success-call`.

---

## What must be configured before launch

All of it lives in **`config/brands.ts`**, in the active brand's `ads` object.

```ts
ads: {
  gtagId: "AW-18205099745",                              // already set
  contactSendTo: "AW-18205099745/XUwSCKOdvL8cEOGN7-hD",  // already set
  ga4Id: "",   // ← [SET BEFORE LAUNCH]
  gtmId: "",   // ← [OPTIONAL]
}
```

### 1. GA4, `ga4Id`  **[SET BEFORE LAUNCH]**

Create the GA4 property, copy the `G-XXXXXXXXXX` measurement ID in. Until this is
set, **GA4 does not load at all** and only the Ads conversion fires. There is no
behavioural reporting today.

Then in GA4, mark as key events: `phone_call_click`, `callback_submit`.

### 2. Google Ads conversion actions

`gtagId` and `contactSendTo` were already present in the repository and have been
left untouched. **Confirm both before spending:**

- Is `AW-18205099745` the account that will run these campaigns?
- Does `XUwSCKOdvL8cEOGN7-hD` point at the intended conversion action?
- Is that action set to **count "one"** per click, not "every"? A phone CTA that
  a frustrated visitor taps three times must not report three conversions.

Two conversion actions are recommended rather than one, because they are worth
different amounts:

| Action | Source | Suggested count setting |
|---|---|---|
| Phone call click | website `tel:` tap | One |
| Callback request | form submit | One |

### 3. Call reporting, the gap that matters most

**A `tel:` click is not a call.** It measures intent, not connection. On mobile
a meaningful share of taps never connect, ring out, or hang up in two seconds.
Optimising a campaign against tap counts will over-bid on traffic that never
reaches an agent.

Close this with **Google Ads call reporting**: forwarding numbers, with a
conversion that counts calls over a minimum duration (60 seconds is the usual
starting point). That is configured in the Ads UI plus a call extension; the
delegated listener in this code continues to work alongside it.

### 4. Consent  **[DECIDE BEFORE LAUNCH]**

`gtag.js` currently loads and configures **before** any consent interaction, and
no Google Consent Mode default is set. The cookie notice is acknowledgement-only:
dismissing it does not gate any tag.

That is a live decision, not an oversight to fix silently, because it changes
what is measured:

- **US-only traffic, no CCPA/CPA opt-out obligation assumed** → acceptable as-is.
- **Any EEA/UK traffic, or a strict US-state posture** → implement Consent Mode
  v2 with `denied` defaults and update on acceptance. Expect a drop in reported
  conversions; that is the correct number, not a regression.

### 5. GTM, optional

Set `gtmId` to route everything through a container instead. No other change is
needed: the `dataLayer` pushes are already there.

---

## Recommended Google Ads campaign structure

Responsive Search Ads plus **call assets**, not Call-Only campaigns, per the
brief. Landing pages below all exist today.

| Campaign | Ad group | Keyword theme | Landing page |
|---|---|---|---|
| Airport rental | LAX | *lax car rental, car rental lax airport* | `/airports/lax` |
| Airport rental | MCO | *orlando airport car rental, mco rental car* | `/airports/mco` |
| Airport rental | LAS | *las vegas airport car rental* | `/airports/las` |
| Airport rental | MIA | *miami airport car rental* | `/airports/mia` |
| Airport rental | JFK / DFW / ATL / ORD | per-airport terms | matching `/airports/[iata]` |
| Airport rental | Generic airport | *airport car rental, car rental at the airport* | `/airports` |
| Vehicle class | SUV | *suv rental, rent an suv* | `/vehicles/suv` |
| Vehicle class | Economy | *economy car rental, cheap small car rental* | `/vehicles/economy` |
| Vehicle class | Minivan | *minivan rental, 7 seater rental* | `/vehicles/minivan` |
| Vehicle class | Full-size / mid-size | class terms | matching `/vehicles/[slug]` |
| Vehicle class | Generic | *rental car types, what size rental car* | `/vehicles` |
| Brand | Brand | *my budget car* | `/` |

**Do not** point these at the home page. Each ad group has a page whose H1
matches its intent, which is what the Ads quality score rewards.

### Ad groups with no landing page yet

These have commercial volume and **no page to send them to.** Running them
against `/` or a loosely related page will underperform. See
`docs/SEO-RECOMMENDATIONS.md` §1.

*cheap car rental · one-way car rental · weekly car rental · monthly car rental ·
same-day car rental · car rental \<city\> · pickup truck rental · electric car rental*

### Before enabling any campaign

1. `ga4Id` set, GA4 receiving `phone_call_click`.
2. Ads conversion actions verified, counting **One**.
3. Call reporting configured with a duration threshold.
4. **`docs/VERIFY-BEFORE-PUBLISHING.md` resolved.** Landing-page claims are
   reviewed at campaign approval; the items in that file are what a
   Misrepresentation review looks for.
