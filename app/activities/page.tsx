import { serviceByKey, site } from "@/config/site";
import { pageMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import JsonLd from "@/app/components/trip/json-ld";
import ServicePage from "@/app/components/trip/service-page";

const service = serviceByKey.activities;

const DESCRIPTION =
  "Explore experiences with Flight Bizz: city tours, attractions, museums, adventure, family activities, food experiences, cruises and day trips, with operator, inclusions and cancellation rules confirmed before booking. Operated by GlobeVista LLC.";

export const metadata = pageMetadata({
  title: "Tours & Activities: Explore Experiences",
  description: DESCRIPTION,
  path: "/activities",
  image: service.image,
});

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours & Activities", path: "/activities" },
          ]),
          serviceSchema({ name: "Tours & Activities", description: DESCRIPTION, path: "/activities" }),
        ]}
      />

      <ServicePage
        service={service}
        title="Explore experiences"
        description="City tours, museums, day trips and food experiences, with the operator named, the inclusions listed and the cancellation rules stated before you book."
        tags={["City tours", "Attractions", "Museums", "Adventure", "Family", "Food", "Cruises", "Day trips"]}
        enquiryHeading="Request experience options"
        arrange={[
          {
            title: "Matched to your dates",
            body: "We check what actually runs while you are there, including seasonal and weekday-only departures.",
          },
          {
            title: "Right for your party",
            body: "Age limits, mobility requirements, difficulty level and family suitability confirmed before booking.",
          },
          {
            title: "Inclusions and exclusions",
            body: "Entry tickets, guide, meals and transport listed per option, and just as clearly what is not included.",
          },
          {
            title: "Duration and meeting point",
            body: "Start time, total duration and exactly where to meet, so the day around it can be planned properly.",
          },
          {
            title: "Cancellation rules",
            body: "The operator's cancellation window and weather policy stated before you commit.",
          },
          {
            title: "Named operators",
            body: "You always know which operator is running the experience and whose terms apply to it.",
          },
        ]}
        categories={[
          { name: "City Tours", description: "Guided walking, bus and private tours of the places you are visiting." },
          { name: "Attractions & Museums", description: "Entry tickets and timed slots for major sites and galleries." },
          { name: "Adventure", description: "Hiking, diving, climbing and other active experiences." },
          { name: "Family Activities", description: "Theme parks, wildlife and experiences that work with children." },
          { name: "Food Experiences", description: "Tasting tours, cooking classes and market walks." },
          { name: "Cruises & Day Trips", description: "Harbour cruises, island hopping and full-day excursions." },
        ]}
        confirmedBeforeBooking={[
          "Experience title, location and operator",
          "Date, start time and total duration",
          "Language the experience is delivered in",
          "What is included in the price",
          "What is not included",
          "Age, mobility and fitness requirements",
          "Total price in your currency, including taxes and fees",
          "The operator's cancellation and weather policy",
        ]}
        faqs={site.faqs.filter((f) =>
          ["Who provides my travel service?", "Do you show live availability on the website?", "Are prices guaranteed?", "How are refunds processed?"].includes(f.q)
        )}
      />
    </>
  );
}
