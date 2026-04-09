import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.legalName} — how we handle personal information, cookies, and advertising identifiers for phone-based car rentals in ${siteConfig.city}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="January 2026"
      intro={`This Privacy Policy explains what information ${siteConfig.legalName} ("we", "us", "our") collects when you call us or visit this website, how we use it, who we share it with, and the choices you have. Because we take reservations by phone, most personal data is collected directly from our conversations with you.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          {siteConfig.legalName} is a car rental provider based in{" "}
          {siteConfig.addressCity}, {siteConfig.addressRegion}, United States.
          You can reach us by phone at{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>{" "}
          or by email at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
          . Our registered address is {siteConfig.addressLine},{" "}
          {siteConfig.addressCity}, {siteConfig.addressRegionCode}{" "}
          {siteConfig.addressPostal}.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>When you call us to book a rental, we may collect:</p>
        <ul>
          <li>Your full name, phone number, and email address.</li>
          <li>Driver&apos;s license number and, where required, passport details.</li>
          <li>Pickup and drop-off locations, dates, and times.</li>
          <li>Vehicle preferences and any optional extras requested.</li>
          <li>Payment card details, collected at the time of vehicle pickup.</li>
        </ul>
        <p>
          When you visit this website, we (and the third-party services listed
          below) may automatically collect:
        </p>
        <ul>
          <li>
            Device and browser information (browser type, operating system,
            screen size, language).
          </li>
          <li>
            Approximate location based on IP address (country, state, and
            city-level).
          </li>
          <li>
            Pages viewed, referral source, time on page, and interactions such
            as clicks on the &ldquo;Call&rdquo; button.
          </li>
          <li>
            Cookies, local storage entries, and advertising identifiers set by
            this site and by third-party tools such as Google Analytics and
            Google Ads.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and manage your rental reservation.</li>
          <li>
            Verify driver eligibility and comply with applicable rental laws.
          </li>
          <li>
            Contact you about your booking, vehicle pickup, or service updates.
          </li>
          <li>Process payments and handle any disputes or claims.</li>
          <li>
            Measure how visitors find and use this website, including the
            performance of our advertising campaigns.
          </li>
          <li>
            Detect and prevent fraud, misuse, and security incidents.
          </li>
          <li>Improve our services, website, and customer support.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies, analytics &amp; advertising</h2>
        <p>
          This website uses cookies and similar technologies (such as
          pixels, tags, and local storage) for analytics, site functionality,
          and advertising measurement. Specifically, we may use:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — to understand how visitors use
            this site (pages viewed, time on page, traffic sources) so we can
            improve our content and user experience.
          </li>
          <li>
            <strong>Google Ads &amp; conversion tracking</strong> — to measure
            the effectiveness of our advertising campaigns on Google and
            partner networks, including tracking clicks on the &ldquo;Call&rdquo;
            button as conversion events.
          </li>
          <li>
            <strong>Google Ads remarketing</strong> — to show relevant ads to
            people who have previously visited this site, across the Google
            Display Network and partner sites, where permitted by applicable
            law.
          </li>
          <li>
            <strong>Strictly necessary cookies</strong> — to remember your
            cookie notice preference and keep the website functioning
            correctly.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings and opt out of
          personalized Google advertising at{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            adssettings.google.com
          </a>
          . You can also opt out of Google Analytics via the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-600 underline-offset-4 hover:underline"
          >
            Google Analytics opt-out browser add-on
          </a>
          . Disabling cookies will not affect your ability to call us and book
          a rental by phone.
        </p>
      </section>

      <section>
        <h2>5. How we share your information</h2>
        <p>
          We do not sell your personal information. We share limited data only
          with trusted service providers who help us operate our business, for
          example:
        </p>
        <ul>
          <li>
            Payment processors and card terminal providers (used in person at
            pickup).
          </li>
          <li>
            Insurance providers and roadside assistance partners, strictly for
            the purpose of delivering your rental.
          </li>
          <li>
            Hosting, email, communications, and customer support tools that we
            use to run the business.
          </li>
          <li>
            Analytics and advertising platforms (including Google Analytics and
            Google Ads) to measure website performance and ad effectiveness.
          </li>
          <li>
            Law enforcement, regulators, or courts when required by law or to
            protect our rights, property, or the safety of our customers.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. How long we keep your data</h2>
        <p>
          We keep personal information only as long as necessary to fulfill the
          purposes described in this Policy and to comply with legal,
          accounting, or reporting obligations. Booking records and payment
          information are typically retained for the period required by tax
          and rental regulations in {siteConfig.region}.
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We take reasonable steps to protect the personal information we
          collect, including limiting access to authorized staff, using secure
          payment terminals at pickup, and reviewing our data-handling
          practices regularly. No system is completely secure, but we work to
          safeguard your information.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Depending on your state or country of residence (including California
          under the CCPA/CPRA and other applicable US state privacy laws), you
          may have the right to:
        </p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your information.</li>
          <li>Object to or restrict certain uses of your information.</li>
          <li>Opt out of targeted advertising or data sharing.</li>
        </ul>
        <p>
          To exercise any of these rights, call us at{" "}
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
          . We may need to verify your identity before responding.
        </p>
      </section>

      <section>
        <h2>9. Children&apos;s privacy</h2>
        <p>
          This website and our rental services are not directed to children
          under 16. We do not knowingly collect personal information from
          children. If you believe a child has provided us with personal data,
          please contact us and we will take steps to delete it.
        </p>
      </section>

      <section>
        <h2>10. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our services, legal requirements, or customer feedback.
          The most current version is always available on this page, with the
          &ldquo;Last updated&rdquo; date at the top.
        </p>
      </section>

      <section>
        <h2>11. Contact us</h2>
        <p>
          Questions about this Privacy Policy or your data? Our team is
          available at{" "}
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
    </LegalLayout>
  );
}
