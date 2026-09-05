import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's generated OG/icon routes are assets, not pages. Keeping them
        // out of the crawl budget costs nothing and they were never indexable
        // content in the first place.
        disallow: ["/opengraph-image", "/apple-icon"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // No `host` directive: it is a non-standard extension that only Yandex ever
    // honoured, and the previous value emitted a full URL where the directive
    // expects a bare hostname, so it was invalid as well as pointless.
  };
}
