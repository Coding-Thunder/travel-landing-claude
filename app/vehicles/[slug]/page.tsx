import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { vehicleCategories, getVehicleCategory } from "@/config/vehicles";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import PageHero from "../../components/PageHero";
import CallBand from "../../components/CallBand";
import { Section, SectionHeading } from "../../components/ui/Section";
import CardImage from "../../components/ui/CardImage";
import FaqList from "../../components/ui/FaqList";
import VehicleCard from "../../components/VehicleCard";
import Icon from "../../components/ui/Icon";
import Reveal from "../../components/ui/Reveal";
import JsonLd from "../../components/seo/JsonLd";
import { breadcrumbSchema, faqSchemaFrom, localBusinessSchema, vehicleSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vehicleCategories.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicleCategory(slug);
  if (!v) return {};

  const title = `${v.name} Car Rental — Models, Pricing & Tips`;
  const description = `Rent a ${v.name.toLowerCase()} car from $${v.priceFrom}/day with ${siteConfig.name}. Popular models, indicative daily/weekly/monthly pricing, and rental tips. Call ${siteConfig.phoneDisplay} for your best rate.`;

  return {
    title,
    description,
    alternates: { canonical: `/vehicles/${v.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/vehicles/${v.slug}`,
      type: "website",
      images: [{ url: v.image, width: 1200, height: 630, alt: `${v.name} rental car` }],
    },
  };
}

/**
 * Vehicle class detail page.
 *
 * Built from the shared `Section` rhythm rather than one long container of
 * hand-spaced blocks, so the page alternates quiet and page-surface bands the
 * same way the home page does. Every region is a hairline set — the bordered
 * grid for tips, the divided list for models, one table for pricing — which
 * keeps a long content page reading as one document instead of a stack of
 * floating cards.
 */
export default async function VehiclePage({ params }: Params) {
  const { slug } = await params;
  const v = getVehicleCategory(slug);
  if (!v) notFound();

  const related = vehicleCategories.filter((c) => c.slug !== v.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          vehicleSchema(v),
          faqSchemaFrom(v.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vehicles", path: "/vehicles" },
            { name: v.name, path: `/vehicles/${v.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Vehicle category"
        title={`${v.name} Car Rental`}
        subtitle={v.blurb}
        actions={
          <Button asChild data-cta="vehicle-hero-call">
            <a href={`tel:${siteConfig.phone}`}>
              <Icon name="phone" />
              Call {siteConfig.phoneVanity}
            </a>
          </Button>
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Vehicles", href: "/vehicles" },
          { name: v.name, href: `/vehicles/${v.slug}` },
        ]}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About {v.name.toLowerCase()} rentals
            </h2>
            <div className="mt-4 space-y-3">
              {v.intro.map((p, i) => (
                <p key={i} className={`${i === 0 ? "text-[15px]" : "text-sm"} leading-relaxed text-muted-foreground`}>
                  {p}
                </p>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-x-6">
              <Stat icon="users" value={`${v.seats}`} label="Seats" />
              <Stat icon="car" value={`${v.bags}`} label="Bags" />
              <Stat icon="tag" value={`$${v.priceFrom}`} label="From /day" />
            </dl>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative order-first aspect-[4/3] overflow-hidden rounded-lg border lg:order-last"
          >
            <CardImage
              src={v.image}
              alt={`${v.name} rental car`}
              gradient={v.gradient}
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </Reveal>
        </div>

        <div className="mt-12">
          <CallBand heading={`Best ${v.name.toLowerCase()} rate — by phone`} />
        </div>
      </Section>

      {/* Best for */}
      <Section tone="gray">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Best for</h2>
            <ul className="mt-5 divide-y divide-border border-t">
              {v.bestFor.map((use) => (
                <li key={use} className="flex items-start gap-2.5 py-3 text-sm leading-relaxed text-muted-foreground">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {use}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Popular models</h2>
            <ul className="mt-5 divide-y divide-border overflow-hidden rounded-lg border bg-card">
              {v.models.map((m) => (
                <li key={m.name} className="p-4">
                  <p className="flex items-center gap-2 text-[15px] font-medium">
                    <Icon name="car" className="h-4 w-4 shrink-0 text-primary" />
                    {m.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Specific makes and models are examples and subject to availability.</p>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <SectionHeading title="Indicative pricing" />
        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Term</th>
                <th scope="col" className="px-5 py-3 font-medium">Rate</th>
                <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {v.pricing.map((row) => (
                <tr key={row.term} className="bg-card">
                  <th scope="row" className="px-5 py-3 font-medium">{row.term}</th>
                  <td className="px-5 py-3 font-medium tabular-nums text-primary">{row.price}</td>
                  <td className="hidden px-5 py-3 text-muted-foreground sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Rates are indicative, vary by location and date, and are confirmed by phone before you book.</p>
      </Section>

      {/* Tips */}
      <Section tone="gray">
        <SectionHeading title={`${v.name} rental tips`} />
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {v.tips.map((tip) => (
            <li key={tip} className="flex gap-2.5 bg-card p-5">
              <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading title={`${v.name} rental FAQs`} />
        <div className="mt-6 max-w-3xl">
          <FaqList items={v.faqs} />
        </div>
      </Section>

      {/* Related */}
      <Section tone="gray">
        <SectionHeading
          title="Other vehicle types"
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link href="/vehicles">
                View all
                <Icon name="arrowRight" />
              </Link>
            </Button>
          }
        />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((c) => (
            <VehicleCard key={c.slug} vehicle={c} />
          ))}
        </div>
      </Section>
    </>
  );
}

function Stat({ icon, value, label }: { icon: Parameters<typeof Icon>[0]["name"]; value: string; label: string }) {
  return (
    <div className="border-t pt-3">
      <dd className="flex items-center gap-1.5 text-xl font-semibold tracking-tight">
        <Icon name={icon} className="h-4 w-4 shrink-0 text-primary" />
        {value}
      </dd>
      <dt className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
    </div>
  );
}
