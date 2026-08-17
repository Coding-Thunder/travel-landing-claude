import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref, type Service } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "./section";
import Container from "./container";
import PageHero from "./page-hero";
import Reveal from "./reveal";
import Icon from "./lucide-icon";
import TrustBar from "./trust-bar";
import EnquiryForm from "./EnquiryForm";
import SearchModule from "./search-module";
import SupplierDisclosure from "./supplier-disclosure";
import FaqAccordion from "./faq-accordion";

export type ServicePoint = { icon: string; title: string; body: string };

/**
 * Shared layout for the six travel-category pages.
 *
 * `confirmedBeforeBooking` is the list of details a specialist puts in front of
 * the customer before a booking is made (§19). It is stated as what *will* be
 * confirmed rather than shown as populated values, because this site holds no
 * live supplier inventory and must never display prices or availability it
 * cannot stand behind.
 */
export default function ServicePage({
  service,
  eyebrow,
  title,
  subtitle,
  arrange,
  categories,
  confirmedBeforeBooking,
  faqs,
  enquiryHeading,
}: {
  service: Service;
  eyebrow: string;
  title: string;
  subtitle: string;
  arrange: ServicePoint[];
  categories?: { name: string; description: string }[];
  confirmedBeforeBooking: string[];
  faqs?: { q: string; a: string }[];
  enquiryHeading: string;
}) {
  const related = site.services.filter((s) => s.key !== service.key).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: service.name, href: service.href },
        ]}
        image={service.image}
        imageAlt={service.name}
      />

      {/* Search online or call — offered on every service surface (§14) */}
      <Container className="relative z-10 -mt-10 scroll-mt-24 sm:-mt-12" id="search">
        <Reveal>
          <SearchModule defaultTab={service.key} />
        </Reveal>
      </Container>

      {/* What we arrange */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <SectionHeading eyebrow="What we do" title={`How ${site.name} handles ${service.name.toLowerCase()}`} subtitle={service.intro} />
          <Reveal delay={0.05}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {arrange.map((point) => (
                <li key={point.title} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{point.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {categories?.length ? (
        <Section tone="tint">
          <SectionHeading
            eyebrow="Options"
            title={`${service.name} we can arrange`}
            subtitle="Tell us which of these fits, or describe something different — the request goes to the same specialist either way."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal
                as="li"
                key={cat.name}
                delay={(i % 3) * 0.06}
                className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{cat.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{cat.description}</p>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* What is confirmed before booking (§19) */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Before you book"
              title="Everything confirmed in writing first"
              subtitle="Nothing is booked until you have seen all of this and told us to go ahead."
            />
            <p className="mt-5 text-sm leading-relaxed text-navy-500">{site.pricingNotice}</p>
          </div>
          <Reveal delay={0.05} className="lg:col-span-7">
            <ul className="grid gap-x-8 gap-y-3 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:grid-cols-2 sm:p-8">
              {confirmedBeforeBooking.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-700">
                  <Icon name="shield-check" className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <TrustBar />

      {/* Enquiry */}
      <Section id="enquiry" tone="tint">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Continue online"
              title="Send us the details"
              subtitle={`Share what you need and a ${site.name} travel specialist will come back with real options during support hours.`}
            />
            <Reveal delay={0.05}>
              <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <p className="text-sm leading-relaxed text-navy-700">{site.bookingNotice}</p>
                {site.contact.hasPhone ? (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="navyOutline">
                      <a href={telHref}>
                        <Phone className="h-4 w-4" />
                        {site.cta.secondary}
                      </a>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/callback">{site.cta.callback}</Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild variant="navyOutline" className="mt-5">
                    <Link href="/callback">{site.cta.callback}</Link>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <EnquiryForm heading={enquiryHeading} defaultService={service.name} />
          </Reveal>
        </div>
      </Section>

      {faqs?.length ? (
        <Section tone="white">
          <SectionHeading align="center" eyebrow="Good to know" title={`${service.name} questions`} />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Section>
      ) : null}

      {/* Related categories */}
      <Section tone="navy">
        <SectionHeading
          invert
          eyebrow="One platform"
          title="Add the rest of the trip"
          subtitle="Everything below is arranged by the same team, so it can all be planned together."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-royal-300/60 hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-royal-300">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-100">{s.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-300">
                Explore <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
