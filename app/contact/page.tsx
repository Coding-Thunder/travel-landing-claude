import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the TripReservations customer support team for help with reservation requests, booking enquiries and general travel questions. Reach us by email or online enquiry form during business hours.",
  path: "/contact",
});

const email = site.company.supportEmail;
const phone = site.company.phone;
const hasPhone = !phone.startsWith("[");
const telHref = site.company.phoneHref || phone.replace(/[^\d+]/g, "");

export default function ContactPage() {
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

      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        subtitle="Our customer support team is available to assist you with reservation requests, booking enquiries and general travel questions."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact our reservation team"
          subtitle="Send us the details of your trip and we'll respond with suitable accommodation options. You can also reach us using the contact details below during business hours."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — contact information */}
          <div className="space-y-6">
            <Reveal>
              <h3 className="text-lg font-semibold text-navy-900">Contact details</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">
                Prefer to contact us directly? Use the details below and a member of our team will be glad to help.
              </p>
            </Reveal>

            <ul className="space-y-4">
              {/* Email */}
              <Reveal as="li" delay={0.04}>
                <div className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="mt-0.5 block break-words text-sm font-medium text-royal-700 underline-offset-4 hover:underline"
                    >
                      {email}
                    </a>
                    <p className="mt-1 text-xs leading-relaxed text-navy-500">
                      The quickest way to reach us. We aim to reply as soon as possible during business hours.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Telephone */}
              <Reveal as="li" delay={0.08}>
                <div className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900">Telephone</p>
                    {hasPhone ? (
                      <a
                        href={`tel:${telHref}`}
                        className="mt-0.5 block text-sm font-medium text-royal-700 underline-offset-4 hover:underline"
                      >
                        {phone}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-navy-700">Available during business hours</p>
                    )}
                    <p className="mt-1 text-xs leading-relaxed text-navy-500">
                      Lines are open during the hours listed below. Outside these times, please email us or use the
                      enquiry form.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Registered office */}
              <Reveal as="li" delay={0.12}>
                <div className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                    <Icon name="map-pin" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900">Registered office</p>
                    <address className="mt-0.5 text-sm font-medium not-italic leading-relaxed text-navy-700">
                      {site.company.registeredOffice}
                    </address>
                    <p className="mt-1 text-xs leading-relaxed text-navy-500">
                      Correspondence address for {site.legalName}. Please note this is not a walk-in customer centre.
                    </p>
                  </div>
                </div>
              </Reveal>
            </ul>

            {/* Business hours */}
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Icon name="clock" className="h-5 w-5 text-royal-600" />
                  <h3 className="text-base font-semibold text-navy-900">Business hours</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">
                  All times are UK time (GMT/BST). Enquiries received outside these hours are answered on the next
                  working day.
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

            {/* Map placeholder — no fake map/address embedded */}
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 rounded-2xl border border-dashed border-navy-200 bg-navy-50 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-navy-500 ring-1 ring-navy-100">
                  <Icon name="map-pin" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Find us on the map</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600">
                    An interactive Google Map of our registered office will be added here once the address has been
                    confirmed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — enquiry form */}
          <div>
            <EnquiryForm heading="Send us a message" />
          </div>
        </div>

        {/* Related links */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-base font-semibold text-navy-900">Have a general question?</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">
                You may find an immediate answer on our{" "}
                <Link href="/faq" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  frequently asked questions
                </Link>{" "}
                page, or read more about{" "}
                <Link href="/hotels" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  our hotel reservation service
                </Link>
                .
              </p>
            </div>
            <Button asChild variant="royal" size="lg" className="shrink-0">
              <Link href="/hotels">Explore hotels</Link>
            </Button>
          </div>
        </Reveal>

        <p className="mt-8 text-xs leading-relaxed text-navy-500">{site.disclaimer}</p>
      </Section>

      <TrustBar />
    </>
  );
}
