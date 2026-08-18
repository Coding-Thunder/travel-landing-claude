import { serviceByKey, site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.cars;

const DESCRIPTION =
  "Rent a car with Flight Bizz: airport and city pickups worldwide, with supplier, transmission, mileage, deposit and insurance terms confirmed before booking. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Car Rentals: Rent a Car",
  description: DESCRIPTION,
  path: "/cars",
  image: service.image,
});

export default function CarsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Car Rentals", path: "/cars" },
          ]),
          serviceSchema({ name: "Car Rentals", description: DESCRIPTION, path: "/cars" }),
        ]}
      />

      <ServicePage
        service={service}
        title="Rent a car without the counter surprises"
        description="The deposit, the mileage limit, the fuel policy and what the insurance actually covers, agreed before you travel rather than at the desk."
        tags={["Economy", "SUV", "Van", "Premium", "Accessible", "One way rental"]}
        enquiryHeading="Request car rental options"
        arrange={[
          {
            title: "The right vehicle",
            body: "Seats, luggage space, transmission and fuel type matched to the trip, including larger vehicles for families and groups.",
          },
          {
            title: "Airport or city pickup",
            body: "In-terminal, shuttle or downtown collection, with one-way rentals arranged where the supplier permits them.",
          },
          {
            title: "Deposit stated in advance",
            body: "The security hold, the card requirements and who it must be in the name of, confirmed before you arrive.",
          },
          {
            title: "Insurance explained plainly",
            body: "What the included cover does and does not do, the excess you would be liable for, and what extra cover would change.",
          },
          {
            title: "Mileage and cross-border",
            body: "Mileage limits, fuel policy and whether the vehicle may be taken across a border, all confirmed for your itinerary.",
          },
          {
            title: "Driver requirements",
            body: "Minimum age, young-driver fees, license rules and additional drivers sorted before the booking is made.",
          },
        ]}
        categories={[
          { name: "Economy & Compact", description: "Low running costs for city driving and short trips." },
          { name: "Sedans", description: "Comfortable mid-size cars for longer routes and business travel." },
          { name: "SUVs & 4x4", description: "More space and ground clearance for families and rural driving." },
          { name: "Vans & Minibuses", description: "Seven seats and up for groups traveling together." },
          { name: "Premium & Luxury", description: "Higher-specification vehicles for special occasions." },
          { name: "Accessible Vehicles", description: "Adapted vehicles arranged where the supplier can provide them." },
        ]}
        confirmedBeforeBooking={[
          "Rental supplier and pickup / drop-off locations",
          "Vehicle category, seats, transmission and fuel type",
          "Pickup and drop-off dates and times",
          "Mileage allowance and fuel policy",
          "Security deposit and accepted payment cards",
          "Insurance included, the excess, and optional extra cover",
          "Total price in your currency, including taxes and fees",
          "Cancellation and no-show conditions",
        ]}
        faqs={site.faqs.filter((f) =>
          ["Are prices guaranteed?", "Who provides my travel service?", "How do I change or cancel a booking?", "Are there service fees?"].includes(f.q)
        )}
      />
    </>
  );
}
