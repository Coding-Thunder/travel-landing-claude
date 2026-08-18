/**
 * Flight Bizz: single source of truth for brand, legal identity and content.
 *
 * BRAND:         Flight Bizz
 * LEGAL ENTITY:  GlobeVista LLC
 * RELATIONSHIP:  Flight Bizz is operated by GlobeVista LLC.
 *
 * BUSINESS MODEL: a multi-service online travel platform. Travelers describe
 * the trip they want across flights, hotels, cars, transfers, activities and
 * packages; a Flight Bizz travel specialist sources options from the supplier
 * network and confirms availability, price and conditions before anything is
 * booked. Fulfilment is by the airline, hotel, rental company, activity
 * operator or other supplier identified during booking.
 *
 * COMPLIANCE. All copy must stay consistent with the model above:
 *   • Flight Bizz is NOT an airline.
 *   • Flight Bizz holds NO IATA or ARC accreditation. Never imply otherwise.
 *   • No invented partnerships, certifications, awards, reviews, trust badges,
 *     government approvals, inventory or availability.
 *   • No live inventory is displayed anywhere on this site.
 *
 * CONFIGURATION: every customer-facing brand and business value lives in this
 * file, so changing it here changes it everywhere. A value still wrapped in
 * `[Brackets]` has not been supplied yet; the UI omits it rather than printing
 * a placeholder or inventing one (see `contact.hasPhone` / `hasEmail` /
 * `hasAddress` / `hasCompanyNumber`).
 */

/** A value still wrapped in [brackets] has not been supplied yet. */
const isPlaceholder = (v: string) => v.trim().startsWith("[");

const SITE_URL = "https://flightbizz.com";
const SUPPORT_PHONE = "+1 (551) 414-2067";
const SUPPORT_EMAIL = "contact@flightbizz.com";
const BUSINESS_ADDRESS = "1309 Coffeen Ave, Ste 1200, Sheridan, WY 82801";
/**
 * GlobeVista LLC's own state filing / registration ID.
 *
 * Deliberately unsupplied. The previous brand's Wyoming ID belongs to a
 * different legal entity and must not be reused, so until GlobeVista LLC's real
 * ID is provided the registration line is omitted from the footer and the legal
 * pages rather than published incorrectly.
 */
const COMPANY_NUMBER = "[Company registration ID not supplied]";

export type NavItem = { label: string; href: string };
export type FooterColumn = { title: string; links: NavItem[] };
export type Faq = { q: string; a: string };
export type ServiceCategory = { name: string; description: string };
export type Destination = { city: string; country: string; image: string };
export type ValuePoint = { title: string; description: string; icon: string };

/** One of the six travel categories the platform covers. */
export type Service = {
  /** Stable key, also the search-module tab id. Internal identifier. */
  key: "flights" | "hotels" | "cars" | "transfers" | "activities" | "packages";
  name: string;
  /** Compact label for tabs, nav and breadcrumbs where the full name is long. */
  shortName: string;
  href: string;
  icon: string;
  /** One-line summary used on cards and category tiles. */
  description: string;
  /** Longer positioning line used at the top of the service page. */
  intro: string;
  image: string;
};

