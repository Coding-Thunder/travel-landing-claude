import { brandConfig } from "@/config/brand";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const { gtagId, contactSendTo, ga4Id, gtmId } = brandConfig.ads;

/** Google Ads is configured for this brand. */
export const adsEnabled = Boolean(gtagId);
/** GA4 is configured for this brand. */
export const ga4Enabled = Boolean(ga4Id);
/** A Tag Manager container is configured for this brand. */
export const gtmEnabled = Boolean(gtmId);
/** Any measurement at all, used to decide whether the cookie notice matters. */
export const analyticsEnabled = adsEnabled || ga4Enabled || gtmEnabled;

/**
 * The event names this site emits. Keeping them in one union stops the same
 * conversion being spelled three ways across components, which is what makes
 * GA4 and Ads reporting disagree.
 */
export type AnalyticsEvent =
  | "phone_call_click"
  | "callback_open"
  | "callback_submit"
  | "quote_request"
  | "cta_click";

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Push an event to `window.dataLayer` and, when gtag is present, to GA4.
 *
 * dataLayer is written unconditionally so a Tag Manager container added later
 * picks up the full event stream without any code change. Every call is safe on
 * the server and safe before the tag has loaded.
 */
export function trackEvent(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (ga4Enabled && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/**
 * Fire the Google Ads "Contact" conversion. Separate from `trackEvent` because
 * an Ads conversion and a GA4 event are different things: the conversion is
 * what the campaign optimises against, and it must fire exactly once per
 * qualifying action.
 */
export function trackAdsConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !contactSendTo) return;
  window.gtag("event", "conversion", { send_to: contactSendTo });
}

/**
 * A phone CTA was tapped. This is the primary conversion on this site, so it
 * reports to Ads and GA4 together.
 *
 * `source` identifies which CTA fired it (header, hero, sticky bar, modal, a
 * specific airport page …) so the landing-page-to-call path is measurable.
 */
export function trackPhoneCall(source: string): void {
  trackEvent("phone_call_click", { cta_source: source });
  trackAdsConversion();
}

/** Backwards-compatible alias for the previous single-purpose helper. */
export const trackContactConversion = trackAdsConversion;
