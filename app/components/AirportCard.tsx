import Link from "next/link";
import type { Airport } from "@/config/airports";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";

/**
 * Airport location card.
 *
 * The image-led treatment is reserved for places, where a photograph carries
 * real information about the destination. Everything else on the site uses
 * bordered cards.
 */
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
      className="group relative flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <CardImage
        src={airport.image}
        alt=""
        gradient={airport.gradient}
        sizes={sizes}
        overlay
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="relative p-3.5 text-white">
        <span className="inline-flex items-center rounded-sm bg-white/20 px-1.5 py-0.5 font-mono text-[11px] font-medium backdrop-blur">
          {airport.iata}
        </span>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-tight">{airport.city}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/75">
          from ${airport.priceFrom}/day
          <Icon name="chevronRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}
