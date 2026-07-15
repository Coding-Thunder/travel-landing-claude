import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import {
  pageMetadata,
  organizationSchema,
  websiteSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import JsonLd from "@/app/components/trip/json-ld";

export const metadata = pageMetadata({
  title: "Professional Hotel Reservation Assistance",
  description: site.seo.description,
  path: "/",
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80";

const steps = [
  {
    title: "Tell us what you need",
    description:
      "Share your destination, dates, budget and any preferences through a short enquiry. There is no obligation to proceed.",
  },
  {
    title: "We source suitable options",
    description:
      "Our reservation specialists search our trusted supplier network for accommodation that fits your brief.",
  },
  {
    title: "You review and confirm",
    description:
      "We present suitable options with clear conditions and any applicable service fees, so you can decide with confidence.",
  },
  {
    title: "We support you throughout",
    description:
      "Dedicated assistance before, during and after your stay, including changes where the supplier's policy allows.",
  },
];

export default function HomePage() {
  const featured = site.hotelCategories[0];
  const categories = site.hotelCategories.slice(1);
  const homeFaqs = site.faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(homeFaqs),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />

      {/* 1 — Hero -------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-navy-900">
        <Image
          src={HERO_IMAGE}
          alt="Interior of an elegant hotel suite in warm evening light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/80 to-navy-900/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/20 to-transparent"
        />

        <Container className="relative py-24 sm:py-28 lg:py-36">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-300">
              Hotel reservation assistance · Worldwide
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Hotel reservations, handled with care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
              Professional, independent assistance with your accommodation — sourced through a
              trusted supplier network and supported by specialists who take the detail off your
              hands.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="royal" size="lg">
                <Link href="/contact">Request a quote</Link>
              </Button>
              <Button
                asChild
                variant="navyOutline"
                size="lg"
                className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/hotels">Explore hotel services</Link>
              </Button>
            </div>

            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-100">
              <span>No hidden surprises</span>
              <span aria-hidden className="text-royal-300">·</span>
              <span>Transparent policies</span>
              <span aria-hidden className="text-royal-300">·</span>
              <span>Dedicated support</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2 — Trust bar -------------------------------------------------- */}
      <TrustBar />

      {/* 3 — Accommodation categories ---------------------------------- */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Accommodation"
          title="Accommodation for every kind of trip"
          subtitle="From value stays to five-star properties, we help you find accommodation that matches the purpose of your journey — leisure, business or something in between."
        />

        <div className="mt-10 grid gap-5 lg:gap-6">
          {/* Featured category */}
          <Reveal>
            <Link
              href="/hotels"
              className="group grid overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:shadow-lg lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={featured.image}
                  alt={`Example of ${featured.name.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-7 sm:p-9">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">
                  Most requested
                </span>
                <h3 className="text-2xl font-semibold text-navy-900">{featured.name}</h3>
                <p className="text-base leading-relaxed text-navy-600">{featured.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
                  Explore options
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Remaining categories */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {categories.map((cat, i) => (
              <Reveal as="li" key={cat.name} delay={(i % 3) * 0.06}>
                <Link
                  href="/hotels"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={`Example of ${cat.name.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/35 to-transparent"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-navy-900">{cat.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{cat.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4 — Why customers choose us (asymmetric, tint) ---------------- */}
      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">
                Why customers choose us
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                A calmer way to arrange your stay
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                We are an independent reservation service, not an airline, hotel chain or online
                travel agent. That means impartial recommendations, clear conditions and a real
                person to help — with no pressure to book.
              </p>
              <div className="mt-8">
                <Button asChild variant="royal">
                  <Link href="/contact">Request a quote</Link>
                </Button>
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
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5 — How it works ---------------------------------------------- */}
      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From enquiry to check-out, in four simple steps"
          subtitle="A straightforward process designed around your requirements — transparent at every stage."
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-600 text-lg font-semibold text-white shadow-sm">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 6 — CTA band --------------------------------------------------- */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to plan your stay?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            Tell us where you are heading and what you need. Our reservation specialists will be in
            touch during business hours with suitable options.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button
              asChild
              variant="navyOutline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact our team</Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 7 — FAQ teaser ------------------------------------------------- */}
      <Section tone="tint">
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
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-navy-600">
            {site.disclaimer}
          </p>
        </div>
      </Section>
    </>
  );
}
