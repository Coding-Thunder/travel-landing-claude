import { site, serviceByKey } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.flights;

const DESCRIPTION =
  "Search and book flights with Flight Bizz — domestic and international, one way, round trip and multi-city, across Economy, Premium Economy, Business and First. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Flights — Search & Book Air Travel",
  description: DESCRIPTION,
  path: "/flights",
  image: service.image,
});

export default function FlightsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Flights", path: "/flights" },
          ]),
          serviceSchema({ name: "Flights", description: DESCRIPTION, path: "/flights" }),
        ]}
      />

      <ServicePage
        service={service}
        eyebrow="Flights"
        title="Flights, searched and booked properly"
        subtitle="One way, round trip or multi-city — with the fare conditions, baggage allowance and change rules explained before you commit."
        enquiryHeading="Request flight options"
        arrange={[
          {
            icon: "route",
            title: "Every itinerary shape",
            body: "One way, round trip, multi-city and open-jaw routing, planned as a single booking rather than a stack of separate tickets.",
          },
          {
            icon: "calendar-check",
            title: "Flexible dates & nearby airports",
            body: "Ask us to look either side of your dates or at alternative airports, and we will show you what the difference actually costs.",
          },
          {
            icon: "briefcase",
            title: "Every cabin",
            body: "Economy, Premium Economy, Business and First — with the fare rules that come with each, not just the headline price.",
          },
          {
            icon: "file-check",
            title: "Baggage and fare conditions",
            body: "Cabin and checked allowance, seat selection, changes and refundability, set out before you decide rather than discovered later.",
          },
          {
            icon: "users",
            title: "Families and groups",
            body: "Adults, children and infants on one itinerary, with seating requests and any assistance needs passed to the airline.",
          },
          {
            icon: "headset",
            title: "Help after ticketing",
            body: "Schedule changes, cancellations and refund requests handled with the airline on your behalf.",
          },
        ]}
        categories={site.flightCategories}
        confirmedBeforeBooking={[
          "The operating airline and flight numbers for every leg",
          "Departure and arrival airports, times and total duration",
          "Number of stops and connection times",
          "Cabin class and the fare basis being held",
          "Cabin and checked baggage allowance",
          "Fare conditions — changes, cancellation and refundability",
          "Total price in your currency, including taxes and fees",
          "Any Flight Bizz service fee, stated separately",
        ]}
        faqs={site.faqs.filter((f) =>
          ["Are prices guaranteed?", "Who provides my travel service?", "Does Flight Bizz have IATA or ARC accreditation?", "Is Flight Bizz an airline?"].includes(f.q)
        )}
      />
    </>
  );
}
