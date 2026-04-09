import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation policy for ${siteConfig.name} — free cancellation and transparent refunds for phone-based car rentals in ${siteConfig.city}.`,
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      updated="January 2026"
      intro={`We believe renting a car should be simple and stress-free. This Refund & Cancellation Policy explains how cancellations, changes, and refunds work with ${siteConfig.name}. In short: cancel anytime before pickup at no cost, and we'll always be straightforward about any charges after that.`}
    >
      <section>
        <h2>1. Free cancellation before pickup</h2>
        <p>
          All reservations made by phone with {siteConfig.name} can be
          cancelled free of charge up to the scheduled vehicle pickup time.
          There are no cancellation fees, no deposits forfeited, and no
          paperwork. Simply call us back at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or message us on WhatsApp and let us know.
        </p>
      </section>

      <section>
        <h2>2. No-shows</h2>
        <p>
          If you do not arrive for your scheduled pickup and do not contact us
          in advance, we may mark the reservation as a no-show and release the
          vehicle to other customers. Since payment is only collected at
          pickup, no refund is needed — but we appreciate a quick call so we
          can help other travelers.
        </p>
      </section>

      <section>
        <h2>3. Changes to an active reservation</h2>
        <p>
          Plans change, and we get it. You can modify the dates, pickup
          location, or vehicle class of your reservation at any time before
          pickup, subject to availability and any rate differences. There are
          no change fees.
        </p>
      </section>

      <section>
        <h2>4. Early returns</h2>
        <p>
          If you return the vehicle earlier than scheduled, we will do our
          best to pro-rate the unused rental days in your favor. Pro-rated
          refunds are credited back to the original payment card within 7
          business days. Short-notice early returns of less than one full day
          are non-refundable.
        </p>
      </section>

      <section>
        <h2>5. Refunds after pickup</h2>
        <p>
          Once a vehicle has been picked up, the rental agreement is
          considered active. Refunds after pickup are handled case by case
          and may apply in situations such as:
        </p>
        <ul>
          <li>Mechanical issues that prevent safe use of the vehicle and cannot be resolved with a replacement.</li>
          <li>Billing errors or duplicate charges.</li>
          <li>Service issues documented at the time of the rental.</li>
        </ul>
        <p>
          Approved refunds are processed back to the original payment method
          within 7 business days.
        </p>
      </section>

      <section>
        <h2>6. Security deposits</h2>
        <p>
          Where a refundable security deposit is collected at pickup, it is
          released back to your card upon return of the vehicle in its
          original condition. Release timing depends on your card issuer but
          is typically completed within 5–10 business days.
        </p>
      </section>

      <section>
        <h2>7. Disputes</h2>
        <p>
          If you believe a charge is incorrect or a refund has not been
          processed, please contact us first — most issues are resolved the
          same day with a quick phone call. Our team is available 24/7 at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>8. Policy updates</h2>
        <p>
          We may update this policy from time to time. The most current
          version is always available on this page and applies to all
          reservations made after the &quot;Last updated&quot; date shown
          above.
        </p>
      </section>
    </LegalLayout>
  );
}
