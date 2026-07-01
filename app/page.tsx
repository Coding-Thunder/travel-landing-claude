import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import VehicleTypes from "./components/VehicleTypes";
import WhyChooseUs from "./components/WhyChooseUs";
import PopularAirports from "./components/PopularAirports";
import HowItWorks from "./components/HowItWorks";
import FeaturedVehicles from "./components/FeaturedVehicles";
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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col pb-20 sm:pb-0">
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
      <Testimonials />
      <SeoContent />
      <LocalSeo />
      <FAQ />
      <FinalCTA />
      <SeoSection />
    </div>
  );
}
