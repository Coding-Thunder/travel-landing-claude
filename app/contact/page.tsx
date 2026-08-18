import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref, mailtoHref } from "@/config/site";
import { pageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section } from "@/app/components/trip/section";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact the Flight Bizz support team about a new booking, an existing booking, a change, cancellation or refund. Call, email, or request a callback during our published support hours.",
  path: "/contact",
});

type SearchParams = Promise<{
  destination?: string;
  dates?: string;
  travelers?: string;
  service?: string;
  notes?: string;
}>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const { destination, dates, travelers, service, notes } = await searchParams;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        title="Contact Flight Bizz"
        description="Planning a trip, or need help with a booking you already have? Our support team is here during the hours below."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        actions={
          site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.company.phone}
              </a>
            </Button>
          ) : undefined
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight">Reach us directly</h2>

            <dl className="mt-5 divide-y border-y text-sm">
              {site.contact.hasEmail ? (
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-medium">Email</dt>
                  <dd>
                    <a href={mailtoHref} className="break-all text-primary underline-offset-4 hover:underline">
                      {site.company.supportEmail}
                    </a>
                  </dd>
                </div>
              ) : null}
              {site.contact.hasPhone ? (
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-medium">Telephone</dt>
                  <dd>
                    <a href={telHref} className="text-primary underline-offset-4 hover:underline">
                      {site.company.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {site.contact.hasAddress ? (
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="shrink-0 font-medium">Address</dt>
                  <dd className="text-right text-muted-foreground">
                    <address className="not-italic">{site.company.registeredOffice}</address>
                  </dd>
                </div>
              ) : null}
            </dl>

            {site.contact.hasAddress ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Registered address for {site.legalName}. Correspondence only, not a walk-in center.
              </p>
            ) : null}

            <h2 className="mt-8 text-xl font-semibold tracking-tight">Support hours</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All times are {site.hoursLabel}. Messages received outside these hours are answered on the next
              business day.
            </p>
            <dl className="mt-4 divide-y border-y text-sm">
              {site.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between py-2.5">
                  <dt className="font-medium">{h.day}</dt>
                  <dd className="text-muted-foreground">{h.time}</dd>
                </div>
              ))}
            </dl>

            <Separator className="my-8" />

            <h3 className="text-[15px] font-medium">Prefer us to call you?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Leave your number and a preferred time and a specialist will call back during support hours.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/callback">{site.cta.callback}</Link>
            </Button>

            <Alert variant="muted" className="mt-8">
              <AlertTitle>Payment security</AlertTitle>
              <AlertDescription className="text-xs">
                Never send full card numbers, CVV codes or passwords through this form or by email. {site.name} will
                never ask for them this way.
              </AlertDescription>
            </Alert>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm
              heading="Send us a message"
              showBookingRef
              defaults={{ destination, travelDates: dates, travelers, service, notes }}
            />
          </div>
        </div>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
