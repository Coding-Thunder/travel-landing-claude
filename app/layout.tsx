import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import SiteHeader from "./components/nav/SiteHeader";
import Footer from "./components/Footer";
import CallProvider from "./components/call/CallProvider";
import StickyCallBar from "./components/call/StickyCallBar";
import CookieNotice from "./components/CookieNotice";
import GoogleTag from "./components/analytics/GoogleTag";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display serif, reserved for the one H1 that opens a page.
 *
 * Pinned to a single weight on purpose. Fraunces is a variable font with four
 * axes (wght, opsz, SOFT, WONK); requesting it unpinned downloads all of them
 * and preloads the result on the critical path, for text that renders at one
 * weight in one size range. A static 400 instance is a fraction of the size.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  // No `alternates.canonical` here on purpose. A canonical declared in the root
  // layout is inherited by every route that does not set its own (including
  // not-found and error), which stamps them with a canonical pointing at the
  // home page. Each page sets its own.
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  // openGraph.images and twitter.images are deliberately omitted: the
  // app/opengraph-image.tsx file convention generates and links the card for
  // both, and declaring them here would override it with a static URL.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* The tag host is a third-party origin on the critical path for the
            conversion pixel; opening the connection early saves a round trip. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body
        className="flex min-h-full flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {/* Keyboard users can jump the header nav straight to the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <GoogleTag />
        <CallProvider>
          <SiteHeader />
          {/* pb-20 clears the fixed mobile call bar. It used to be applied only
              on the home page, so every other route had its footer covered. */}
          <main id="main" className="flex flex-1 flex-col pb-20 sm:pb-0">
            {children}
          </main>
          <Footer />
          <StickyCallBar />
          <CookieNotice />
        </CallProvider>
      </body>
    </html>
  );
}
