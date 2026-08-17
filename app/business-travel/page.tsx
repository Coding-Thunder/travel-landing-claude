import Link from "next/link";
import { Section, SectionHeading } from "@/app/components/trip/section";
import PageHero from "@/app/components/trip/page-hero";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business Travel",
  description:
    "Corporate travel arranged by Flight Bizz — flights, hotels, cars and transfers for companies and business travellers, with a single point of contact and clear, supplier-issued documentation. Operated by GlobeVista LLC.",
  path: "/business-travel",
  image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
});

const HOW_WE_HELP = [
  {
    icon: "plane",
    title: "Flexible domestic & international fares",
    description:
      "Assistance finding routes and fare types that suit the way your team works — from a next-day domestic hop to a multi-leg international schedule.",
  },
  {
    icon: "clock",
    title: "Schedules that fit tight itineraries",
    description:
      "Departure and connection options that keep travelers on time for meetings and rested for the work ahead, around demanding calendars.",
  },
  {
    icon: "route",
    title: "Multi-city & open-jaw routing",
    description:
      "Complex trips visiting several cities on one itinerary, planned as a single reservation request rather than a stack of separate bookings.",
  },
  {
    icon: "users",
    title: "Consistency for teams",
    description:
      "Coordination of multiple travelers and repeat trips so colleagues experience a consistent standard across routes and destinations.",
  },
  {
    icon: "headset",
    title: "A single point of contact",
    description:
      "One reservation team to handle requests, questions and changes — reducing the administrative load on travelers and office managers alike.",
  },
  {
    icon: "file-check",
    title: "Supplier-issued documentation",
    description:
      "Tickets, confirmations and receipts are issued directly by the airline or travel supplier, supporting clear record keeping and your organization's duty-of-care considerations.",
  },
] as const;

const ENQUIRY_TIPS = [
  "Origin and destination airports, and the dates each traveller needs",
  "Number of travellers and any cabin or seating preferences",
  "Preferred departure and return times, and any schedule flexibility",
  "Hotels, car rental or airport transfers needed alongside the flights",
  "Budget guidance and any preferred airlines or fare conditions",
  "Billing and documentation needs for your finance or travel policy",
];

const RELATED = [
  {
    href: "/flights",
    icon: "plane",
    title: "Flights",
    description:
      "One way, round trip and multi-city itineraries across every cabin, with fare conditions explained before booking.",
  },
  {
    href: "/hotels",
    icon: "bed",
    title: "Hotels & Stays",
    description:
      "Properties matched to where the work actually is, with total price and cancellation terms stated up front.",
  },
  {
    href: "/group-travel",
    icon: "users",
    title: "Group Travel",
    description:
      "Travelling as a delegation or team? See how we coordinate travel for larger groups on a single itinerary.",
  },
] as const;

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

      <PageHero
        eyebrow="For business"
        title="Business Travel"
        subtitle="Reliable planning for business trips — from a single overnight round trip to a full programme of travel for your whole team, coordinated by one dedicated team."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Business Travel", href: "/business-travel" },
        ]}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Business colleagues collaborating around a table during a work trip"
      />

      {/* Intro */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <SectionHeading
            eyebrow="Corporate travel, handled properly"
            title="Travel arranged around how businesses actually work"
            subtitle={`${site.name} arranges business travel end to end — flights, hotels, cars and airport transfers — through one point of contact. We take the detail off your desk so trips run smoothly and predictably.`}
          />
          <Reveal className="rounded-2xl border border-navy-100 bg-navy-50 p-6 shadow-sm sm:p-8" delay={0.05}>
            <p className="text-sm leading-relaxed text-navy-700">
              Business travel rarely fits a template. A same-day return before a client meeting, a fortnight
              of on-site work for a project team, or recurring visits to the same city each quarter all bring
              different requirements. Our role is to understand those requirements and present suitable,
              well-timed flight options — clearly and without pressure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-700">
              We are a travel platform, not an airline or a hotel group. Availability, prices and booking
              conditions are set by each supplier and confirmed with you before anything is arranged.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="royal">
                <Link href="#enquiry">Request business travel assistance</Link>
              </Button>
              <Button asChild variant="navyOutline">
                <Link href="/contact">Contact our team</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How we help business travelers */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="What we do"
          title="How we help business travelers"
          subtitle="Practical support across the situations business trips throw up most often — from a single well-timed flight to itineraries for an entire team."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_WE_HELP.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.06}
              className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-navy-100">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquiry" tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="lg:pt-2">
            <SectionHeading
              eyebrow="Start a request"
              title="Tell us about your trip"
              subtitle="Share a few details and one of our reservation specialists will come back with suitable business flight options during business hours."
            />
            <Reveal delay={0.05}>
              <p className="mt-6 text-sm font-medium text-navy-800">Helpful details to include:</p>
              <ul className="mt-3 space-y-2.5">
                {ENQUIRY_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed text-navy-600">
                    <Icon name="shield-check" className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-navy-500">
                There is no obligation in making an enquiry. We will only arrange a reservation once you have
                reviewed and approved the options and any applicable conditions.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <EnquiryForm heading="Request business travel assistance" defaultService="Business Travel" />
          </Reveal>
        </div>
      </Section>

      <TrustBar />

      {/* Related services */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Related services"
          title="Explore more of how we can help"
          subtitle="Business travel is one part of what we do. If the trip also needs stays, ground transport or coordination for a larger group, these pages may help."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {RELATED.map((item, i) => (
            <Reveal key={item.href} delay={(i % 2) * 0.06}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition hover:border-royal-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900 group-hover:text-royal-700">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600">
                  Learn more
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
