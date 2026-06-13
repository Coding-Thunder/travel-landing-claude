import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import VehicleTypes from "./components/VehicleTypes";
import WhyChooseUs from "./components/WhyChooseUs";
import Destinations from "./components/Destinations";
import HowItWorks from "./components/HowItWorks";
import FeaturedVehicles from "./components/FeaturedVehicles";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import SeoSection from "./components/SeoSection";
import { siteConfig } from "@/config/siteConfig";

export default function Home() {
  // Structured data — AutoRental business + FAQ rich results.
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "/",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine,
      addressLocality: siteConfig.addressCity,
      addressRegion: siteConfig.addressRegionCode,
      postalCode: siteConfig.addressPostal,
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
    priceRange: `$${siteConfig.hero.priceFrom}+`,
    description: siteConfig.seo.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.rating,
      reviewCount: siteConfig.trust.ratingCount.replace(/[^0-9]/g, ""),
      bestRating: "5",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex flex-1 flex-col pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <TrustBar />
      <VehicleTypes />
      <WhyChooseUs />
      <Destinations />
      <HowItWorks />
      <FeaturedVehicles />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <SeoSection />
    </div>
  );
}
