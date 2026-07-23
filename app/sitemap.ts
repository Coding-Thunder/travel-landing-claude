import type { MetadataRoute } from "next";
import { site } from "@/config/site";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type Route = {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
};

const routes: Route[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/flights", priority: 0.9, changeFrequency: "weekly" },
  { path: "/business-travel", priority: 0.9, changeFrequency: "weekly" },
  { path: "/group-travel", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
