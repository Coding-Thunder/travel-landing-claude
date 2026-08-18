import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /thank-you is intentionally NOT disallowed: it serves `noindex, nofollow`,
        // and blocking the fetch would stop crawlers ever reading that directive.
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
