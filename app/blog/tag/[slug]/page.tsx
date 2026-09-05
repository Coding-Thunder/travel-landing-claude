import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTag, postsByTag, tags, toSummary } from "@/lib/blog";
import { siteConfig } from "@/config/siteConfig";
import Container from "../../../components/ui/Container";
import PageHero from "../../../components/PageHero";
import PostCard from "../../../components/blog/PostCard";
import JsonLd from "../../../components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tags().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return {};
  return {
    title: `${tag.label}: Car Rental Articles`,
    description: `Articles tagged "${tag.label}" from the ${siteConfig.name} car rental blog.`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
    // Navigation, not a landing page. `follow` keeps equity flowing to the
    // articles; see MIN_POSTS_TO_INDEX in lib/blog.ts for the reasoning.
    robots: { index: false, follow: true },
    openGraph: { title: `${tag.label} articles | ${siteConfig.name}`, url: `/blog/tag/${tag.slug}`, type: "website" },
  };
}

export default async function TagPage({ params }: Params) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();

  const list = postsByTag(slug).map(toSummary);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: tag.label, path: `/blog/tag/${tag.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Tagged"
        title={tag.label}
        subtitle={`${tag.count} article${tag.count === 1 ? "" : "s"} tagged "${tag.label}".`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: tag.label, href: `/blog/tag/${tag.slug}` },
        ]}
      />
      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Articles with this tag</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
