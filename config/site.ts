/**
 * UniversalTicketss — single source of truth.
 *
 * BUSINESS MODEL: independent US travel reservation ASSISTANCE covering flights,
 * hotels and car rentals. We are NOT an airline, OTA, hotel chain or car rental
 * company, and we do NOT claim IATA / ARC accreditation, official partnerships,
 * price guarantees or awards. All copy must stay consistent with that model.
 * Company identity fields below are REPLACEABLE PLACEHOLDERS.
 */

export type NavItem = { label: string; href: string };
export type FooterColumn = { title: string; links: NavItem[] };
export type Faq = { q: string; a: string };
export type ImageCategory = { name: string; description: string; image: string };
export type ServiceCategory = { name: string; description: string };
export type ServiceOverview = { name: string; href: string; description: string; image: string };
export type Destination = { city: string; state: string; image: string };
export type ValuePoint = { title: string; description: string; icon: string };

export const site = {
  name: "UniversalTicketss",
  legalName: "UniversalTicketss",
  domain: "universalticketss.com",
  url: "https://universalticketss.com",
  tagline: "Flight, hotel and car rental reservations — one call away",

  /** ---- Replace these placeholders with the real registered details ---- */
  company: {
    registeredName: "[Registered business name]",
    companyNumber: "[Business registration number]",
    registeredOffice: "[Business address]",
    address: {
      street: "[Street address]",
      city: "[City]",
      region: "[State]",
      postcode: "[ZIP]",
      country: "US",
    },
    supportEmail: "reservation@universalticketss.com",
    phone: "+1 (888) 929-4399",
    phoneHref: "+18889294399",
  },

  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  /** Business-model disclaimer shown across the site (no invented claims). */
  disclaimer:
    "UniversalTicketss is an independent travel reservation service. We are not affiliated with or endorsed by any airline, hotel chain or vehicle rental company unless specifically stated. Reservation availability, pricing and supplier policies are determined by the respective travel supplier.",

  flightNotice:
    "UniversalTicketss provides travel reservation assistance and customer support. Flight availability, pricing and booking conditions are subject to the travel supplier's policies.",
  hotelNotice:
    "UniversalTicketss provides hotel reservation assistance and customer support. Availability, pricing and booking conditions are subject to the accommodation supplier's policies.",
  carNotice:
    "Vehicle availability, rental conditions, deposits and cancellation terms are determined by the respective vehicle rental supplier.",

  nav: [
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    { label: "Car Rentals", href: "/car-rentals" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  /** The three core services. */
  services: [
    {
      name: "Flights",
      href: "/flights",
      description: "Reservation assistance for domestic and international flights — one-way, round trip and multi-city itineraries.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Hotels",
      href: "/hotels",
      description: "Accommodations for business, leisure and family travel, from value stays to luxury properties worldwide.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Car Rentals",
      href: "/car-rentals",
      description: "Vehicles for business trips, vacations and airport travel through our trusted supplier network.",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    },
  ] as ServiceOverview[],

  /** Popular US destinations shown on the home page. */
  destinations: [
    { city: "New York", state: "NY", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80" },
    { city: "Los Angeles", state: "CA", image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1000&q=80" },
    { city: "Las Vegas", state: "NV", image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1000&q=80" },
    { city: "Miami", state: "FL", image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=1000&q=80" },
    { city: "Chicago", state: "IL", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1000&q=80" },
    { city: "Orlando", state: "FL", image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1000&q=80" },
    { city: "Boston", state: "MA", image: "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=1000&q=80" },
    { city: "Houston", state: "TX", image: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?auto=format&fit=crop&w=1000&q=80" },
  ] as Destination[],

  flightCategories: [
    { name: "Domestic Flights", description: "Reservation assistance for flights within the United States." },
    { name: "International Flights", description: "Support with worldwide flight reservation requests across many destinations." },
    { name: "One-Way Reservations", description: "Single-leg journeys arranged around your dates and preferred routing." },
    { name: "Round Trip Reservations", description: "Return itineraries coordinated to suit your outbound and inbound plans." },
    { name: "Multi-City Travel", description: "Complex, multi-stop itineraries planned as a single reservation request." },
    { name: "Group Flight Requests", description: "Coordinated assistance for families, teams and corporate groups traveling together." },
    { name: "Business Travel Reservations", description: "Efficient, flexible flight assistance for individual and corporate business travel." },
  ] as ServiceCategory[],

  carCategories: [
    { name: "Economy Cars", description: "Cost-conscious vehicles for everyday driving and city travel." },
    { name: "Compact Cars", description: "Easy-to-manage vehicles with a balance of comfort and efficiency." },
    { name: "SUVs", description: "Spacious, versatile vehicles for families, groups and longer journeys." },
    { name: "Luxury Vehicles", description: "Premium vehicles for special occasions and executive travel." },
    { name: "Vans", description: "Larger vehicles for groups, luggage and moving requirements." },
    { name: "Family Vehicles", description: "Practical, roomy vehicles designed with families in mind." },
    { name: "Business Class Vehicles", description: "Refined vehicles suited to corporate and business travel." },
  ] as ServiceCategory[],

  carRentalServices: [
    { name: "Airport Pick-up", description: "Collect your vehicle conveniently on arrival at the airport." },
    { name: "Airport Drop-off", description: "Return your vehicle at the airport ahead of your departure." },
    { name: "City Rentals", description: "Flexible vehicle reservations for travel within towns and cities." },
    { name: "Long-Term Rentals", description: "Extended rental arrangements for longer trips and assignments." },
    { name: "Weekend Rentals", description: "Short-term vehicles for weekend breaks and getaways." },
    { name: "Business Rentals", description: "Reliable vehicle assistance for business travelers and companies." },
  ] as ServiceCategory[],

  hotelCategories: [
    { name: "Budget Hotels", description: "Comfortable, cost-conscious stays for travelers who want value without compromise.", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Business Hotels", description: "Well-connected properties with the workspaces, connectivity and convenience business travel demands.", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80" },
    { name: "Luxury Hotels", description: "Five-star properties and refined resorts for travelers seeking a premium experience.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" },
    { name: "Airport Hotels", description: "Conveniently located accommodations for early departures, late arrivals and connecting journeys.", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
    { name: "Family Resorts", description: "Spacious, amenity-rich resorts designed around families traveling together.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80" },
    { name: "Extended Stay Hotels", description: "Apartment-style accommodations with the space and facilities longer trips require.", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
    { name: "Boutique Hotels", description: "Characterful, independently minded properties with a distinctive sense of place.", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80" },
  ] as ImageCategory[],

  whyChooseUs: [
    { title: "Worldwide travel options", description: "Assistance with flight, hotel and car rental reservation requests across a wide range of destinations.", icon: "globe" },
    { title: "Personalized recommendations", description: "Suggestions matched to your requirements, preferences and budget by experienced reservation specialists.", icon: "sparkles" },
    { title: "Talk to a real person", description: "Skip the forms when you want to — call our reservation desk and speak with a specialist directly.", icon: "headset" },
    { title: "Transparent reservation process", description: "Clear communication of conditions, supplier policies and any applicable service fees before confirmation.", icon: "shield-check" },
    { title: "Support before and after booking", description: "Help with changes, questions and follow-up for as long as your itinerary is active.", icon: "phone" },
  ] as ValuePoint[],

  trust: [
    { title: "Secure Website", icon: "lock" },
    { title: "SSL Protected", icon: "shield-check" },
    { title: "Secure Online Payments", icon: "credit-card" },
    { title: "Professional Reservation Specialists", icon: "users" },
    { title: "Transparent Policies", icon: "file-check" },
    { title: "Dedicated Customer Support", icon: "headset" },
    { title: "Worldwide Travel Assistance", icon: "globe" },
  ],

  faqs: [
    { q: "What services do you provide?", a: "We provide travel reservation assistance for flights, hotels and car rentals, including business travel and group travel." },
    { q: "Do you operate internationally?", a: "Yes. We assist customers with travel reservation requests for many destinations worldwide, subject to supplier availability." },
    { q: "How do I request a reservation?", a: "Call our reservation desk or complete the online request form, and our specialists will contact you with suitable travel options." },
    { q: "When will I receive my quote?", a: "Response times vary, but our team aims to respond as quickly as possible during business hours." },
    { q: "Can I modify my reservation?", a: "Changes depend on the relevant travel supplier's policies and the conditions applicable to your reservation." },
    { q: "Can I cancel my reservation?", a: "Cancellation requests are handled according to the supplier's cancellation policy." },
    { q: "How are refunds processed?", a: "Refund eligibility depends on the supplier's rules and cancellation policy. We assist customers throughout the refund process wherever possible." },
    { q: "Which payment methods do you accept?", a: "Accepted payment methods may include Visa, Mastercard, American Express, Apple Pay and Google Pay, depending on availability." },
    { q: "Is my payment secure?", a: "We use secure technology to help protect your information during the payment process." },
    { q: "Are prices guaranteed?", a: "Prices and availability may change until the reservation is confirmed by the relevant travel supplier." },
    { q: "Do you charge service fees?", a: "Any applicable service fees will be clearly communicated before confirmation." },
    { q: "Can you help with group travel?", a: "Yes. We assist with corporate groups, family travel and other group travel reservation requests." },
    { q: "Do you provide business travel services?", a: "Yes. We assist companies and business travelers with flight, hotel and car rental reservation planning." },
    { q: "How can I contact customer support?", a: "You can contact us by telephone, email or the online request form during business hours." },
    { q: "What should I do before contacting my bank about a payment issue?", a: "Please contact our customer support team first. We are committed to resolving issues quickly and professionally before a chargeback becomes necessary." },
  ] as Faq[],

  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Flight Reservations", href: "/flights" },
        { label: "Hotel Reservations", href: "/hotels" },
        { label: "Car Rental Reservations", href: "/car-rentals" },
        { label: "Business Travel", href: "/business-travel" },
        { label: "Group Travel", href: "/group-travel" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Refund & Cancellation", href: "/refund-policy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ] as FooterColumn[],

  legalLinks: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund & Cancellation", href: "/refund-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  seo: {
    defaultTitle: "UniversalTicketss — Flight, Hotel & Car Rental Reservation Assistance",
    titleTemplate: "%s | UniversalTicketss",
    description:
      "UniversalTicketss provides professional travel reservation assistance for flights, hotels and car rentals through a trusted supplier network. Call +1 (888) 929-4399 or request a quote.",
    ogImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    locale: "en_US",
  },
} as const;

export type SiteConfig = typeof site;
