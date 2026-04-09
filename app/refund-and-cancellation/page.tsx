import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation policy for ${siteConfig.legalName} — free cancellation and transparent refunds for phone-based car rentals in ${siteConfig.city}.`,
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      updated="January 2026"
      intro={`This Refund & Cancellation Policy explains how cancellations, changes, and refunds work for reservations made with ${siteConfig.legalName}. In short: because no payment is taken during the phone reservation, you can cancel free of charge any time before pickup, and any refunds after pickup are handled case by case under the conditions below.`}
    >
      <section>
        <h2>1. Free cancellation before pickup</h2>
        <p>
          All reservations made by phone with {siteConfig.legalName} can be
          cancelled free of charge at any time before the scheduled vehicle
          pickup. Since no payment or deposit is taken over the phone, there
          is nothing to refund at this stage. Simply call us back at{" "}
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
        <h2>2. How to cancel or change a reservation</h2>
        <p>
          To cancel or change your reservation, please contact us by phone,
          WhatsApp, or email using the contact details at the bottom of this
          page. Please provide the name on the reservation and the scheduled
          pickup date so we can locate your booking quickly. We recommend
          calling at least 2 hours before the scheduled pickup time so we can
          release the vehicle to other customers.
        </p>
      </section>

      <section>
        <h2>3. No-shows</h2>
        <p>
          If you do not arrive for your scheduled pickup and do not contact us
          in advance, the reservation will be marked as a no-show and the
          vehicle will be released. Because no payment is collected during the
          phone reservation, no refund is required — but we appreciate a quick
          call so we can help other travelers.
        </p>
      </section>

      <section>
        <h2>4. Changes to an active reservation</h2>
        <p>
          You can modify the dates, pickup location, or vehicle class of your
          reservation at any time before pickup, subject to availability and
          any rate differences for the new vehicle or dates. There are no
          change fees; any price difference is disclosed before you confirm.
        </p>
      </section>

      <section>
        <h2>5. Early returns</h2>
        <p>
          If you return the vehicle earlier than scheduled, we will review the
          unused rental days and, where appropriate, issue a pro-rated refund
          to the original payment method. Pro-rated refunds are typically
          processed within 7 business days after the vehicle is returned and
          inspected. Returns of less than one full day shorter than scheduled
          are generally non-refundable.
        </p>
      </section>

      <section>
        <h2>6. Refunds after pickup</h2>
        <p>
          Once a vehicle has been picked up, the rental agreement is active.
          Refunds after pickup are handled case by case and may be issued in
          situations such as:
        </p>
        <ul>
          <li>
            Mechanical issues that prevent safe use of the vehicle and cannot
            be resolved with a replacement.
          </li>
          <li>Billing errors or duplicate charges.</li>
          <li>Service issues documented at the time of the rental.</li>
        </ul>
        <p>
          Approved refunds are processed back to the original payment method,
          typically within 7 business days of approval. Actual arrival time on
          your statement depends on your card issuer.
        </p>
      </section>

      <section>
        <h2>7. Security deposits</h2>
        <p>
          Where a refundable security deposit is collected at pickup, it is
          released back to your card after the vehicle has been returned and
          inspected. Release timing depends on your card issuer but is
          typically completed within 5–10 business days.
        </p>
      </section>

      <section>
        <h2>8. Disputes</h2>
        <p>
          If you believe a charge is incorrect or a refund has not been
          processed, please contact us first — most issues are resolved the
          same day with a quick phone call. You can reach us at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. Policy updates</h2>
        <p>
          We may update this policy from time to time. The most current
          version is always available on this page and applies to all
          reservations made after the &ldquo;Last updated&rdquo; date shown
          above.
        </p>
      </section>
    </LegalLayout>
  );
}
