export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; variant: "tip" | "note" | "warning"; title?: string; text: string }
  | { type: "quote"; text: string; cite?: string };

export type PostFaq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** Category slug, e.g. "airport-guides". */
  category: string;
  categoryLabel: string;
  tags: string[];
  authorSlug: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  heroImage: string;
  heroAlt: string;
  seoTitle?: string;
  seoDescription?: string;
  body: PostBlock[];
  faqs?: PostFaq[];
};
