/**
 * Centralized site configuration.
 *
 * WHITE-LABEL: all brand identity (name, phone, email, domain) is DERIVED from
 * the active brand in `config/brand.ts`. Do NOT hardcode brand names or phone
 * numbers in components — read everything from here.
 *
 * Conversion model: PHONE-FIRST.
 * Priority ladder → 1) Phone call  2) Callback request  3) Lead form  4) Online booking.
 * Every "soft" CTA (Book Now / Get Quote / Reserve / Check Availability / Learn More)
 * opens the global call/callback popup rather than a self-service booking flow.
 */

import { brandConfig, brandPhone } from "./brand";

export type IconName =
  | "phone"
  | "shield"
  | "map"
  | "tag"
  | "users"
  | "star"
  | "clock"
  | "check"
  | "bolt"
  | "calendar"
  | "lock"
  | "headset"
  | "plane"
  | "wrench"
  | "sparkles"
  | "car";

export type TrustItem = { label: string; sub: string; icon: IconName };

export type VehicleType = {
  name: string;
  priceFrom: number;
  seats: number;
  blurb: string;
  image: string;
  gradient: string;
};

export type Feature = { title: string; description: string; icon: IconName };

export type Destination = {
  city: string;
  state: string;
  priceFrom: number;
  locations: number;
  image: string;
  gradient: string;
};

export type HowStep = { step: string; title: string; description: string; icon: IconName };

export type FeaturedVehicle = {
  name: string;
  type: string;
  dailyRate: number;
  rating: number;
  image: string;
  gradient: string;
  specs: { seats: number; bags: number; transmission: string; efficiency: string };
  features: string[];
  tag?: string;
};

export type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  tripType: string;
  date: string;
};

export type Faq = { q: string; a: string };
export type LegalLink = { label: string; href: string };
export type FooterColumn = { title: string; links: { label: string; href: string }[] };
export type SeoArticle = { id: string; title: string; icon: IconName; body: string[] };
export type LocalSeo = { city: string; state: string; body: string };

const BRAND = brandConfig.brandName;

