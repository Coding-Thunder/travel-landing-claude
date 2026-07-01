import Link from "next/link";
import type { Airport } from "@/config/airports";
import CardImage from "./ui/CardImage";

export default function AirportCard({
  airport,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  airport: Airport;
  sizes?: string;
}) {
  return (
    <Link
      href={`/airports/${airport.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <CardImage
        src={airport.image}
        alt={`${airport.name} car rental`}
        gradient={airport.gradient}
        sizes={sizes}
        overlay
        className="transition duration-500 group-hover:scale-105"
      />
      <div className="relative p-4 text-white">
        <span className="inline-flex items-center rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide backdrop-blur">
          {airport.iata}
        </span>
        <h3 className="mt-2 text-lg font-extrabold leading-tight">{airport.city}</h3>
        <p className="text-xs text-white/75">from ${airport.priceFrom}/day</p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition group-hover:gap-1.5">
          Explore {airport.iata} rentals
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
