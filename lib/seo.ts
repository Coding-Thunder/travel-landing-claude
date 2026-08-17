import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  /** Bypass the "%s | Flight Bizz" template — used by the home page. */
  absoluteTitle?: string;
};

/** Build per-page metadata (title, description, canonical, OpenGraph, Twitter). */
export function pageMetadata({ title, description, path, image, noIndex, absoluteTitle }: PageMetaInput): Metadata {
  const ogImage = image ?? site.seo.ogImage;
  const ogTitle = absoluteTitle ?? `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      locale: site.seo.locale,
      siteName: site.name,
      title: ogTitle,
      description,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Organization schema for GlobeVista LLC, with Flight Bizz as the brand it
 * trades under. Deliberately carries no award, accreditation, rating or review
 * properties — none are held (§2).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    legalName: site.legalName,
    alternateName: site.name,
    brand: { "@type": "Brand", name: site.name, slogan: site.tagline },
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.seo.description,
    areaServed: "Worldwide",
    ...(site.contact.hasEmail ? { email: site.company.supportEmail } : {}),
    ...(site.contact.hasPhone ? { telephone: site.company.phoneHref } : {}),
    ...(site.contact.hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.company.address.street,
            addressLocality: site.company.address.city,
            addressRegion: site.company.address.region,
            postalCode: site.company.address.postcode,
            addressCountry: site.company.address.country,
          },
        }
      : {}),
    ...(site.contact.hasPhone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: site.company.phoneHref,
            ...(site.contact.hasEmail ? { email: site.company.supportEmail } : {}),
            availableLanguage: "English",
          },
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: `${site.name} — ${site.tagline}`,
    url: site.url,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/**
 * Schema for one of the six travel categories. Describes the service offered,
 * never specific inventory, prices or availability — none of which this site
 * publishes.
 */
export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} — ${site.name}`,
    description,
    serviceType: name,
    url: `${site.url}${path}`,
    areaServed: "Worldwide",
    provider: { "@id": `${site.url}/#organization` },
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
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
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
