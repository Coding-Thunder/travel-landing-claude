"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { trackContactConversion } from "@/lib/analytics";
import Icon from "../ui/Icon";
import StarRating from "../ui/StarRating";

const easeOut = [0.22, 1, 0.36, 1] as const;
const LEAD_KEY = "bt-lead-submitted";

type CallModalProps = {
  open: boolean;
  onClose: () => void;
  pickup?: string;
  source?: string;
};

export default function CallModal({ open, onClose, pickup = "", source = "manual" }: CallModalProps) {
  const { phone, phoneVanity, callResponse, callModal, trust, destinations } = siteConfig;
  const [name, setName] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // Pickup is an uncontrolled field: `key={pickup}` remounts it with the
  // CTA-provided default, while the user can still edit it freely.
  const pickupRef = useRef<HTMLInputElement>(null);

  // Manage body scroll lock, focus and Escape-to-close while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panelRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneVal.trim()) return;
    // Demo lead capture (no backend). In production, POST to your CRM here.
    try {
      sessionStorage.setItem(LEAD_KEY, "1");
    } catch {
      /* ignore */
    }
    const pickupValue = pickupRef.current?.value ?? "";
    console.info("[lead] callback request", { name, phone: phoneVal, pickup: pickupValue, source });
    trackContactConversion();
    setSubmitted(true);
  };

  return (
    <AnimatePresence onExitComplete={() => setSubmitted(false)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="callmodal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl outline-none"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.32, ease: easeOut }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header band */}
            <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-700 px-6 pb-6 pt-7 text-white sm:px-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>
                {siteConfig.hero.eyebrow}
              </div>
              <h2 id="callmodal-title" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.75rem]">
                {callModal.headline}
              </h2>
              <p className="mt-2 text-sm text-white/85">{callModal.subtitle}</p>
            </div>

            <div className="px-6 py-6 sm:px-8">
              {submitted ? (
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Icon name="check" className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Request received</h3>
                  <p className="mt-2 text-sm text-slate-600">{callModal.success}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-600">{callModal.response}</p>
                  <a
                    href={`tel:${phone}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
                  >
                    <Icon name="phone" className="h-5 w-5" />
                    Or call now · {phoneVanity}
                  </a>
                </div>
              ) : (
                <>
                  {/* Primary: tap to call */}
                  <a
                    href={`tel:${phone}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 transition hover:border-brand-200 hover:bg-brand-100/70"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)]">
                        <Icon name="phone" className="h-6 w-6" />
                      </span>
                      <span className="text-left">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-700">
                          {callModal.callCta} · 24/7
                        </span>
                        <span className="block text-xl font-extrabold tracking-tight text-slate-900">
                          {phoneVanity}
                        </span>
                        <span className="block text-xs text-slate-500">{callResponse}</span>
                      </span>
                    </span>
                    <span className="hidden shrink-0 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition group-hover:bg-brand-700 sm:inline-block">
                      Call
                    </span>
                  </a>

                  {/* Divider */}
                  <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className="h-px flex-1 bg-slate-200" />
                    {callModal.callbackTitle}
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>

                  {/* Callback form */}
                  <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    <Field label={callModal.fields.name} htmlFor="cb-name">
                      <input
                        id="cb-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      />
                    </Field>
                    <Field label={callModal.fields.phone} htmlFor="cb-phone">
                      <input
                        id="cb-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      />
                    </Field>
                    <Field label={callModal.fields.location} htmlFor="cb-loc">
                      <input
                        key={pickup}
                        ref={pickupRef}
                        id="cb-loc"
                        type="text"
                        list="cb-cities"
                        defaultValue={pickup}
                        placeholder="City or airport"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                      />
                      <datalist id="cb-cities">
                        {destinations.map((d) => (
                          <option key={d.city} value={`${d.city}, ${d.state}`} />
                        ))}
                      </datalist>
                    </Field>

                    <button
                      type="submit"
                      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-slate-800"
                    >
                      {callModal.callbackCta}
                    </button>
                  </form>
                </>
              )}

              {/* Trust footer */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                <StarRating rating={Number(trust.rating)} starClassName="h-3.5 w-3.5" />
                <span className="font-bold text-slate-900">{trust.rating}</span>
                <span className="text-slate-300">·</span>
                <span>{trust.highlights.join(" · ")}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );
}
