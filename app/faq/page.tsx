import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section } from "@/app/components/trip/section";
import FaqAccordion from "@/app/components/trip/faq-accordion";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Flight Bizz: what the platform is, who fulfils your booking, our accreditation position, pricing, payments, changes, cancellations and refunds.",
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

      <PageHeader
        title="Frequently asked questions"
        description="What Flight Bizz is, how bookings work, and straight answers on accreditation, pricing and refunds."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <Section>
        <div className="max-w-3xl">
          <FaqAccordion items={site.faqs} />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{site.bookingNotice}</p>

          <Separator className="my-8" />

          <h2 className="text-[15px] font-medium">Still need help?</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Our travel specialists can help with anything the answers above do not cover, from a new trip to a
            change on a booking you already hold.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/contact">Contact support</Link>
            </Button>
            {site.contact.hasPhone ? (
              <Button asChild variant="outline">
                <a href={telHref}>
                  <Phone aria-hidden />
                  {site.cta.secondary}
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/callback">{site.cta.callback}</Link>
              </Button>
            )}
          </div>
        </div>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