export const siteConfig = {
  // ---------- Brand (derived from the active brand) ----------
  name: BRAND,
  shortName: BRAND,
  legalName: brandConfig.legalName,
  domain: brandConfig.domain,
  url: `https://${brandConfig.domain}`,
  logo: brandConfig.logo,
  city: "Sheridan",
  region: "Wyoming",
  regionCode: "WY",
  country: "United States",
  tagline: "Big savings on every mile, nationwide.",
  hours: "Live agents · 24/7",

  // ---------- Contact (derived) ----------
  phone: brandPhone.digits,
  phoneHref: brandPhone.href,
  phoneDisplay: brandPhone.display,
  phoneVanity: brandPhone.vanity,
  callResponse: "Avg. wait under 30 seconds",
  whatsappNumber: brandPhone.whatsapp,
  whatsappUrl: `https://wa.me/${brandPhone.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20car%20rental%20quote`,
  email: brandConfig.email,
  addressLine: "1309 Coffeen Ave, Ste 1200",
  addressCity: "Sheridan",
  addressRegion: "Wyoming",
  addressRegionCode: "WY",
  addressPostal: "82801",
  address: "1309 Coffeen Ave, Ste 1200, Sheridan, WY 82801 · Pickup locations nationwide",
  supportHours: "Phone support is open 24 hours a day, 7 days a week, including holidays.",

  // ---------- Hero ----------
  hero: {
    eyebrow: "Airport pickup · Live agents 24/7",
    title: "Book a Rental Car",
    titleAccent: "at the Airport",
    titleHighlight: "Call to lock your rate.",
    subtitle:
      "Skip the counter lines and the surprise fees. Tell us your airport and dates, and a live US-based agent confirms your best all-in rate on economy, SUV and luxury cars — in one quick call.",
    callLabel: "Call now — best airport rate",
    priceFrom: 28,
    badges: ["No Hidden Fees", "Free Cancellation", "Same-Day Rentals", "Airport Pickup"],
  },

  // ---------- Quick Quote (hero form → opens call popup) ----------
  quote: {
    title: "Get an instant quote",
    subtitle: "Tell us the basics — an agent confirms your best rate by phone.",
    cta: "Get My Instant Quote",
    driverAges: ["25+", "21–24", "18–20"],
  },

  // ---------- Call / Callback popup ----------
  callModal: {
    headline: "Get Your Best Rental Deal Today",
    subtitle:
      "Speak with a live US-based agent for a clear, all-in quote — or request a callback and we'll ring you back fast.",
    callCta: "Call Now",
    callbackTitle: "Request a callback",
    callbackCta: "Request My Callback",
    success: `You're all set. A ${BRAND} agent will call you back shortly with your best rate.`,
    response: "Typical callback time: under 2 minutes",
    fields: { name: "Full name", phone: "Phone number", location: "Preferred pickup location" },
  },

  // ---------- Trust bar (5 pillars) ----------
  trustBar: [
    { label: "24/7 Customer Support", sub: "Real agents, day or night", icon: "headset" },
    { label: "Licensed & Insured", sub: "Fully compliant nationwide", icon: "shield" },
    { label: "Nationwide Coverage", sub: "All 50 states", icon: "map" },
    { label: "Transparent Pricing", sub: "No hidden fees, ever", icon: "tag" },
    { label: "Thousands of Happy Customers", sub: "Rated 4.9 / 5", icon: "users" },
  ] as TrustItem[],

  // ---------- Headline stats ----------
  stats: [
    { value: "250,000+", label: "Drivers served" },
    { value: "4.9/5", label: "Average rating" },
    { value: "300+", label: "Pickup locations" },
    { value: "50", label: "States covered" },
  ],

  // ---------- Popular vehicle types (8) ----------
  vehicleTypes: [
    { name: "Economy", priceFrom: 29, seats: 5, blurb: "Fuel-sippers for city trips and errands.", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1100&q=80", gradient: "from-sky-500 to-blue-600" },
    { name: "Compact", priceFrom: 34, seats: 5, blurb: "Nimble, easy to park, great on gas.", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1100&q=80", gradient: "from-cyan-500 to-sky-600" },
    { name: "SUV", priceFrom: 49, seats: 5, blurb: "Room for the family, gear and road trips.", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=80", gradient: "from-blue-600 to-indigo-700" },
    { name: "Luxury", priceFrom: 89, seats: 5, blurb: "Premium sedans that make an impression.", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=80", gradient: "from-slate-700 to-slate-900" },
    { name: "Electric", priceFrom: 59, seats: 5, blurb: "Zero-emission driving with instant torque.", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80", gradient: "from-emerald-500 to-teal-600" },
    { name: "Minivan", priceFrom: 69, seats: 7, blurb: "Seven seats for groups and big families.", image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1100&q=80", gradient: "from-violet-500 to-purple-700" },
    { name: "Convertible", priceFrom: 79, seats: 4, blurb: "Top down, sun out — make the drive the trip.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=80", gradient: "from-orange-500 to-amber-600" },
    { name: "Pickup Truck", priceFrom: 64, seats: 5, blurb: "Haul, tow and move with confidence.", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1100&q=80", gradient: "from-stone-600 to-neutral-800" },
  ] as VehicleType[],

  // ---------- Why choose us (8) ----------
  whyChooseUs: [
    { title: "Affordable Rates", description: "Honest, all-in pricing with no resort-style fees bolted on at the counter. The rate we quote is the rate you pay.", icon: "tag" },
    { title: "Same-Day Rentals", description: "Flight changed or plans came together last minute? Call and, where inventory allows, drive the same day.", icon: "bolt" },
    { title: "Airport Pickup", description: "Meet your car at the counter or curbside at LAX, JFK, MCO, MIA and 300+ airport locations nationwide.", icon: "plane" },
    { title: "Wide Selection", description: "Economy to luxury, SUVs to seven-seat minivans — matched to your trip, your group and your budget.", icon: "car" },
    { title: "Secure Booking", description: "Reserve by phone with a live US-based agent. Clear terms, itemized pricing, no data harvested by forms.", icon: "lock" },
    { title: "Flexible Rentals", description: "By the day, the week or the month, one-way between cities — extend or change plans with a single call.", icon: "calendar" },
  ] as Feature[],

  // ---------- Popular destinations (8) ----------
  destinations: [
    { city: "New York", state: "NY", priceFrom: 39, locations: 24, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1100&q=80", gradient: "from-slate-800 to-slate-950" },
    { city: "Los Angeles", state: "CA", priceFrom: 35, locations: 31, image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1100&q=80", gradient: "from-orange-600 to-rose-700" },
    { city: "Miami", state: "FL", priceFrom: 33, locations: 18, image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=1100&q=80", gradient: "from-cyan-500 to-blue-700" },
    { city: "Las Vegas", state: "NV", priceFrom: 31, locations: 12, image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1100&q=80", gradient: "from-amber-500 to-red-700" },
    { city: "Orlando", state: "FL", priceFrom: 29, locations: 16, image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1100&q=80", gradient: "from-teal-500 to-emerald-700" },
    { city: "Chicago", state: "IL", priceFrom: 37, locations: 14, image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1100&q=80", gradient: "from-blue-700 to-indigo-900" },
    { city: "Dallas", state: "TX", priceFrom: 32, locations: 19, image: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?auto=format&fit=crop&w=1100&q=80", gradient: "from-indigo-600 to-violet-800" },
    { city: "San Francisco", state: "CA", priceFrom: 41, locations: 15, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1100&q=80", gradient: "from-rose-600 to-orange-700" },
  ] as Destination[],

  // ---------- How it works (call-based, 4 steps) ----------
  howItWorks: [
    { step: "01", title: "Search your airport", description: "Enter your pickup airport and dates above, or just call — we cover LAX, JFK, MCO, MIA and 300+ locations.", icon: "map" },
    { step: "02", title: "Call for your best rate", description: "Tap to call our 24/7 line or request a callback. A live agent confirms a clear, all-in price by phone.", icon: "phone" },
    { step: "03", title: "Reserve in minutes", description: "We hold the car in your name with instant confirmation — no deposit and no lengthy online forms.", icon: "check" },
    { step: "04", title: "Pick up & drive", description: "Meet your car at the airport counter or curbside and hit the road — fully insured.", icon: "car" },
  ] as HowStep[],

  // ---------- Featured vehicles (6) ----------
  featuredVehicles: [
    { name: "Toyota Corolla", type: "Economy", dailyRate: 29, rating: 4.8, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1100&q=80", gradient: "from-sky-500 to-blue-600", specs: { seats: 5, bags: 2, transmission: "Automatic", efficiency: "35 MPG" }, features: ["Apple CarPlay", "Backup camera", "Bluetooth", "Unlimited miles"], tag: "Best value" },
    { name: "Toyota RAV4", type: "SUV", dailyRate: 49, rating: 4.9, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=80", gradient: "from-blue-600 to-indigo-700", specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "AWD · 30 MPG" }, features: ["All-wheel drive", "Roof rails", "Apple CarPlay", "Unlimited miles"], tag: "Family favorite" },
    { name: "Tesla Model 3", type: "Electric", dailyRate: 59, rating: 4.9, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80", gradient: "from-emerald-500 to-teal-600", specs: { seats: 5, bags: 3, transmission: "Automatic", efficiency: "270 mi range" }, features: ["Autopilot", "Supercharging", "Premium audio", "Unlimited miles"], tag: "Eco choice" },
    { name: "BMW 5 Series", type: "Luxury", dailyRate: 89, rating: 4.9, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=80", gradient: "from-slate-700 to-slate-900", specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "Leather · 29 MPG" }, features: ["Heated seats", "Premium leather", "Navigation", "Driver assist"], tag: "Premium" },
    { name: "Chrysler Pacifica", type: "Minivan", dailyRate: 69, rating: 4.7, image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1100&q=80", gradient: "from-violet-500 to-purple-700", specs: { seats: 7, bags: 5, transmission: "Automatic", efficiency: "28 MPG" }, features: ["7 seats", "Rear entertainment", "Power doors", "Unlimited miles"], tag: "Groups" },
    { name: "Ford F-150", type: "Pickup Truck", dailyRate: 64, rating: 4.8, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1100&q=80", gradient: "from-stone-600 to-neutral-800", specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "Tow 7,000 lb" }, features: ["Towing package", "Bed liner", "Apple CarPlay", "4x4 available"], tag: "Hauling" },
  ] as FeaturedVehicle[],

  // ---------- Testimonials ----------
  testimonials: [
    { name: "Jessica R.", location: "Austin, TX", text: "Called on a Sunday night and had a car booked in five minutes. The agent walked me through the full price up front — zero surprises at pickup.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", tripType: "Weekend trip", date: "2 weeks ago" },
    { name: "Marcus H.", location: "Atlanta, GA", text: "Needed an SUV last-minute for a family vacation. One phone call, no forms, and the quote matched what I paid. This is how renting should work.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", tripType: "Family vacation", date: "1 month ago" },
    { name: "Priya S.", location: "New York, NY", text: "I'd rather talk to a person than fight a booking app. Clear pricing, friendly agent, and my Tesla was charged and ready at the airport.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", tripType: "Business travel", date: "3 weeks ago" },
    { name: "David L.", location: "Chicago, IL", text: "Roadside assistance picked up at 2am when I had a flat. Sorted within the hour. Worth every penny for the peace of mind alone.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", tripType: "Road trip", date: "1 week ago" },
    { name: "Amanda C.", location: "Los Angeles, CA", text: `Free cancellation saved me when plans changed. No fee, no hassle. I've already booked my next two trips with ${BRAND}.`, rating: 5, avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&w=200&q=80", tripType: "City break", date: "2 months ago" },
    { name: "Robert K.", location: "Miami, FL", text: "Picked up at the airport, dropped off in Orlando — one phone call sorted the whole one-way rental. Smooth from start to finish.", rating: 4, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80", tripType: "One-way rental", date: "1 month ago" },
  ] as Testimonial[],

  // ---------- FAQ ----------
  faqs: [
    { q: `How do I book a rental car with ${BRAND}?`, a: "The fastest way is to call our 24/7 line and speak with a live US-based agent, or request a callback. We confirm availability, quote a clear all-in rate, and reserve the car in your name — usually in under five minutes. No lengthy online forms required." },
    { q: "Are there any hidden fees?", a: "No. The rate we quote on the phone is the rate you pay at pickup, with all taxes and mandatory fees disclosed up front. Optional extras like additional drivers or child seats are explained clearly before you commit." },
    { q: "What do I need to rent a car?", a: "A valid driver's license, a major credit or debit card in the renter's name, and proof of insurance (or you can add our coverage). Most locations require the primary driver to be at least 21; drivers under 25 may incur a young-driver surcharge." },
    { q: "Can I pick up and drop off in different cities?", a: "Yes. We offer one-way rentals across our nationwide network of 300+ locations in all 50 states. Mention your pickup and drop-off cities when you call and we'll quote the one-way rate." },
    { q: "Is free cancellation really free?", a: "Yes. You can cancel any reservation free of charge up to the moment of pickup. There are no cancellation fees and no penalties — plans change, and we get it." },
    { q: "Do you offer airport pickup?", a: "Absolutely. We serve 300+ airport and city locations with counter pickup and curbside or door delivery available in most metros. Tell your agent your flight details and we'll have the car ready when you land." },
    { q: "What is your insurance and roadside coverage?", a: "We're fully licensed and insured nationwide. Collision and liability protection can be added to any rental, and 24/7 roadside assistance is available so help is always one call away." },
    { q: "Can I rent if I'm under 25?", a: "Yes. Drivers aged 21–24 can rent at most locations with a young-driver surcharge, and select locations rent to drivers 18–20. Ask your agent about availability in your city." },
    { q: "How do I extend or change my rental?", a: "Just call us. One phone call to a live agent is all it takes to extend your rental, switch vehicles, or adjust your drop-off — subject to availability." },
    { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards. Payment is collected securely, and you'll always see a clear, itemized breakdown before anything is charged." },
  ] as Faq[],

  // ---------- Final CTA ----------
  finalCta: {
    eyebrow: "Lines are open now",
    title: "Your best rental rate is one call away",
    subtitle:
      "Talk to a live US-based agent for instant confirmation on economy, SUV, luxury and electric rentals — nationwide, with no hidden fees.",
    points: ["No hidden fees", "Free cancellation", "Instant confirmation", "24/7 support"],
  },

  // ---------- Trust (rating + highlights) ----------
  trust: {
    rating: "4.9",
    ratingCount: "12,800+",
    highlights: ["No hidden fees", "Free cancellation", "24/7 support"],
  },

  // ---------- Business transparency (Ads-policy friendly) ----------
  business: {
    serviceType: "Licensed nationwide car rental provider · Phone reservations",
    description: `${brandConfig.legalName} is a licensed and insured car rental provider serving all 50 US states. We take reservations by phone and callback, confirm clear all-in pricing before you commit, and offer pickup and delivery at 300+ airport and city locations nationwide.`,
  },

  // ---------- SEO ----------
  seo: {
    title: `${BRAND} — Rent a Car Anywhere in the USA | Call for the Best Rate`,
    description: `${BRAND}: nationwide car rental from $29/day. Call a live US-based agent for the best rate — economy, SUV, luxury & electric cars, airport pickup, no hidden fees, free cancellation, instant confirmation. Available in all 50 states.`,
    keywords: [
      "car rental",
      "cheap car rental",
      "airport car rental",
      "rental cars near me",
      "SUV rental",
      "luxury car rental",
      "monthly car rental",
      "weekly car rental",
      "car hire USA",
      "best car rental deals",
      "vehicle rental service",
      "rent a car online",
      "electric car rental",
      "one-way car rental",
    ],
    ogImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rental car on an open US highway at golden hour",
    aboutImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    aboutImageAlt: "Traveler collecting the keys to a clean rental car",
    heading: "Car rental across the United States, made simple",
    content: [
      `Renting a car in the USA shouldn't mean wrestling with confusing booking apps or discovering surprise fees at the counter. Whether you're flying in for a vacation, a business trip, or a cross-country road trip, ${BRAND} connects you with a live US-based agent who quotes a clear, all-in rate and reserves your vehicle in minutes — over a single phone call.`,
      "Our nationwide fleet spans economy and compact cars, spacious SUVs and minivans, premium luxury sedans, zero-emission electric vehicles, convertibles and pickup trucks. Pick up at the airport, your hotel, or your front door across 300+ locations in all 50 states, with one-way rentals available between cities.",
      "Because we reserve by phone, our agents match you with the right vehicle, confirm live availability, and answer questions about insurance, additional drivers and coverage — all in one conversation. Pricing is transparent, free cancellation is standard, and 24/7 roadside assistance means help is always one call away.",
    ],
  },

  // ---------- Deep SEO content (homepage + About) ----------
  seoArticles: [
    {
      id: "rental-process",
      title: "How our car rental process works",
      icon: "headset",
      body: [
        `Booking with ${BRAND} is built around a single, friendly phone call instead of a long online checkout. When you call our reservations line, a US-based agent checks live availability for your dates and city, walks you through the vehicle options, and quotes one clear, all-in price — taxes and mandatory fees included. There is no obligation to book and no deposit taken simply to get a quote.`,
        "Once you're happy with the rate, we reserve the vehicle in your name and send an instant confirmation. At pickup you'll present your driver's license and a major credit or debit card, sign the rental agreement, and collect your keys. If your plans change, free cancellation is available right up to the moment of pickup, and you can extend or modify your rental at any time with one more quick call.",
      ],
    },
    {
      id: "rental-requirements",
      title: "What you need to rent a car",
      icon: "check",
      body: [
        "To rent a car in the United States you'll need a valid driver's license, a major credit or debit card in the primary driver's name, and proof of insurance — or you can add our collision and liability protection at the time of booking. International visitors are welcome with a valid license from their home country, and an International Driving Permit is recommended where the license is not printed in English.",
        "The standard minimum age is 21. Drivers aged 21–24 can rent at most locations with a modest young-driver surcharge, and a limited number of locations rent to drivers aged 18–20. Additional drivers can be added to any agreement, and child safety seats are available on request. Our agents confirm the exact requirements for your pickup city before you commit, so there are no surprises at the counter.",
      ],
    },
    {
      id: "airport-rentals",
      title: "Airport car rentals nationwide",
      icon: "plane",
      body: [
        "We serve more than 300 airport and city locations across all 50 states, including every major US hub. Share your flight details when you call and we'll have your vehicle cleaned, fueled and ready when you land, with counter pickup or convenient curbside and door delivery available in most metros. Late-night arrival or a delayed flight? Our 24/7 line means a real person is always available to adjust your pickup.",
        "Airport rentals include unlimited miles on most rates, so you can explore freely, and one-way rentals let you fly into one city and drop off in another. We'll explain toll options, fuel policies and any airport facility charges up front, so the price quoted on the phone is the price you pay.",
      ],
    },
    {
      id: "long-term-rentals",
      title: "Weekly, monthly & long-term rentals",
      icon: "calendar",
      body: [
        "Need a car for longer than a few days? Weekly and monthly rentals come with significantly lower daily rates and the flexibility to extend whenever you need to. Long-term rentals are ideal for extended work assignments, relocations, insurance-replacement vehicles, or simply having a dependable car without the commitment of buying one.",
        "Monthly customers benefit from priority support, simple billing, and the option to swap vehicle classes as their needs change — from a fuel-efficient compact for commuting to an SUV for a family weekend. Call our team to build a long-term plan around your schedule and budget.",
      ],
    },
    {
      id: "business-rentals",
      title: "Business travel rentals",
      icon: "shield",
      body: [
        "Business travelers count on us for fast, predictable rentals that keep trips on schedule. Reserve premium sedans, SUVs or electric vehicles with a single call, add multiple drivers for team travel, and receive a clear, itemized receipt suited to expense reporting. Our agents can coordinate airport pickups around tight meeting schedules and arrange one-way rentals for multi-city itineraries.",
        "With transparent pricing, instant confirmation and 24/7 support, corporate and small-business travelers always know exactly what they're paying and can rely on help being one call away anywhere in the country.",
      ],
    },
    {
      id: "family-rentals",
      title: "Family vacation rentals",
      icon: "users",
      body: [
        "Planning a family getaway? Spacious SUVs and seven-seat minivans give everyone room to stretch out, with space for luggage, strollers and beach gear. Child safety seats and booster seats are available on request, and unlimited miles on most rates mean the road trip is yours to enjoy without watching the odometer.",
        "From theme-park trips in Orlando to national-park road trips out West, our agents help you pick the right vehicle for your group size and itinerary, confirm the all-in price, and get you on the road quickly so the vacation can start the moment you land.",
      ],
    },
  ] as SeoArticle[],

  // ---------- Local SEO (8 cities) ----------
  localSeo: [
    { city: "New York", state: "NY", body: "Rent a car in New York for trips beyond the five boroughs — the Hudson Valley, the Hamptons, or a New England road trip. We offer pickups at JFK, LaGuardia and Newark airports as well as Manhattan and Brooklyn locations, with compact cars that are easy to park in the city and SUVs for weekend escapes. Call for live availability and an all-in rate." },
    { city: "Los Angeles", state: "CA", body: "Car rental in Los Angeles puts the coast, the canyons and the desert within easy reach. Pick up at LAX or a city location and choose from convertibles for Pacific Coast Highway cruising, EVs with HOV-lane access, or SUVs for trips to Joshua Tree and beyond. Unlimited miles are included on most rates." },
    { city: "Miami", state: "FL", body: "Rent a car in Miami for South Beach, the Everglades, and one-way drives up to Orlando or down to the Keys. We serve Miami International Airport and downtown locations with economy cars, convertibles and spacious SUVs. Transparent pricing and free cancellation make a Florida getaway easy." },
    { city: "Las Vegas", state: "NV", body: "Las Vegas car rental gives you the freedom to explore beyond the Strip — Red Rock Canyon, Hoover Dam, and the Grand Canyon are all within a short drive. Pick up at Harry Reid International Airport with everything from value economy cars to luxury sedans, quoted at one clear price by phone." },
    { city: "Orlando", state: "FL", body: "Rent a car in Orlando for stress-free theme-park trips and Florida day trips. Family-friendly minivans and SUVs with room for the whole crew are our most popular choices here, complete with optional child seats. Pick up at Orlando International Airport and hit the parks with unlimited miles." },
    { city: "Chicago", state: "IL", body: "Car rental in Chicago covers city sightseeing and Great Lakes road trips alike. Choose all-wheel-drive SUVs for changeable Midwest weather or fuel-efficient compacts for the city, with pickups at O'Hare, Midway and downtown locations. Our agents confirm parking and toll guidance up front." },
    { city: "Dallas", state: "TX", body: "Rent a car in Dallas–Fort Worth for business travel and wide-open Texas road trips. We offer pickups at DFW and Dallas Love Field, with pickup trucks, roomy SUVs and premium sedans available. Weekly and monthly rates are popular with relocating professionals — just call to set one up." },
    { city: "San Francisco", state: "CA", body: "San Francisco car rental connects the city to wine country, Yosemite and the Pacific Coast. Electric vehicles and hybrids are popular for Bay Area driving, while SUVs handle mountain trips with ease. Pick up at SFO or a downtown location and get a clear, all-in quote by phone." },
  ] as LocalSeo[],

  // ---------- Cookie notice ----------
  cookieNotice: {
    message:
      "This site uses cookies for analytics and to measure ad performance, including tools like Google Analytics and Google Ads. See our Privacy Policy for details.",
    accept: "Got it",
    learnMore: "Privacy Policy",
  },

  // ---------- Footer ----------
  footerColumns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Customer reviews", href: "/#reviews" },
      ],
    },
    {
      title: "Airports",
      links: [
        { label: "LAX — Los Angeles", href: "/airports/lax" },
        { label: "JFK — New York", href: "/airports/jfk" },
        { label: "MCO — Orlando", href: "/airports/mco" },
        { label: "MIA — Miami", href: "/airports/mia" },
        { label: "All airports", href: "/airports" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Vehicle types", href: "/#vehicles" },
        { label: "Featured fleet", href: "/#fleet" },
        { label: "FAQ", href: "/#faq" },
        { label: "Roadside assistance", href: "/#why" },
      ],
    },
  ] as FooterColumn[],

  social: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],

  // ---------- Legal ----------
  legalLinks: [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
    { label: "Contact Us", href: "/contact" },
  ] as LegalLink[],
} as const;

export type SiteConfig = typeof siteConfig;
