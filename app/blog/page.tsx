import type { Metadata } from "next";
import { allPosts, categories, toSummary } from "@/lib/blog";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import PageHero from "../components/PageHero";
import BlogExplorer from "../components/blog/BlogExplorer";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Car Rental Blog — Guides, Tips & Airport Advice",
  description: `Practical car rental guides from ${siteConfig.name}: saving money on airport rentals, insurance explained in plain English, destination road-trip tips and more.`,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    title: `Car Rental Blog | ${siteConfig.name}`,
    description: "Guides and tips to rent smarter — airport pickup, saving money, insurance and road trips.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const summaries = allPosts.map(toSummary);

  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="The blog"
        title="Car rental guides & travel tips"
        subtitle="Honest, practical advice from working rental agents and travel writers — how to save money, navigate airport pickup, understand the fine print and plan the drive."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Rental guides</h2>
        <BlogExplorer posts={summaries} categories={categories()} />
      </Container>
    </>
  );
}
