/**
 * TripReservations.co.uk — single source of truth.
 *
 * BUSINESS MODEL: independent UK travel reservation ASSISTANCE (hotel-focused).
 * We are NOT an airline, OTA, hotel chain, or car rental company, and we do NOT
 * claim ATOL / IATA accreditation or official partnerships. All copy must stay
 * consistent with that model. Company identity fields below are REPLACEABLE
 * PLACEHOLDERS — replace with the real registered details before launch.
 */

export type NavItem = { label: string; href: string };
export type FooterColumn = { title: string; links: NavItem[] };
export type Faq = { q: string; a: string };
export type HotelCategory = { name: string; description: string; image: string };
export type ValuePoint = { title: string; description: string; icon: string };

export const site = {
  name: "TripReservations",
  legalName: "TripReservations.co.uk",
  domain: "tripreservations.co.uk",
  url: "https://tripreservations.co.uk",
  tagline: "Professional hotel reservation assistance",

  /** ---- Replace these placeholders with the real registered details ---- */
  company: {
    registeredName: "[Registered company name]",
    companyNumber: "[Company registration number]",
    registeredOffice: "26 Zetland Place, Leeds, England, LS8 5PJ",
    address: {
      street: "26 Zetland Place",
      city: "Leeds",
      region: "England",
      postcode: "LS8 5PJ",
      country: "GB",
    },
    supportEmail: "contact@tripreservations.co.uk",
    phone: "+44 7404 925908",
    phoneHref: "+447404925908",
  },

  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  /** Business-model disclaimer shown across the site (UK English, no invented claims). */
  disclaimer:
    "TripReservations.co.uk is an independent travel reservation service. We are not affiliated with or endorsed by any airline, hotel chain or vehicle rental company unless specifically stated. Reservation availability, pricing and supplier policies are determined by the respective travel supplier.",

  hotelNotice:
    "TripReservations.co.uk provides hotel reservation assistance and customer support. Availability, pricing and booking conditions are subject to the accommodation supplier's policies.",

  nav: [
    { label: "Hotels", href: "/hotels" },
    { label: "Business Travel", href: "/business-travel" },
    { label: "Group Travel", href: "/group-travel" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  hotelCategories: [
    { name: "Budget Hotels", description: "Comfortable, cost-conscious stays for travellers who want value without compromise.", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Business Hotels", description: "Well-connected properties with the workspaces, connectivity and convenience business travel demands.", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80" },
    { name: "Luxury Hotels", description: "Five-star properties and refined resorts for travellers seeking a premium experience.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" },
    { name: "Airport Hotels", description: "Conveniently located accommodation for early departures, late arrivals and connecting journeys.", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
    { name: "Family Resorts", description: "Spacious, amenity-rich resorts designed around families travelling together.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80" },
    { name: "Extended Stay Hotels", description: "Apartment-style accommodation with the space and facilities longer trips require.", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
    { name: "Boutique Hotels", description: "Characterful, independently minded properties with a distinctive sense of place.", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80" },
  ] as HotelCategory[],

  whyChooseUs: [
    { title: "Worldwide accommodation options", description: "Assistance with hotel reservation requests across a wide range of international and domestic destinations.", icon: "globe" },
    { title: "Personalised recommendations", description: "Suggestions matched to your requirements, preferences and budget by experienced reservation specialists.", icon: "sparkles" },
    { title: "Dedicated reservation assistance", description: "A responsive team to help before, during and after your reservation request.", icon: "headset" },
    { title: "Transparent reservation process", description: "Clear communication of conditions, supplier policies and any applicable service fees before confirmation.", icon: "shield-check" },
    { title: "Professional customer support", description: "Support by telephone, email and enquiry form during business hours.", icon: "phone" },
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
    { q: "What services do you provide?", a: "We provide travel reservation assistance with a focus on hotel and accommodation reservations, including business travel and group travel accommodation." },
    { q: "Do you operate internationally?", a: "Yes. We assist customers with accommodation reservation requests for many destinations worldwide, subject to supplier availability." },
    { q: "How do I request a reservation?", a: "Complete the online enquiry form and our reservation specialists will contact you with suitable accommodation options." },
    { q: "When will I receive my quote?", a: "Response times vary, but our team aims to respond as quickly as possible during business hours." },
    { q: "Can I modify my reservation?", a: "Changes depend on the accommodation supplier's policies and the conditions applicable to your reservation." },
    { q: "Can I cancel my reservation?", a: "Cancellation requests are handled according to the supplier's cancellation policy." },
    { q: "How are refunds processed?", a: "Refund eligibility depends on the supplier's rules and cancellation policy. We assist customers throughout the refund process wherever possible." },
    { q: "Which payment methods do you accept?", a: "Accepted payment methods may include Visa, Mastercard, American Express, Apple Pay and Google Pay, depending on availability." },
    { q: "Is my payment secure?", a: "We use secure technology to help protect your information during the payment process." },
    { q: "Are prices guaranteed?", a: "Prices and availability may change until the reservation is confirmed by the accommodation supplier." },
    { q: "Do you charge service fees?", a: "Any applicable service fees will be clearly communicated before confirmation." },
    { q: "Can you help with group travel?", a: "Yes. We assist with corporate groups, family travel and other group accommodation requests." },
    { q: "Do you provide business travel services?", a: "Yes. We assist companies and business travellers with accommodation reservation planning." },
    { q: "How can I contact customer support?", a: "You can contact us by telephone, email or the online enquiry form during business hours." },
    { q: "What should I do before contacting my bank about a payment issue?", a: "Please contact our customer support team first. We are committed to resolving issues quickly and professionally before a chargeback becomes necessary." },
  ] as Faq[],

  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Hotel Reservations", href: "/hotels" },
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
    defaultTitle: "TripReservations.co.uk — Professional Hotel Reservation Assistance",
    titleTemplate: "%s | TripReservations.co.uk",
    description:
      "TripReservations.co.uk provides professional hotel reservation assistance for leisure, business and group travel through a trusted supplier network. Request a personalised quote today.",
    ogImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    locale: "en_GB",
  },
} as const;

export type SiteConfig = typeof site;
