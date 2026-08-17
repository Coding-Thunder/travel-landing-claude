import { serviceByKey, site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.hotels;

const DESCRIPTION =
  "Search and book hotels and stays with Flight Bizz — rooms, apartments and resorts worldwide, with room type, taxes, fees and cancellation conditions confirmed before booking. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Hotels & Stays — Search & Book Accommodation",
  description: DESCRIPTION,
  path: "/hotels",
  image: service.image,
});

export default function HotelsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Hotels & Stays", path: "/hotels" },
          ]),
          serviceSchema({ name: "Hotels & Stays", description: DESCRIPTION, path: "/hotels" }),
        ]}
      />

      <ServicePage
        service={service}
        eyebrow="Hotels & Stays"
        title="Somewhere to stay, on terms you can see"
        subtitle="Rooms, apartments and resorts — with what is included, what it really costs and how late you can cancel, all stated before you book."
        enquiryHeading="Request hotel options"
        arrange={[
          {
            icon: "map-pin",
            title: "Location that actually works",
            body: "We match properties to where you need to be — near the venue, the beach, the station — not just to a city name.",
          },
          {
            icon: "bed",
            title: "The right room type",
            body: "Bed configuration, occupancy, connecting rooms and accessibility needs confirmed with the property before booking.",
          },
          {
            icon: "file-check",
            title: "Total price, not a teaser rate",
            body: "Resort fees, city taxes and other charges are included in the figure we quote, so the total does not move at check-in.",
          },
          {
            icon: "shield-check",
            title: "Cancellation terms up front",
            body: "Free-cancellation deadlines and non-refundable rates are flagged clearly so you can weigh flexibility against price.",
          },
          {
            icon: "sparkles",
            title: "What is included",
            body: "Breakfast, Wi-Fi, parking, resort access — stated per option, so comparisons are like for like.",
          },
          {
            icon: "headset",
            title: "Changes handled for you",
            body: "Date changes, room changes and cancellations raised with the property and tracked until resolved.",
          },
        ]}
        categories={[
          { name: "City Hotels", description: "Central properties for business trips, weekends and stopovers." },
          { name: "Resorts", description: "All-inclusive and half-board resorts for longer beach or family stays." },
          { name: "Apartments & Aparthotels", description: "Self-catering space for families, longer stays and relocations." },
          { name: "Airport Hotels", description: "Convenient stays for early departures and long connections." },
          { name: "Boutique & Luxury", description: "Smaller design-led properties and premium hotels for special trips." },
          { name: "Extended Stay", description: "Weekly and monthly rates for project work and longer assignments." },
        ]}
        confirmedBeforeBooking={[
          "Property name, address and star rating where the property publishes one",
          "Room type, bed configuration and maximum occupancy",
          "Check-in and check-out dates and times",
          "Board basis and what is included in the rate",
          "Amenities relevant to your stay",
          "Taxes, resort and city fees, shown separately",
          "Total price in your currency",
          "The property's cancellation and no-show policy",
        ]}
        faqs={site.faqs.filter((f) =>
          ["Are prices guaranteed?", "Do you show live availability on the website?", "Who provides my travel service?", "How do I change or cancel a booking?"].includes(f.q)
        )}
      />
    </>
  );
}
