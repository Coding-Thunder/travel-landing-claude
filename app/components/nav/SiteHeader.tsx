import { airports } from "@/config/airports";
import { vehicleCategories } from "@/config/vehicles";
import { allPosts, categories } from "@/lib/blog";
import SiteNav from "./SiteNav";

/** Server wrapper: computes lightweight menu data so post bodies stay off the client. */
export default function SiteHeader() {
  return (
    <SiteNav
      airports={airports.map((a) => ({ iata: a.iata, city: a.city, slug: a.slug }))}
      vehicles={vehicleCategories.map((v) => ({ name: v.name, slug: v.slug, priceFrom: v.priceFrom }))}
      guides={allPosts.slice(0, 5).map((p) => ({ title: p.title, slug: p.slug }))}
      categories={categories().map((c) => ({ label: c.label, slug: c.slug }))}
    />
  );
}
