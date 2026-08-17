import Link from "next/link";
import LegalLayout from "@/app/components/trip/legal-layout";
import JsonLd from "@/app/components/trip/json-ld";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "How Flight Bizz uses cookies and similar technologies on this website, the categories of cookies we use and how you can manage them. Operated by GlobeVista LLC.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cookie Policy", path: "/cookie-policy" },
          ]),
        ]}
      />

      <LegalLayout
        title="Cookie Policy"
        updated="July 2026"
        intro="This Cookie Policy explains how we use cookies and similar technologies on this website."
      >
        <section>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer, tablet or mobile
            device when you visit a website. They are widely used to make websites work, to
            make them work more efficiently and to provide information to the website owner.
          </p>
          <p>
            A cookie allows a website to recognize your device and remember certain
            information about your visit, such as your preferences or the pages you have
            viewed. Similar technologies, including pixels, tags and local storage, perform
            comparable functions. In this policy we refer to all of these technologies
            collectively as &ldquo;cookies&rdquo;.
          </p>
        </section>

        <section>
          <h2>2. We Use Cookies To</h2>
          <p>
            We use cookies on {site.name} to help our website operate reliably and
            to improve the service we provide. In particular, we use cookies to:
          </p>
          <ul>
            <li>
              <strong>Improve performance</strong> &mdash; help our website load and run
              efficiently across different devices and browsers.
            </li>
            <li>
              <strong>Remember your preferences</strong> &mdash; recall choices you have made,
              such as previously entered details, so you do not have to re-enter them.
            </li>
            <li>
              <strong>Enhance security</strong> &mdash; help protect our website and your
              information, and support the safe handling of enquiries submitted through the
              site.
            </li>
            <li>
              <strong>Analyze traffic</strong> &mdash; understand how visitors find and use
              our website so that we can measure and improve its performance.
            </li>
            <li>
              <strong>Improve your experience</strong> &mdash; make the website easier to
              navigate and more relevant to the way our visitors use it.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Types of Cookies We Use</h2>
          <p>
            The cookies used on this website fall into the following broad categories:
          </p>
          <ul>
            <li>
              <strong>Essential cookies.</strong> These cookies are necessary for the website
              to function correctly. They enable core features such as page navigation, form
              submission and access to secure areas of the site. Without these cookies, parts
              of the website cannot work as intended.
            </li>
            <li>
              <strong>Functional cookies.</strong> These cookies allow the website to remember
              choices you make and to provide enhanced, more personalized features, such as
              retaining information you have entered when requesting assistance.
            </li>
            <li>
              <strong>Analytics cookies.</strong> These cookies collect information about how
              visitors use our website, for example which pages are visited most often. The
              information is aggregated and used to help us improve the way the website works.
            </li>
            <li>
              <strong>Performance cookies.</strong> These cookies help us monitor and improve
              the performance of the website, for example by measuring loading times and
              identifying errors so that we can resolve them.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Managing Cookies</h2>
          <p>
            You can control and manage cookies in several ways. Most web browsers allow you to
            view the cookies stored on your device, to delete individual cookies, to block
            cookies from particular websites and to block cookies altogether. The options
            available to you are usually found within your browser&rsquo;s settings or
            preferences menu.
          </p>
          <p>
            Please note that if you choose to disable or block cookies, some parts of this
            website may not function correctly. In particular, disabling essential cookies may
            affect features such as submitting an enquiry, and disabling functional cookies may
            mean the site is unable to remember your preferences.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            Some cookies on this website may be set by trusted third-party providers that
            support the operation and measurement of our site, such as analytics and security
            services. Where this is the case, those providers may use cookies in accordance
            with their own privacy and cookie policies, over which we have no direct control.
          </p>
          <p>
            We recommend reviewing the relevant provider&rsquo;s policies to understand how
            they use cookies and the information collected through them. We do not use cookies
            to sell your personal information.
          </p>
        </section>

        <section>
          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in the
            technologies we use, changes to our practices, or changes in applicable law. When
            we make changes, we will revise the &ldquo;last updated&rdquo; date shown at the
            top of this page. We encourage you to review this policy periodically so that you
            remain informed about how we use cookies.
          </p>
          <p>
            This Cookie Policy should be read together with our{" "}
            <Link href="/privacy">Privacy Policy</Link>, which explains how we handle your
            personal information, and our{" "}
            <Link href="/terms">Terms &amp; Conditions</Link>, which govern your use of this
            website. If you have any questions about our use of cookies, please{" "}
            <Link href="/contact">contact us</Link> and our team will be happy to help.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
