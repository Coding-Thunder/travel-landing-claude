import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone } from "lucide-react";
import { site, telHref, mailtoHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import Container from "@/app/components/trip/container";
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

      <Container className="py-20 sm:py-24">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Check className="h-4 w-4" aria-hidden />
            Thanks for getting in touch
          </div>
          <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Thank you</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Once your message reaches us, a {site.name} travel specialist will reply during support hours with
            options, the total price and the conditions that apply. Nothing is booked until you confirm.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Our forms open your own email app rather than submitting to us directly, so please check the message
            actually sent from your outbox.
          </p>

          {site.contact.hasEmail ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If it is urgent, reach us at{" "}
              <a href={mailtoHref} className="font-medium text-primary underline-offset-4 hover:underline">
                {site.company.supportEmail}
              </a>
              {site.contact.hasPhone ? (
                <>
                  {" "}
                  or call{" "}
                  <a href={telHref} className="font-medium text-primary underline-offset-4 hover:underline">
                    {site.company.phone}
                  </a>
                </>
              ) : null}
              .
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/">Back to home</Link>
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

          <p className="mt-10 text-xs text-muted-foreground">{site.operatedBy}</p>
        </div>
      </Container>
    </>
  );
}
