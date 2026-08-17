import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import CallbackForm from "@/app/components/trip/CallbackForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

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

      <PageHero
        eyebrow="Support"
        title="Request a Callback"
        subtitle="Rather than waiting on a line, leave your number and a Flight Bizz travel specialist will call you back during support hours."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Request a Callback", href: "/callback" },
        ]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="How it works"
              title="We call you, at a time that suits"
              subtitle="Tell us what you are planning and when you would like to hear from us. We will call during the support hours shown below."
            />

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Icon name="clock" className="h-5 w-5 text-royal-600" />
                  <h3 className="text-base font-semibold text-navy-900">Support hours</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">
                  All times are {site.hoursLabel}. Requests received outside these hours are picked up on the next
                  business day.
                </p>
                <table className="mt-4 w-full text-sm">
                  <tbody className="divide-y divide-navy-100">
                    {site.hours.map((h) => (
                      <tr key={h.day}>
                        <th scope="row" className="py-2.5 text-left font-medium text-navy-700">
                          {h.day}
                        </th>
                        <td className="py-2.5 text-right text-navy-600">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {site.contact.hasPhone ? (
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6">
                  <h3 className="text-base font-semibold text-navy-900">Would rather call us now?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                    Our line is open during the hours above.
                  </p>
                  <Button asChild variant="royal" className="mt-4">
                    <a href={telHref}>
                      <Phone className="h-4 w-4" />
                      {site.company.phone}
                    </a>
                  </Button>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.14}>
              <div className="rounded-2xl border border-dashed border-navy-200 p-6 text-sm leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-900">You never have to call</p>
                <p className="mt-1.5">
                  Everything can be arranged in writing. Continue online with a{" "}
                  <Link href="/#search" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                    travel search
                  </Link>{" "}
                  or{" "}
                  <Link href="/contact" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                    send us a message
                  </Link>{" "}
                  instead.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <CallbackForm />
          </Reveal>
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
