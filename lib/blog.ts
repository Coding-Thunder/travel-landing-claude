import { posts } from "@/content/posts";
import type { Post, PostBlock } from "@/content/blog-types";
import { getAuthor } from "@/content/authors";

export const POSTS_PER_PAGE = 6;

/**
 * Indexing policy for the two blog taxonomies.
 *
 * Twelve articles are currently spread across 5 categories and 26 tags, and 20
 * of those tags hold exactly one post. A taxonomy page listing one article is a
 * weaker duplicate of the article itself, and 31 taxonomy URLs against 17
 * commercial URLs sends most of the site's crawl budget and internal link
 * equity somewhere that can never rank or convert.
 *
 * So: categories are the one indexable taxonomy, and only once a category
 * actually aggregates something. Tags stay as navigation, marked noindex,follow
 * so they still pass equity through to the articles.
 */
export const MIN_POSTS_TO_INDEX = 2;

/** A category earns indexing once it aggregates more than a single post. */
export function categoryIsIndexable(slug: string): boolean {
  return postsByCategory(slug).length >= MIN_POSTS_TO_INDEX;
}

/** Tags are never indexed: they duplicate the categories over the same posts. */
export const TAGS_ARE_INDEXABLE = false;

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

/**
 * Guides worth surfacing on a given airport page.
 *
 * Airport pages previously linked only to other airport pages, so the eight
 * strongest commercial URLs on the site passed nothing to the articles written
 * about them, and /airports/lax and /blog/lax-car-rental-guide did not link to
 * each other in either direction.
 *
 * Matching is by the tags the posts already carry: the IATA code or the city
 * name for a dedicated guide, falling back to the general airport guides for
 * the three airports that do not have one of their own. No new data.
 */
export function guidesForAirport(iata: string, city: string, n = 3): Post[] {
  const wants = [iata.toLowerCase(), city.toLowerCase()];
  const tagged = (p: Post) => p.tags.map((t) => t.toLowerCase());

  const specific = allPosts.filter((p) => tagged(p).some((t) => wants.includes(t)));
  if (specific.length >= n) return specific.slice(0, n);

  const general = allPosts.filter(
    (p) => !specific.includes(p) && tagged(p).includes("airport rentals")
  );
  return [...specific, ...general].slice(0, n);
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
