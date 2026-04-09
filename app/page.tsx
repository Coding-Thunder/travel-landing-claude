import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Offers from "./components/Offers";
import CarPreview from "./components/CarPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import SeoSection from "./components/SeoSection";
import StickyCTA from "./components/StickyCTA";
import CallPopup from "./components/CallPopup";
import { siteConfig } from "@/config/siteConfig";

export default function Home() {
  // JSON-LD structured data for better local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: "/",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "US",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: `$${siteConfig.hero.priceFrom}+`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.rating,
      reviewCount: 1248,
      bestRating: "5",
    },
    description: siteConfig.seo.description,
  };

  return (
    <div className="flex flex-1 flex-col pb-[96px] sm:pb-[100px]">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <TrustBar />
      <Offers />
      <CarPreview />
      <WhyChooseUs />
      <SeoSection />

      <StickyCTA />
      <CallPopup />
    </div>
  );
}
