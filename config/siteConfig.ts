/**
 * Centralized site configuration.
 * All user-facing content, contact info, and marketing copy lives here.
 * Do NOT hardcode strings in components — import from this file.
 *
 * Conversion model: PHONE-FIRST.
 * Priority ladder → 1) Phone call  2) Callback request  3) Lead form  4) Online booking.
 * Every "soft" CTA (Book Now / Get Quote / Reserve / Check Availability / Learn More)
 * opens the global call/callback popup rather than a self-service booking flow.
 */

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

export const siteConfig = {
  // ---------- Brand ----------
  name: "Budget Travels",
  shortName: "Budget Travels",
  legalName: "Budget Travels LLC",
  city: "Austin",
  region: "Texas",
  regionCode: "TX",
  country: "United States",
  tagline: "Big savings on every mile, nationwide.",
  hours: "Live agents · 24/7",

  // ---------- Contact (toll-free, vanity) ----------
  phone: "+18882834381",
  phoneDisplay: "(888) 283-4381",
  phoneVanity: "1-888-BUDGET-1",
  callResponse: "Avg. wait under 30 seconds",
  whatsappNumber: "18882834381",
  whatsappUrl:
    "https://wa.me/18882834381?text=Hi%2C%20I%27d%20like%20a%20car%20rental%20quote",
  email: "reservations@budgetravelsforu.com",
  addressLine: "600 Congress Ave, Suite 1400",
  addressCity: "Austin",
  addressRegion: "Texas",
  addressRegionCode: "TX",
  addressPostal: "78701",
  address: "600 Congress Ave, Suite 1400, Austin, TX 78701 · Pickup locations nationwide",

  // ---------- Hero ----------
  hero: {
    eyebrow: "Live US-based agents · Lines open now",
    title: "Rent a Car Anywhere",
    titleAccent: "in the USA",
    titleHighlight: "One call away.",
    subtitle:
      "No hidden fees. Instant confirmation. Talk to a live US-based agent for the best rate on economy, SUV, luxury & electric rentals — in minutes.",
    callLabel: "Call now — best rate by phone",
    priceFrom: 29,
    badges: [
      "No Hidden Fees",
      "Free Cancellation",
      "Instant Confirmation",
      "Verified Vehicles",
    ],
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
    success:
      "You're all set. A Budget Travels agent will call you back shortly with your best rate.",
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
    {
      name: "Economy",
      priceFrom: 29,
      seats: 5,
      blurb: "Fuel-sippers for city trips and errands.",
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      name: "Compact",
      priceFrom: 34,
      seats: 5,
      blurb: "Nimble, easy to park, great on gas.",
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-cyan-500 to-sky-600",
    },
    {
      name: "SUV",
      priceFrom: 49,
      seats: 5,
      blurb: "Room for the family, gear and road trips.",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      name: "Luxury",
      priceFrom: 89,
      seats: 5,
      blurb: "Premium sedans that make an impression.",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-slate-700 to-slate-900",
    },
    {
      name: "Electric",
      priceFrom: 59,
      seats: 5,
      blurb: "Zero-emission driving with instant torque.",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "Minivan",
      priceFrom: 69,
      seats: 7,
      blurb: "Seven seats for groups and big families.",
      image:
        "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-violet-500 to-purple-700",
    },
    {
      name: "Convertible",
      priceFrom: 79,
      seats: 4,
      blurb: "Top down, sun out — make the drive the trip.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-orange-500 to-amber-600",
    },
    {
      name: "Pickup Truck",
      priceFrom: 64,
      seats: 5,
      blurb: "Haul, tow and move with confidence.",
      image:
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-stone-600 to-neutral-800",
    },
  ] as VehicleType[],

  // ---------- Why choose us (8) ----------
  whyChooseUs: [
    { title: "Transparent Pricing", description: "The rate we quote is the rate you pay. Taxes and fees disclosed up front.", icon: "tag" },
    { title: "Airport Pickup", description: "Counters and curbside delivery at 300+ airport and city locations.", icon: "plane" },
    { title: "Nationwide Coverage", description: "Pick up in one city, drop off in another — across all 50 states.", icon: "map" },
    { title: "Flexible Rentals", description: "By the day, week or month. Extend or change plans with one call.", icon: "calendar" },
    { title: "24/7 Roadside Assistance", description: "Help is one call away, any hour, anywhere you drive.", icon: "wrench" },
    { title: "Verified Vehicles", description: "Every car is inspected, sanitized and safety-checked between rentals.", icon: "shield" },
    { title: "Free Cancellation", description: "Plans change. Cancel free up to pickup — no questions, no fees.", icon: "check" },
    { title: "Instant Confirmation", description: "Reserve by phone and get confirmation in minutes, not hours.", icon: "bolt" },
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
    { step: "01", title: "Call or request a callback", description: "Tap to call our toll-free line or leave your number — a live agent reaches out fast.", icon: "phone" },
    { step: "02", title: "Get a custom quote", description: "Share your dates, city and vehicle type. We confirm a clear, all-in rate by phone.", icon: "tag" },
    { step: "03", title: "Reserve in minutes", description: "We hold the car in your name with instant confirmation. No deposit required.", icon: "check" },
    { step: "04", title: "Pick up & drive", description: "Grab the keys at the airport or your door and hit the road — fully insured.", icon: "car" },
  ] as HowStep[],

  // ---------- Featured vehicles (6) ----------
  featuredVehicles: [
    {
      name: "Toyota Corolla",
      type: "Economy",
      dailyRate: 29,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-sky-500 to-blue-600",
      specs: { seats: 5, bags: 2, transmission: "Automatic", efficiency: "35 MPG" },
      features: ["Apple CarPlay", "Backup camera", "Bluetooth", "Unlimited miles"],
      tag: "Best value",
    },
    {
      name: "Toyota RAV4",
      type: "SUV",
      dailyRate: 49,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-blue-600 to-indigo-700",
      specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "AWD · 30 MPG" },
      features: ["All-wheel drive", "Roof rails", "Apple CarPlay", "Unlimited miles"],
      tag: "Family favorite",
    },
    {
      name: "Tesla Model 3",
      type: "Electric",
      dailyRate: 59,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-emerald-500 to-teal-600",
      specs: { seats: 5, bags: 3, transmission: "Automatic", efficiency: "270 mi range" },
      features: ["Autopilot", "Supercharging", "Premium audio", "Unlimited miles"],
      tag: "Eco choice",
    },
    {
      name: "BMW 5 Series",
      type: "Luxury",
      dailyRate: 89,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-slate-700 to-slate-900",
      specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "Leather · 29 MPG" },
      features: ["Heated seats", "Premium leather", "Navigation", "Driver assist"],
      tag: "Premium",
    },
    {
      name: "Chrysler Pacifica",
      type: "Minivan",
      dailyRate: 69,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-violet-500 to-purple-700",
      specs: { seats: 7, bags: 5, transmission: "Automatic", efficiency: "28 MPG" },
      features: ["7 seats", "Rear entertainment", "Power doors", "Unlimited miles"],
      tag: "Groups",
    },
    {
      name: "Ford F-150",
      type: "Pickup Truck",
      dailyRate: 64,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1100&q=80",
      gradient: "from-stone-600 to-neutral-800",
      specs: { seats: 5, bags: 4, transmission: "Automatic", efficiency: "Tow 7,000 lb" },
      features: ["Towing package", "Bed liner", "Apple CarPlay", "4x4 available"],
      tag: "Hauling",
    },
  ] as FeaturedVehicle[],

  // ---------- Testimonials ----------
  testimonials: [
    { name: "Jessica R.", location: "Austin, TX", text: "Called on a Sunday night and had a car booked in five minutes. The agent walked me through the full price up front — zero surprises at pickup.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", tripType: "Weekend trip", date: "2 weeks ago" },
    { name: "Marcus H.", location: "Atlanta, GA", text: "Needed an SUV last-minute for a family vacation. One phone call, no forms, and the quote matched what I paid. This is how renting should work.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", tripType: "Family vacation", date: "1 month ago" },
    { name: "Priya S.", location: "New York, NY", text: "I'd rather talk to a person than fight a booking app. Clear pricing, friendly agent, and my Tesla was charged and ready at the airport.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", tripType: "Business travel", date: "3 weeks ago" },
    { name: "David L.", location: "Chicago, IL", text: "Roadside assistance picked up at 2am when I had a flat. Sorted within the hour. Worth every penny for the peace of mind alone.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", tripType: "Road trip", date: "1 week ago" },
    { name: "Amanda C.", location: "Los Angeles, CA", text: "Free cancellation saved me when plans changed. No fee, no hassle. I've already booked my next two trips with Budget Travels.", rating: 5, avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&w=200&q=80", tripType: "City break", date: "2 months ago" },
    { name: "Robert K.", location: "Miami, FL", text: "Picked up at the airport, dropped off in Orlando — one phone call sorted the whole one-way rental. Smooth from start to finish.", rating: 4, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80", tripType: "One-way rental", date: "1 month ago" },
  ] as Testimonial[],

  // ---------- FAQ ----------
  faqs: [
    { q: "How do I book a rental car with Budget Travels?", a: "The fastest way is to call our toll-free line and speak with a live US-based agent, or request a callback. We confirm availability, quote a clear all-in rate, and reserve the car in your name — usually in under five minutes. No lengthy online forms required." },
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

  // ---------- Trust (rating + highlights, used across modal/legal/SEO) ----------
  trust: {
    rating: "4.9",
    ratingCount: "12,800+",
    highlights: ["No hidden fees", "Free cancellation", "24/7 support"],
  },

  // ---------- Business transparency (Ads-policy friendly) ----------
  business: {
    serviceType: "Licensed nationwide car rental provider · Phone reservations",
    description:
      "Budget Travels LLC is a licensed and insured car rental provider serving all 50 US states. We take reservations by phone and callback, confirm clear all-in pricing before you commit, and offer pickup and delivery at 300+ airport and city locations nationwide.",
  },

  // ---------- SEO ----------
  seo: {
    title: "Budget Travels — Rent a Car Anywhere in the USA | Call for Best Rate",
    description:
      "Nationwide car rental from $29/day. Call a live US-based agent for the best rate — economy, SUV, luxury & electric cars, airport pickup, no hidden fees, free cancellation, instant confirmation. Available in all 50 states.",
    keywords: [
      "car rental USA",
      "rent a car nationwide",
      "cheap car rental",
      "airport car rental",
      "SUV rental",
      "luxury car rental",
      "electric car rental",
      "toll free car rental",
    ],
    ogImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rental car on an open US highway at golden hour",
    heading: "Car rental across the United States, made simple",
    content: [
      "Renting a car in the USA shouldn't mean wrestling with confusing booking apps or discovering surprise fees at the counter. Whether you're flying in for a vacation, a business trip, or a cross-country road trip, Budget Travels connects you with a live US-based agent who quotes a clear, all-in rate and reserves your vehicle in minutes — over a single phone call.",
      "Our nationwide fleet spans economy and compact cars, spacious SUVs and minivans, premium luxury sedans, zero-emission electric vehicles, convertibles and pickup trucks. Pick up at the airport, your hotel, or your front door across 300+ locations in all 50 states, with one-way rentals available between cities.",
      "Because we reserve by phone, our agents match you with the right vehicle, confirm live availability, and answer questions about insurance, additional drivers and coverage — all in one conversation. Pricing is transparent, free cancellation is standard, and 24/7 roadside assistance means help is always one call away.",
    ],
  },

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
        { label: "About Budget Travels", href: "/#about" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Why choose us", href: "/#why" },
        { label: "Reviews", href: "/#reviews" },
      ],
    },
    {
      title: "Top locations",
      links: [
        { label: "New York", href: "/#destinations" },
        { label: "Los Angeles", href: "/#destinations" },
        { label: "Miami", href: "/#destinations" },
        { label: "Las Vegas", href: "/#destinations" },
        { label: "All 50 states", href: "/#destinations" },
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
  ] as LegalLink[],
} as const;

export type SiteConfig = typeof siteConfig;
