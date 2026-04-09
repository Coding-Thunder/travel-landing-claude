import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Offers from "./components/Offers";
import HowItWorks from "./components/HowItWorks";
import CarPreview from "./components/CarPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import BusinessInfo from "./components/BusinessInfo";
import SeoSection from "./components/SeoSection";
import StickyCTA from "./components/StickyCTA";
import CallPopup from "./components/CallPopup";
import CookieNotice from "./components/CookieNotice";
import { siteConfig } from "@/config/siteConfig";

export default function Home() {
  // JSON-LD structured data — kept factual and verifiable.
  // Note: aggregateRating intentionally omitted to avoid unverifiable review claims.
  const jsonLd = {
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
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    priceRange: `$${siteConfig.hero.priceFrom}+`,
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
      <HowItWorks />
      <Offers />
      <CarPreview />
      <WhyChooseUs />
      <Testimonials />
      <BusinessInfo />
      <SeoSection />

      <StickyCTA />
      <CallPopup />
      <CookieNotice />
    </div>
  );
}
