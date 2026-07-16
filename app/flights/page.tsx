import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/app/components/trip/section";
import PageHero from "@/app/components/trip/page-hero";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";

export const metadata = pageMetadata({
  title: "Flight Reservation Assistance — Domestic & International",
  description:
    "Professional flight reservation assistance for domestic and international travel — one-way, return, multi-city, group and business itineraries — through our trusted travel supplier network.",
  path: "/flights",
  image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
});

const whyChoose = [
  { title: "Personalised reservation assistance", description: "Itineraries shaped around your dates, routing and preferences by experienced specialists.", icon: "sparkles" },
  { title: "Competitive travel options", description: "A range of options presented from our supplier network so you can weigh cost against convenience.", icon: "route" },
  { title: "Flexible itinerary planning", description: "One-way, return, multi-city and open-jaw journeys handled as a single request.", icon: "calendar-check" },
  { title: "Dedicated customer support", description: "A responsive team by phone, email and enquiry form during business hours.", icon: "headset" },
  { title: "Worldwide destinations", description: "Assistance with flight reservation requests across a wide range of destinations.", icon: "globe" },
];

export default function FlightsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Flights", path: "/flights" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Flight reservations"
        title="Professional Flight Reservation Assistance"
        subtitle="We help travellers with domestic and international flight reservation requests through our trusted travel supplier network."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Flights", href: "/flights" },
        ]}
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
        imageAlt="An aircraft wing above the clouds"
      />

      {/* Services */}
      <Section tone="white">
        <SectionHeading
          eyebrow="What we help with"
          title="Our flight reservation services"
          subtitle="From a single domestic hop to complex multi-city itineraries, our specialists manage the reservation request from enquiry to confirmation."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.flightCategories.map((cat, i) => (
            <Reveal as="li" key={cat.name} delay={(i % 3) * 0.06} className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name="plane" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">{cat.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{cat.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Why choose */}
      <Section tone="tint">
        <SectionHeading eyebrow="Why choose us" title="Why choose our flight reservation service" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.06} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Enquiry + notice */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Request a flight quote</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">Tell us where you are heading</h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Share your route, dates and preferences and our reservation team will respond during business
                hours with suitable options and clear conditions.
              </p>
              <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50 p-5 text-sm leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-900">Important notice</p>
                <p className="mt-1.5">{site.flightNotice}</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm heading="Request a flight quote" defaultService="Flight Reservation" />
          </div>
        </div>
      </Section>

      <TrustBar />

      {/* Cross-links + CTA */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Planning more than a flight?</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100">
            We also assist with <Link href="/hotels" className="font-semibold text-white underline-offset-4 hover:underline">hotel reservations</Link> and{" "}
            <Link href="/car-rentals" className="font-semibold text-white underline-offset-4 hover:underline">car rental reservations</Link> — tell us about your whole trip.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg"><Link href="/contact">Request a flight quote today</Link></Button>
            <Button asChild variant="navyOutline" size="lg" className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Contact reservation team</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
