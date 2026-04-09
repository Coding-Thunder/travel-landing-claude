import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${siteConfig.name} — call-based car rental service in ${siteConfig.city}.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="January 2026"
      intro={`These Terms & Conditions ("Terms") govern your use of ${siteConfig.name} and the car rental services we provide by phone in ${siteConfig.city}, ${siteConfig.region}. By calling us to reserve a vehicle, picking up a rental, or using our website, you agree to the Terms below.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          {siteConfig.name} is a local car rental provider operating in
          {" "}{siteConfig.city}, {siteConfig.region}. All reservations are
          taken by phone at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or through our WhatsApp line. We do not offer online booking or
          payment on this website.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>To rent a vehicle from us, you must:</p>
        <ul>
          <li>Be at least 21 years of age (25 for premium and luxury cars).</li>
          <li>Hold a valid driver&apos;s license in your country of residence.</li>
          <li>Present a valid credit or debit card in your own name at pickup.</li>
          <li>Provide a valid photo ID and, for international renters, a passport.</li>
        </ul>
        <p>
          Additional drivers must meet the same eligibility requirements and be
          disclosed during the phone reservation.
        </p>
      </section>

      <section>
        <h2>3. Reservations by phone</h2>
        <p>
          All reservations are confirmed verbally during a phone call and by a
          short confirmation message. The rate quoted on the call is the rate
          you will pay at pickup — there are no hidden charges, booking fees,
          or surprise add-ons. Quoted rates are subject to vehicle availability
          at the time of the call.
        </p>
      </section>

      <section>
        <h2>4. Rates and payment</h2>
        <p>
          Daily and weekly rates include unlimited miles (within the state of
          {" "}{siteConfig.region}), basic liability coverage as required by
          law, and standard 24/7 roadside support. Optional add-ons, fuel, toll
          charges, traffic fines, and applicable taxes are charged separately
          and clearly disclosed before pickup.
        </p>
        <p>
          Payment is collected in person at vehicle pickup. A refundable
          security deposit may be held on your card during the rental period
          and released within 7 business days of return.
        </p>
      </section>

      <section>
        <h2>5. Use of the vehicle</h2>
        <p>You agree to:</p>
        <ul>
          <li>Operate the vehicle safely and in accordance with all applicable traffic laws.</li>
          <li>Not use the vehicle for racing, towing, commercial ride-sharing, or any illegal purpose.</li>
          <li>Not allow anyone other than the approved drivers to operate the vehicle.</li>
          <li>Return the vehicle in the same condition in which it was rented, normal wear excluded.</li>
        </ul>
      </section>

      <section>
        <h2>6. Liability</h2>
        <p>
          You are responsible for any damage, loss, or theft of the rental
          vehicle during the rental period, except where covered by a
          protection plan you have purchased. {siteConfig.name} is not liable
          for personal belongings left inside the vehicle or for indirect
          damages resulting from vehicle breakdown, traffic, or travel delays.
        </p>
      </section>

      <section>
        <h2>7. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time to reflect changes in our
          service, legal requirements, or customer feedback. The latest version
          is always available on this page. Continued use of our services after
          an update constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Questions about these Terms? Call us any time at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>
          . Our team is available 24/7 to help.
        </p>
      </section>
    </LegalLayout>
  );
}
