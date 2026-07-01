import type { Metadata } from "next";
import { vehicleCategories } from "@/config/vehicles";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import PageHero from "../components/PageHero";
import VehicleCard from "../components/VehicleCard";
import CallBand from "../components/CallBand";
import Reveal from "../components/ui/Reveal";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Rental Car Types & Categories — Economy to Luxury",
  description: `Compare rental car categories with ${siteConfig.name}: economy, compact, mid-size, full-size, SUV, luxury and minivan. Popular models, indicative pricing and tips. Call ${siteConfig.phoneDisplay} for your rate.`,
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: `Rental Car Types & Categories | ${siteConfig.name}`,
    description: "Compare economy, SUV, luxury and minivan rentals — models, pricing and tips.",
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
        subtitle="From economy runabouts to seven-seat minivans and luxury sedans, every class has its sweet spot. Explore each for popular models, pricing and tips — then call to lock your rate."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Vehicles", href: "/vehicles" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {vehicleCategories.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 4) * 0.05}>
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <CallBand
            heading="Not sure which class you need?"
            subtext="Tell us your group size and luggage — an agent recommends the right car in a minute."
          />
        </div>
      </Container>
    </>
  );
}
