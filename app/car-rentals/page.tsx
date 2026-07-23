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

const CAR_IMAGE = "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=2000&q=80";

export const metadata = pageMetadata({
  title: "Car Rental Reservation Services — Business, Leisure & Airport",
  description:
    "Reliable car rental reservation assistance for business trips, holidays and airport travel through our trusted supplier network. Economy to luxury vehicles, worldwide.",
  path: "/car-rentals",
  image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
});

const whyChoose = [
  { title: "Professional reservation support", description: "Experienced specialists manage your vehicle reservation request from enquiry to confirmation.", icon: "headset" },
  { title: "Wide vehicle selection", description: "From economy to luxury, matched to your trip, group size and budget.", icon: "car" },
  { title: "Flexible travel options", description: "Airport, city, weekend and long-term rentals arranged around your plans.", icon: "route" },
  { title: "Reliable customer assistance", description: "A responsive team by phone, email and enquiry form during business hours.", icon: "phone" },
  { title: "Transparent reservation process", description: "Clear communication of conditions and any applicable service fees before confirmation.", icon: "shield-check" },
];

export default function CarRentalsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Car Rentals", path: "/car-rentals" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Car rentals"
        title="Reliable Car Rental Reservation Services"
        subtitle="Reserve vehicles for business trips, holidays and airport travel through our trusted supplier network."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Car Rentals", href: "/car-rentals" },
        ]}
        image={CAR_IMAGE}
        imageAlt="A modern rental car on an open road"
      />

      {/* Vehicle categories */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Vehicles"
          title="Vehicle categories"
          subtitle="Tell us how you are traveling and we will help you find a suitable vehicle from our supplier network."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.carCategories.map((cat, i) => (
            <Reveal as="li" key={cat.name} delay={(i % 3) * 0.06} className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name="car" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">{cat.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{cat.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Rental services */}
      <Section tone="tint">
        <SectionHeading eyebrow="Rental services" title="Ways we can help" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.carRentalServices.map((svc, i) => (
            <Reveal as="li" key={svc.name} delay={(i % 3) * 0.05} className="flex gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-600" />
              <div>
                <h3 className="text-base font-semibold text-navy-900">{svc.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-600">{svc.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Why choose */}
      <Section tone="white">
        <SectionHeading eyebrow="Why choose us" title="Why customers choose us" />
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
      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Request a car rental quote</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">Tell us about your trip</h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Share your pick-up location, dates and vehicle preferences and our reservation team will respond
                during business hours with suitable options.
              </p>
              <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-5 text-sm leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-900">Important notice</p>
                <p className="mt-1.5">{site.carNotice}</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm heading="Request a car rental quote" defaultService="Car Rental Reservation" />
          </div>
        </div>
      </Section>

      <TrustBar />

      {/* Cross-links + CTA */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Sorting the whole trip?</h2>
          <p className="mt-4 text-base leading-relaxed text-navy-100">
            We also assist with <Link href="/flights" className="font-semibold text-white underline-offset-4 hover:underline">flight reservations</Link> and{" "}
            <Link href="/hotels" className="font-semibold text-white underline-offset-4 hover:underline">hotel reservations</Link>.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg"><Link href="/contact">Request a car rental quote</Link></Button>
            <Button asChild variant="navyOutline" size="lg" className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Speak with our team</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
