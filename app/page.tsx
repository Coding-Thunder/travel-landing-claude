import type { Metadata } from "next";
import Hero from "./components/home/Hero";
import TrustBar from "./components/TrustBar";
import VehicleTypes from "./components/VehicleTypes";
import WhyChooseUs from "./components/WhyChooseUs";
import PopularAirports from "./components/PopularAirports";
import HowItWorks from "./components/HowItWorks";
import FeaturedVehicles from "./components/FeaturedVehicles";
import TrustStats from "./components/TrustStats";
import Testimonials from "./components/Testimonials";
import SeoContent from "./components/SeoContent";
import LocalSeo from "./components/LocalSeo";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import SeoSection from "./components/SeoSection";
import JsonLd from "./components/seo/JsonLd";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

/**
 * The home page is the only route that does not declare its own canonical
 * through a shared helper, and the root layout deliberately no longer declares
 * one globally (that stamped every 404 with a canonical pointing here).
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          websiteSchema(),
          faqSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />

      <Hero />
      <TrustBar />
      <VehicleTypes />
      <WhyChooseUs />
      <PopularAirports />
      <HowItWorks />
      <FeaturedVehicles />
      <TrustStats />
      <Testimonials />
      <SeoContent />
      <LocalSeo />
      <FAQ />
      <FinalCTA />
      <SeoSection />
    </div>
  );
}