export const site = {
  name: "Flight Bizz",
  legalName: "GlobeVista LLC",
  /** The legal disclosure, used verbatim across the customer-facing site. */
  operatedBy: "Flight Bizz is operated by GlobeVista LLC.",
  tagline: "Your Journey. One Platform.",
  /** Category strip used in the footer and brand lockups. */
  categoryLine: "Flights • Hotels • Cars • Transfers • Activities • Packages",
  domain: SITE_URL.replace(/^https?:\/\//, ""),
  url: SITE_URL,

  /** ---- Registered business details (GlobeVista LLC) ---- */
  company: {
    registeredName: "GlobeVista LLC",
    registeredOffice: BUSINESS_ADDRESS,
    address: {
      street: "1309 Coffeen Ave, Ste 1200",
      city: "Sheridan",
      region: "WY",
      postcode: "82801",
      country: "US",
    },
    companyNumber: COMPANY_NUMBER,
    supportEmail: SUPPORT_EMAIL,
    phone: SUPPORT_PHONE,
    /** Digits-only form for `tel:` links. */
    phoneHref: SUPPORT_PHONE.replace(/[^\d+]/g, ""),
  },

  /** Derived flags so components never re-implement placeholder detection. */
  contact: {
    hasPhone: !isPlaceholder(SUPPORT_PHONE),
    hasEmail: !isPlaceholder(SUPPORT_EMAIL),
    hasAddress: !isPlaceholder(BUSINESS_ADDRESS),
    hasCompanyNumber: !isPlaceholder(COMPANY_NUMBER),
  },

  /** Published support hours. Times are US Eastern. */
  hours: [
    { day: "Monday to Friday", time: "9:00 AM to 8:00 PM" },
    { day: "Saturday", time: "10:00 AM to 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  /** IANA zone the hours above are published in, used for the after-hours state. */
  hoursTimeZone: "America/New_York",
  hoursLabel: "Eastern Time (ET)",
  /** Machine-readable opening hours, keyed by JS `getDay()` (0 = Sunday). */
  hoursByDay: {
    0: null,
    1: { open: 9, close: 20 },
    2: { open: 9, close: 20 },
    3: { open: 9, close: 20 },
    4: { open: 9, close: 20 },
    5: { open: 9, close: 20 },
    6: { open: 10, close: 18 },
  } as Record<number, { open: number; close: number } | null>,

  /** ---- Standing disclosures (§27, §29, §7 of the brand specification) ---- */

  /** Supplier disclosure, shown on service, booking and legal surfaces. */
  supplierDisclosure:
    "Flight Bizz provides an online platform for searching and booking travel services. Depending on the selected service, fulfillment may be provided by an airline, hotel, rental company, activity operator, travel supplier, booking provider, or other third-party service provider. Applicable supplier terms and conditions may apply.",

  /** Short-form disclaimer used in footers and beneath forms. */
  disclaimer:
    "Flight Bizz is a multi-service online travel platform operated by GlobeVista LLC. We are not an airline, hotel, rental company or activity operator, and we are not affiliated with or endorsed by any supplier unless specifically stated. Availability, prices and booking conditions are determined by the applicable travel supplier.",

  /** Pricing disclosure required on every results/quote surface. */
  pricingNotice:
    "Prices and availability are subject to change until the applicable booking is confirmed.",

  /** How the platform actually works. Prevents any implied instant-booking claim. */
  bookingNotice:
    "Flight Bizz does not display live supplier inventory on this website. Tell us what you need and a travel specialist sources current options, then confirms availability, the total price and the cancellation terms with you before any booking is made.",

  /** Truthful accreditation position. Never soften or omit this. */
  accreditationNotice:
    "Flight Bizz does not hold IATA or ARC accreditation. We do not act as an airline, an accredited ticketing agency or an authorized agent of any airline, and we make no claim to any certification, government approval or supplier partnership we do not hold.",

  /** ---- Navigation ---- */
  nav: [
    { label: "About", href: "/about" },
    { label: "Business Travel", href: "/business-travel" },
    { label: "Group Travel", href: "/group-travel" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  /** Calls to action used consistently across the platform. */
  cta: {
    primary: "Search & Book",
    secondary: "Call for Assistance",
    callback: "Request a Callback",
    help: "Need Help? Call Us",
    mobileCall: "Call",
  },

  /** ---- The six travel categories ---- */
  services: [
    {
      key: "flights",
      shortName: "Flights",
      name: "Flights",
      href: "/flights",
      icon: "plane",
      description: "Domestic and international air travel: one way, round trip and multi-city.",
      intro:
        "Tell us your route, dates and cabin, and a travel specialist sources current fares across the supplier network, including flexible dates, nearby airports and direct-only options where they help.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    },
    {
      key: "hotels",
      shortName: "Hotels",
      name: "Hotels & Stays",
      href: "/hotels",
      icon: "bed",
      description: "Rooms, apartments and resorts, with the cancellation terms stated up front.",
      intro:
        "Share your destination, dates and room requirements. We come back with properties that match your budget and location, each with the room type, what is included, the taxes and fees, and the cancellation conditions set out clearly.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    },
    {
      key: "cars",
      shortName: "Cars",
      name: "Car Rentals",
      href: "/cars",
      icon: "car",
      description: "Rental vehicles at airports and in city centers, worldwide.",
      intro:
        "Give us your pickup and drop-off points, dates and driver age. We return vehicle options with the supplier, transmission, mileage terms, deposit and insurance details confirmed before you commit.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      key: "transfers",
      shortName: "Transfers",
      name: "Airport Transfers",
      href: "/transfers",
      icon: "route",
      description: "Private and shared transfers between airports, hotels and city addresses.",
      intro:
        "Airport to hotel, hotel to airport, private or shared. Tell us the flight, the address and the party size, and we arrange a transfer with the provider, vehicle, capacity and pickup instructions confirmed in advance.",
      image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      key: "activities",
      shortName: "Activities",
      name: "Tours & Activities",
      href: "/activities",
      icon: "sparkles",
      description: "City tours, attractions, day trips and food and culture experiences.",
      intro:
        "From museum entry to a full day trip, tell us who is traveling and what they enjoy. Each option comes back with the operator, duration, what is included and excluded, and the cancellation rules.",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    },
    {
      key: "packages",
      shortName: "Packages",
      name: "Vacation Packages",
      href: "/packages",
      icon: "briefcase",
      description: "Flights, stays, transfers and activities arranged as one coordinated trip.",
      intro:
        "Beach, family, honeymoon, city break or something longer. We build the trip around your dates and budget and set out exactly what is included, what is not, and how each element can be changed or cancelled.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
  ] as Service[],

  /** Popular destinations shown on the home page. */
  destinations: [
    { city: "New York", country: "United States", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80" },
    { city: "London", country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80" },
    { city: "Dubai", country: "United Arab Emirates", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80" },
    { city: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80" },
    { city: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80" },
    { city: "Los Angeles", country: "United States", image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1000&q=80" },
    { city: "Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80" },
    { city: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80" },
  ] as Destination[],

  flightCategories: [
    { name: "Domestic Flights", description: "Air travel within the United States, arranged around your dates and preferred routing." },
    { name: "International Flights", description: "Worldwide routes across the supplier network, including long-haul and connecting itineraries." },
    { name: "One-Way Journeys", description: "Single-leg travel planned around the date and departure time that suits you." },
    { name: "Round Trip", description: "Return itineraries coordinated across your outbound and inbound plans." },
    { name: "Multi-City", description: "Complex, multi-stop routing handled as a single itinerary rather than separate bookings." },
    { name: "Cabin Class Options", description: "Economy, Premium Economy, Business and First, with the fare conditions for each explained." },
  ] as ServiceCategory[],

  /** Genuine reasons to choose the platform. No accreditation or award claims. */
  whyChooseUs: [
    { title: "Everything in one place", description: "Flights, hotels, cars, transfers, activities and packages arranged through a single point of contact.", icon: "globe" },
    { title: "Transparent pricing", description: "The total price, taxes, fees and any service charge are set out before you are asked to confirm anything.", icon: "file-check" },
    { title: "Online or by phone", description: "Search and request online whenever it suits you, or call and talk it through with a travel specialist.", icon: "headset" },
    { title: "Clear cancellation terms", description: "The applicable supplier's change, cancellation and refund conditions are stated before booking, not after.", icon: "shield-check" },
    { title: "Support after booking", description: "Help with changes, cancellations and refund requests for as long as your trip is live.", icon: "phone" },
    { title: "Named suppliers", description: "You always know which airline, hotel, rental company or operator is fulfilling your booking.", icon: "building" },
  ] as ValuePoint[],

  /** Trust bar. Legitimate assurances only (§29). */
  trust: [
    { icon: "file-check", title: "Transparent pricing", detail: "Total price, taxes, fees and any service charge shown before you confirm." },
    { icon: "shield-check", title: "Clear cancellation terms", detail: "Supplier change, cancellation and refund conditions stated up front." },
    { icon: "headset", title: "Real travel specialists", detail: "Search online, or call and speak with a person during support hours." },
    { icon: "building", title: "Named suppliers", detail: "You always know who is fulfilling your booking before it is made." },
  ] as { icon: string; title: string; detail: string }[],

  /** FAQ. The specification answers, kept truthful (§30). */
  faqs: [
    {
      q: "What is Flight Bizz?",
      a: "Flight Bizz is a multi-service online travel platform operated by GlobeVista LLC. We help travelers search, compare and arrange flights, hotels, car rentals, airport transfers, tours and activities, and vacation packages.",
    },
    {
      q: "What can I book?",
      a: "Depending on available supplier arrangements, customers may be able to book flights, hotels, cars, transfers, activities and vacation packages. The services and options available for your dates are confirmed by a travel specialist before booking.",
    },
    {
      q: "Is Flight Bizz an airline?",
      a: "No. Flight Bizz is an online travel platform. We do not own or operate aircraft, hotels, rental fleets or activity operations.",
    },
    {
      q: "Who provides my travel service?",
      a: "The applicable airline, hotel, rental company, activity operator or other supplier identified during the booking process. That supplier's own terms and conditions apply to your booking.",
    },
    {
      q: "Does Flight Bizz have IATA or ARC accreditation?",
      a: "No. Flight Bizz does not hold IATA or ARC accreditation, and we do not act as an accredited ticketing agency or an authorized agent of any airline. Travel is arranged through third-party suppliers and booking providers.",
    },
    {
      q: "Are prices guaranteed?",
      a: "No. Prices and availability may change until the applicable booking is confirmed. The price we confirm with you before booking is the price that applies.",
    },
    {
      q: "Do you show live availability on the website?",
      a: "No. This website does not display live supplier inventory. When you send a search request, a travel specialist checks current availability and pricing and comes back to you with real options.",
    },
    {
      q: "Can I get help by phone?",
      a: "Yes. You can call Flight Bizz using the customer-support number shown on this site during our published support hours, or request a callback at any time.",
    },
    {
      q: "Do I have to call to book?",
      a: "No. You can send everything you need online and never pick up the phone. Calling is an option, not a requirement.",
    },
    {
      q: "How do I change or cancel a booking?",
      a: "Contact our support team with your booking reference. Changes and cancellations are subject to the applicable supplier's policy and any fees that policy sets, which we will confirm with you before acting on the request.",
    },
    {
      q: "How are refunds processed?",
      a: "Refund eligibility is determined by the supplier's rules and cancellation policy for your booking. Where a refund is due, we submit and track the request with the supplier and keep you updated until it is completed.",
    },
    {
      q: "Which payment methods can I use?",
      a: "Accepted payment methods depend on the supplier and the payment provider connected to your booking. The payment method, total amount and currency are confirmed with you before any payment is taken.",
    },
    {
      q: "Are there service fees?",
      a: "Any service fee that applies to your booking is stated before you are asked to confirm. We do not add charges after confirmation.",
    },
    {
      q: "Who operates Flight Bizz?",
      a: "Flight Bizz is operated by GlobeVista LLC. Flight Bizz is a trading brand, not a separate legal entity.",
    },
    {
      q: "What should I do if there is a problem with a payment?",
      a: "Please contact our support team first. We aim to resolve payment and booking issues quickly and directly, before a chargeback becomes necessary.",
    },
  ] as Faq[],

  /** Footer navigation, grouped into four columns. */
  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Flights", href: "/flights" },
        { label: "Hotels", href: "/hotels" },
        { label: "Car rentals", href: "/cars" },
        { label: "Airport transfers", href: "/transfers" },
        { label: "Tours and activities", href: "/activities" },
        { label: "Vacation packages", href: "/packages" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Flight Bizz", href: "/about" },
        { label: "Business travel", href: "/business-travel" },
        { label: "Group travel", href: "/group-travel" },
        { label: "Build your trip", href: "/trip-planner" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact us", href: "/contact" },
        { label: "Request a callback", href: "/callback" },
        { label: "Help and FAQ", href: "/faq" },
        { label: "Refunds and cancellation", href: "/refund-policy" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms and conditions", href: "/terms" },
        { label: "Privacy policy", href: "/privacy" },
        { label: "Refund policy", href: "/refund-policy" },
        { label: "Cookie policy", href: "/cookie-policy" },
      ],
    },
  ] as FooterColumn[],

  legalLinks: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refunds & Cancellation", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  seo: {
    defaultTitle: "Flight Bizz | Online Travel Booking Platform",
    titleTemplate: "%s | Flight Bizz",
    description:
      "Search, compare, and book flights, hotels, cars, transfers, activities, and travel packages with Flight Bizz, operated by GlobeVista LLC.",
    ogImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    locale: "en_US",
  },
} as const;

export type SiteConfig = typeof site;

/** The six travel categories, addressable by key. */
export const serviceByKey = Object.fromEntries(site.services.map((s) => [s.key, s])) as Record<
  Service["key"],
  Service
>;

/** `tel:` href for the support number. Empty when no number is configured. */
export const telHref = site.contact.hasPhone ? `tel:${site.company.phoneHref}` : "";
/** `mailto:` href for support. Empty when no address is configured. */
export const mailtoHref = site.contact.hasEmail ? `mailto:${site.company.supportEmail}` : "";
