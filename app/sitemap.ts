import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { airports } from "@/config/airports";
import { vehicleCategories } from "@/config/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/airports", priority: 0.9, changeFrequency: "weekly" },
    ...airports.map((a) => ({
      path: `/airports/${a.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/vehicles", priority: 0.9, changeFrequency: "weekly" },
    ...vehicleCategories.map((v) => ({
      path: `/vehicles/${v.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/terms-and-conditions", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/refund-and-cancellation", priority: 0.4, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
