import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: ${site.tagline}`,
    short_name: site.name,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c1c24",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
