import { allPosts } from "@/lib/blog";
import { getAuthor } from "@/content/authors";
import { siteConfig } from "@/config/siteConfig";

export const dynamic = "force-static";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET(): Response {
  const base = siteConfig.url;

  const items = allPosts
    .map((p) => {
      const link = `${base}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${p.publishedAt}T09:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(getAuthor(p.authorSlug).name)}</dc:creator>
      <category>${esc(p.categoryLabel)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — Car Rental Blog</title>
    <link>${base}/blog</link>
    <description>Practical car rental guides and travel tips from ${esc(siteConfig.name)}.</description>
    <language>en-US</language>
    <atom:link href="${base}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
