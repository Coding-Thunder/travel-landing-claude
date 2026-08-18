import { site } from "@/config/site";
import Container from "./container";
import { Separator } from "@/components/ui/separator";

/**
 * Standing supplier and accreditation disclosure, carried on every page that
 * presents travel options so the platform's role and its accreditation position
 * are never more than a scroll away.
 */
export default function SupplierDisclosure() {
  return (
    <section aria-label="Supplier and accreditation disclosure" className="border-t bg-muted/40">
      <Container className="py-8">
        <h2 className="text-sm font-medium">How booking with {site.name} works</h2>
        <Separator className="my-4" />
        <div className="grid gap-4 text-xs leading-relaxed text-muted-foreground lg:grid-cols-3">
          <p>{site.supplierDisclosure}</p>
          <p>{site.accreditationNotice}</p>
          <p>
            {site.pricingNotice} <span className="text-foreground">{site.operatedBy}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
