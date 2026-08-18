import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Business Travel",
  description:
    "Corporate travel arranged by Flight Bizz: flights, hotels, cars and transfers for companies and business travelers, with a single point of contact and clear, supplier-issued documentation. Operated by GlobeVista LLC.",
  path: "/business-travel",
});

const HOW_WE_HELP = [
  {
    title: "Flexible domestic and international fares",
    body: "Routes and fare types that suit how your team works, from a next-day domestic hop to a multi-leg international schedule.",
  },
  {
    title: "Schedules that fit tight itineraries",
    body: "Departure and connection options that keep travelers on time for meetings and rested for the work ahead.",
  },
  {
    title: "Multi-city and open-jaw routing",
    body: "Trips visiting several cities on one itinerary, planned as a single booking rather than a stack of separate ones.",
  },
  {
    title: "Stays and ground transport",
    body: "Hotels near the work, rental cars and airport transfers arranged alongside the flights by the same team.",
  },
  {
    title: "A single point of contact",
    body: "One team for requests, questions and changes, which cuts the admin load on travelers and office managers alike.",
  },
  {
    title: "Supplier-issued documentation",
    body: "Tickets, confirmations and receipts issued directly by the supplier, supporting clear records and duty-of-care requirements.",
  },
];

const ENQUIRY_TIPS = [
  "Origin and destination airports, and the dates each traveler needs",
  "Number of travelers and any cabin or seating preferences",
  "Preferred departure and return times, and any schedule flexibility",
  "Hotels, car rental or airport transfers needed alongside the flights",
  "Budget guidance and any preferred airlines or fare conditions",
  "Billing and documentation needs for your finance or travel policy",
];

export default function BusinessTravelPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Business Travel", path: "/business-travel" },
          ]),
        ]}
      />

      <PageHeader
        title="Business travel"
        description="Planning for business trips, from a single overnight round trip to a full program of travel for the team, coordinated by one point of contact."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Business travel", href: "/business-travel" },
        ]}
        actions={
          site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.cta.secondary}
              </a>
            </Button>
          ) : undefined
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Built around how businesses travel</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {site.name} arranges business travel end to end: flights, hotels, cars and airport transfers through
              one point of contact. We take the detail off your desk so trips run predictably.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are a travel platform, not an airline or a hotel group. Availability, prices and booking conditions
              are set by each supplier and confirmed with you before anything is arranged.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {HOW_WE_HELP.map((item) => (
              <div key={item.title} className="border-t pt-4">
                <dt className="text-[15px] font-medium">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="muted" id="enquiry">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Tell us about the trip</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A specialist will come back with suitable options during support hours. There is no obligation in
              making an enquiry.
            </p>

            <h3 className="mt-6 text-sm font-medium">Helpful details to include</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {ENQUIRY_TIPS.map((tip) => (
                <li key={tip} className="border-t pt-2">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm heading="Request business travel options" defaultService="Business Travel" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Related services" description="If the trip also needs stays, ground transport or coordination for a larger group." />
        <ul className="mt-5 flex flex-wrap gap-2">
          {[
            { label: "Flights", href: "/flights" },
            { label: "Hotels", href: "/hotels" },
            { label: "Car rentals", href: "/cars" },
            { label: "Airport transfers", href: "/transfers" },
            { label: "Group travel", href: "/group-travel" },
          ].map((item) => (
            <li key={item.href}>
              <Button asChild variant="outline" size="sm">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
