import { posts } from "@/content/posts";
import type { Post, PostBlock } from "@/content/blog-types";
import { getAuthor } from "@/content/authors";

export const POSTS_PER_PAGE = 6;

/** Lightweight, serializable shape for cards and client-side search. */
export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  heroImage: string;
  heroAlt: string;
  authorName: string;
  dateLabel: string;
  publishedAt: string;
  readingMinutes: number;
};

export function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryLabel: post.categoryLabel,
    tags: post.tags,
    heroImage: post.heroImage,
    heroAlt: post.heroAlt,
    authorName: getAuthor(post.authorSlug).name,
    dateLabel: formatDate(post.publishedAt),
    publishedAt: post.publishedAt,
    readingMinutes: readingMinutes(post),
  };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** All posts, newest first. */
export const allPosts: Post[] = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

function blockText(block: PostBlock): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
    case "callout":
    case "quote":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
  }
}

export function plainText(post: Post): string {
  return post.body.map(blockText).join(" ");
}

export function readingMinutes(post: Post): number {
  const words = plainText(post).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export type Heading = { id: string; text: string; level: 2 | 3 };

export function headings(post: Post): Heading[] {
  return post.body
    .filter((b): b is Extract<PostBlock, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: slugify(b.text), text: b.text, level: b.type === "h2" ? 2 : 3 }));
}

export type Taxon = { slug: string; label: string; count: number };

export function categories(): Taxon[] {
  const map = new Map<string, Taxon>();
  for (const p of allPosts) {
    const cur = map.get(p.category);
    if (cur) cur.count += 1;
    else map.set(p.category, { slug: p.category, label: p.categoryLabel, count: 1 });
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function getCategory(slug: string): Taxon | undefined {
  return categories().find((c) => c.slug === slug);
}

export function postsByCategory(slug: string): Post[] {
  return allPosts.filter((p) => p.category === slug);
}

export function tags(): Taxon[] {
  const map = new Map<string, Taxon>();
  for (const p of allPosts) {
    for (const t of p.tags) {
      const s = slugify(t);
      const cur = map.get(s);
      if (cur) cur.count += 1;
      else map.set(s, { slug: s, label: t, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function getTag(slug: string): Taxon | undefined {
  return tags().find((t) => t.slug === slug);
}

export function postsByTag(slug: string): Post[] {
  return allPosts.filter((p) => p.tags.some((t) => slugify(t) === slug));
}

export function related(post: Post, n = 3): Post[] {
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const shared = p.tags.filter((t) => post.tags.includes(t)).length;
      const score = (p.category === post.category ? 3 : 0) + shared;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.post);
}

export function adjacent(post: Post): { older?: Post; newer?: Post } {
  const idx = allPosts.findIndex((p) => p.slug === post.slug);
  return { newer: idx > 0 ? allPosts[idx - 1] : undefined, older: allPosts[idx + 1] };
}

export type Page<T> = { items: T[]; page: number; totalPages: number; total: number };

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, totalPages, total: items.length };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
