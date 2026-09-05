import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Icon from "./ui/Icon";

/**
 * The five standing assurances.
 *
 * Plain text on a quiet band with a single small glyph each — no icon
 * medallions and no card wrappers, because neither would add information and
 * both are what make a trust strip read as decoration.
 */
export default function TrustBar() {
  return (
    <section aria-label="Why drivers trust us" className="border-y bg-muted/40">
      <Container className="py-8">
        <dl className="grid grid-rows-[auto_auto] gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.trustBar.map((item) => (
            <div key={item.label} className="row-span-2 grid grid-rows-subgrid gap-0">
              <dt className="flex items-center gap-2 text-sm font-medium">
                <Icon name={item.icon} className="h-4 w-4 shrink-0 text-primary" />
                {item.label}
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{item.sub}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
