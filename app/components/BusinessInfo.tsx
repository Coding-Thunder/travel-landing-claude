import { siteConfig } from "@/config/siteConfig";

export default function BusinessInfo() {
  const {
    legalName,
    business,
    email,
    phone,
    phoneDisplay,
    addressLine,
    addressCity,
    addressRegion,
    addressRegionCode,
    addressPostal,
    hours,
  } = siteConfig;

  return (
    <section
      id="about"
      aria-labelledby="business-info-heading"
      className="bg-slate-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            About the business
          </p>
          <h2
            id="business-info-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            {legalName}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {business.serviceType}
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>{business.description}</p>
              <p>
                <span className="font-semibold text-slate-900">
                  How booking works:
                </span>{" "}
                {business.bookingFlow}
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  What happens after the call:
                </span>{" "}
                {business.afterCall}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact information
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-900">Business</dt>
                  <dd className="mt-1 text-slate-700">{legalName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${phone}`}
                      className="text-red-600 underline-offset-4 hover:underline"
                    >
                      {phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${email}`}
                      className="text-red-600 underline-offset-4 hover:underline"
                    >
                      {email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Location</dt>
                  <dd className="mt-1 not-italic text-slate-700">
                    <address className="not-italic">
                      {addressLine}
                      <br />
                      {addressCity}, {addressRegionCode} {addressPostal}
                      <br />
                      {addressRegion}, United States
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Hours</dt>
                  <dd className="mt-1 text-slate-700">{hours}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
