import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { pageMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import PageHeader from "@/app/components/trip/page-hero";
import { Section, SectionHeading } from "@/app/components/trip/section";
import TrustBar from "@/app/components/trip/trust-bar";
import JsonLd from "@/app/components/trip/json-ld";
import SupplierDisclosure from "@/app/components/trip/supplier-disclosure";
import { Button } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Flight Bizz is a multi-service online travel platform operated by GlobeVista LLC, helping travelers search, compare and arrange flights, hotels, cars, transfers, activities and packages.",
  path: "/about",
});

const VALUES = [
  {
    title: "Transparency",
    body: "The total price, every fee and the cancellation terms are in front of you before you are asked to decide anything.",
  },
  {
    title: "Honesty about what we are",
    body: "We are a travel platform. We do not claim accreditation, partnerships or capabilities we do not have, and we say so plainly.",
  },
  {
    title: "Customer first",
    body: "Your requirements drive the recommendations. Calling is always an option and never a requirement.",
  },
  {
    title: "Named suppliers",
    body: "You always know which airline, hotel, rental company or operator will fulfil your booking, and whose terms apply.",
  },
  {
    title: "Support that continues",
    body: "Changes, cancellations and refund requests are handled by the same team that arranged the trip.",
  },
  {
    title: "Careful with your data",
    body: "We collect what is needed to arrange your travel and nothing more, and we never ask for card details by email.",
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

      <PageHeader
        title="About Flight Bizz"
        description="A multi-service online travel platform built to make arranging a whole trip straightforward, with nothing hidden between the search and the booking."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        actions={
          site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.company.phone}
              </a>
            </Button>
          ) : undefined
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Who we are</h2>
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground lg:col-span-8">
            <p>
              {site.name} is a multi-service online travel platform operated by {site.legalName}. The platform helps
              travelers search, compare and arrange available travel services online, or by phone if that suits
              better.
            </p>
            <p>
              Across six categories, from{" "}
              <Link href="/flights" className="font-medium text-primary underline-offset-4 hover:underline">
                flights
              </Link>{" "}
              and{" "}
              <Link href="/hotels" className="font-medium text-primary underline-offset-4 hover:underline">
                hotels
              </Link>{" "}
              to{" "}
              <Link href="/packages" className="font-medium text-primary underline-offset-4 hover:underline">
                packages
              </Link>
              , the same team handles the request from first enquiry through to booking and beyond.
            </p>
            <p>
              We are not an airline, a hotel group, a rental company or an activity operator. Fulfilment sits with
              the supplier identified during booking, and their terms apply to your travel. Our job is to find the
              right options, explain them properly and stay with you afterwards.
            </p>
            <p>
              That also means being straightforward about what we are not. {site.name} does not hold IATA or ARC
              accreditation, and we make no claim to certifications, awards or airline partnerships we do not have.
              We would rather earn trust through clear pricing and honest terms.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Business identity"
          description="Flight Bizz is a trading brand, not a separate legal entity. Here is the relationship in full."
        />
        <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          <div className="bg-card p-5">
            <dt className="text-sm text-muted-foreground">Brand</dt>
            <dd className="mt-1 text-[15px] font-medium">{site.name}</dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-sm text-muted-foreground">Legal entity</dt>
            <dd className="mt-1 text-[15px] font-medium">{site.legalName}</dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-sm text-muted-foreground">Relationship</dt>
            <dd className="mt-1 text-[15px] font-medium">{site.operatedBy}</dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-sm text-muted-foreground">Business activity</dt>
            <dd className="mt-1 text-[15px] font-medium">
              Online travel platform covering flights, hotels, cars, transfers, activities and packages.
            </dd>
          </div>
          {site.contact.hasAddress ? (
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="text-sm text-muted-foreground">Registered address</dt>
              <dd className="mt-1 text-[15px] font-medium">
                <address className="not-italic">{site.company.registeredOffice}</address>
              </dd>
            </div>
          ) : null}
        </dl>
      </Section>

      <Section>
        <SectionHeading title="How we work" description="The principles behind every option we put in front of a customer." />
        <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="border-t pt-4">
              <dt className="text-[15px] font-medium">{v.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <TrustBar />
      <SupplierDisclosure />
    </>
  );
}
