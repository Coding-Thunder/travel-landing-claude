import type { Metadata } from "next";
import Link from "next/link";
import { airports } from "@/config/airports";
import { vehicleCategories } from "@/config/vehicles";
import { siteConfig } from "@/config/siteConfig";
import { allPosts, categories, tags } from "@/lib/blog";
import Container from "../components/ui/Container";
import PageHero from "../components/PageHero";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sitemap — All Pages",
  description: `Browse every page on ${siteConfig.name}: airport rentals, vehicle categories, blog guides, and company and legal information.`,
  alternates: { canonical: "/sitemap" },
};

type Group = { title: string; links: { label: string; href: string }[] };

export default function HtmlSitemapPage() {
  const groups: Group[] = [
    {
      title: "Main",
      links: [
        { label: "Home", href: "/" },
        { label: "Airport rentals", href: "/airports" },
        { label: "Vehicle categories", href: "/vehicles" },
        { label: "Blog", href: "/blog" },
        { label: "About us", href: "/about" },
        { label: "Contact us", href: "/contact" },
      ],
    },
    {
      title: "Airport locations",
      links: airports.map((a) => ({ label: `${a.city} (${a.iata})`, href: `/airports/${a.slug}` })),
    },
    {
      title: "Vehicle types",
      links: vehicleCategories.map((v) => ({ label: v.name, href: `/vehicles/${v.slug}` })),
    },
    {
      title: "Blog articles",
      links: allPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
    },
    {
      title: "Blog categories",
      links: categories().map((c) => ({ label: c.label, href: `/blog/category/${c.slug}` })),
    },
    {
      title: "Blog tags",
      links: tags().map((t) => ({ label: t.label, href: `/blog/tag/${t.slug}` })),
    },
    {
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
        { label: "XML sitemap", href: "/sitemap.xml" },
        { label: "RSS feed", href: "/blog/feed.xml" },
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sitemap", path: "/sitemap" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Sitemap"
        title="Every page, in one place"
        subtitle="A complete, human-friendly index of the site. Looking for the machine-readable version? See our XML sitemap."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Sitemap", href: "/sitemap" },
        ]}
      />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{group.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-700 transition hover:text-brand-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </>
  );
}
