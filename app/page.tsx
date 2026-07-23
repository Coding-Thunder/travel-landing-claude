import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { site } from "@/config/site";
import { pageMetadata, organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import JsonLd from "@/app/components/trip/json-ld";
import QuoteWidget from "@/app/components/trip/quote-widget";

export const metadata = pageMetadata({
  title: "Flight, Hotel & Car Rental Reservation Assistance",
  description: site.seo.description,
  path: "/",
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80";

const telHref = `tel:${site.company.phoneHref || site.company.phone}`;

const steps = [
  { title: "Tell us your trip", description: "Share your route, dates and travelers — by phone or through a short request." },
  { title: "We source options", description: "Our specialists search our supplier network for fares and availability that fit your plans." },
  { title: "You review and confirm", description: "We present options with clear conditions and any applicable service fees before you decide." },
  { title: "We support you after", description: "Help with changes and questions for as long as your itinerary is active." },
];

export default function HomePage() {
  const homeFaqs = site.faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), faqSchema(homeFaqs), breadcrumbSchema([{ name: "Home", path: "/" }])]}
      />

      {/* 1 — Hero with overlapping quote widget --------------------------- */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image src={HERO_IMAGE} alt="An aircraft wing above the clouds" fill priority sizes="100vw" className="object-cover object-center opacity-40" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/85 to-navy-900/60" />

        <Container className="relative pb-36 pt-20 text-center sm:pb-40 sm:pt-24">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-300">
              Flights · Hotels · Car rentals
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Great fares, arranged by real people.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
              Tell us where you are going and our reservation specialists do the legwork — comparing options
              across our supplier network and explaining the conditions before you commit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="royal" size="lg">
                <a href={telHref}>
                  <Phone className="h-5 w-5" />
                  Call {site.company.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="navyOutline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Request a quote</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="relative z-10 -mt-24 sm:-mt-28">
        <Reveal>
          <QuoteWidget />
        </Reveal>
      </Container>

      {/* 2 — Trust bar ---------------------------------------------------- */}
      <div className="mt-14">
        <TrustBar />
      </div>

      {/* 3 — Popular destinations ---------------------------------------- */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Popular destinations"
          title="Where travelers are heading"
          subtitle="Tell us your dates for any of these cities — or anywhere else — and we will come back with options."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {site.destinations.map((d, i) => (
            <Reveal as="li" key={d.city} delay={(i % 4) * 0.05}>
              <Link
                href={`/contact?destination=${encodeURIComponent(`${d.city}, ${d.state}`)}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={d.image}
                  alt={`Travel to ${d.city}, ${d.state}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
                <div className="relative p-4 text-white">
                  <h3 className="text-lg font-semibold leading-tight">{d.city}</h3>
                  <p className="text-xs text-white/75">{d.state}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 4 — Three services ----------------------------------------------- */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="What we help with"
          title="Three services, one dedicated team"
          subtitle="Whether it is a single flight, a hotel for the weekend or a car for the week, we handle the reservation request from start to finish."
        />
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {site.services.map((svc, i) => (
            <Reveal as="li" key={svc.name} delay={i * 0.07}>
              <Link href={svc.href} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={svc.image} alt={`${svc.name} reservation assistance`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm">{svc.name}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-navy-900">{svc.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
                    Explore {svc.name.toLowerCase()}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 5 — Why choose us ------------------------------------------------ */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Why choose us</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                A calmer way to arrange your travel
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                {site.name} is an independent reservation service — not an airline, hotel chain, car rental
                company or online travel agency. That means impartial recommendations, clear conditions and a
                real person to help, with no pressure to book.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="royal">
                  <a href={telHref}>
                    <Phone className="h-4 w-4" />
                    {site.company.phone}
                  </a>
                </Button>
                <Button asChild variant="navyOutline">
                  <Link href="/contact">Request a quote</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.whyChooseUs.map((point, i) => (
                <Reveal as="li" key={point.title} delay={(i % 2) * 0.06} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{point.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 6 — How it works -------------------------------------------------- */}
      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From request to confirmation, in four steps"
          subtitle="A straightforward process designed around your trip — transparent at every stage."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-600 text-lg font-semibold text-white shadow-sm">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 7 — Phone CTA band ------------------------------------------------ */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to plan your trip?</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            Speak with a reservation specialist during business hours, or send your details and we will come
            back to you with options.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <a href={telHref}>
                <Phone className="h-5 w-5" />
                Call {site.company.phone}
              </a>
            </Button>
            <Button asChild variant="navyOutline" size="lg" className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Request a quote</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 8 — FAQ ----------------------------------------------------------- */}
      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="Frequently asked questions"
          title="Answers to common questions"
          subtitle="A few of the things customers ask most often. For everything else, our team is happy to help."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={homeFaqs} />
          <div className="mt-8 text-center">
            <Button asChild variant="navyOutline">
              <Link href="/faq">View all frequently asked questions</Link>
            </Button>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-navy-600">{site.disclaimer}</p>
        </div>
      </Section>
    </>
  );
}
