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

export type HowStep = {
  step: string;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

export const siteConfig = {
  // ---------- Brand ----------
  name: "Miami Car Rentals",
  shortName: "Miami Rentals",
  legalName: "Miami Car Rentals LLC",
  city: "Miami",
  region: "Florida",
  regionCode: "FL",
  country: "United States",
  tagline: "Call. Drive. Done.",
  hours: "Phone support 24/7",

  // ---------- Contact ----------
  phone: "+13055550199",
  phoneDisplay: "(305) 555-0199",
  whatsappNumber: "13055550199",
  whatsappUrl:
    "https://wa.me/13055550199?text=Hi%2C%20I%27d%20like%20to%20rent%20a%20car%20in%20Miami",
  email: "hello@miamicarrentals.example",
  addressLine: "2301 NW 42nd Ave, Suite 200",
  addressCity: "Miami",
  addressRegion: "Florida",
  addressRegionCode: "FL",
  addressPostal: "33126",
  address:
    "2301 NW 42nd Ave, Suite 200, Miami, FL 33126 · Pickup & delivery across Miami",

  // ---------- Hero ----------
  hero: {
    eyebrow: "Phone lines open · Live agents available",
    title: "Need a Rental Car",
    titleCity: "in Miami?",
    titleHighlight: "Call Now.",
    subtitle:
      "Skip the forms. Speak to a local rental agent and get a clear, all-in quote — based on live availability.",
    supportingText: "Tap to call · Friendly phone support, day or night",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80",
    priceFrom: 29,
    priceFromNote:
      "Economy & compact cars · Rates based on availability · Free cancellation before pickup",
    pricePoints: [
      "Free cancellation up to pickup",
      "Airport & hotel delivery",
      "No online deposit — pay at pickup",
    ],
    primaryCta: "Call",
    secondaryCta: "WhatsApp",
  },

  // ---------- Business Transparency ----------
  business: {
    serviceType: "Licensed car rental provider · Phone reservations",
    description:
      "Miami Car Rentals LLC is a locally operated car rental provider serving the greater Miami area. We take reservations by phone, deliver vehicles to the airport and nearby hotels, and handle payment and paperwork in person at the time of pickup.",
    bookingFlow:
      "When you call, a US-based rental agent will check live availability, quote a clear all-in rate, and answer questions about insurance, drivers, and delivery. Once you're happy with the quote, we hold the vehicle in your name — no payment or deposit is taken over the phone.",
    afterCall:
      "You'll receive a short confirmation message with your reservation details. Payment is collected in person at pickup, where you'll also sign the rental agreement and receive your keys.",
  },

  // ---------- How It Works ----------
  howItWorks: [
    {
      step: "01",
      title: "Call us",
      description:
        "Dial our phone line and speak directly with a local rental agent.",
    },
    {
      step: "02",
      title: "Speak to an agent",
      description:
        "Share your dates, pickup location, and the type of vehicle you need.",
    },
    {
      step: "03",
      title: "Confirm availability",
      description:
        "We check live inventory and provide a clear, all-in quote based on availability.",
    },
    {
      step: "04",
      title: "Book your vehicle",
      description:
        "We hold the car in your name. Pay in person at pickup — no online deposit required.",
    },
  ] as HowStep[],

  // ---------- SEO ----------
  seo: {
    title: "Miami Car Rentals — Phone Reservations | Live Agents",
    description:
      "Car rentals in Miami from $29/day, based on availability. Call a local agent for a clear, all-in quote — economy, SUV & luxury cars, airport pickup, transparent pricing, phone booking.",
    keywords: [
      "car rental Miami",
      "rent a car Miami",
      "car rental Miami airport",
      "Miami SUV rental",
      "Miami luxury car rental",
      "phone car rental Miami",
    ],
    ogImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    heading: "Your local car rental partner in Miami",
    subheading:
      "Fast, transparent, and built around a single phone call — the way renting should be.",
    about:
      "One phone call to a local agent. A clear, all-in quote. A vehicle ready for pickup in the greater Miami area.",
    highlights: [
      "Transparent pricing — the rate we quote on the call is the rate you pay at pickup",
      "Free cancellation before pickup",
      "Airport & hotel delivery across the Miami area",
      "Economy, SUV & luxury cars — professionally cleaned",
      "Real people on the phone, day or night",
    ],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rental car on a Miami road at golden hour",
    content: [
      "Finding a rental car in Miami shouldn't involve endless forms or surprise fees at the counter. Whether you're flying into Miami International Airport for a family vacation, a business trip, or a weekend in South Beach, our phone-based booking process lets you speak directly with a local agent who can quote a clear, all-in rate based on live availability.",
      "We offer a hand-picked fleet of economy, SUV, and luxury vehicles for Miami travelers. Cruise the Rickenbacker Causeway in a compact, drive the family to the Keys in a spacious SUV, or show up in Brickell in a premium sedan. Every car is cleaned and safety-checked before pickup, and unlimited miles are included on most rates.",
      "Because we take reservations by phone, our agents can match you with the right vehicle for your plans, confirm availability in real time, and answer questions about insurance, additional drivers, and optional extras — all in a single conversation. Rates are quoted clearly before you commit, and free cancellation before pickup is standard.",
      "Our team is based in Miami and knows the area well. We'll help you pick a pickup point — from the airport to your hotel in Downtown Miami or Miami Beach — and make sure your rental fits your itinerary. With phone support, transparent pricing, and clearly disclosed terms, we aim to make car rental in South Florida straightforward.",
    ],
  },

  // ---------- Trust ----------
  trust: {
    rating: "4.8",
    ratingLabel: "Customer rating",
    ratingNote: "Based on feedback collected from recent phone bookings.",
    customers: "Locally operated",
    customersLabel: "Miami-based team",
    support: "Live agents",
    supportLabel: "Phone support",
    highlights: [
      "Transparent pricing",
      "Free cancellation",
      "Airport & hotel delivery",
    ],
  },

  // ---------- Testimonials ----------
  testimonials: [
    {
      name: "Jessica R.",
      location: "Tampa, FL",
      text: "Booked a compact for a weekend trip to Miami Beach. The agent walked me through the full price up front, and the car was ready when I landed.",
      rating: 5,
    },
    {
      name: "Marcus H.",
      location: "Atlanta, GA",
      text: "Needed an SUV last minute for a family trip. One phone call, no forms, and the quote matched what I paid at pickup. Friendly team.",
      rating: 5,
    },
    {
      name: "Priya S.",
      location: "New York, NY",
      text: "I'd rather talk to a person than fill out forms. Clear pricing and no surprises at the counter — exactly what I was hoping for.",
      rating: 4,
    },
  ] as Testimonial[],

  // ---------- Offers ----------
  offers: [
    {
      title: "Economy from $29/day",
      tag: "Popular",
      description:
        "Competitive daily rates on fuel-efficient economy and compact cars — rates based on availability.",
    },
    {
      title: "Free Cancellation",
      tag: "Flexible",
      description:
        "Plans change. Cancel any phone reservation free of charge right up to the moment of pickup.",
    },
    {
      title: "Phone Booking with a Live Agent",
      tag: "Personal",
      description:
        "Skip the forms. Our rental agents can check live availability and quote a clear, all-in rate in a single call.",
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
      tag: "Popular",
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
      title: "Transparent Pricing",
      description:
        "The rate we quote on the call is the rate you pay at pickup. Taxes and optional extras are clearly disclosed up front.",
    },
    {
      title: "Live Phone Support",
      description:
        "Real US-based agents answer the phone day and night to help you find the right vehicle.",
    },
    {
      title: "Clean & Inspected",
      description:
        "Every vehicle is cleaned and safety-checked between rentals before it reaches your hands.",
    },
    {
      title: "Convenient Pickup",
      description:
        "Vehicles are prepped ahead of time so check-in at pickup is quick and straightforward.",
    },
  ] as WhyPoint[],

  // ---------- Cookie Notice ----------
  cookieNotice: {
    message:
      "This site uses cookies for analytics and to measure ad performance, including tools like Google Analytics and Google Ads. See our Privacy Policy for details.",
    accept: "Got it",
    learnMore: "Privacy Policy",
  },

  // ---------- Legal ----------
  legalLinks: [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
  ] as LegalLink[],
} as const;

export type SiteConfig = typeof siteConfig;
