import Link from "next/link";
import LegalLayout from "@/app/components/trip/legal-layout";
import JsonLd from "@/app/components/trip/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "How Flight Bizz handles cancellation requests and refunds, including supplier policies, processing times and chargebacks. Operated by GlobeVista LLC.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Refund & Cancellation Policy", path: "/refund-policy" },
          ]),
        ]}
      />

      <LegalLayout
        title="Refund & Cancellation Policy"
        updated="July 2026"
        intro="This policy explains how cancellation requests and refunds are handled."
      >
        <section>
          <h2>1. Our Commitment</h2>
          <p>
            {site.name} is a multi-service online travel platform operated by {site.legalName}. We
            are committed to handling every cancellation request and refund fairly, transparently and
            as promptly as the applicable supplier conditions allow. This policy sets out how we
            approach these requests and what you can reasonably expect from us.
          </p>
          <p>
            Because we arrange travel rather than operate the services ourselves, the outcome of a
            cancellation or refund request depends on the terms set by the airline, hotel, rental
            company, activity operator or other supplier responsible for your booking. We will always
            explain those terms to you as clearly as we can and act on your behalf wherever it is
            within our ability to do so. This policy should be read together with our{" "}
            <Link href="/terms">Terms &amp; Conditions</Link>.
          </p>
        </section>

        <section>
          <h2>2. Cancellation Requests</h2>
          <p>
            If you need to cancel a booking, please contact our customer support team as soon
            as possible. Cancellation requests are time-sensitive, and acting early gives you the
            best chance of minimizing any charges that a supplier may apply.
          </p>
          <p>
            All cancellations are subject to the policies of the relevant travel supplier
            or tour operator, along with the fare rules, rate rules and booking conditions that
            applied when your booking was confirmed. These conditions vary from one supplier
            and rate to another, and some cannot be canceled or amended once confirmed. When you
            contact us we will:
          </p>
          <ul>
            <li>Confirm the cancellation terms that apply to your specific reservation.</li>
            <li>Explain any charges or conditions the supplier may impose before you proceed.</li>
            <li>Submit the cancellation request to the supplier on your behalf once you confirm.</li>
          </ul>
        </section>

        <section>
          <h2>3. Refund Eligibility</h2>
          <p>
            Whether a refund is available, and how much may be refunded, depends on the specific
            terms attached to your reservation. Eligibility is determined by factors including:
          </p>
          <ul>
            <li>The travel supplier&apos;s cancellation and refund policies.</li>
            <li>The policies of any tour operator or third party involved in the booking.</li>
            <li>The rate rules and booking conditions applicable to the reservation you selected.</li>
          </ul>
          <p>
            Depending on these terms, a reservation may be fully refundable, partially refundable
            or non-refundable. We will confirm the position that applies to your booking and,
            where a refund is available, help you request it. We cannot guarantee a refund in
            every situation, as supplier terms may reduce or exclude the amount that can be
            returned.
          </p>
        </section>

        <section>
          <h2>4. Service Not Provided</h2>
          <p>
            If a confirmed reservation cannot be provided for reasons that fall within our
            responsibility, we will review the circumstances and process an appropriate refund
            where applicable. We take our part in the reservation process seriously and will act
            promptly to put things right when the fault lies with us.
          </p>
          <p>
            Where the issue relates to the airline, travel supplier or another third party, for
            example, an overbooking, cancellation or schedule change made by the airline, we will assist you
            in communicating with the supplier and support your case to reach a fair resolution.
            Any refund in these circumstances remains subject to the supplier&apos;s own policies.
          </p>
        </section>

        <section>
          <h2>5. Emergency Situations</h2>
          <p>
            We understand that unexpected and difficult circumstances can arise around travel. If
            you are affected by an emergency that impacts your reservation, please contact us
            immediately so we can help as quickly as possible.
          </p>
          <p>
            Each emergency request is reviewed individually and on its own facts. While we cannot
            promise a particular outcome, as supplier terms still apply, we will make every
            reasonable effort to assist you and to liaise with the supplier on your behalf.
          </p>
        </section>

        <section>
          <h2>6. Supplier Charges</h2>
          <p>
            Travel suppliers, tour operators and other travel providers may apply their own
            charges when a reservation is canceled or changed. These can include:
          </p>
          <ul>
            <li>Cancellation charges applied under the supplier&apos;s policy.</li>
            <li>Change or amendment fees for modifications to a confirmed reservation.</li>
            <li>Administrative charges levied by the supplier.</li>
            <li>Non-refundable rates that carry no refund entitlement once confirmed.</li>
          </ul>
          <p>
            These charges are determined solely by the supplier and are outside our control. Where
            they apply, they may reduce the amount refunded to you or remove any refund
            entitlement altogether. We will always tell you about any charges we are aware of
            before you confirm a cancellation.
          </p>
        </section>

        <section>
          <h2>7. Processing Time</h2>
          <p>
            Once a refund has been approved and is payable, it will be returned to the original
            payment method used for the reservation. We do not issue refunds to a different card,
            account or payment method.
          </p>
          <p>
            Processing times vary and depend on the supplier, the payment provider and your bank
            or card issuer. While we aim to progress every approved refund without delay, the time
            it takes for funds to appear in your account is influenced by these third parties and
            is not something we are able to control.
          </p>
        </section>

        <section>
          <h2>8. Customer Support</h2>
          <p>
            Our customer support team is here to guide you through any cancellation or refund
            enquiry. If you have questions about the conditions attached to your reservation, the
            status of a request, or how a refund is progressing, please get in touch and we will
            help.
          </p>
          <p>
            You can reach us using the details on our{" "}
            <Link href="/contact">Contact</Link> page, and our team will respond during business
            hours.
          </p>
        </section>

        <section>
          <h2>9. Chargeback Policy</h2>
          <p>
            If you believe there is a problem with a payment, please contact our customer support
            team before initiating a chargeback with your bank or card provider. We are committed
            to resolving payment concerns quickly and professionally, and most issues can be
            settled directly once we understand the details.
          </p>
          <p>
            Raising a chargeback before contacting us can delay a resolution and may complicate a
            request that we could otherwise have handled straightforwardly. Giving us the
            opportunity to help first is usually the fastest way to reach a fair outcome.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
