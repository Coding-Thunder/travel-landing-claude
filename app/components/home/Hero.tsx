import Image from "next/image";
import { airports } from "@/config/airports";
import { siteConfig } from "@/config/siteConfig";
import BookingForm from "../booking/BookingForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=80";

const TRUST = ["No hidden fees", "Free cancellation", "24/7 support", "Licensed & insured"];

export default function Hero() {
  const { phone, phoneVanity } = siteConfig;
  const heroAirports = airports.map((a) => ({ iata: a.iata, city: a.city }));

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.5]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1240px] flex-col justify-between gap-12 px-5 pb-10 pt-16 sm:px-8 lg:min-h-[740px] lg:pb-14 lg:pt-24">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700">
          <p className="overline text-white/55">Airport car rental · 300+ US locations</p>
          <h1 className="mt-5 font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Rent a car the
            <br className="hidden sm:block" /> moment you land.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">
            Premium vehicles at every major US airport, confirmed in a single call. No hidden fees, free
            cancellation, and a real person on the line — around the clock.
          </p>
          <div className="mt-7 flex items-center gap-4 text-sm text-white/70">
            <span className="h-px w-8 bg-white/30" />
            <span>
              Prefer to talk?{" "}
              <a href={`tel:${phone}`} className="font-semibold text-white underline-offset-4 hover:underline">
                Call {phoneVanity}
              </a>
            </span>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="rounded-2xl border border-line/70 bg-paper p-4 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] sm:p-5">
            <BookingForm airports={heroAirports} />
          </div>
          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[13px] text-white/65">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
