/**
 * JSON-LD structured-data builders.
 * All values are derived from the active brand via siteConfig, never hardcoded.
 */
import { siteConfig } from "@/config/siteConfig";

const url = siteConfig.url;
const telephoneE164 = `+1${siteConfig.phone}`;

/**
 * Minimal Organization node, inlined wherever a schema needs a publisher or a
 * seller. Referencing `#organization` by @id only resolves on the three routes
 * that emit the full Organization graph; everywhere else the reference dangled,
 * which Google reads as an unresolved node rather than a publisher.
 */
const organizationRef = {
  "@type": "Organization",
  "@id": `${url}/#organization`,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url,
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.addressLine,
  addressLocality: siteConfig.addressCity,
  addressRegion: siteConfig.addressRegionCode,
  postalCode: siteConfig.addressPostal,
  addressCountry: "US",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url,
    logo: `${url}/icon.svg`,
    image: siteConfig.seo.ogImage,
    email: siteConfig.email,
    telephone: telephoneE164,
    address: postalAddress,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: telephoneE164,
        contactType: "reservations",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    ],
    sameAs: siteConfig.social.map((s) => s.href),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    "@id": `${url}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url,
    telephone: telephoneE164,
    email: siteConfig.email,
    image: siteConfig.seo.ogImage,
    priceRange: `$${siteConfig.hero.priceFrom}+`,
    address: postalAddress,
    areaServed: { "@type": "Country", name: "United States" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.rating,
      reviewCount: siteConfig.trust.ratingCount.replace(/[^0-9]/g, ""),
      bestRating: "5",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: siteConfig.name,
    url,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: "en-US",
  };
}

export function faqSchema() {
  return faqSchemaFrom(siteConfig.faqs);
}

export function faqSchemaFrom(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function vehicleSchema(v: { name: string; slug: string; priceFrom: number; image: string; blurb: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${v.name} Car Rental`,
    description: v.blurb,
    image: v.image,
    url: `${url}/vehicles/${v.slug}`,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: v.priceFrom,
      // No `availability`: there is no online purchase path on this site, so a
      // stock status would be an assertion the page cannot support.
      seller: organizationRef,
    },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image,
    author: { "@type": "Person", name: input.author },
    publisher: organizationRef,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}/blog/${input.slug}` },
    url: `${url}/blog/${input.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}
