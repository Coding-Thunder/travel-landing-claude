import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { site, telHref } from "@/config/site";
import { pageMetadata, organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Container from "@/app/components/trip/container";
import TrustBar from "@/app/components/trip/trust-bar";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import JsonLd from "@/app/components/trip/json-ld";
import SearchModule from "@/app/components/trip/search-module";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";

export const metadata = pageMetadata({
  title: "Online Travel Booking Platform",
  description: site.seo.description,
  path: "/",
  absoluteTitle: site.seo.defaultTitle,
});

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80";

const STEPS = [
  { title: "Send the brief", body: "Search any category, or describe the whole trip in one go." },
  { title: "We check availability", body: "A specialist sources current options with the relevant suppliers." },
  { title: "You see everything", body: "Total price, taxes, fees and cancellation terms, before you decide." },
  { title: "We book and follow up", body: "We confirm with the supplier, send your reference and handle changes." },
];

export default function HomePage() {
  const homeFaqs = site.faqs.slice(0, 6);

  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), faqSchema(homeFaqs), breadcrumbSchema([{ name: "Home", path: "/" }])]}
      />

      {/* Hero. Deliberately short: the search module is the focal point.
          `dark` swaps the token values, so this renders on the midnight surface
          without any raw color values. */}
      <section className="dark relative isolate border-b bg-background">
        <Image
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-background/70" />

        <Container className="relative pb-8 pt-12 sm:pb-10 sm:pt-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Everything You Need for Your Journey
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Search, compare and book travel options with {site.name}, or call us for personalized assistance.
            </p>
          </div>
        </Container>
      </section>

      {/* Search: the primary interaction surface, lifted over the hero edge. */}
      <Container className="relative z-10 -mt-6 scroll-mt-20" id="search">
        <SearchModule />
      </Container>

      {/* Services. A dense index, not six marketing cards. */}
      <Section>
        <SectionHeading
          title="Travel services"
          description="Book one element or the whole trip. The same team handles every category."
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link href="/trip-planner">
                Build your trip
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((svc) => (
            <li key={svc.key}>
              <Link
                href={svc.href}
                className="group flex h-full flex-col bg-card p-5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="flex items-center gap-2 text-[15px] font-medium">
                  {svc.name}
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{svc.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Destinations. The one place images earn their keep. */}
      <Section tone="muted">
        <SectionHeading
          title="Popular destinations"
          description="Start a request for one of these, or search anywhere else in the world."
        />
        <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {site.destinations.map((d) => (
            <li key={d.city}>
              <Link
                href={`/contact?destination=${encodeURIComponent(`${d.city}, ${d.country}`)}`}
                className="group relative flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={d.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="relative p-3 text-white">
                  <p className="text-sm font-medium leading-tight">{d.city}</p>
                  <p className="text-xs text-white/70">{d.country}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works. Numbered steps on a rule, no cards. */}
      <Section>
        <SectionHeading
          title="How booking works"
          description="No live inventory and no pressure. Current options, clear terms, and the decision stays yours."
        />
        <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t pt-4">
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[15px] font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <Separator className="my-10" />

        {/* Support strip, in place of a full-width CTA band. */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[15px] font-medium">Prefer to talk it through?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Our travel specialists are available during support hours, and you never have to call to book.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {site.contact.hasPhone ? (
              <Button asChild variant="outline">
                <a href={telHref}>
                  <Phone aria-hidden />
                  {site.company.phone}
                </a>
              </Button>
            ) : null}
            <Button asChild variant="secondary">
              <Link href="/callback">{site.cta.callback}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <TrustBar />

      <Section>
        <SectionHeading
          title="Common questions"
          description="What Flight Bizz is, who fulfils your booking, and how pricing and cancellation work."
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link href="/faq">
                All questions
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <div className="mt-6 max-w-3xl">
          <FaqAccordion items={homeFaqs} />
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
