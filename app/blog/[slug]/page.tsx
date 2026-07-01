import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthor } from "@/content/authors";
import { siteConfig } from "@/config/siteConfig";
import { adjacent, allPosts, formatDate, getPost, headings, readingMinutes, related, toSummary } from "@/lib/blog";
import Container from "../../components/ui/Container";
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
    title: post.seoTitle ?? post.title,
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
      <header className="border-b border-slate-200 bg-slate-50">
        <Container className="py-10 sm:py-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <li><Link href="/" className="hover:text-brand-700">Home</Link></li>
              <li className="text-slate-300">/</li>
              <li><Link href="/blog" className="hover:text-brand-700">Blog</Link></li>
              <li className="text-slate-300">/</li>
              <li><Link href={`/blog/category/${post.category}`} className="hover:text-brand-700">{post.categoryLabel}</Link></li>
            </ol>
          </nav>

          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center gap-3">
              <Avatar src={author.avatar} name={author.name} size={40} />
              <div className="text-sm">
                <p className="font-bold text-slate-900">{author.name}</p>
                <p className="text-slate-500">
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
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-200 shadow-[var(--shadow-lift)] sm:aspect-[2/1]">
          <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">Photo via Unsplash</p>
      </Container>

      {/* Body + TOC */}
      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4 lg:order-last">
          <div className="lg:sticky lg:top-24">
            <Toc items={toc} />
          </div>
        </aside>

        <div className="lg:col-span-8">
          <PostBody blocks={post.body} />

          {post.faqs && post.faqs.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Frequently asked questions</h2>
              <div className="mt-5">
                <FaqList items={post.faqs} />
              </div>
            </section>
          ) : null}

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">#{t}</span>
            ))}
          </div>

          <div className="mt-8">
            <AuthorBox author={author} />
          </div>

          {/* Prev / Next */}
          {(older || newer) && (
            <nav aria-label="More articles" className="mt-8 grid gap-4 sm:grid-cols-2">
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Newer</p>
                  <p className="mt-1 font-bold text-slate-900 group-hover:text-brand-700">{newer.title}</p>
                </Link>
              ) : <span className="hidden sm:block" />}
              {older ? (
                <Link href={`/blog/${older.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 text-right transition hover:border-brand-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Older</p>
                  <p className="mt-1 font-bold text-slate-900 group-hover:text-brand-700">{older.title}</p>
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
        <section className="border-t border-slate-200 bg-slate-50">
          <Container className="py-12 sm:py-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Related reading</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={toSummary(p)} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
