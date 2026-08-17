"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry-schema";
import { site, telHref, mailtoHref } from "@/config/site";
import { cn } from "@/lib/cn";

/** Selectable services — the six categories plus the specialist request types. */
const SERVICES = [
  ...site.services.map((s) => s.name),
  "Custom Trip",
  "Business Travel",
  "Group Travel",
  "Existing booking",
  "Other",
];

/**
 * Composes the enquiry as a mailto: link addressed to our support inbox. There
 * is no database or server mailer — submitting opens the visitor's own email
 * app with every detail pre-filled, and they press send. Delivery is the
 * visitor's mail client, so nothing is stored or processed server-side.
 */
function buildEnquiryMailto(v: EnquiryValues): string {
  const body = [
    `Name: ${v.fullName}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service: ${v.service || "—"}`,
    `Destination / route: ${v.destination}`,
    `Travel dates: ${v.travelDates || "—"}`,
    `Travellers: ${v.travelers || "—"}`,
    ...(v.bookingRef ? [`Booking reference: ${v.bookingRef}`] : []),
    "",
    "Message:",
    v.message || "—",
    "",
    `— Sent from ${site.domain}`,
  ].join("\n");
  const subject = `${site.name} enquiry${v.service ? ` — ${v.service}` : ""}${
    v.destination ? ` (${v.destination})` : ""
  }`;
  return `mailto:${site.company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type EnquiryDefaults = {
  destination?: string;
  travelDates?: string;
  travelers?: string;
  service?: string;
  /** Structured extras carried over from the search module (cabin, options, …). */
  notes?: string;
};

export default function EnquiryForm({
  heading = "Request travel options",
  defaultService,
  defaults,
  showBookingRef = false,
}: {
  heading?: string;
  defaultService?: string;
  defaults?: EnquiryDefaults;
  showBookingRef?: boolean;
}) {
  const [done, setDone] = useState(false);
  const [mailtoLink, setMailtoLink] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: defaults?.destination ?? "",
      travelDates: defaults?.travelDates ?? "",
      travelers: defaults?.travelers ?? "",
      service: defaults?.service ?? defaultService ?? "",
      bookingRef: "",
      // Search-module selections arrive as notes and seed the message so the
      // specialist receives the full brief without the visitor retyping it.
      message: defaults?.notes ? `${defaults.notes}\n\n` : "",
      companyWebsite: "",
    },
  });

  const onValid = (values: EnquiryValues) => {
    // Honeypot filled → bot. Show success without composing anything.
    if (values.companyWebsite) {
      setDone(true);
      return;
    }
    const href = buildEnquiryMailto(values);
    setMailtoLink(href);
    setDone(true);
    reset();
    // Open the visitor's own email app with the enquiry ready to send.
    if (typeof window !== "undefined") window.location.assign(href);
  };

  if (done) {
    return (
      <div
        className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-50 text-royal-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-navy-900">Almost there — just press send</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          Your email app should have opened with your request ready to go. Send it and a {site.name} travel
          specialist will follow up during support hours with real options.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500">
          Didn&rsquo;t open?{" "}
          {mailtoLink ? (
            <>
              <a href={mailtoLink} className="font-semibold text-royal-700 underline-offset-4 hover:underline">
                Open it again
              </a>{" "}
              or email{" "}
            </>
          ) : (
            "Email "
          )}
          <a href={mailtoHref} className="font-semibold text-royal-700 underline-offset-4 hover:underline">
            {site.company.supportEmail}
          </a>
          {site.contact.hasPhone ? (
            <>
              , or call{" "}
              <a href={telHref} className="font-semibold text-royal-700 underline-offset-4 hover:underline">
                {site.company.phone}
              </a>
            </>
          ) : null}
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setMailtoLink("");
          }}
          className="mt-6 text-sm font-semibold text-royal-700 underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="text-lg font-semibold text-navy-900">{heading}</h3>
      <p className="mt-1 text-sm text-navy-600">
        Tell us what you need and a travel specialist will come back with options, prices and the conditions that
        apply.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message} required>
          {(p) => <input type="text" autoComplete="name" placeholder="Jane Smith" {...register("fullName")} {...p} />}
        </Field>
        <Field label="Email address" error={errors.email?.message} required>
          {(p) => <input type="email" autoComplete="email" placeholder="jane@example.com" {...register("email")} {...p} />}
        </Field>
        <Field label="Phone number" error={errors.phone?.message} required>
          {(p) => <input type="tel" autoComplete="tel" placeholder="(555) 123-4567" {...register("phone")} {...p} />}
        </Field>
        <Field label="Destination or route" error={errors.destination?.message} required>
          {(p) => <input type="text" placeholder="e.g. New York → London" {...register("destination")} {...p} />}
        </Field>
        <Field label="Travel dates" hint="Approximate is fine">
          {(p) => <input type="text" placeholder="e.g. 12–18 August 2026" {...register("travelDates")} {...p} />}
        </Field>
        <Field label="Travellers">
          {(p) => <input type="text" placeholder="e.g. 2 adults, 1 child" {...register("travelers")} {...p} />}
        </Field>
        <Field label="Travel service" className={showBookingRef ? undefined : "sm:col-span-2"}>
          {(p) => (
            <select {...register("service")} {...p}>
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </Field>
        {showBookingRef ? (
          <Field label="Booking reference" hint="Only if you already have a booking with us">
            {(p) => <input type="text" placeholder="e.g. FB-123456" {...register("bookingRef")} {...p} />}
          </Field>
        ) : null}
        <Field label="Anything else we should know" className="sm:col-span-2">
          {(p) => (
            <textarea
              rows={5}
              placeholder="Cabin or room preferences, budget, accessibility needs, or anything else that shapes the trip."
              {...register("message")}
              {...p}
            />
          )}
        </Field>
      </div>

      {/* Honeypot — visually hidden, off keyboard + a11y tree */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
        </label>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-navy-500">
        Submitting opens your email app with these details ready to send to{" "}
        <span className="font-medium text-navy-700">{site.company.supportEmail}</span> — just press send. Never send
        full card numbers by email; we will never ask for them this way.
      </p>

      <button
        type="submit"
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-royal-600 px-6 text-sm font-semibold text-white transition hover:bg-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-300"
      >
        Send request
      </button>

      <p className="mt-3 text-xs leading-relaxed text-navy-500">{site.disclaimer}</p>
    </form>
  );
}

type FieldChildProps = {
  id: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className: string;
};

function Field({
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (props: FieldChildProps) => React.ReactNode;
}) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const controlClass = cn(
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 transition focus:outline-none focus:ring-2 focus:ring-royal-200",
    error ? "border-red-400 focus:border-red-500" : "border-navy-200 focus:border-royal-500"
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-800">
        {label}
        {required ? <span className="ml-0.5 text-royal-600">*</span> : null}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, className: controlClass })}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-navy-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
