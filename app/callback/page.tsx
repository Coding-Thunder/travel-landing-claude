import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section } from "@/app/components/trip/section";
import CallbackForm from "@/app/components/trip/CallbackForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = pageMetadata({
  title: "Request a Callback",
  description:
    "Request a callback from Flight Bizz. Leave your number and a travel specialist will call you back during our published support hours to help with flights, hotels, cars, transfers, activities or packages.",
  path: "/callback",
});

export default function CallbackPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Request a Callback", path: "/callback" },
          ]),
        ]}
      />

      <PageHeader
        title="Request a callback"
        description="Leave your number and a Flight Bizz travel specialist will call you back during support hours."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Request a callback", href: "/callback" },
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
            <h2 className="text-xl font-semibold tracking-tight">Support hours</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All times are {site.hoursLabel}. Requests received outside these hours are picked up on the next
              business day.
            </p>

            <dl className="mt-5 divide-y border-y text-sm">
              {site.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between py-2.5">
                  <dt className="font-medium">{h.day}</dt>
                  <dd className="text-muted-foreground">{h.time}</dd>
                </div>
              ))}
            </dl>

            <Separator className="my-8" />

            <h2 className="text-[15px] font-medium">You never have to call</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Everything can be arranged in writing. Start a{" "}
              <Link href="/#search" className="font-medium text-primary underline-offset-4 hover:underline">
                travel search
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
                send us a message
              </Link>{" "}
              instead.
            </p>
          </div>

          <div className="lg:col-span-7">
            <CallbackForm />
          </div>
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
