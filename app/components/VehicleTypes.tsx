import Link from "next/link";
import { vehicleCategories } from "@/config/vehicles";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import VehicleCard from "./VehicleCard";

export default function VehicleTypes() {
  return (
    <Section id="vehicles" tone="gray">
      <SectionHeading
        eyebrow="Vehicle categories"
        title="A car for every kind of trip"
        subtitle="Economy runabouts to seven-seat minivans and luxury sedans. Explore a class for models, pricing and tips — then call for your best rate."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {vehicleCategories.map((v, i) => (
          <Reveal key={v.slug} delay={(i % 4) * 0.05}>
            <VehicleCard vehicle={v} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-[var(--shadow-card)] transition hover:border-brand-200 hover:text-brand-700"
        >
          Compare all vehicle types
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </Reveal>
    </Section>
  );
}
