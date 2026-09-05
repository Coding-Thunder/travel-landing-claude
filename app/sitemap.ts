import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { airports } from "@/config/airports";
import { vehicleCategories } from "@/config/vehicles";
import { allPosts, categories, tags, postsByCategory, postsByTag } from "@/lib/blog";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** ISO date. Omit to fall back to the build date. */
  lastModified?: string;
};

/** Newest `updatedAt` in a set of posts, so a hub reports its freshest child. */
function newest(posts: { updatedAt: string }[]): string | undefined {
  if (!posts.length) return undefined;
  return posts.reduce((a, p) => (p.updatedAt > a ? p.updatedAt : a), posts[0].updatedAt);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const buildDate = new Date();
  const newestPost = newest(allPosts);

  const routes: Entry[] = [
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
    // Blog freshness is real data, so report it rather than stamping every URL
    // with the build time. A sitemap that claims 69 pages changed on every
    // deploy teaches Googlebot to stop trusting the field entirely.
    { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: newestPost },
    ...allPosts.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: p.updatedAt,
    })),
    ...categories().map((c) => ({
      path: `/blog/category/${c.slug}`,
      priority: 0.5,
      changeFrequency: "weekly" as const,
      lastModified: newest(postsByCategory(c.slug)),
    })),
    ...tags().map((t) => ({
      path: `/blog/tag/${t.slug}`,
      priority: 0.4,
      changeFrequency: "monthly" as const,
      lastModified: newest(postsByTag(t.slug)),
    })),
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms-and-conditions", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.4, changeFrequency: "yearly" },
    { path: "/refund-and-cancellation", priority: 0.4, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: r.lastModified ? new Date(r.lastModified) : buildDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
