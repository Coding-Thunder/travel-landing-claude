import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthor } from "@/content/authors";
import { siteConfig } from "@/config/siteConfig";
import { adjacent, allPosts, formatDate, getPost, headings, readingMinutes, related, toSummary } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import Container from "../../components/ui/Container";
import { Section, SectionHeading } from "../../components/ui/Section";
import Icon from "../../components/ui/Icon";
import Avatar from "../../components/ui/Avatar";
import PostBody from "../../components/blog/PostBody";
import Toc from "../../components/blog/Toc";
import ShareButtons from "../../components/blog/ShareButtons";
import AuthorBox from "../../components/blog/AuthorBox";
import PostCard from "../../components/blog/PostCard";
import FaqList from "../../components/ui/FaqList";
import CallBand from "../../components/CallBand";
import JsonLd from "../../components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchemaFrom } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const author = getAuthor(post.authorSlug);

  return {
    // Already a complete title; bypass the "%s | brand" template so it is
    // not pushed past the SERP limit.
    title: { absolute: post.seoTitle ?? post.title },
    description: post.seoDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [author.name],
      tags: post.tags,
      images: [{ url: post.heroImage, width: 1600, height: 900, alt: post.heroAlt }],
    },
  };
}

/** Breadcrumb link styling, matched to the shared `Breadcrumb` primitive. */
const CRUMB = "rounded-sm transition-colors hover:text-foreground";

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorSlug);
  const toc = headings(post);
  const minutes = readingMinutes(post);
  const relatedPosts = related(post, 3);
  const { older, newer } = adjacent(post);
  const canonical = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
            image: post.heroImage,
            author: author.name,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          ...(post.faqs ? [faqSchemaFrom(post.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <header className="border-b bg-muted/40">
        <Container className="py-8 sm:py-10">
          {/* Hand-rolled rather than the shared `Breadcrumb`: the trailing crumb
              here is the category, which stays a link because it is not the
              current page. */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-1">
                <Link href="/" className={CRUMB}>Home</Link>
              </li>
              <li className="flex items-center gap-1">
                <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
                <Link href="/blog" className={CRUMB}>Blog</Link>
              </li>
              <li className="flex items-center gap-1">
                <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
                <Link href={`/blog/category/${post.category}`} className={CRUMB}>{post.categoryLabel}</Link>
              </li>
            </ol>
          </nav>

          <h1 className="mt-4 max-w-3xl font-display text-3xl tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-3">
              <Avatar src={author.avatar} name={author.name} size={40} />
              <div className="text-sm">
                <p className="font-medium">{author.name}</p>
                <p className="text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {minutes} min read
                </p>
              </div>
            </div>
            <div className="ml-auto">
              <ShareButtons url={canonical} title={post.title} />
            </div>
          </div>
        </Container>
      </header>

      {/* Hero image */}
      <Container className="pt-8 sm:pt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-muted sm:aspect-[2/1]">
          <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Photo via Unsplash</p>
      </Container>

      {/* Body + TOC */}
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4 lg:order-last">
          <div className="lg:sticky lg:top-24">
            <Toc items={toc} />
          </div>
        </aside>

        <div className="lg:col-span-8">
          <PostBody blocks={post.body} />

          {post.faqs && post.faqs.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Frequently asked questions</h2>
              <div className="mt-5">
                <FaqList items={post.faqs} />
              </div>
            </section>
          ) : null}

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary">#{t}</Badge>
            ))}
          </div>

          <div className="mt-8">
            <AuthorBox author={author} />
          </div>

          {/* Prev / Next */}
          {(older || newer) && (
            <nav aria-label="More articles" className="mt-8 grid gap-4 sm:grid-cols-2">
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="rounded-lg border bg-card p-5 transition-colors hover:bg-accent">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Newer</span>
                  <span className="mt-1 block text-[15px] font-medium">{newer.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {older ? (
                <Link href={`/blog/${older.slug}`} className="rounded-lg border bg-card p-5 text-right transition-colors hover:bg-accent">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Older</span>
                  <span className="mt-1 block text-[15px] font-medium">{older.title}</span>
                </Link>
              ) : null}
            </nav>
          )}

          <div className="mt-10">
            <CallBand heading="Ready to book your rental?" />
          </div>
        </div>
      </Container>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <Section tone="gray">
          <SectionHeading title="Related reading" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={toSummary(p)} />
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
