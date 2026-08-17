import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Flight Bizz — what the platform is, who fulfils your booking, our accreditation position, pricing, payments, changes, cancellations and refunds.",
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
        subtitle="What Flight Bizz is, how bookings work, and the honest answers on accreditation, pricing and refunds."
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
            subtitle="If your question is not here, our support team is happy to help — online or by phone."
          />

          <Reveal className="mt-10" delay={0.05}>
            <FaqAccordion items={site.faqs} />
          </Reveal>

          <Reveal className="mt-8" delay={0.1}>
            <p className="text-center text-sm leading-relaxed text-navy-500">{site.bookingNotice}</p>
          </Reveal>
        </div>
      </Section>

      <TrustBar />

      <Section tone="tint">
        <Reveal className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Still need help?</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Can&rsquo;t find what you&rsquo;re looking for?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600">
            Our travel specialists are happy to help with anything the answers above do not cover — from a new trip
            to a change on a booking you already hold.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="royal" size="lg">
              <Link href="/contact">Contact support</Link>
            </Button>
            {site.contact.hasPhone ? (
              <Button asChild variant="navyOutline" size="lg">
                <a href={telHref}>
                  <Phone className="h-4 w-4" />
                  {site.cta.secondary}
                </a>
              </Button>
            ) : (
              <Button asChild variant="navyOutline" size="lg">
                <Link href="/callback">{site.cta.callback}</Link>
              </Button>
            )}
          </div>
        </Reveal>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
