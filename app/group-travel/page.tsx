import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80";

export const metadata = pageMetadata({
  title: "Group Travel Accommodation",
  description:
    "Coordinate accommodation for families, corporate groups, events, weddings, sports teams and tours. One enquiry, handled by our reservation specialists across a trusted supplier network.",
  path: "/group-travel",
  image: HERO_IMAGE,
});

const COORDINATE = [
  { icon: "bed", title: "Multiple rooms and room types", body: "Twins, doubles and family rooms requested together so your whole party is accommodated at one property or nearby." },
  { icon: "users", title: "Rooming lists and group blocks", body: "We pass your rooming list and any group name to the supplier, keeping allocations organised from the outset." },
  { icon: "map-pin", title: "Rooms kept close together", body: "Connecting or adjacent rooms requested where families or colleagues would prefer to stay near one another." },
  { icon: "credit-card", title: "Consistent rates across the party", body: "A single set of proposed rates for the group, with any applicable service fees explained before you confirm." },
  { icon: "clock", title: "Staggered arrivals and departures", body: "Different check-in and check-out times noted for each part of the group and shared with the property in advance." },
  { icon: "file-check", title: "Accessibility and special requests", body: "Step-free access, ground-floor rooms, dietary notes and other requirements submitted alongside your enquiry." },
];

const STEPS = [
  { n: "1", icon: "file-check", title: "Send us one brief", body: "Tell us your dates, destination, party size and approximate number of rooms. A single enquiry covers the entire group — there is no need to contact properties individually." },
  { n: "2", icon: "sparkles", title: "Receive matched options", body: "A reservation specialist searches our trusted supplier network and returns accommodation that keeps your group together, near your event and within the budget you have set." },
  { n: "3", icon: "shield-check", title: "Review and confirm", body: "We set out room allocation, supplier terms and any cancellation conditions in plain English so you can confirm the arrangement with everything visible up front." },
  { n: "4", icon: "headset", title: "Support through the stay", body: "One point of contact remains available for adjustments, added rooms or questions before and during the trip, during our published business hours." },
];

type Audience = {
  icon: string;
  title: string;
  body: string;
  link?: { href: string; label: string };
};

const AUDIENCES: Audience[] = [
  { icon: "users", title: "Families and reunions", body: "Multi-generational trips, milestone birthdays and family gatherings that need several rooms of different sizes kept close together at one welcoming property." },
  { icon: "briefcase", title: "Corporate groups and off-sites", body: "Team away-days, training cohorts and conference delegations that call for consistent accommodation near the venue.", link: { href: "/business-travel", label: "See our business travel service" } },
  { icon: "map-pin", title: "Events and conferences", body: "Delegates, exhibitors and organisers who need a block of rooms within easy reach of a single venue across busy event dates." },
  { icon: "sparkles", title: "Weddings and celebrations", body: "Room blocks for guests traveling to a wedding or celebration, coordinated so everyone can stay together over the weekend." },
  { icon: "globe", title: "Sports teams and tours", body: "Squads, touring parties and their supporting staff needing practical, well-located accommodation across one or several stops." },
  { icon: "bed", title: "Extended group stays", body: "Longer projects, relocations and study trips where apartment-style or extended-stay rooms suit a group over an extended period." },
];

const ENQUIRY_CHECKLIST = [
  "Travel dates, including any flexibility around arrival and departure",
  "Destination or the venue your group needs to be near",
  "Approximate number of rooms and how they should be configured",
  "Total number of travelers, noting any children or accessibility needs",
  "An indicative per-room budget so we can match suitable properties",
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
        title="Group Travel Accommodation"
        subtitle="From family gatherings to corporate off-sites, we coordinate multiple rooms and connected stays for groups of every size — all through a single enquiry handled by our reservation specialists."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Group Travel", href: "/group-travel" },
        ]}
        image={HERO_IMAGE}
        imageAlt="A group of travelers gathered together in a bright, welcoming hotel setting"
      />

      {/* Intro */}
      <Section tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Group accommodation, simplified"
              title="One point of contact for the whole party"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-700">
              <p>
                Arranging accommodation for a group is rarely as straightforward as booking for one.
                Room counts shift as plans firm up, arrival times differ across the party, and everyone
                has their own view on bedding, budget and how close they want to be to the action. Our
                group service exists to take that coordination off your plate.
              </p>
              <p>
                Rather than juggling separate reservations, you send us a single brief describing your
                group and your dates. A reservation specialist then works across our trusted supplier
                network to put forward{" "}
                <Link href="/hotels" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  hotel accommodation
                </Link>{" "}
                that keeps everyone together, near where you need to be and within the budget you have in
                mind.
              </p>
              <p>
                We are an independent reservation assistance service — not a hotel chain or online travel
                agent. Availability, room allocation and cancellation conditions remain with the
                accommodation supplier, and we set those terms out clearly so nothing is confirmed before
                you are comfortable with it.
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
          subtitle="Different groups have different priorities. We tailor the accommodation search to the way your party actually travels."
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
          subtitle="Share a few details and a reservation specialist will respond during business hours with accommodation options to review — no obligation to proceed."
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
              response. As an independent assistance service, we never confirm anything on your behalf
              until you have seen the supplier&rsquo;s terms and are happy to go ahead.
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
            heading="Request group accommodation assistance"
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
          subtitle="Group accommodation sits alongside the rest of our reservation assistance. Explore the services that pair naturally with a group stay."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/hotels"
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-royal-300/60 hover:bg-white/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-royal-300">
              <Icon name="bed" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">Hotel reservations</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-100">
              Reservation assistance for individual stays across budget, business, luxury, family and
              boutique accommodation worldwide.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-300">
              Explore hotels <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
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
              Accommodation planning for individual business travelers and companies, from single trips to
              recurring corporate stays.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-300">
              Explore business travel <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="royal" size="lg">
            <Link href="/contact">Request a quote</Link>
          </Button>
          <p className="text-sm text-navy-100">
            Ready when you are — a specialist will be in touch during business hours.
          </p>
        </div>
      </Section>
    </>
  );
}
