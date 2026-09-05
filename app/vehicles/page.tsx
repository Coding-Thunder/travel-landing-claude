import type { Metadata } from "next";
import { vehicleCategories } from "@/config/vehicles";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import PageHero from "../components/PageHero";
import Icon from "../components/ui/Icon";
import { Button } from "@/components/ui/button";
import VehicleCard from "../components/VehicleCard";
import CallBand from "../components/CallBand";
import Reveal from "../components/ui/Reveal";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Rental Car Types: Economy to Luxury",
  description: `Compare rental car classes: economy, compact, mid-size, full-size, SUV, luxury and minivan. Models, indicative pricing and tips. Call ${siteConfig.phoneDisplay}.`,
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: `Rental Car Types & Categories | ${siteConfig.name}`,
    description: "Compare economy, SUV, luxury and minivan rentals: models, pricing and tips.",
    url: "/vehicles",
    type: "website",
  },
};

export default function VehiclesIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vehicles", path: "/vehicles" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Vehicle categories"
        title="Find the right rental car class"
        subtitle="From economy runabouts to seven-seat minivans and luxury sedans, every class has its sweet spot. Explore each for popular models, pricing and tips. Then call to lock your rate."
        actions={
          <Button asChild data-cta="vehicles-index-call">
            <a href={`tel:${siteConfig.phone}`}>
              <Icon name="phone" />
              Call {siteConfig.phoneVanity}
            </a>
          </Button>
        }
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Vehicles", href: "/vehicles" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <h2 className="sr-only">Rental car classes</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {vehicleCategories.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 4) * 0.05}>
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <CallBand
            heading="Not sure which class you need?"
            subtext="Tell us your group size and luggage. An agent recommends the right car in a minute."
          />
        </div>
      </Container>
    </>
  );
}
