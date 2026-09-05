"use client";

import Script from "next/script";
import { useEffect } from "react";
import { brandConfig } from "@/config/brand";
import { adsEnabled, ga4Enabled, gtmEnabled, trackEvent, trackPhoneCall } from "@/lib/analytics";

/**
 * Measurement bootstrap for the active brand.
 *
 * Three independent tags, each gated on its own ID being configured, so a brand
 * with no IDs ships no third-party script:
 *   • Google Ads (gtag): the conversion account.
 *   • GA4 (same gtag instance): behavioural reporting.
 *   • Google Tag Manager: optional; when present it can take over entirely,
 *     since every event is also pushed to `window.dataLayer`.
 *
 * A single delegated listener captures the two things that matter on a
 * phone-first site: every `tel:` tap anywhere in the document, and every
 * element marked `data-cta`. Delegation is deliberate: per-component handlers
 * are how a phone link added later silently stops being measured.
 */
export default function GoogleTag() {
  const { gtagId, ga4Id, gtmId } = brandConfig.ads;
  const loadGtag = adsEnabled || ga4Enabled;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tel = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (tel) {
        // The nearest labelled CTA wins; otherwise fall back to the route, so
        // an unlabelled link still reports something useful.
        const source =
          tel.dataset.cta ??
          tel.closest<HTMLElement>("[data-cta]")?.dataset.cta ??
          `unlabelled:${window.location.pathname}`;
        trackPhoneCall(source);
        return;
      }

      const cta = target.closest<HTMLElement>("[data-cta]");
      if (cta?.dataset.cta) {
        trackEvent("cta_click", { cta_source: cta.dataset.cta, page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      {loadGtag ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId || ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {[
              "window.dataLayer = window.dataLayer || [];",
              "function gtag(){dataLayer.push(arguments);}",
              "gtag('js', new Date());",
              gtagId ? `gtag('config', '${gtagId}');` : "",
              ga4Id ? `gtag('config', '${ga4Id}');` : "",
            ]
              .filter(Boolean)
              .join("\n")}
          </Script>
        </>
      ) : null}

      {gtmEnabled ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
    </>
  );
}
