import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "About Flight Bizz",
  description:
    "Flight Bizz is a multi-service online travel platform operated by GlobeVista LLC, helping travellers search, compare and arrange flights, hotels, cars, transfers, activities and packages.",
  path: "/about",
});

const CORE_VALUES: { icon: string; title: string; description: string }[] = [
  {
    icon: "file-check",
    title: "Transparency",
    description:
      "The total price, every fee, and the cancellation terms are put in front of you before you are asked to decide anything.",
  },
  {
    icon: "shield-check",
    title: "Honesty about what we are",
    description:
      "We are a travel platform. We do not claim accreditation, partnerships or capabilities we do not have, and we say so plainly.",
  },
  {
    icon: "users",
    title: "Customer first",
    description:
      "Your requirements drive the recommendations. Calling is always an option and never a requirement.",
  },
  {
    icon: "building",
    title: "Named suppliers",
    description:
      "You always know which airline, hotel, rental company or operator will fulfil your booking, and whose terms apply.",
  },
  {
    icon: "headset",
    title: "Support that continues",
    description:
      "Changes, cancellations and refund requests are handled by the same team that arranged the trip.",
  },
  {
    icon: "lock",
    title: "Careful with your data",
    description:
      "We collect what is needed to arrange your travel and nothing more, and we never ask for card details by email.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title="About Flight Bizz"
        subtitle="A multi-service online travel platform built to make arranging a whole trip straightforward — with nothing hidden between the search and the booking."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80"
        imageAlt="A traveller looking out over a coastal city at golden hour"
      />

      <TrustBar />

      {/* Who we are */}
      <Section tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Who we are" title="One platform for the whole journey" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-600 sm:text-[17px]">
              <p>
                {site.name} is a multi-service online travel platform operated by {site.legalName}. Our platform
                helps travellers search, compare, and arrange available travel services through a convenient online
                experience — or by phone, if that suits you better.
              </p>
              <p>
                Across six categories —{" "}
                {site.services.map((s, i) => (
                  <span key={s.key}>
                    <Link href={s.href} className="font-medium text-royal-700 underline-offset-4 hover:underline">
                      {s.name.toLowerCase()}
                    </Link>
                    {i < site.services.length - 1 ? (i === site.services.length - 2 ? " and " : ", ") : ""}
                  </span>
                ))}{" "}
                — the same team handles the request from first enquiry through to booking and beyond.
              </p>
              <p>
                We are not an airline, a hotel group, a rental company or an activity operator. Fulfilment always
                sits with the supplier identified during the booking process, and their terms apply to your travel.
                Our job is to find the right options, explain them properly and stay with you afterwards.
              </p>
              <p>
                That also means being straightforward about what we are not. {site.name} does not hold IATA or ARC
                accreditation, and we make no claim to certifications, awards or airline partnerships we do not
                have. We would rather earn trust through clear pricing and honest terms.
              </p>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-navy-100 shadow-sm lg:aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                alt="An aircraft wing above the clouds"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Business identity (§28, §39) */}
      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="Business identity"
          title="Who operates Flight Bizz"
          subtitle="Flight Bizz is a trading brand, not a separate legal entity. Here is the relationship in full."
        />
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2">
            <div className="bg-white p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">Brand</dt>
              <dd className="mt-2 text-lg font-semibold text-navy-900">{site.name}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">Legal entity</dt>
              <dd className="mt-2 text-lg font-semibold text-navy-900">{site.legalName}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">Relationship</dt>
              <dd className="mt-2 text-base font-medium text-navy-700">{site.operatedBy}</dd>
            </div>
            <div className="bg-white p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">Business activity</dt>
              <dd className="mt-2 text-base font-medium text-navy-700">
                Online travel platform — flights, hotels, cars, transfers, activities and packages.
              </dd>
            </div>
            {site.contact.hasAddress ? (
              <div className="bg-white p-6 sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-500">
                  Registered address
                </dt>
                <dd className="mt-2 text-base font-medium not-italic text-navy-700">
                  <address className="not-italic">{site.company.registeredOffice}</address>
                </dd>
              </div>
            ) : null}
          </dl>
        </Reveal>
      </Section>

      {/* Values */}
      <Section tone="white">
        <SectionHeading
          eyebrow="What we value"
          title="How we work"
          subtitle="The principles behind every option we put in front of a customer."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => (
            <Reveal
              as="li"
              key={value.title}
              delay={(i % 3) * 0.06}
              className="h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:border-royal-200 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name={value.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-navy-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{value.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Final CTA */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-300">Ready when you are</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let us help plan your next trip
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            Search online whenever it suits you, or talk it through with a travel specialist.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/#search">{site.cta.primary}</Link>
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
        </Reveal>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
