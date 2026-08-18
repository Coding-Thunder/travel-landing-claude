import Link from "next/link";
import LegalLayout from "@/app/components/trip/legal-layout";
import JsonLd from "@/app/components/trip/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Flight Bizz, operated by GlobeVista LLC, collects, uses, stores and protects your personal information when you use our website or ask us to arrange travel.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />

      <LegalLayout
        title="Privacy Policy"
        updated="July 2026"
        intro="This Privacy Policy explains how we collect, use, store and protect your personal information when you use our website or request our reservation services."
      >
        <h2>1. Introduction</h2>
        <p>
          {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), trading as{" "}
          {site.name}, operates a multi-service online travel platform. We are not an airline, hotel,
          rental company or activity operator; we act as an intermediary that helps you search for and
          arrange travel services supplied by third parties.
        </p>
        <p>
          This policy applies to information collected through this website and when you contact us or ask
          us to arrange travel. We aim to handle your personal information in line with
          applicable federal and state privacy laws. Please read this policy alongside our{" "}
          <Link href="/terms">Terms &amp; Conditions</Link> and our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We collect the information you give us so that we can respond to your enquiry and arrange
          your travel. Depending on how you use our service, this may include:
        </p>
        <ul>
          <li>Your name and the names of other travelers included in a booking request</li>
          <li>Contact details, such as your email address and telephone number</li>
          <li>Billing information needed to process a booking payment</li>
          <li>Travel preferences, such as destinations, dates, cabin class and special requirements</li>
          <li>Booking details relating to the travel services you ask us to arrange</li>
          <li>The content of your enquiry messages and any correspondence with our team</li>
        </ul>
        <p>
          When you visit our website, we also collect limited technical information automatically. This may
          include your IP address, browser type, device information, cookies and similar technologies, and
          usage information about how you interact with our pages. You can find out more in our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To respond to your enquiries and questions</li>
          <li>To prepare quotations based on your requirements</li>
          <li>To process and progress your reservation requests with the relevant suppliers</li>
          <li>To communicate with you about your bookings and any changes to them</li>
          <li>To provide customer support before, during and after a reservation</li>
          <li>To operate, maintain and improve our website and services</li>
          <li>To help detect, prevent and investigate fraud or misuse of our service</li>
          <li>To comply with our legal and regulatory obligations</li>
        </ul>
        <p>
          We rely on appropriate lawful bases to process your information, including performing the service
          you request, our legitimate interests in operating and improving our business, your consent where
          it applies, and compliance with our legal obligations.
        </p>

        <h2>4. Sharing Information</h2>
        <p>
          We share personal information only where it is necessary to provide our service or where we are
          required to do so. This may include disclosure to:
        </p>
        <ul>
          <li>Airlines and travel suppliers, to arrange and confirm the reservation you request</li>
          <li>Payment providers, to process reservation payments securely</li>
          <li>Technology providers who help us operate our website and support our business</li>
          <li>Authorities, regulators or advisers where we are required to do so by law</li>
        </ul>
        <p>
          We do not sell your personal information. Where suppliers or providers handle your information on
          our behalf, we ask them to protect it and to use it only for the purposes we have agreed.
        </p>

        <h2>5. Payment Security</h2>
        <p>
          When a payment is required to progress a reservation, we use secure technologies to help protect
          your information during the payment process. We do not intentionally store your full card details
          unless it is necessary to provide the service you have requested, and where any such information
          is handled we aim to do so in line with applicable payment security standards.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Our website uses cookies and similar technologies to help it function, to understand how it is
          used and, where applicable, to measure our marketing. You can control cookies through your browser
          settings and any choices we provide. For full details of the cookies we use and how to manage
          them, please see our <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We take the protection of your information seriously and use reasonable technical and
          organizational measures designed to help keep it secure and to reduce the risk of unauthorized
          access, loss or misuse. However, no method of transmission over the internet or method of
          electronic storage is completely secure, and we cannot guarantee absolute security. You share
          information with us at your own risk, and we encourage you to take care when sending sensitive
          details online.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We keep your personal information only for as long as it is needed for the purposes described in
          this policy, including to provide our service, to maintain appropriate business records, and to
          meet our legal, accounting and regulatory obligations. When your information is no longer required,
          we take reasonable steps to delete it or to anonymize it securely.
        </p>

        <h2>9. Your Rights</h2>
        <p>
          Subject to applicable law, you may have the following rights in relation to your personal
          information:
        </p>
        <ul>
          <li>The right to request access to the information we hold about you</li>
          <li>The right to ask us to correct information that is inaccurate or incomplete</li>
          <li>The right to request deletion of your information where we are permitted to do so</li>
          <li>The right to object to, or ask us to restrict, certain uses of your information</li>
          <li>The right to withdraw your consent where we rely on it, without affecting prior processing</li>
        </ul>
        <p>
          To exercise any of these rights, please <Link href="/contact">contact us</Link> or email{" "}
          <a href={`mailto:${site.company.supportEmail}`}>{site.company.supportEmail}</a>. We may need to
          verify your identity before we act on a request. Rights vary by state, and some may not apply to
          you. If you have concerns about how we handle your information, you may also contact your state
          attorney general or the Federal Trade Commission, although we would welcome the chance to resolve
          any concerns directly with you first.
        </p>

        <h2>10. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites, including those of travel suppliers and
          other providers. We are not responsible for the content, privacy practices or security of any
          website we do not operate. We recommend reviewing the privacy policy of any website you visit
          through a link on our site.
        </p>

        <h2>11. Children&rsquo;s Privacy</h2>
        <p>
          Our website and services are intended for adults and are not directed at children. We do not
          knowingly collect personal information from children. If you believe a child has provided us with
          personal information, please contact us so that we can take appropriate steps to remove it.
        </p>

        <h2>12. International Transfers</h2>
        <p>
          To arrange flights with airlines and suppliers located in other countries, your information may be
          transferred to, and processed in, locations outside the United States. Where this happens, we
          take steps to ensure that appropriate safeguards are in place where required by law, so that your
          information continues to be protected.
        </p>

        <h2>13. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, our
          services or applicable law. When we do, we will revise the &ldquo;last updated&rdquo; date shown
          above. We encourage you to review this page periodically so that you are aware of how we protect
          your information.
        </p>

        <h2>14. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or about how we handle your personal
          information, please <Link href="/contact">contact us</Link> or email{" "}
          <a href={`mailto:${site.company.supportEmail}`}>{site.company.supportEmail}</a>. Our registered
          details are shown below.
        </p>
      </LegalLayout>
    </>
  );
}
