import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { airports, getAirport } from "@/config/airports";
import { siteConfig } from "@/config/siteConfig";
import Container from "../../components/ui/Container";
import PageHero from "../../components/PageHero";
import CallBand from "../../components/CallBand";
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
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Airports", href: "/airports" },
          { name: `${airport.city} (${airport.iata})`, href: `/airports/${airport.slug}` },
        ]}
      />

      <Container className="py-14 sm:py-16">
        {/* Intro + image */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Car rental at {airport.name}
            </h2>
            {airport.intro.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-4 text-lg text-slate-700" : "mt-3 text-[15px] text-slate-600"} leading-relaxed`}>
                {p}
              </p>
            ))}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                <Icon name="tag" className="h-4 w-4 text-brand-600" /> from ${airport.priceFrom}/day
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                <Icon name="plane" className="h-4 w-4 text-brand-600" /> Airport pickup
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                <Icon name="headset" className="h-4 w-4 text-brand-600" /> Live agents 24/7
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className={`relative order-first overflow-hidden rounded-3xl bg-gradient-to-br ${airport.gradient} shadow-[var(--shadow-lift)] lg:order-last`}>
            <div className="relative aspect-[4/3]">
              <Image src={airport.image} alt={`${airport.name}`} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <CallBand heading={`Best ${airport.iata} rate — by phone`} />
        </div>

        {/* Pickup logistics */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Where to pick up your car at {airport.iata}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-600">{airport.pickup}</p>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Rental tips for {airport.city}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {airport.tips.map((tip) => (
              <li key={tip} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Nearby */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Great drives near {airport.city}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {airport.nearby.map((place) => (
              <div key={place.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
                <p className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <Icon name="map" className="h-4 w-4 text-brand-600" />
                  {place.name}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{place.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {airport.iata} car rental FAQs
          </h2>
          <div className="mt-6 max-w-3xl">
            <FaqList items={airport.faqs} />
          </div>
        </section>

        {/* Related airports — internal linking */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">More airport locations</h2>
            <Link href="/airports" className="shrink-0 text-sm font-bold text-brand-700 hover:underline">View all</Link>
          </div>
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
