import type { Metadata } from "next";
import { airports } from "@/config/airports";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import PageHero from "../components/PageHero";
import Icon from "../components/ui/Icon";
import { Button } from "@/components/ui/button";
import AirportCard from "../components/AirportCard";
import CallBand from "../components/CallBand";
import Reveal from "../components/ui/Reveal";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Airport Car Rental Locations: Book by Phone",
  description: `Rent a car at LAX, JFK, MCO, MIA, LAS, DFW, ATL and ORD. Counter and curbside airport pickup, all-in pricing by phone. Call ${siteConfig.phoneDisplay}.`,
  alternates: { canonical: "/airports" },
  openGraph: {
    title: `Airport Car Rental Locations | ${siteConfig.name}`,
    description: "Book a rental car at the country's busiest airports with transparent, all-in pricing confirmed by phone.",
    url: "/airports",
    type: "website",
  },
};

export default function AirportsIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airports", path: "/airports" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Airport car rentals"
        title="Rent a car at the airport"
        subtitle="Counter and curbside pickup at the busiest airports in the country. Choose your airport for local pickup logistics, rental tips and nearby drives. Then call to lock your best all-in rate."
        actions={
          <Button asChild data-cta="airports-index-call">
            <a href={`tel:${siteConfig.phone}`}>
              <Icon name="phone" />
              Call {siteConfig.phoneVanity}
            </a>
          </Button>
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Airports", href: "/airports" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Airport locations</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {airports.map((a, i) => (
            <Reveal key={a.iata} delay={(i % 4) * 0.05}>
              <AirportCard airport={a} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <CallBand
            heading="Don't see your airport?"
            subtext="We serve 300+ airport and city locations nationwide. Call and we'll quote yours."
          />
        </div>
      </Container>
    </>
  );
}
