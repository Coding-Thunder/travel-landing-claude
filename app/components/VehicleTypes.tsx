import Link from "next/link";
import { vehicleCategories } from "@/config/vehicles";
import { Section, SectionHeading } from "./ui/Section";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";
import VehicleCard from "./VehicleCard";

export default function VehicleTypes() {
  return (
    <Section id="vehicles">
      <SectionHeading
        eyebrow="Vehicle categories"
        title="A car for every kind of trip"
        subtitle="Economy runabouts to seven-seat minivans and luxury sedans. Explore a class for models, pricing and tips. Then call for your best rate."
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/vehicles">
              Compare all types
              <Icon name="arrowRight" />
            </Link>
          </Button>
        }
      />

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {vehicleCategories.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} />
        ))}
      </div>
    </Section>
  );
}
