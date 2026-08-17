import { serviceByKey, site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.transfers;

const DESCRIPTION =
  "Book airport transfers with Flight Bizz — private and shared transfers between airports, hotels and city addresses, with provider, vehicle, capacity and pickup instructions confirmed in advance. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Airport Transfers — Private & Shared",
  description: DESCRIPTION,
  path: "/transfers",
  image: service.image,
});

export default function TransfersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Airport Transfers", path: "/transfers" },
          ]),
          serviceSchema({ name: "Airport Transfers", description: DESCRIPTION, path: "/transfers" }),
        ]}
      />

      <ServicePage
        service={service}
        eyebrow="Airport Transfers"
        title="Land, and know exactly who is meeting you"
        subtitle="Private or shared, airport to hotel or back again — with the provider, vehicle and pickup instructions in your hand before you fly."
        enquiryHeading="Request a transfer"
        arrange={[
          {
            icon: "plane",
            title: "Airport to hotel",
            body: "Meet-and-greet on arrival, with the driver holding your name and the pickup point stated in your confirmation.",
          },
          {
            icon: "clock",
            title: "Hotel to airport",
            body: "Departure timed against your flight and the route, with a pickup time we can justify rather than guess.",
          },
          {
            icon: "car",
            title: "Private transfers",
            body: "Your party only, direct to the address, in a vehicle sized for your group and its luggage.",
          },
          {
            icon: "users",
            title: "Shared transfers",
            body: "A lower-cost seat-in-vehicle option where it runs, with the realistic journey time stated up front.",
          },
          {
            icon: "shield-check",
            title: "Flight monitoring",
            body: "Where the provider offers it, your flight is tracked so a delayed arrival does not mean a missed pickup.",
          },
          {
            icon: "file-check",
            title: "Special requirements",
            body: "Child seats, wheelchair-accessible vehicles and extra luggage requested with the provider before booking.",
          },
        ]}
        categories={[
          { name: "Airport → Hotel", description: "Arrival transfers with meet-and-greet at the terminal." },
          { name: "Hotel → Airport", description: "Departure transfers timed against your flight." },
          { name: "Private Transfer", description: "Direct, your party only, in a vehicle sized to your group." },
          { name: "Shared Transfer", description: "Lower-cost shared vehicles where the route supports them." },
          { name: "Group Transfers", description: "Minibuses and coaches for teams, events and delegations." },
          { name: "Point-to-Point", description: "City, port and inter-hotel transfers beyond the airport run." },
        ]}
        confirmedBeforeBooking={[
          "Transfer provider and vehicle type",
          "Passenger and luggage capacity",
          "Pickup point and exact meeting instructions",
          "Pickup date, time and expected journey duration",
          "Whether the transfer is private or shared",
          "Total price in your currency, including taxes and fees",
          "Waiting time included and any charge beyond it",
          "Cancellation and no-show conditions",
        ]}
        faqs={site.faqs.filter((f) =>
          ["Who provides my travel service?", "Are prices guaranteed?", "How do I change or cancel a booking?", "Can I get help by phone?"].includes(f.q)
        )}
      />
    </>
  );
}
