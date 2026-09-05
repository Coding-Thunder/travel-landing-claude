import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, postsByCategory, toSummary, categoryIsIndexable } from "@/lib/blog";
import { siteConfig } from "@/config/siteConfig";
import Container from "../../../components/ui/Container";
import PageHero from "../../../components/PageHero";
import PostCard from "../../../components/blog/PostCard";
import JsonLd from "../../../components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.label}: Car Rental Guides`,
    description: `${category.label} car rental articles and guides from ${siteConfig.name}. Practical, honest advice to help you rent smarter.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
    // A category holding a single post is a weaker copy of that post, so it is
    // kept out of the index while still passing equity to the article.
    ...(categoryIsIndexable(category.slug) ? {} : { robots: { index: false, follow: true } }),
    openGraph: { title: `${category.label} guides | ${siteConfig.name}`, url: `/blog/category/${category.slug}`, type: "website" },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const list = postsByCategory(slug).map(toSummary);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: category.label, path: `/blog/category/${category.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Blog category"
        title={category.label}
        subtitle={`${category.count} article${category.count === 1 ? "" : "s"} on ${category.label.toLowerCase()}.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: category.label, href: `/blog/category/${category.slug}` },
        ]}
      />
      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Articles in this category</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
