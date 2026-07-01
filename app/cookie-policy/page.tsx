import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "../components/LegalLayout";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie policy for ${siteConfig.legalName} — the cookies and analytics we use (including Google Analytics and Google Ads), why we use them, and how to control them.`,
  alternates: { canonical: "/cookie-policy" },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      updated="June 2026"
      intro={`This Cookie Policy explains how ${siteConfig.legalName} ("we", "us", "our") uses cookies and similar technologies on this website, the categories of cookies we set, and the choices you have. It should be read alongside our Privacy Policy.`}
    >
      <section>
        <h2>1. What cookies are</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They let a site
          remember your actions and preferences, measure how the site is used, and — with your consent
          where required — measure the performance of advertising. Similar technologies such as pixels,
          local storage and device identifiers work in comparable ways, and we refer to all of them as
          &ldquo;cookies&rdquo; in this policy.
        </p>
      </section>

      <section>
        <h2>2. How we use cookies</h2>
        <p>We group the cookies on this site into three categories:</p>
        <ul>
          <li>
            <strong>Strictly necessary.</strong> Required for the site to function — for example,
            remembering that you have dismissed our cookie notice. These do not track you across sites and
            cannot be switched off through our banner.
          </li>
          <li>
            <strong>Analytics.</strong> We use Google Analytics to understand which pages are visited and
            how visitors move through the site, so we can improve it. This data is aggregated and used for
            measurement, not to identify you personally.
          </li>
          <li>
            <strong>Advertising.</strong> We use Google Ads, including conversion tracking and remarketing,
            to measure the effectiveness of our advertising and to understand which visits lead to a phone
            call or callback request. These cookies may be used to show you relevant ads on other sites.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Third-party cookies</h2>
        <p>
          Some cookies are set by third parties that provide services to us. The main third parties on this
          site are Google Analytics and Google Ads (both operated by Google). Their use of information is
          governed by Google&rsquo;s own privacy and cookie policies. We do not control cookies set by
          third parties, and we recommend reviewing their policies for details.
        </p>
      </section>

      <section>
        <h2>4. Managing your cookies</h2>
        <p>You can control cookies in several ways:</p>
        <ul>
          <li>
            <strong>Browser settings.</strong> Most browsers let you block or delete cookies and warn you
            before they are set. Blocking all cookies may affect how parts of this and other websites work.
          </li>
          <li>
            <strong>Google&rsquo;s controls.</strong> You can opt out of personalized advertising through
            Google&rsquo;s Ads Settings, and you can install Google&rsquo;s Analytics opt-out browser
            add-on to prevent Analytics measurement.
          </li>
          <li>
            <strong>Do Not Track.</strong> This site does not respond differently to browser
            &ldquo;Do Not Track&rdquo; signals, as there is not yet a common standard for them.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Changes to this policy</h2>
        <p>
          We may update this Cookie Policy as our practices or applicable laws change. When we do, we will
          revise the &ldquo;last updated&rdquo; date above. Material changes will be reflected on this page.
        </p>
      </section>

      <section>
        <h2>6. Contact us</h2>
        <p>
          Questions about this policy? Call us at{" "}
          <a href={`tel:${siteConfig.phone}`} className="font-semibold text-brand-600 underline-offset-4 hover:underline">
            {siteConfig.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-600 underline-offset-4 hover:underline">
            {siteConfig.email}
          </a>
          . See also our{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-600 underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
