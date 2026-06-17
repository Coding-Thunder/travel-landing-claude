"use client";

import Script from "next/script";
import { useEffect } from "react";
import { brandConfig } from "@/config/brand";
import { trackContactConversion } from "@/lib/analytics";

/**
 * Google Ads global site tag (gtag.js) for the active brand.
 * - Loads gtag.js + base config only when the brand has an Ads ID.
 * - Fires the "Contact" conversion on every phone-call tap site-wide
 *   (header, hero, footer, sticky bar, popup, etc.) via a delegated listener.
 *   The callback form fires the same conversion on submit (see CallModal).
 */
export default function GoogleTag() {
  const { gtagId } = brandConfig.ads;

  useEffect(() => {
    if (!gtagId) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a[href^="tel:"]')) trackContactConversion();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [gtagId]);

  if (!gtagId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `}
      </Script>
    </>
  );
}
