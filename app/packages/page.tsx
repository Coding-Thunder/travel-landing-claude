import { serviceByKey, site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.packages;

const DESCRIPTION =
  "Vacation packages from Flight Bizz — beach, family, honeymoon, luxury, adventure and city-break trips combining flights, stays, transfers and activities, with inclusions and cancellation terms stated per element. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Vacation Packages — Flights, Stays & More",
  description: DESCRIPTION,
  path: "/packages",
  image: service.image,
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vacation Packages", path: "/packages" },
          ]),
          serviceSchema({ name: "Vacation Packages", description: DESCRIPTION, path: "/packages" }),
        ]}
      />

      <ServicePage
        service={service}
        eyebrow="Vacation Packages"
        title="The whole trip, planned around you"
        subtitle="Flights, stays, transfers and activities arranged together — with each element priced and its own cancellation terms stated separately, so you always know where you stand."
        enquiryHeading="Request a package quote"
        arrange={[
          {
            icon: "sparkles",
            title: "Built to your brief",
            body: "Destination, dates, budget and the kind of trip you want. We plan around all four rather than fitting you into a fixed departure.",
          },
          {
            icon: "plane",
            title: "Flights that fit the stay",
            body: "Arrival and departure timed so you are not paying for a night you cannot use or leaving before the last day is worth having.",
          },
          {
            icon: "bed",
            title: "Stays that match the trip",
            body: "Location, board basis and room type chosen for how you actually intend to spend the time there.",
          },
          {
            icon: "route",
            title: "Transfers included where they help",
            body: "Airport transfers and inter-destination travel folded in so there is no scramble on arrival.",
          },
          {
            icon: "file-check",
            title: "Priced element by element",
            body: "You see what each part costs, not one opaque number — so you can add, drop or trade up with a clear view.",
          },
          {
            icon: "shield-check",
            title: "Terms stated per element",
            body: "Where different parts of a trip cannot be combined into one transaction, we separate them clearly rather than implying a single package booking.",
          },
        ]}
        categories={[
          { name: "Beach Holidays", description: "Coastal and island stays, from a long weekend to a fortnight." },
          { name: "Family Holidays", description: "Trips built around the ages travelling and the space you need." },
          { name: "Honeymoon", description: "Longer, slower trips with the extras arranged in advance." },
          { name: "Luxury Travel", description: "Premium cabins, higher-specification stays and private transfers." },
          { name: "Adventure", description: "Active itineraries combining travel, stays and guided experiences." },
          { name: "City Breaks & Weekend Trips", description: "Short trips where flight timing does most of the work." },
        ]}
        confirmedBeforeBooking={[
          "Destination, dates and total trip duration",
          "Each flight, with airline, times and cabin",
          "Each property, with room type and board basis",
          "Transfers and activities included",
          "A full list of what is included",
          "A full list of what is not included",
          "Total price in your currency, with each element itemised",
          "Cancellation and change terms for each element separately",
        ]}
        faqs={site.faqs.filter((f) =>
          ["What can I book?", "Are prices guaranteed?", "Who provides my travel service?", "How do I change or cancel a booking?"].includes(f.q)
        )}
      />
    </>
  );
}
