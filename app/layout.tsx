import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import SiteHeader from "./components/trip/site-header";
import SiteFooter from "./components/trip/site-footer";
import FloatingCall from "./components/trip/floating-call";
import CallAssistPopup from "./components/trip/call-assist-popup";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
/** Variable display serif that carries the Flight Bizz headline voice. */
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  applicationName: site.name,
  // Canonical is set per page by pageMetadata(); declaring it here would also
  // stamp every not-found URL with a canonical pointing at the home page.
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    siteName: site.name,
    url: site.url,
    title: site.seo.defaultTitle,
    description: site.seo.description,
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
  robots: { index: true, follow: true },
  // No `icons` key: setting it opts out of Next's file-convention icon pipeline,
  // which would leave app/apple-icon.tsx generated but never linked.
  other: { "business:contact_data:legal_name": site.legalName },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1c24",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground" suppressHydrationWarning>
        {/* Keyboard users can jump the header nav straight to the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <FloatingCall />
        <CallAssistPopup />
      </body>
    </html>
  );
}
