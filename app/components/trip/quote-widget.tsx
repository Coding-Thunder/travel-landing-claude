"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TRAVELERS = ["1 traveler", "2 travelers", "3 travelers", "4 travelers", "5 travelers", "6+ travelers"];
const telHref = `tel:${site.company.phoneHref || site.company.phone}`;

/**
 * Hero quote request. We do not run a live inventory search — this collects the
 * trip basics and carries them into the enquiry form, where a specialist picks
 * it up. Reuses the shared DatePicker/Select primitives.
 */
export default function QuoteWidget() {
  const router = useRouter();
  const [roundTrip, setRoundTrip] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState<Date | undefined>();
  const [ret, setRet] = useState<Date | undefined>();
  const [travelers, setTravelers] = useState(TRAVELERS[0]);
  const [touched, setTouched] = useState(false);

  const missing = touched && (!from.trim() || !to.trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!from.trim() || !to.trim()) return;

    const dates = [depart ? format(depart, "d MMM yyyy") : "", roundTrip && ret ? format(ret, "d MMM yyyy") : ""]
      .filter(Boolean)
      .join(" – ");

    const params = new URLSearchParams({
      destination: `${from.trim()} → ${to.trim()}`,
      service: "Flight Reservation",
      ...(dates ? { dates } : {}),
      travelers,
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-navy-100 sm:p-6">
      {/* Trip type */}
      <div className="inline-flex rounded-lg bg-navy-50 p-1">
        {[
          { label: "Round trip", value: true },
          { label: "One way", value: false },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setRoundTrip(opt.value)}
            aria-pressed={roundTrip === opt.value}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition",
              roundTrip === opt.value ? "bg-white text-navy-900 shadow-sm" : "text-navy-600 hover:text-navy-900"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="From" error={missing && !from.trim() ? "Required" : undefined}>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="City or airport"
            className={inputCls}
          />
        </Field>
        <Field label="To" error={missing && !to.trim() ? "Required" : undefined}>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="City or airport"
            className={inputCls}
          />
        </Field>
        <Field label="Departure">
          <DatePicker value={depart} onChange={setDepart} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label={roundTrip ? "Return" : "Return (one way)"}>
          {roundTrip ? (
            <DatePicker value={ret} onChange={setRet} minDate={depart ?? new Date()} placeholder="Add date" />
          ) : (
            <div className="flex h-11 items-center rounded-md border border-dashed border-navy-200 px-3 text-sm text-navy-400">
              Not required
            </div>
          )}
        </Field>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <Field label="Travelers">
          <Select value={travelers} onValueChange={setTravelers}>
            <SelectTrigger className="border-navy-200 focus:border-royal-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRAVELERS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Button type="submit" variant="royal" size="lg" className="h-11 w-full sm:w-auto sm:px-8">
          Get a quote
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-navy-100 pt-4 text-sm text-navy-600">
        Prefer to speak with someone?
        <a href={telHref} className="inline-flex items-center gap-1.5 font-semibold text-royal-700 hover:underline">
          <Phone className="h-4 w-4" />
          {site.company.phone}
        </a>
      </p>
    </form>
  );
}

const inputCls =
  "h-11 w-full rounded-md border border-navy-200 bg-white px-3 text-sm text-navy-900 placeholder:text-navy-300 transition focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-200";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-navy-500">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
