import { siteConfig } from "@/config/siteConfig";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

/** Reusable phone-first conversion band for content pages. */
export default function CallBand({
  heading = "Ready to lock in your rate?",
  subtext,
}: {
  heading?: string;
  subtext?: string;
}) {
  const { phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;
  return (
    <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{heading}</p>
          <a href={`tel:${phone}`} className="mt-1 block text-3xl font-extrabold tracking-tight text-slate-900 hover:text-brand-700 sm:text-4xl">
            {phoneVanity}
          </a>
          <p className="mt-1 text-sm text-slate-600">{subtext ?? `${phoneDisplay} · ${callResponse}`}</p>
        </div>
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
          >
            <Icon name="phone" className="h-5 w-5" />
            Call Now
          </a>
          <CtaButton source="callband-callback" variant="secondary" size="lg">
            <Icon name="headset" className="h-5 w-5 text-brand-600" />
            Request a Callback
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
