import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { site, telHref } from "@/config/site";
import { pageMetadata, organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import JsonLd from "@/app/components/trip/json-ld";
import SearchModule from "@/app/components/trip/search-module";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";

export const metadata = pageMetadata({
  title: "Online Travel Booking Platform",
  description: site.seo.description,
  path: "/",
  // The home page owns the brand title verbatim rather than the "%s | Flight Bizz" template.
  absoluteTitle: site.seo.defaultTitle,
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80";

const STEPS = [
  {
    title: "Tell us the trip",
    description: "Search any of the six categories, or describe the whole trip in one go. It takes a minute.",
  },
  {
    title: "We source real options",
    description: "A travel specialist checks current availability and pricing with the relevant suppliers.",
  },
  {
    title: "You review everything",
    description: "Total price, taxes, fees, inclusions and the cancellation terms — all before you decide.",
  },
  {
    title: "We book and support you",
    description: "We confirm with the supplier, send your booking reference, and stay on hand for changes.",
  },
];

export default function HomePage() {
  const homeFaqs = site.faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), faqSchema(homeFaqs), breadcrumbSchema([{ name: "Home", path: "/" }])]}
      />

      {/* 1 — Hero -------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image
          src={HERO_IMAGE}
          alt="A traveller looking out over a coastal city at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/88 to-navy-900/60" />

        <Container className="relative pb-36 pt-20 text-center sm:pb-40 sm:pt-24">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-300">{site.tagline}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Everything You Need for Your Journey
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
              Search, compare, and book travel options with {site.name} — or call us for personalized assistance.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="royal" size="lg">
                <Link href="#search">{site.cta.primary}</Link>
              </Button>
              {site.contact.hasPhone ? (
                <Button
                  asChild
                  variant="navyOutline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  <a href={telHref}>
                    <Phone className="h-5 w-5" />
                    {site.cta.secondary}
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="navyOutline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/callback">{site.cta.callback}</Link>
                </Button>
              )}
            </div>

            {/* Category strip */}
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {site.services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-royal-300/70 hover:bg-white/10"
                  >
                    <Icon name={s.icon} className="h-4 w-4 text-royal-300" />
                    {s.name.replace(" & Stays", "").replace("Vacation ", "").replace("Tours & ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 2 — Unified search --------------------------------------------- */}
      <Container id="search" className="relative z-10 -mt-24 scroll-mt-24 sm:-mt-28">
        <Reveal>
          <SearchModule />
        </Reveal>
      </Container>

      {/* 3 — Trust ------------------------------------------------------- */}
      <div className="mt-14">
        <TrustBar />
      </div>

      {/* 4 — The six services -------------------------------------------- */}
      <Section tone="white">
        <SectionHeading
          eyebrow="One platform"
          title="Six ways to travel, one place to arrange them"
          subtitle="Book a single flight or a whole trip. Every category is handled by the same team, with the same transparency on price and conditions."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((svc, i) => (
            <Reveal as="li" key={svc.key} delay={(i % 3) * 0.06}>
              <Link
                href={svc.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-royal-200 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-900 shadow-sm">
                    <Icon name={svc.icon} className="h-3.5 w-3.5 text-royal-600" />
                    {svc.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-relaxed text-navy-600">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-700">
                    Explore {svc.name.toLowerCase()}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 5 — Destinations ------------------------------------------------ */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Popular destinations"
          title="Where travellers are heading"
          subtitle="Pick a city to start a request — or search anywhere else in the world."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {site.destinations.map((d, i) => (
            <Reveal as="li" key={d.city} delay={(i % 4) * 0.05}>
              <Link
                href={`/contact?destination=${encodeURIComponent(`${d.city}, ${d.country}`)}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={d.image}
                  alt={`Travel to ${d.city}, ${d.country}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
                <div className="relative p-4 text-white">
                  <h3 className="text-lg font-semibold leading-tight">{d.city}</h3>
                  <p className="text-xs text-white/75">{d.country}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 6 — Why Flight Bizz --------------------------------------------- */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Why {site.name}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                A calmer way to arrange travel
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                {site.name} is an online travel platform, not an airline or a hotel group. That means impartial
                options, named suppliers, plainly stated conditions — and a real person on the end of the phone
                whenever you would rather talk it through.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="royal">
                  <Link href="#search">{site.cta.primary}</Link>
                </Button>
                {site.contact.hasPhone ? (
                  <Button asChild variant="navyOutline">
                    <a href={telHref}>
                      <Phone className="h-4 w-4" />
                      {site.company.phone}
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.whyChooseUs.map((point, i) => (
                <Reveal
                  as="li"
                  key={point.title}
                  delay={(i % 2) * 0.06}
                  className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
                >
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

      {/* 7 — How it works ------------------------------------------------ */}
      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From search to confirmation, in four steps"
          subtitle="No live inventory games and no pressure — just current options, clear terms and a decision that stays yours."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
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

      {/* 8 — Build your trip / call band --------------------------------- */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-300">Found what you need?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Continue online, or call {site.name}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            Want the whole trip planned around you instead? Tell us the destination, dates and budget and we will
            build it — flights, stays, transfers and everything in between.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/trip-planner">Build Your Trip</Link>
            </Button>
            {site.contact.hasPhone ? (
              <Button
                asChild
                variant="navyOutline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <a href={telHref}>
                  <Phone className="h-5 w-5" />
                  {site.cta.secondary}
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-5 text-sm text-navy-200">
            Prefer us to call you?{" "}
            <Link href="/callback" className="font-semibold text-royal-300 underline-offset-4 hover:underline">
              {site.cta.callback}
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* 9 — FAQ ---------------------------------------------------------- */}
      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="Frequently asked questions"
          title="Answers to common questions"
          subtitle="What Flight Bizz is, who fulfils your booking, and how pricing and cancellation actually work."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={homeFaqs} />
          <div className="mt-8 text-center">
            <Button asChild variant="navyOutline">
              <Link href="/faq">View all frequently asked questions</Link>
            </Button>
          </div>
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
