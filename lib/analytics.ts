import { brandConfig } from "@/config/brand";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Whether Google Ads / gtag is configured for the active brand. */
export const adsEnabled = Boolean(brandConfig.ads.gtagId);

/**
 * Fire the "Contact" conversion for the active brand. Safe to call anywhere on
 * the client — it no-ops if gtag isn't loaded or the brand has no Ads config.
 * Use for the real conversions on a call-first site: phone-call taps and
 * callback-form submissions.
 */
export function trackContactConversion(): void {
  const sendTo = brandConfig.ads.contactSendTo;
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !sendTo) return;
  window.gtag("event", "conversion", { send_to: sendTo });
}
