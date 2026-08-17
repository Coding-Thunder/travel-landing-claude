import { Info } from "lucide-react";
import { site } from "@/config/site";
import Container from "./container";

/**
 * Standing supplier / accreditation disclosure (§27, §2).
 *
 * Rendered at the foot of every customer-facing page that presents travel
 * options, so the platform's role and its accreditation position are stated
 * wherever a visitor might otherwise assume more.
 */
export default function SupplierDisclosure({ className }: { className?: string }) {
  return (
    <section aria-label="Supplier and accreditation disclosure" className={className}>
      <Container className="pb-14">
        <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-navy-500 ring-1 ring-navy-100">
              <Info className="h-[18px] w-[18px]" />
            </span>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
              How booking with {site.name} works
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-navy-600">
            <p>{site.supplierDisclosure}</p>
            <p>{site.pricingNotice}</p>
            <p>{site.accreditationNotice}</p>
            <p className="font-medium text-navy-800">{site.operatedBy}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
