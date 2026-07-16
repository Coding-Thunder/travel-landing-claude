import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about TripReservations.co.uk — an independent UK travel reservation service providing professional, transparent flight, hotel and car rental booking assistance for leisure, business and group travel.",
  path: "/about",
});

const CORE_VALUES: { icon: string; title: string; description: string }[] = [
  {
    icon: "users",
    title: "Customer First",
    description:
      "Your requirements guide every recommendation we make and every reservation request we handle.",
  },
  {
    icon: "briefcase",
    title: "Professional Service",
    description:
      "A courteous, knowledgeable team that treats each enquiry with genuine care and attention to detail.",
  },
  {
    icon: "file-check",
    title: "Transparency",
    description:
      "Clear communication of supplier conditions and any applicable service fees before you confirm anything.",
  },
  {
    icon: "shield-check",
    title: "Integrity",
    description:
      "Honest advice and straightforward answers, with no pressure and no hidden surprises.",
  },
  {
    icon: "clock",
    title: "Reliability",
    description:
      "Dependable support you can count on before, during and after the reservation process.",
  },
  {
    icon: "lock",
    title: "Privacy Protection",
    description:
      "Your personal information is handled carefully and protected using secure technology.",
  },
  {
    icon: "sparkles",
    title: "Continuous Improvement",
    description:
      "We keep refining our service so that your booking experience becomes smoother over time.",
  },
];

const WHY_CHOOSE: { icon: string; title: string; description: string }[] = [
  {
    icon: "users",
    title: "Experienced Reservation Specialists",
    description:
      "A team that understands travel options and how to match them to the way you travel.",
  },
  {
    icon: "headset",
    title: "Responsive Customer Support",
    description:
      "Help by telephone, email and our online enquiry form throughout our business hours.",
  },
  {
    icon: "lock",
    title: "Secure Reservation Process",
    description:
      "Secure technology helps protect your details at every stage of the reservation process.",
  },
  {
    icon: "globe",
    title: "Worldwide Travel Assistance",
    description:
      "Assistance with travel requests across a wide range of international and domestic destinations.",
  },
  {
    icon: "file-check",
    title: "Transparent Communication",
    description:
      "Conditions, supplier policies and any fees are explained clearly before a reservation is confirmed.",
  },
  {
    icon: "sparkles",
    title: "Personalised Travel Solutions",
    description:
      "Recommendations shaped around your preferences, budget and the specifics of your trip.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title="About TripReservations.co.uk"
        subtitle="Professional travel reservation assistance designed to make planning your journey simple, convenient and reliable."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
        imageAlt="The refined lobby of a luxury hotel, representative of the accommodation TripReservations.co.uk helps arrange."
      />

      <TrustBar />

      {/* Our story */}
      <Section tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our story"
              title="An independent travel reservation company, built around you"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-navy-600 sm:text-[17px]">
              <p>
                TripReservations.co.uk is an independent travel reservation company that helps
                individuals, families and businesses plan their travel with confidence. We
                are not an airline, hotel chain or online travel agency; instead, we act as your
                dedicated reservation assistant, taking the effort out of finding and arranging the
                right place to stay.
              </p>
              <p>
                Our purpose is straightforward — to simplify the reservation process. We provide
                professional assistance for{" "}
                <Link href="/flights" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  flight reservations
                </Link>
                ,{" "}
                <Link href="/hotels" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  hotel reservations
                </Link>
                ,{" "}
                <Link href="/car-rentals" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  car rental reservations
                </Link>
                ,{" "}
                <Link href="/business-travel" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  business travel
                </Link>{" "}
                and{" "}
                <Link href="/group-travel" className="font-medium text-royal-700 underline-offset-4 hover:underline">
                  group travel
                </Link>
                , coordinating the details so that you can focus on the journey itself rather than
                the logistics behind it.
              </p>
              <p>
                To do this well, we work with a network of trusted travel suppliers and reservation
                partners. That reach allows us to present suitable travel options across a
                wide range of destinations, while remaining transparent about supplier conditions,
                availability and any applicable service fees.
              </p>
              <p>
                Behind every enquiry is an experienced support team committed to responsive service
                before, during and after the reservation process. Whether you are booking a single
                night or arranging travel for a large group, we are here to help by
                telephone, email and our online enquiry form.
              </p>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-navy-100 shadow-sm lg:aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
                alt="A stylish boutique hotel room, one of the many accommodation styles our reservation specialists help travellers arrange."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="tint">
        <SectionHeading
          align="center"
          eyebrow="Our purpose"
          title="Mission and vision"
          subtitle="Two commitments guide how we work and where we are heading."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
                <Icon name="map-pin" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">Our mission</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-600">
                To provide professional, transparent and reliable travel reservation assistance
                while delivering excellent customer support and a smooth booking experience.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
                <Icon name="globe" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy-900">Our vision</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-600">
                To become a trusted international travel reservation company known for
                professionalism, transparency and customer satisfaction.
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Core values */}
      <Section tone="white">
        <SectionHeading
          eyebrow="What we value"
          title="Our core values"
          subtitle="The principles that shape every enquiry we handle and every recommendation we make."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => (
            <Reveal
              as="li"
              key={value.title}
              delay={(i % 3) * 0.06}
              className="h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:border-navy-200 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
                <Icon name={value.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-navy-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{value.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Why customers choose us */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Why choose us"
          title="Why customers choose us"
          subtitle="Practical reasons travellers return to TripReservations.co.uk for their travel planning."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.06}
              className="h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Business disclaimer */}
      <Section tone="white">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-royal-600 ring-1 ring-navy-100">
                <Icon name="file-check" className="h-[18px] w-[18px]" />
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-700">
                Business disclaimer
              </h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy-600 sm:text-[15px]">
              {site.disclaimer}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Final CTA */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-300">
            Ready when you are
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let us help plan your next stay
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100 sm:text-lg">
            Tell us where you are going and what you need. Our reservation specialists will follow
            up with suitable travel options and a personalised quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/contact">Request a quote</Link>
            </Button>
            <Button asChild variant="navyOutline" size="lg">
              <Link href="/hotels">Explore hotel options</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
