import Link from "next/link";
import type { VehicleCategory } from "@/config/vehicles";
import CardImage from "./ui/CardImage";
import ClassIllustration from "./ui/ClassIllustration";
import Icon from "./ui/Icon";
import { Badge } from "@/components/ui/badge";

/**
 * Vehicle class card. Bordered rather than image-led, so a grid of classes
 * reads as a comparison table rather than a gallery.
 */
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
      className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        {vehicle.image ? (
          <CardImage
            src={vehicle.image}
            alt=""
            gradient={vehicle.gradient}
            sizes={sizes}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ClassIllustration slug={vehicle.slug} name={vehicle.name} />
        )}
        <Badge variant="default" className="absolute left-2.5 top-2.5">
          from ${vehicle.priceFrom}/day
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-medium">{vehicle.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Icon name="users" className="h-4 w-4" />
            {vehicle.seats}
          </span>
        </div>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{vehicle.blurb}</p>
        <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
          View {vehicle.name} rentals
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
