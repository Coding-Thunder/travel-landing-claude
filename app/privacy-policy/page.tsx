import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name} — how we handle personal information from phone rentals in ${siteConfig.city}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="January 2026"
      intro={`Your privacy matters to us. This Privacy Policy explains what information ${siteConfig.name} collects, how we use it, and the choices you have. Because we take rental reservations by phone, most of the data we collect comes directly from conversations with our team.`}
    >
      <section>
        <h2>1. Information we collect</h2>
        <p>When you call us to book a rental, we may collect:</p>
        <ul>
          <li>Your full name, phone number, and email address.</li>
          <li>Driver&apos;s license number and, where required, passport details.</li>
          <li>Pickup and drop-off locations, dates, and times.</li>
          <li>Vehicle preferences and any optional extras requested.</li>
          <li>Payment card details, collected at the time of vehicle pickup.</li>
        </ul>
        <p>
          If you visit this website, we may also collect basic technical data
          such as browser type, device, approximate location, and pages viewed
          — used only to improve the site experience.
        </p>
      </section>

      <section>
        <h2>2. How we use your information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and manage your rental reservation.</li>
          <li>Verify driver eligibility and comply with applicable rental laws.</li>
          <li>Contact you about your booking, vehicle pickup, or service updates.</li>
          <li>Process payments and handle any disputes or claims.</li>
          <li>Improve our services, website, and customer support.</li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing your information</h2>
        <p>
          We do not sell your personal information. We may share limited data
          with trusted partners who help us operate our business — for example,
          payment processors, insurance providers, and roadside assistance
          services — strictly for the purpose of delivering your rental. We may
          also disclose information when required by law or to protect our
          rights and the safety of our customers.
        </p>
      </section>

      <section>
        <h2>4. How long we keep your data</h2>
        <p>
          We keep personal information only as long as necessary to fulfill the
          purposes described in this Policy and to comply with legal,
          accounting, or reporting obligations. Booking records and payment
          information are typically retained for the period required by tax
          and rental regulations in {siteConfig.region}.
        </p>
      </section>

      <section>
        <h2>5. Security</h2>
        <p>
          We take reasonable steps to protect the personal information we
          collect, including limiting access to authorized staff, using secure
          payment terminals at pickup, and reviewing our data handling
          practices regularly. No system is ever 100% secure, but we work hard
          to keep yours safe.
        </p>
      </section>

      <section>
        <h2>6. Your rights</h2>
        <p>
          Depending on your location, you may have the right to access the
          personal information we hold about you, correct inaccuracies,
          request deletion, or object to certain uses. To exercise any of
          these rights, call us at{" "}
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
        <h2>7. Cookies</h2>
        <p>
          This website uses a minimal set of cookies to remember your
          preferences and measure basic site performance. You can disable
          cookies in your browser settings at any time without affecting your
          ability to call us and book a rental.
        </p>
      </section>

      <section>
        <h2>8. Contact us</h2>
        <p>
          Questions about this Privacy Policy? Our team is available 24/7 at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
