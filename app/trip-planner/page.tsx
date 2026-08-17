import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

const DESCRIPTION =
  "Build your trip with Flight Bizz. Tell us the destination, dates, travellers, budget and preferences, and a travel specialist will put the whole itinerary together — flights, stays, transfers and activities. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Build Your Trip — Custom Trip Planner",
  description: DESCRIPTION,
  path: "/trip-planner",
});

const TELL_US = [
  { icon: "map-pin", title: "Destination", body: "One city or a whole route — including trips still at the 'somewhere warm in March' stage." },
  { icon: "calendar-check", title: "Dates", body: "Fixed dates, or a rough window with the flexibility you have around it." },
  { icon: "users", title: "Travellers", body: "Adults, children and infants, plus any accessibility or mobility requirements." },
  { icon: "credit-card", title: "Budget", body: "Per person or total. It shapes every recommendation, so an honest range helps most." },
  { icon: "bed", title: "Stay preference", body: "Location, standard, board basis, and whether space matters more than luxury." },
  { icon: "plane", title: "Flight preference", body: "Cabin, airline preferences, direct-only, and how much a shorter journey is worth." },
  { icon: "sparkles", title: "Activities", body: "What you actually want to do — and what you would rather skip." },
  { icon: "route", title: "Transport on the ground", body: "Transfers, a rental car, or getting between cities during the trip." },
];

const STEPS = [
  { title: "Send the brief", body: "Fill in as much as you know. Gaps are fine — we will ask about anything important." },
  { title: "We build the options", body: "A travel specialist puts together an itinerary, prices each element and checks it works together." },
  { title: "You shape it", body: "Swap a hotel, change a flight time, drop an activity. We re-price and re-send until it is right." },
  { title: "We book it", body: "Once you are happy, we confirm each element with the supplier and send your references." },
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

      <PageHero
        eyebrow="Custom trip planner"
        title="Build Your Trip"
        subtitle="Some trips do not fit a search box. Describe what you have in mind and a Flight Bizz travel specialist will build the whole itinerary around it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Build Your Trip", href: "/trip-planner" },
        ]}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
        imageAlt="A winding road through mountains at sunrise"
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="What to tell us"
          title="The more you share, the closer the first draft lands"
          subtitle="None of these are required — send what you know and we will fill in the rest together."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TELL_US.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 4) * 0.05}
              className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Four steps, no obligation"
          subtitle="Nothing is booked until you have seen the full itinerary, the total price and the cancellation terms for each element."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.07}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-600 text-lg font-semibold text-white shadow-sm">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="enquiry" tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div>
            <SectionHeading eyebrow="Get started" title="Build My Trip" subtitle={site.bookingNotice} />
            <Reveal delay={0.05}>
              <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50 p-6">
                <h3 className="text-base font-semibold text-navy-900">Would rather talk it through?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                  Complex trips are often faster to scope on a call. Our travel specialists are real people on our
                  own team — not an outsourced line.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {site.contact.hasPhone ? (
                    <Button asChild variant="royal">
                      <a href={telHref}>
                        <Phone className="h-4 w-4" />
                        Call a Travel Specialist
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="navyOutline">
                    <Link href="/callback">{site.cta.callback}</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <EnquiryForm heading="Build My Trip" defaultService="Custom Trip" />
          </Reveal>
        </div>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
