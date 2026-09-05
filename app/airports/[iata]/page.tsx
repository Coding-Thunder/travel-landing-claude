import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { airports, getAirport } from "@/config/airports";
import { siteConfig } from "@/config/siteConfig";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Section";
import PageHero from "../../components/PageHero";
import CallBand from "../../components/CallBand";
import CardImage from "../../components/ui/CardImage";
import FaqList from "../../components/ui/FaqList";
import AirportCard from "../../components/AirportCard";
import Icon from "../../components/ui/Icon";
import Reveal from "../../components/ui/Reveal";
import JsonLd from "../../components/seo/JsonLd";
import { breadcrumbSchema, faqSchemaFrom, localBusinessSchema } from "@/lib/schema";

type Params = { params: Promise<{ iata: string }> };

export function generateStaticParams() {
  return airports.map((a) => ({ iata: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { iata } = await params;
  const airport = getAirport(iata);
  if (!airport) return {};

  const title = `${airport.city} Airport Car Rental (${airport.iata})`;
  const description = `Rent a car at ${airport.name} (${airport.iata}) from $${airport.priceFrom}/day. Airport pickup logistics, local rental tips and transparent all-in pricing confirmed by phone. Call ${siteConfig.phoneDisplay}.`;

  return {
    title,
    description,
    alternates: { canonical: `/airports/${airport.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/airports/${airport.slug}`,
      type: "website",
      images: [{ url: airport.image, width: 1200, height: 630, alt: `${airport.name} car rental` }],
    },
  };
}

export default async function AirportPage({ params }: Params) {
  const { iata } = await params;
  const airport = getAirport(iata);
  if (!airport) notFound();

  const related = airports.filter((a) => a.slug !== airport.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          faqSchemaFrom(airport.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airports", path: "/airports" },
            { name: `${airport.city} (${airport.iata})`, path: `/airports/${airport.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${airport.iata} · ${airport.city}, ${airport.state}`}
        title={`${airport.city} Airport Car Rental`}
        subtitle={airport.blurb}
        actions={
          <Button asChild data-cta="airport-hero-call">
            <a href={`tel:${siteConfig.phone}`}>
              <Icon name="phone" />
              Call {siteConfig.phoneVanity}
            </a>
          </Button>
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Airports", href: "/airports" },
          { name: `${airport.city} (${airport.iata})`, href: `/airports/${airport.slug}` },
        ]}
      />

      <Container className="py-14 sm:py-16">
        {/* Intro + image */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Car rental at {airport.name}
            </h2>
            {airport.intro.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-4 text-[15px]" : "mt-3 text-sm"} leading-relaxed text-muted-foreground`}>
                {p}
              </p>
            ))}
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Icon name="tag" className="h-3.5 w-3.5 text-primary" /> from ${airport.priceFrom}/day
              </Badge>
              <Badge variant="secondary">
                <Icon name="airport" className="h-3.5 w-3.5 text-primary" /> Airport pickup
              </Badge>
              <Badge variant="secondary">
                <Icon name="headset" className="h-3.5 w-3.5 text-primary" /> Live agents 24/7
              </Badge>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-first overflow-hidden rounded-lg border lg:order-last">
            <div className="relative aspect-[4/3]">
              <CardImage
                src={airport.image}
                alt={`${airport.name}`}
                gradient={airport.gradient}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <CallBand heading={`Best ${airport.iata} rate, by phone`} />
        </div>

        {/* Pickup logistics */}
        <section className="mt-14">
          <SectionHeading
            title={`Where to pick up your car at ${airport.iata}`}
            subtitle={airport.pickup}
          />
        </section>

        {/* Tips */}
        <section className="mt-12">
          <SectionHeading title={`Rental tips for ${airport.city}`} />
          <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
            {airport.tips.map((tip) => (
              <li key={tip} className="flex gap-3 bg-card p-5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Nearby */}
        <section className="mt-12">
          <SectionHeading title={`Great drives near ${airport.city}`} />
          <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
            {airport.nearby.map((place) => (
              <li key={place.name} className="bg-card p-5">
                <p className="flex items-center gap-2 text-[15px] font-medium">
                  <Icon name="map" className="h-4 w-4 shrink-0 text-primary" />
                  {place.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{place.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <SectionHeading title={`${airport.iata} car rental FAQs`} />
          <div className="mt-6 max-w-3xl">
            <FaqList items={airport.faqs} />
          </div>
        </section>

        {/* Related airports: internal linking */}
        <section className="mt-14">
          <SectionHeading
            title="More airport locations"
            actions={
              <Button asChild variant="ghost" size="sm">
                <Link href="/airports">
                  View all
                  <Icon name="arrowRight" />
                </Link>
              </Button>
            }
          />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((a) => (
              <AirportCard key={a.iata} airport={a} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
