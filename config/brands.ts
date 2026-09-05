/**
 * White-label brand registry.
 *
 * Each preset holds ONLY the values that differ between brands. Everything else
 * (vehicle data, FAQs, layout, copy, SEO content) is shared and lives in
 * `siteConfig.ts`, which DERIVES all brand identity from the active brand here.
 *
 * To launch a new brand on its own branch/repo:
 *   1. Add (or edit) a preset below.
 *   2. Point the active brand at it: set `NEXT_PUBLIC_BRAND` in the environment,
 *      or change `ACTIVE_BRAND_ID` in `config/brand.ts`.
 * No component code ever needs to change.
 */

export type BrandId = "my-budget-car" | "budget-travel" | "rental-confirmation";

export type BrandConfig = {
  id: BrandId;
  /** Display brand name: used for logo text, headings, meta, copyright, schema. */
  brandName: string;
  /** Legal entity name: used for legal pages, copyright and structured data. */
  legalName: string;
  /** Primary phone, digits only. Powers tel:, WhatsApp and display formatting. */
  phoneNumber: string;
  /** Optional dedicated support line; falls back to `phoneNumber`. */
  supportNumber?: string;
  /** Primary domain (no protocol): used for canonical URLs, OG and email. */
  domain: string;
  /** Contact email. */
  email: string;
  /** Optional logo image path under /public; empty falls back to the wordmark. */
  logo: string;
  /**
   * Measurement config. Every field is optional and each one independently
   * gates the tag it belongs to, so a brand with no IDs renders no third-party
   * script at all.
   *
   *  gtagId        Google Ads account, e.g. "AW-XXXXXXXXX". Empty disables Ads.
   *  contactSendTo The Ads conversion action fired on a call tap or a callback
   *                submission, e.g. "AW-XXXXXXXXX/AbC-dEfGhIjK".
   *  ga4Id         GA4 measurement ID, e.g. "G-XXXXXXXXXX". Empty disables GA4.
   *  gtmId         Google Tag Manager container, e.g. "GTM-XXXXXXX". Optional:
   *                events are pushed to `window.dataLayer` either way, so a
   *                container can be added later without touching the code.
   */
  ads: { gtagId: string; contactSendTo: string; ga4Id: string; gtmId: string };
};

export const BRANDS: Record<BrandId, BrandConfig> = {
  "my-budget-car": {
    id: "my-budget-car",
    brandName: "My Budget Car",
    legalName: "My Budget Car LLC",
    phoneNumber: "8557616979",
    domain: "mybudgetcar.com",
    email: "reservations@mybudgetcar.com",
    logo: "",
    ads: {
      gtagId: "AW-18205099745",
      contactSendTo: "AW-18205099745/XUwSCKOdvL8cEOGN7-hD",
      // [SET BEFORE LAUNCH] Create the GA4 property and paste its measurement
      // ID here. Until then GA4 does not load and only Ads conversions fire.
      ga4Id: "",
      // [OPTIONAL] Paste a GTM container ID to route everything through Tag
      // Manager instead. Events already land in window.dataLayer regardless.
      gtmId: "",
    },
  },
  "budget-travel": {
    id: "budget-travel",
    brandName: "Budget Travel",
    legalName: "Budget Travel LLC",
    phoneNumber: "5514142067",
    domain: "budgetravelsforu.com",
    email: "reservations@budgetravelsforu.com",
    logo: "",
    ads: { gtagId: "", contactSendTo: "", ga4Id: "", gtmId: "" },
  },
  "rental-confirmation": {
    id: "rental-confirmation",
    brandName: "Rental Confirmation",
    legalName: "Rental Confirmation LLC",
    phoneNumber: "5513628471",
    domain: "rentalconfirmation.com",
    email: "reservations@rentalconfirmation.com",
    logo: "",
    ads: { gtagId: "", contactSendTo: "", ga4Id: "", gtmId: "" },
  },
};

/** Default active brand when `NEXT_PUBLIC_BRAND` is not set. */
export const DEFAULT_BRAND_ID: BrandId = "my-budget-car";

/** "8557616979" → "(855) 761-6979". Returns input unchanged if not 10 digits. */
export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length !== 10) return digits;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** "8557616979" → "1-855-761-6979" (prominent dashed display). */
export function formatPhoneVanity(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length !== 10) return digits;
  return `1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}
