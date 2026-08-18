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
  title: "Group Travel",
  description:
    "Coordinate travel for families, corporate groups, events, weddings, sports teams and tours with Flight Bizz. One enquiry, handled by our travel specialists across the supplier network. Operated by GlobeVista LLC.",
  path: "/group-travel",
});

const COORDINATE = [
  { title: "Seats booked together", body: "Where possible the whole party is ticketed on the same flights, so the group travels together throughout." },
  { title: "Passenger lists and group fares", body: "Your passenger list and any group reference go to the supplier, keeping the booking organized from the outset." },
  { title: "Shared routing and connections", body: "Consistent routes and connections so families or colleagues move through each leg together." },
  { title: "Consistent pricing across the party", body: "A single set of proposed prices for the group, with any service fee explained before you confirm." },
  { title: "Staggered departures where needed", body: "Different departure points or times noted for each part of the group and coordinated onto one plan." },
  { title: "Accessibility and special requests", body: "Mobility assistance, seating needs, dietary notes and other requirements submitted alongside the enquiry." },
];

const STEPS = [
  { title: "Send one brief", body: "Dates, route, party size and traveler count. A single enquiry covers the whole group." },
  { title: "Receive matched options", body: "A specialist searches the supplier network for options that keep the group together and on budget." },
  { title: "Review and confirm", body: "Itinerary, supplier terms and any change or cancellation conditions, set out in plain English." },
  { title: "Support through the trip", body: "One point of contact for adjustments, added passengers and questions, during support hours." },
];

const AUDIENCES = [
  { title: "Families and reunions", body: "Multi-generational trips and milestone celebrations needing several travelers on the same flights." },
  { title: "Corporate groups and off-sites", body: "Team away-days, training cohorts and conference delegations traveling to one venue city." },
  { title: "Events and conferences", body: "Delegates, exhibitors and organizers needing a block of seats arriving in good time." },
  { title: "Weddings and celebrations", body: "Flights for guests, coordinated so everyone can arrive and depart around the occasion." },
  { title: "Sports teams and tours", body: "Squads, touring parties and supporting staff needing well-timed travel across one or several destinations." },
  { title: "Extended group itineraries", body: "Longer projects, relocations and study trips where multi-city routing suits a group traveling over time." },
];

export default function GroupTravelPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Group Travel", path: "/group-travel" },
          ]),
        ]}
      />

      <PageHeader
        title="Group travel"
        description="From family gatherings to corporate off-sites, we coordinate travel for groups of every size through a single enquiry."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Group travel", href: "/group-travel" },
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
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">One point of contact for the party</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Passenger counts shift as plans firm up, departure points differ, and everyone has a view on timing and
              budget. Our group service takes that coordination off your plate.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are a travel platform, not an airline. Availability, seat allocation and change conditions remain
              with the supplier, and we set those terms out before anything is confirmed.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {COORDINATE.map((c) => (
              <div key={c.title} className="border-t pt-4">
                <dt className="text-[15px] font-medium">{c.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="How group booking works" description="One coordinated request in place of dozens of separate enquiries." />
        <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t pt-4">
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[15px] font-medium">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading title="Groups we assist" description="Different groups have different priorities, so we tailor the search to how your party travels." />
        <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="border-t pt-4">
              <dt className="text-[15px] font-medium">{a.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="muted" id="enquiry">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Tell us about your group</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A specialist will respond during support hours with options to review. There is no obligation to
              proceed, and nothing is confirmed until you have seen the supplier terms.
            </p>
            <h3 className="mt-6 text-sm font-medium">To help us respond quickly, include</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {[
                "Travel dates, including any flexibility around departure and return",
                "Origin and destination airports for the group",
                "Approximate number of travelers and any cabin preferences",
                "Any children, mobility or seating needs across the party",
                "An indicative per-person budget so we can match suitable options",
              ].map((item) => (
                <li key={item} className="border-t pt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm heading="Request group travel options" defaultService="Group Travel" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Related services" />
        <ul className="mt-5 flex flex-wrap gap-2">
          {[
            { label: "Flights", href: "/flights" },
            { label: "Hotels", href: "/hotels" },
            { label: "Airport transfers", href: "/transfers" },
            { label: "Vacation packages", href: "/packages" },
            { label: "Business travel", href: "/business-travel" },
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
