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
          <h2>2. Cookies This Website Currently Sets</h2>
          <p>
            At present {site.name} does not set analytics, advertising, performance or
            third-party tracking cookies on this website, and does not use pixels, tags or
            similar tracking technologies. We do not profile visitors and we do not sell personal information.
          </p>
          <p>
            The site uses your browser&rsquo;s local storage for one purpose only: to remember
            that you have dismissed the on-page offer of telephone assistance, so that it is
            not shown to you again. That value is stored on your own device, is not a cookie,
            is not transmitted to us, and contains no personal information. Clearing your
            browsing data removes it.
          </p>
          <p>
            If a strictly necessary cookie becomes required in future, for example to operate a
            booking or payment flow, this policy will be updated before that cookie is set.
          </p>
        </section>

        <section>
          <h2>3. Categories We Would Use</h2>
          <p>
            If cookies are introduced later, they would fall into the categories below. This
            section is included so the policy is complete, and it describes what each category
            would do rather than anything the site does today.
          </p>
          <ul>
            <li>
              <strong>Strictly necessary.</strong> Required for the website to function, for
              example to operate a secure booking or payment flow. These cannot be switched off
              without breaking the service.
            </li>
            <li>
              <strong>Functional.</strong> Used to remember choices you have made, such as
              details you entered when requesting assistance.
            </li>
            <li>
              <strong>Analytics.</strong> Used to understand which pages are visited most often,
              in aggregate, so we can improve the site.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Managing Cookies And Local Storage</h2>
          <p>
            Most browsers let you view stored cookies and local storage, delete them
            individually, block them for particular websites, or block them altogether. The
            options are usually under your browser&rsquo;s settings or preferences menu.
          </p>
          <p>
            Because this site sets no cookies today, blocking cookies will not affect how it
            works. Clearing local storage will simply mean the offer of telephone assistance can
            appear again.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            This website loads photography from a third-party image host and web fonts through
            our hosting provider. Those requests are needed to display the page and are not used
            to track you across other websites. We do not embed advertising networks, social
            media trackers or analytics providers.
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
