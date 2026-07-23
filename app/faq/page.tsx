import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about our travel reservation assistance — from our services and how reservations work to payments, changes, cancellations and refunds.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqSchema(site.faqs),
        ]}
      />

      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our travel reservation assistance."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Good to know"
            title="Your questions, answered"
            subtitle="From how we assist with reservations to payments, changes, cancellations and refunds — here are the questions our customers ask most often."
          />

          <Reveal className="mt-10" delay={0.05}>
            <FaqAccordion items={site.faqs} />
          </Reveal>

          <Reveal className="mt-8" delay={0.1}>
            <p className="text-center text-sm leading-relaxed text-navy-500">
              {site.hotelNotice}
            </p>
          </Reveal>
        </div>
      </Section>

      <TrustBar />

      <Section tone="tint">
        <Reveal className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">
            Still need help?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Can&rsquo;t find what you&rsquo;re looking for?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600">
            If your question isn&rsquo;t covered above, our reservation specialists are happy to help. Send us
            an enquiry and we&rsquo;ll respond as quickly as possible during business hours.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="royal" size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button asChild variant="navyOutline" size="lg">
              <Link href="/hotels">Explore hotel assistance</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
