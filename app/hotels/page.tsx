import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import PageHero from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import TrustBar from "@/app/components/trip/trust-bar";
import EnquiryForm from "@/app/components/trip/EnquiryForm";
import JsonLd from "@/app/components/trip/json-ld";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Hotel Reservation Services",
  description:
    "Worldwide hotel reservation assistance for business, leisure and family travel. Independent reservation specialists help you find suitable accommodation through a trusted supplier network.",
  path: "/hotels",
  image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
});

const relatedServices = [
  {
    title: "Business travel",
    description:
      "Accommodation planning for companies and individual travelers, with an emphasis on convenience, connectivity and consistency.",
    href: "/business-travel",
    icon: "briefcase",
  },
  {
    title: "Group travel",
    description:
      "Coordinated reservation assistance for corporate groups, families and larger parties traveling together.",
    href: "/group-travel",
    icon: "users",
  },
] as const;

const enquiryPointers = [
  "Destination, along with your approximate travel dates",
  "The number of travelers and any room configuration you need",
  "Preferred hotel category, location or budget guidance",
  "Any accessibility, dietary or special requirements",
];

export default function HotelsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Hotels", path: "/hotels" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Hotel reservations"
        title="Worldwide Hotel Reservation Assistance"
        subtitle="Find accommodation for business, leisure and family travel through our trusted supplier network."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Hotels", href: "/hotels" },
        ]}
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Contemporary hotel lobby with warm lighting"
      />

      {/* (a) Intro */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Overview"
          title="Accommodation matched to how you travel"
          subtitle="Whether you are planning a single business stay, a family holiday or a longer trip, our reservation specialists help you request the right accommodation without the guesswork."
        />
        <div className="mt-6 grid max-w-3xl gap-4 text-base leading-relaxed text-navy-600">
          <Reveal as="div">
            <p>
              UniversalTicketss is an independent travel reservation service focused on hotels and
              accommodation. We are not an airline, hotel chain or online travel agency; instead, we work with a
              trusted network of suppliers to help you find and secure suitable stays across a wide range of
              destinations worldwide.
            </p>
          </Reveal>
          <Reveal as="div" delay={0.08}>
            <p>
              Tell us what you are looking for and our team will suggest options matched to your requirements,
              preferences and budget. Availability, pricing and booking conditions are always set by the
              accommodation supplier, and we make those conditions clear before anything is confirmed.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* (b) Hotel categories */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Hotel categories"
          title="A range of accommodation to consider"
          subtitle="From value-led stays to five-star resorts, we can help with reservation requests across every category below."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.hotelCategories.map((category, i) => (
            <Reveal
              as="li"
              key={category.name}
              delay={(i % 3) * 0.06}
              className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.name} — example accommodation`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-navy-900">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{category.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* (c) Why choose us */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Why choose us"
          title="Reservation assistance you can rely on"
          subtitle="A considered, transparent approach to finding accommodation, supported by a responsive team."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.whyChooseUs.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={(i % 3) * 0.06}
              className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name={point.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{point.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* (d) Important notice */}
      <Section tone="tint">
        <Reveal className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:gap-5 sm:p-8">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-royal-600 ring-1 ring-navy-100">
              <Icon name="file-check" className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-navy-900">Important notice</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{site.hotelNotice}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* (e) Enquiry form */}
      <Section id="enquiry" tone="navy">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Request a quote"
              title="Tell us about your stay"
              subtitle="Share a few details and our reservation specialists will respond during business hours with suitable accommodation options."
              invert
            />
            <ul className="mt-6 grid gap-3">
              {enquiryPointers.map((pointer, i) => (
                <Reveal as="li" key={pointer} delay={i * 0.05} className="flex items-start gap-3 text-navy-100">
                  <Icon name="shield-check" className="mt-0.5 h-5 w-5 shrink-0 text-royal-300" />
                  <span className="text-sm leading-relaxed">{pointer}</span>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm text-navy-100">
              <div className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-royal-300" />
                <a href={`mailto:${site.company.supportEmail}`} className="transition hover:text-white">
                  {site.company.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-royal-300" />
                <span>{site.company.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-royal-300" />
                <ul className="space-y-1">
                  {site.hours.map((slot) => (
                    <li key={slot.day}>
                      <span className="font-medium text-white">{slot.day}:</span> {slot.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Reveal>
            <EnquiryForm heading="Request a hotel reservation quote" defaultService="Hotel Reservation" />
          </Reveal>
        </div>
      </Section>

      {/* (f) Trust bar */}
      <TrustBar />

      {/* (g) Related services */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Related services"
          title="Planning a trip for your team or group?"
          subtitle="We also support business and group travel, coordinating accommodation for larger and more complex itineraries."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {relatedServices.map((service, i) => (
            <Reveal key={service.href} delay={i * 0.06}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:border-royal-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{service.description}</p>
                <span className="mt-4 text-sm font-semibold text-royal-600 transition group-hover:text-royal-700">
                  Explore {service.title.toLowerCase()} &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-lg font-semibold text-navy-900">Ready to start your hotel enquiry?</h2>
            <p className="mt-1 text-sm text-navy-600">
              Send us your requirements and we will be in touch with suitable options.
            </p>
          </div>
          <Button asChild variant="royal" size="lg" className="w-full sm:w-auto">
            <Link href="#enquiry">Request a quote</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
