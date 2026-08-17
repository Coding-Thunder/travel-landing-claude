import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { site, telHref, mailtoHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = pageMetadata({
  title: "Thank You",
  description: "Your request has been received.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Thank You", path: "/thank-you" },
          ]),
        ]}
      />

      <section className="bg-navy-50">
        <Container className="flex min-h-[70vh] items-center justify-center py-20 sm:py-28">
          <Reveal className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-royal-50 ring-1 ring-royal-100">
              <CheckCircle2 className="h-11 w-11 text-royal-600" strokeWidth={1.75} aria-hidden="true" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Request received</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Thank you — your request has been received
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy-600 sm:text-lg">
              A {site.name} travel specialist will review it and be in touch during support hours with real
              options, the total price and the conditions that apply. Nothing is booked until you confirm.
            </p>

            {site.contact.hasEmail ? (
              <p className="mt-4 text-sm leading-relaxed text-navy-500">
                If your request is urgent, reach our team directly at{" "}
                <a href={mailtoHref} className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  {site.company.supportEmail}
                </a>
                {site.contact.hasPhone ? (
                  <>
                    {" "}
                    or call{" "}
                    <a href={telHref} className="font-medium text-royal-700 underline-offset-4 hover:underline">
                      {site.company.phone}
                    </a>
                  </>
                ) : null}
                .
              </p>
            ) : null}

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="royal" size="lg">
                <Link href="/">Back to home</Link>
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

            <p className="mt-10 text-xs leading-relaxed text-navy-500">{site.operatedBy}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
