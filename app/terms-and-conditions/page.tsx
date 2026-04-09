import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${siteConfig.legalName} — phone-based car rental service in ${siteConfig.city}, ${siteConfig.regionCode}.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="January 2026"
      intro={`These Terms & Conditions ("Terms") govern your use of the ${siteConfig.legalName} website and the car rental services we provide by phone in ${siteConfig.city}, ${siteConfig.region}. By calling us to reserve a vehicle, picking up a rental, or using this website, you agree to the Terms below.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          {siteConfig.legalName} is a car rental provider registered in{" "}
          {siteConfig.region}, United States, operating from{" "}
          {siteConfig.addressLine}, {siteConfig.addressCity},{" "}
          {siteConfig.addressRegionCode} {siteConfig.addressPostal}. All
          reservations are taken by phone at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or through our WhatsApp line. We do not currently offer online
          booking or online payment on this website.
        </p>
      </section>

      <section>
        <h2>2. Nature of the service</h2>
        <p>
          This website markets and provides information about our car rental
          services. The only way to book a vehicle is by calling our phone line
          and speaking with a rental agent. Rates and vehicle availability
          shown or quoted are illustrative and subject to change. A
          reservation is only confirmed after a live phone conversation and
          verbal agreement on the final rate, vehicle class, pickup location,
          and dates.
        </p>
      </section>

      <section>
        <h2>3. Eligibility</h2>
        <p>To rent a vehicle from us, you must:</p>
        <ul>
          <li>Be at least 21 years of age (25 for premium and luxury cars).</li>
          <li>Hold a valid driver&apos;s license in your country of residence.</li>
          <li>Present a valid credit or debit card in your own name at pickup.</li>
          <li>Provide a valid photo ID and, for international renters, a passport.</li>
        </ul>
        <p>
          Additional drivers must meet the same eligibility requirements and
          be disclosed during the phone reservation.
        </p>
      </section>

      <section>
        <h2>4. Reservations by phone</h2>
        <p>
          Reservations are confirmed verbally during a phone call and,
          typically, by a short confirmation message. The all-in rate quoted
          on the call is the rate you pay at pickup for the vehicle class and
          dates confirmed. Quoted rates are based on live availability and are
          valid only for the terms discussed during the call.
        </p>
      </section>

      <section>
        <h2>5. Rates, taxes and payment</h2>
        <p>
          Daily and weekly rates typically include unlimited miles within{" "}
          {siteConfig.region}, basic liability coverage as required by law,
          and standard 24/7 roadside support. Optional add-ons, fuel, toll
          charges, traffic fines, and applicable taxes are charged separately
          and disclosed before pickup.
        </p>
        <p>
          Payment is collected in person at vehicle pickup. No online deposit
          is taken during the phone reservation. A refundable security deposit
          may be held on your card during the rental period and released after
          return of the vehicle.
        </p>
      </section>

      <section>
        <h2>6. Use of the vehicle</h2>
        <p>You agree to:</p>
        <ul>
          <li>Operate the vehicle safely and in accordance with all applicable traffic laws.</li>
          <li>Not use the vehicle for racing, towing, commercial ride-sharing, or any illegal purpose.</li>
          <li>Not allow anyone other than the approved drivers to operate the vehicle.</li>
          <li>Return the vehicle in the same condition in which it was rented, normal wear excluded.</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitations and liability</h2>
        <p>
          You are responsible for any damage, loss, or theft of the rental
          vehicle during the rental period, except where covered by a
          protection plan you have purchased. To the maximum extent permitted
          by applicable law, {siteConfig.legalName} is not liable for:
        </p>
        <ul>
          <li>Personal belongings left inside the vehicle.</li>
          <li>
            Indirect, incidental, or consequential damages resulting from
            vehicle breakdown, traffic, weather, or travel delays.
          </li>
          <li>
            Any loss arising from inaccurate information provided during the
            phone reservation.
          </li>
        </ul>
        <p>
          Nothing in these Terms limits any liability that cannot lawfully be
          excluded, including liability for gross negligence or willful
          misconduct.
        </p>
      </section>

      <section>
        <h2>8. Website content</h2>
        <p>
          Vehicle photos, availability, and rates shown on this website are
          illustrative only. Actual vehicles provided may differ in make,
          model, color, or equipment within the same class. Where rates or
          offers are shown, they are indicative and based on availability at
          the time of the phone call.
        </p>
      </section>

      <section>
        <h2>9. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of{" "}
          {siteConfig.region}, United States, without regard to conflict-of-law
          principles. Any disputes will be handled in the competent courts of{" "}
          {siteConfig.city}, {siteConfig.regionCode}.
        </p>
      </section>

      <section>
        <h2>10. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time to reflect changes in
          our service, legal requirements, or customer feedback. The latest
          version is always available on this page. Continued use of our
          services after an update constitutes acceptance of the revised
          Terms.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          Questions about these Terms? Call us at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
