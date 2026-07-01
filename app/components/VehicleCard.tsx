import Link from "next/link";
import type { VehicleCategory } from "@/config/vehicles";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";

export default function VehicleCard({
  vehicle,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  vehicle: VehicleCategory;
  sizes?: string;
}) {
  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <CardImage
          src={vehicle.image}
          alt={`${vehicle.name} rental car`}
          gradient={vehicle.gradient}
          sizes={sizes}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
          from ${vehicle.priceFrom}/day
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">{vehicle.name}</h3>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <Icon name="users" className="h-4 w-4" />
            {vehicle.seats}
          </span>
        </div>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">{vehicle.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700 transition group-hover:gap-1.5">
          View {vehicle.name} rentals
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
