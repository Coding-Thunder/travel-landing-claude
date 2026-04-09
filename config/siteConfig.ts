/**
 * Centralized site configuration.
 * All user-facing content, contact info, and marketing copy lives here.
 * Do NOT hardcode strings in components — import from this file.
 */

export type Offer = {
  title: string;
  tag: string;
  description: string;
};

export type Car = {
  name: string;
  type: string;
  price: number;
  image: string;
  specs: string;
  tag: string;
};

export type WhyPoint = {
  title: string;
  description: string;
};

export type LegalLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  // ---------- Brand ----------
  name: "Miami Car Rentals",
  shortName: "Miami Rentals",
  city: "Miami",
  region: "Florida",
  tagline: "Call. Drive. Done.",
  hours: "Open 24/7",

  // ---------- Contact ----------
  phone: "+13055550199",
  phoneDisplay: "(305) 555-0199",
  whatsappNumber: "13055550199",
  whatsappUrl: "https://wa.me/13055550199?text=Hi%2C%20I%27d%20like%20to%20rent%20a%20car%20in%20Miami",
  email: "hello@miamicarrentals.example",
  address: "Miami International Airport area · Pickup & delivery available",

  // ---------- Hero ----------
  hero: {
    eyebrow: "Open now · Instant availability",
    title: "Need a Rental Car",
    titleCity: "in Miami?",
    titleHighlight: "Call Now.",
    subtitle:
      "Skip the forms. Talk to a real rental expert and drive off in under 30 minutes — no hidden fees, ever.",
    supportingText: "Tap to call · Average pickup in under 30 seconds",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80",
    priceFrom: 29,
    priceFromNote: "Economy & compact cars · Unlimited miles · Free cancellation",
    pricePoints: [
      "Free cancellation up to pickup",
      "Airport + hotel delivery",
      "No deposit required",
    ],
    primaryCta: "Call",
    secondaryCta: "WhatsApp",
  },

  // ---------- SEO ----------
  seo: {
    title: "Miami Car Rentals — Call Now | Instant Availability 24/7",
    description:
      "Affordable car rentals in Miami from $29/day. Call to reserve instantly — economy, SUV & luxury cars, airport pickup, no hidden fees, 24/7 phone booking.",
    keywords: [
      "car rental Miami",
      "rent a car Miami",
      "cheap car rental Miami airport",
      "Miami SUV rental",
      "Miami luxury car rental",
      "24/7 car rental Miami",
    ],
    ogImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    heading: "Your trusted car rental partner in Miami",
    subheading:
      "Fast, honest, and built around a single phone call — the way renting should be.",
    content: [
      "Finding a reliable rental car in Miami shouldn't involve endless forms, surprise fees, or pushy upsells at the counter. Whether you're flying into Miami International Airport for a family vacation, a business trip, or a weekend escape to South Beach, our call-first booking process gets you behind the wheel in minutes — not hours. One quick phone call is all it takes to confirm your car, your rate, and your pickup location.",
      "We offer a hand-picked fleet of economy, SUV, and luxury vehicles for every kind of Miami traveler. Cruise the Rickenbacker Causeway in a compact convertible, drive the family down to the Keys in a spacious SUV, or show up in style at a Brickell dinner in a premium sedan. Every car is deep-cleaned, serviced, and ready to drive the moment you arrive. Unlimited miles are included on most rates, so you can explore Miami Beach, Wynwood, Coral Gables, and beyond without watching the odometer.",
      "Because we take bookings by phone, our rental experts can match you with the right car for your plans, apply the best available discount, and answer questions about insurance, drivers, and optional extras — all in a single conversation. There are no hidden charges, no confusing add-ons at the counter, and no waiting in line. Free cancellation is standard on every reservation, so you can lock in your rate with complete peace of mind.",
      "Our team is based right here in Miami and knows the city inside out. We'll help you pick the best pickup point — from the airport to your hotel in Downtown Miami or Miami Beach — and make sure your rental fits your itinerary, not ours. With 24/7 support, transparent pricing, and thousands of happy customers, we've become one of the most trusted names for car rentals in South Florida. Call now and see how fast renting a car in Miami can be.",
    ],
  },

  // ---------- Trust ----------
  trust: {
    rating: "4.8",
    ratingLabel: "Google Reviews",
    customers: "10,000+",
    customersLabel: "Happy Customers",
    support: "24/7",
    supportLabel: "Phone Support",
    highlights: [
      "No hidden fees",
      "Free cancellation",
      "Airport & hotel delivery",
    ],
  },

  // ---------- Offers ----------
  offers: [
    {
      title: "Economy from $29/day",
      tag: "Best Price",
      description:
        "Unbeatable daily rates on fuel-efficient economy and compact cars — perfect for exploring Miami on a budget.",
    },
    {
      title: "Free Cancellation",
      tag: "Risk Free",
      description:
        "Plans change. Cancel any reservation at no cost, right up to the moment of pickup. No questions asked.",
    },
    {
      title: "60-Second Phone Booking",
      tag: "Fastest",
      description:
        "Skip the forms and the counter. Our rental experts confirm your car in under a minute, start to finish.",
    },
  ] as Offer[],

  // ---------- Cars ----------
  cars: [
    {
      name: "Nissan Versa",
      type: "Economy",
      price: 29,
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
      specs: "5 seats · Auto · A/C",
      tag: "Most Popular",
    },
    {
      name: "Toyota RAV4",
      type: "SUV",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
      specs: "5 seats · Auto · AWD",
      tag: "Family Favorite",
    },
    {
      name: "BMW 3 Series",
      type: "Luxury",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      specs: "5 seats · Auto · Leather",
      tag: "Premium",
    },
  ] as Car[],

  // ---------- Why Choose Us ----------
  whyChooseUs: [
    {
      title: "No Hidden Charges",
      description:
        "What we quote on the call is what you pay. Zero surprise fees at the counter — guaranteed.",
    },
    {
      title: "24/7 Live Support",
      description:
        "Real humans on the phone, day or night. Someone is always ready to help you get on the road.",
    },
    {
      title: "Clean & Sanitized",
      description:
        "Every vehicle is fully cleaned, sanitized, and safety-checked before it reaches your hands.",
    },
    {
      title: "Fast Pickup",
      description:
        "Your car is prepped and waiting. Skip the line and be on the road in ten minutes or less.",
    },
  ] as WhyPoint[],

  // ---------- Legal ----------
  legalLinks: [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
  ] as LegalLink[],
} as const;

export type SiteConfig = typeof siteConfig;
