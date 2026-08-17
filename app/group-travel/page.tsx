import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80";

export const metadata = pageMetadata({
  title: "Group Travel",
  description:
    "Coordinate travel for families, corporate groups, events, weddings, sports teams and tours with Flight Bizz. One enquiry, handled by our travel specialists across the supplier network. Operated by GlobeVista LLC.",
  path: "/group-travel",
  image: HERO_IMAGE,
});

const COORDINATE = [
  { icon: "users", title: "Seats booked together", body: "Where possible, the whole party is ticketed on the same flights so your group travels together from departure to arrival." },
  { icon: "file-check", title: "Passenger lists and group fares", body: "We pass your passenger list and any group reference to the airline or supplier, keeping the booking organised from the outset." },
  { icon: "route", title: "Shared routing and connections", body: "Consistent routes and connections requested so families or colleagues move through each leg of the journey together." },
  { icon: "credit-card", title: "Consistent fares across the party", body: "A single set of proposed prices for the group, with any applicable service fee explained before you confirm." },
  { icon: "clock", title: "Staggered departures where needed", body: "Different departure points or times noted for each part of the group and coordinated onto a single plan." },
  { icon: "shield-check", title: "Accessibility and special requests", body: "Mobility assistance, seating needs, dietary notes and other requirements submitted alongside your enquiry." },
];

const STEPS = [
  { n: "1", icon: "file-check", title: "Send us one brief", body: "Tell us your dates, route, party size and approximate number of travellers. A single enquiry covers the entire group — there is no need to book seats individually." },
  { n: "2", icon: "sparkles", title: "Receive matched options", body: "A travel specialist searches the supplier network and returns options that keep your group together and within the budget you have set." },
  { n: "3", icon: "shield-check", title: "Review and confirm", body: "We set out the itinerary, supplier terms and any change or cancellation conditions in plain English so you can confirm with everything visible up front." },
  { n: "4", icon: "headset", title: "Support through the trip", body: "One point of contact remains available for adjustments, added passengers or questions before and during travel, during our published support hours." },
];

type Audience = {
  icon: string;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

const AUDIENCES: Audience[] = [
  { icon: "users", title: "Families and reunions", body: "Multi-generational trips, milestone birthdays and family gatherings that need several travelers ticketed together on the same flights." },
  { icon: "briefcase", title: "Corporate groups and off-sites", body: "Team away-days, training cohorts and conference delegations that call for consistent flights to and from the venue city.", link: { href: "/business-travel", label: "See our business travel service" } },
  { icon: "map-pin", title: "Events and conferences", body: "Delegates, exhibitors and organizers who need a block of seats arriving in good time across busy event dates." },
  { icon: "sparkles", title: "Weddings and celebrations", body: "Flights for guests traveling to a wedding or celebration, coordinated so everyone can arrive and depart around the occasion." },
  { icon: "globe", title: "Sports teams and tours", body: "Squads, touring parties and their supporting staff needing practical, well-timed travel across one or several destinations." },
  { icon: "route", title: "Extended group itineraries", body: "Longer projects, relocations and study trips where multi-city or open-jaw routing suits a group traveling over an extended period." },
];

const ENQUIRY_CHECKLIST = [
  "Travel dates, including any flexibility around departure and return",
  "Origin and destination airports for the group",
  "Approximate number of travellers and any cabin preferences",
  "Any children, mobility or seating needs across the party",
  "An indicative per-person budget so we can match suitable fares",
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

      <PageHero
        eyebrow="For groups"
        title="Group Travel"
        subtitle="From family gatherings to corporate off-sites, we coordinate travel for groups of every size — flights, stays and transfers — through a single enquiry handled by our travel specialists."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Group Travel", href: "/group-travel" },
        ]}
        image={HERO_IMAGE}
        imageAlt="A group of travelers gathered together in a bright airport terminal"
      />

      {/* Intro */}
      <Section tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Group flights, simplified"
              title="One point of contact for the whole party"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-700">
              <p>
                Arranging flights for a group is rarely as straightforward as booking for one.
                Passenger counts shift as plans firm up, departure points differ across the party, and
                everyone has their own view on timing, budget and where they want to sit. Our group
                service exists to take that coordination off your plate.
              </p>
              <p>
                Rather than juggling separate bookings, you send us a single brief describing your
                group and your dates. A travel specialist then works across the supplier
                network to put forward{" "}
                <Link href="/flights" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  flight options
                </Link>{" "}
                that keep everyone together and within the budget you have in mind.
              </p>
              <p>
                We are an online travel platform — not an airline. Availability, seat allocation and
                change conditions remain with the airline or travel supplier, and we set those terms
                out clearly so nothing is confirmed before you are comfortable with it.
              </p>
            </div>
          </div>

          <Reveal className="rounded-2xl border border-navy-100 bg-navy-50 p-6 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-navy-900">What we help coordinate</h3>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2">
              {COORDINATE.map((c) => (
                <li key={c.title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-royal-600 ring-1 ring-navy-100">
                    <Icon name={c.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{c.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* How group assistance works */}
      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="How group assistance works"
          subtitle="A simple, transparent process that replaces dozens of separate enquiries with one coordinated request."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-600 text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <Icon name={s.icon} className="h-5 w-5 text-royal-600" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Who it's for */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Who we help"
          title="Groups we assist"
          subtitle="Different groups have different priorities. We tailor the flight search to the way your party actually travels."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-navy-100">
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{a.body}</p>
                {a.link ? (
                  <Link
                    href={a.link.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-royal-700 underline-offset-4 hover:underline"
                  >
                    {a.link.label}
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Two-column enquiry */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Get started"
          title="Tell us about your group"
          subtitle="Share a few details and a travel specialist will respond during support hours with options to review — no obligation to proceed."
        />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="text-base font-semibold text-navy-900">To help us respond quickly, include</h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy-700">
              {ENQUIRY_CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-navy-600">
              The more context you can give, the more closely we can match your requirements on the first
              response. We never confirm anything on your behalf until you have seen the supplier&rsquo;s
              terms and are happy to go ahead.
            </p>
            <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-navy-700">
                Prefer to talk it through first? Our{" "}
                <Link href="/contact" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  contact team
                </Link>{" "}
                can help scope a larger or more complex group before you submit a full enquiry.
              </p>
            </div>
          </div>

          <EnquiryForm
            heading="Request group travel options"
            defaultService="Group Travel"
          />
        </div>
      </Section>

      <TrustBar />

      {/* Related services */}
      <Section tone="navy">
        <SectionHeading
          invert
          eyebrow="Keep exploring"
          title="Related services"
          subtitle="Group travel sits alongside the rest of the platform. Explore the services that pair naturally with a group trip."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/flights"
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-royal-300/60 hover:bg-white/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-royal-300">
              <Icon name="plane" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Flights</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-100">
              Individual journeys — domestic and international, one way, round trip and multi-city
              itineraries worldwide.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-300">
              Explore flights <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
            </span>
          </Link>

          <Link
            href="/business-travel"
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-royal-300/60 hover:bg-white/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-royal-300">
              <Icon name="briefcase" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Business travel</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-100">
              Travel planning for individual business travellers and companies, from single trips to
              recurring corporate programmes.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-300">
              Explore business travel <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="royal" size="lg">
            <Link href="/contact">Request group options</Link>
          </Button>
          <p className="text-sm text-navy-100">
            Ready when you are — a specialist will be in touch during support hours.
          </p>
        </div>
      </Section>

      <SupplierDisclosure />
    </>
  );
}
