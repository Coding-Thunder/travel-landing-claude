import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

const DESCRIPTION =
  "Build your trip with Flight Bizz. Tell us the destination, dates, travelers, budget and preferences, and a travel specialist will put the whole itinerary together across flights, stays, transfers and activities. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Build Your Trip",
  description: DESCRIPTION,
  path: "/trip-planner",
});

const TELL_US = [
  { title: "Destination", body: "One city or a whole route, including trips still at the somewhere warm in March stage." },
  { title: "Dates", body: "Fixed dates, or a rough window with the flexibility you have around it." },
  { title: "Travelers", body: "Adults, children and infants, plus any accessibility or mobility requirements." },
  { title: "Budget", body: "Per person or total. It shapes every recommendation, so an honest range helps most." },
  { title: "Where you stay", body: "Location, standard, board basis, and whether space matters more than luxury." },
  { title: "How you fly", body: "Cabin, airline preferences, direct only, and how much a shorter journey is worth." },
  { title: "What you want to do", body: "The activities worth booking ahead, and the ones you would rather skip." },
  { title: "Getting around", body: "Transfers, a rental car, or travel between cities during the trip." },
];

const STEPS = [
  { title: "Send the brief", body: "Fill in what you know. Gaps are fine, we will ask about anything important." },
  { title: "We build the options", body: "A specialist assembles an itinerary, prices each element and checks it works together." },
  { title: "You shape it", body: "Swap a hotel, change a flight time, drop an activity. We re-price and re-send." },
  { title: "We book it", body: "Once you are happy we confirm each element with the supplier and send your references." },
];

export default function TripPlannerPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Build Your Trip", path: "/trip-planner" },
          ]),
          serviceSchema({ name: "Custom Trip Planning", description: DESCRIPTION, path: "/trip-planner" }),
        ]}
      />

      <PageHeader
        title="Build your trip"
        description="Some trips do not fit a search box. Describe what you have in mind and a specialist will build the itinerary around it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Build your trip", href: "/trip-planner" },
        ]}
        actions={
          site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                Call a travel specialist
              </a>
            </Button>
          ) : undefined
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What to tell us</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              None of these are required. Send what you know and we will fill in the rest together.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {TELL_US.map((item) => (
              <div key={item.title} className="border-t pt-4">
                <dt className="text-[15px] font-medium">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="How it works"
          description="Nothing is booked until you have seen the full itinerary, the total price and the cancellation terms for each element."
        />
        <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t pt-4">
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[15px] font-medium">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="enquiry">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Build my trip</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.bookingNotice}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Complex trips are often faster to scope on a call. Our travel specialists are on our own team, not an
              outsourced line.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.contact.hasPhone ? (
                <Button asChild variant="outline">
                  <a href={telHref}>
                    <Phone aria-hidden />
                    {site.company.phone}
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <Link href="/callback">{site.cta.callback}</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm heading="Build my trip" defaultService="Custom Trip" />
          </div>
        </div>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
