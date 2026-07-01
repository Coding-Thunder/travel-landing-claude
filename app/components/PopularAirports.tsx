import Link from "next/link";
import { airports } from "@/config/airports";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import AirportCard from "./AirportCard";

export default function PopularAirports() {
  return (
    <Section id="airports" tone="gray">
      <SectionHeading
        eyebrow="Popular airport car rentals"
        title="Rent at the country's busiest airports"
        subtitle="Counter and curbside pickup at the airports travelers ask for most. Tap through for local pickup tips, nearby drives and rates."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {airports.map((a, i) => (
          <Reveal key={a.iata} delay={(i % 4) * 0.05}>
            <AirportCard airport={a} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <Link
          href="/airports"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-[var(--shadow-card)] transition hover:border-brand-200 hover:text-brand-700"
        >
          View all airport locations
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </Reveal>
    </Section>
  );
}
