import Link from "next/link";
import { airports } from "@/config/airports";
import { Section, SectionHeading } from "./ui/Section";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";
import AirportCard from "./AirportCard";

export default function PopularAirports() {
  return (
    <Section id="airports">
      <SectionHeading
        eyebrow="Popular airport car rentals"
        title="Rent at the country's busiest airports"
        subtitle="Counter and curbside pickup at the airports travelers ask for most. Tap through for local pickup tips, nearby drives and rates."
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/airports">
              All locations
              <Icon name="arrowRight" />
            </Link>
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {airports.map((a) => (
          <AirportCard key={a.iata} airport={a} />
        ))}
      </div>
    </Section>
  );
}
