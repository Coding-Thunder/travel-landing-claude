import Link from "next/link";
import LegalLayout from "@/app/components/trip/legal-layout";
import JsonLd from "@/app/components/trip/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The Terms & Conditions governing your use of the Flight Bizz online travel platform, operated by GlobeVista LLC.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms & Conditions", path: "/terms" },
          ]),
        ]}
      />

      <LegalLayout
        title="Terms & Conditions"
        updated="July 2026"
        intro="By using this website or requesting travel services from us, you agree to these Terms & Conditions."
      >
        <section>
          <h2>1. Introduction</h2>
          <p>
            These Terms &amp; Conditions govern your use of the {site.name} website and the
            travel services we arrange. {site.operatedBy} {site.name} is a trading brand of{" "}
            {site.legalName} and not a separate legal entity.
          </p>
          <p>
            {site.name} is a multi-service online travel platform. We help you search, compare and
            arrange travel services that are supplied and fulfilled by third parties. We are not an
            airline, hotel, rental company or activity operator. We do not hold IATA or ARC
            accreditation, we are not an accredited ticketing agency or an authorized agent of any
            airline, and we make no claim to any certification, government approval, award or
            supplier partnership that we do not hold.
          </p>
          <p>
            By accessing this website or submitting an enquiry, you confirm that you have read,
            understood and accepted these Terms &amp; Conditions. If you do not agree with them,
            please do not use our website or request our services.
          </p>
        </section>

        <section>
          <h2>2. Our Services</h2>
          <p>
            We arrange travel services across six categories. Working with our supplier network,
            our travel specialists help you find and arrange options that suit your requirements.
            Our services include:
          </p>
          <ul>
            <li>
              <strong>Flights</strong> — domestic and international air travel, including one way,
              round trip and multi-city itineraries across all cabin classes.
            </li>
            <li>
              <strong>Hotels &amp; stays</strong> — rooms, apartments and resorts, including
              extended and group stays.
            </li>
            <li>
              <strong>Car rentals</strong> — vehicle hire from third-party rental suppliers at
              airport and city locations.
            </li>
            <li>
              <strong>Airport transfers</strong> — private and shared transfers operated by
              third-party transport providers.
            </li>
            <li>
              <strong>Tours &amp; activities</strong> — experiences, attractions and day trips run
              by third-party operators.
            </li>
            <li>
              <strong>Vacation packages</strong> — combinations of the above arranged together,
              including business and group travel programmes.
            </li>
          </ul>
          <p>
            All travel services are provided by independent third-party suppliers. Our role is to
            arrange the booking and provide customer support; we do not own, operate or control the
            aircraft, properties, vehicles or experiences themselves. Where different services
            cannot be combined into a single transaction, they are arranged and confirmed separately
            rather than as one package booking.
          </p>
        </section>

        <section>
          <h2>3. Reservation Requests</h2>
          <p>
            When you submit an enquiry, you are asking us to assist you in requesting flights
            through our supplier network. Submitting an enquiry does not create a confirmed booking
            and does not guarantee availability, pricing or confirmation.
          </p>
          <p>
            All reservation requests are subject to supplier availability at the time the request
            is processed. Flights, fare classes and fares that appear to be available when you
            enquire may no longer be available when we attempt to confirm your reservation.
          </p>
        </section>

        <section>
          <h2>4. Pricing</h2>
          <p>
            Prices quoted are indicative and may change until your reservation is confirmed by the
            relevant supplier. Fares are determined by the airline or travel supplier and are influenced
            by availability, demand and the specific conditions of each reservation.
          </p>
          <ul>
            <li>Applicable taxes, supplier fees and charges may affect the final price.</li>
            <li>Optional services and extras, where selected, are charged in addition to the base fare.</li>
            <li>
              Any service fee we charge for our assistance will be communicated clearly before your
              reservation is confirmed.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Payments</h2>
          <p>
            Where a reservation requires payment, this may be required before the reservation is
            confirmed. The accepted methods of payment depend on availability and may include major
            debit and credit cards and other supported payment options.
          </p>
          <p>
            Payments are processed using secure technology intended to help protect your information
            during the transaction. You are responsible for ensuring that the payment details you
            provide are accurate and that you are authorized to use the chosen payment method.
          </p>
        </section>

        <section>
          <h2>6. Booking Confirmation</h2>
          <p>
            A reservation is confirmed only when all of the following have taken place, where
            applicable:
          </p>
          <ul>
            <li>Any required payment has been received;</li>
            <li>The airline or travel supplier has accepted the reservation request; and</li>
            <li>A written confirmation or ticket has been issued to you.</li>
          </ul>
          <p>
            Until a confirmation has been issued, no contract for travel exists and the
            reservation should not be treated as guaranteed. Please review your confirmation
            carefully as soon as you receive it.
          </p>
        </section>

        <section>
          <h2>7. Customer Responsibilities</h2>
          <p>When requesting our services, you agree to:</p>
          <ul>
            <li>Provide accurate, complete and up-to-date information for every traveller;</li>
            <li>
              Review all reservation details, including passenger names, dates and flight particulars,
              and notify us promptly of any errors;
            </li>
            <li>
              Hold valid passports, visas and any other travel documents required for your journey;
              and
            </li>
            <li>Comply with all applicable travel, entry and health regulations for your destination.</li>
          </ul>
          <p>
            We cannot accept responsibility for problems arising from inaccurate information or from
            a failure to hold the correct travel documents.
          </p>
        </section>

        <section>
          <h2>8. Changes &amp; Cancellations</h2>
          <p>
            Requests to change or cancel a confirmed reservation are subject to the policies of the
            relevant airline or travel supplier. Some fares are non-refundable or carry
            restrictions that limit changes.
          </p>
          <p>
            Fees, penalties or rate differences may apply to any amendment or cancellation. We will
            assist you in requesting a change or cancellation and will confirm any applicable
            charges before proceeding wherever possible. Further detail is available in our{" "}
            <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
          </p>
        </section>

        <section>
          <h2>9. Refunds</h2>
          <p>
            Refund eligibility is determined by the airline or travel supplier&rsquo;s refund and
            cancellation policy applicable to your reservation. Where a refund is due, we will assist
            you in requesting it from the supplier wherever possible.
          </p>
          <p>
            Processing times vary depending on the supplier and your payment provider. Please refer
            to our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> for further
            information about how refunds are handled.
          </p>
        </section>

        <section>
          <h2>10. Supplier Responsibility</h2>
          <p>
            {site.supplierDisclosure} Our role is to arrange the booking and provide customer
            support; the operation of the service and the standard delivered are the responsibility
            of the supplier.
          </p>
          <p>
            The supplier&rsquo;s own terms and conditions — including an airline&rsquo;s conditions
            of carriage, a property&rsquo;s house rules or a rental agreement — apply to your travel in
            addition to these Terms. We recommend that you review those conditions carefully before
            confirming any booking.
          </p>
        </section>

        <section>
          <h2>11. Travel Documents</h2>
          <p>
            It is your responsibility to ensure that you hold all documents required for your trip,
            including valid passports, visas, identification and any health or entry documentation
            required by your destination. Requirements can differ by nationality and can change at
            short notice.
          </p>
          <p>
            We are not responsible for any loss, cost or inconvenience arising where you are unable
            to travel or check in because the necessary documents were not held.
          </p>
        </section>

        <section>
          <h2>12. Website Availability</h2>
          <p>
            We aim to keep this website available and accurate, but we do not guarantee that it will
            be uninterrupted, error-free or free from viruses. The website may be temporarily
            unavailable for maintenance, updates or reasons beyond our control.
          </p>
          <p>
            Information published on this website is provided for general guidance and may be updated
            without notice.
          </p>
        </section>

        <section>
          <h2>13. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images and layout, is owned
            by or licensed to {site.legalName} and is protected by applicable intellectual
            property laws. You may not copy, reproduce, distribute or otherwise use any content from
            this website without our prior written permission, except as permitted for your personal,
            non-commercial use of our services.
          </p>
        </section>

        <section>
          <h2>14. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {site.legalName} shall not be liable for any
            indirect, incidental or consequential loss arising from the acts or omissions of a travel
            supplier, from travel disruption, or from your use of this website or our services.
          </p>
          <p>
            Nothing in these Terms excludes or limits our liability where it would be unlawful to do
            so, including any liability that cannot be excluded or limited under applicable law.
          </p>
        </section>

        <section>
          <h2>15. Force Majeure</h2>
          <p>
            We are not liable for any failure or delay in performing our services that results from
            events beyond our reasonable control. Such events may include, but are not limited to,
            natural disasters, severe weather, fire, flood, epidemics or pandemics, acts of
            government, strikes, civil unrest, war, terrorism and the failure of supplier or
            telecommunications systems.
          </p>
        </section>

        <section>
          <h2>16. Customer Support</h2>
          <p>
            Our customer support team is available to help before, during and after your reservation
            request. You can reach us by telephone, email or the online enquiry form during business
            hours. We are committed to resolving any questions or concerns promptly and
            professionally.
          </p>
        </section>

        <section>
          <h2>17. Chargebacks</h2>
          <p>
            If you have a concern about a payment or reservation, please contact our customer support
            team before initiating a chargeback with your bank or card provider. Many issues can be
            resolved quickly and directly once we are aware of them.
          </p>
          <p>
            Raising a chargeback without first contacting us may delay the resolution of your query.
            We reserve the right to contest chargebacks that we believe have been raised without a
            valid reason or before we have had the opportunity to help.
          </p>
        </section>

        <section>
          <h2>18. Privacy</h2>
          <p>
            We handle your personal information in accordance with our{" "}
            <Link href="/privacy">Privacy Policy</Link>, which explains what information we collect,
            how we use it and the rights available to you. By using our services, you consent to the
            processing of your information as described in that policy.
          </p>
        </section>

        <section>
          <h2>19. Governing Law</h2>
          <p>
            These Terms &amp; Conditions are governed by, and construed in accordance with, the laws
            of the jurisdiction in which the company is registered. Any disputes arising in
            connection with them shall be subject to the exclusive jurisdiction of the courts of that
            jurisdiction.
          </p>
        </section>

        <section>
          <h2>20. Contact Us</h2>
          <p>
            If you have any questions about these Terms &amp; Conditions or would like assistance with
            a reservation request, please <Link href="/contact">contact us</Link> and our customer
            support team will be happy to help.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
