"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry-schema";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const SERVICES = ["Flight Reservation", "Business Travel", "Group Travel", "Other"];

const telHref = `tel:${site.company.phoneHref || site.company.phone}`;

/**
 * Composes the enquiry as a mailto: link addressed to our inbox. There is no
 * database or server mailer — submitting opens the visitor's own email app with
 * every detail pre-filled, and they press send. Delivery is the visitor's mail
 * client, so nothing is stored or processed server-side.
 */
function buildEnquiryMailto(v: EnquiryValues): string {
  const body = [
    `Name: ${v.fullName}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service: ${v.service || "—"}`,
    `Route / destination: ${v.destination}`,
    `Travel dates: ${v.travelDates || "—"}`,
    `Travelers: ${v.travelers || "—"}`,
    "",
    "Message:",
    v.message || "—",
  ].join("\n");
  const subject = `Flight enquiry${v.service ? ` — ${v.service}` : ""}${v.destination ? ` (${v.destination})` : ""}`;
  return `mailto:${site.company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type EnquiryDefaults = {
  destination?: string;
  travelDates?: string;
  travelers?: string;
  service?: string;
};

export default function EnquiryForm({
  heading = "Request a personalized quote",
  defaultService,
  defaults,
}: {
  heading?: string;
  defaultService?: string;
  defaults?: EnquiryDefaults;
}) {
  const [done, setDone] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

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
      message: "",
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
    setMailtoHref(href);
    setDone(true);
    reset();
    // Open the visitor's own email app with the enquiry ready to send.
    if (typeof window !== "undefined") window.location.assign(href);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm" role="status" aria-live="polite">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-50 text-royal-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-navy-900">Almost there — just press send</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          Your email app should have opened with your enquiry ready to go. Send it and one of our reservation
          specialists will follow up during business hours.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-500">
          Didn&rsquo;t open?{" "}
          {mailtoHref ? (
            <>
              <a href={mailtoHref} className="font-semibold text-royal-600 underline-offset-4 hover:underline">Open it again</a>
              {" "}or email{" "}
            </>
          ) : (
            "Email "
          )}
          <a href={`mailto:${site.company.supportEmail}`} className="font-semibold text-royal-600 underline-offset-4 hover:underline">
            {site.company.supportEmail}
          </a>
          , or call{" "}
          <a href={telHref} className="font-semibold text-royal-600 underline-offset-4 hover:underline">{site.company.phone}</a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setMailtoHref("");
          }}
          className="mt-6 text-sm font-semibold text-royal-600 underline-offset-4 hover:underline"
        >
          Submit another enquiry
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
      <p className="mt-1 text-sm text-navy-600">Tell us what you need and our team will be in touch with suitable options.</p>

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
        <Field label="Route or destination" error={errors.destination?.message} required>
          {(p) => <input type="text" placeholder="e.g. New York → London" {...register("destination")} {...p} />}
        </Field>
        <Field label="Travel dates" hint="Approximate is fine">
          {(p) => <input type="text" placeholder="e.g. 12–18 August 2026" {...register("travelDates")} {...p} />}
        </Field>
        <Field label="Number of travelers">
          {(p) => <input type="text" inputMode="numeric" placeholder="e.g. 2 adults, 1 child" {...register("travelers")} {...p} />}
        </Field>
        <Field label="Preferred service">
          {(p) => (
            <select {...register("service")} {...p}>
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Special requests" className="sm:col-span-2">
          {(p) => <textarea rows={4} placeholder="Seating preferences, cabin class, budget or anything else we should know." {...register("message")} {...p} />}
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
        <span className="font-medium text-navy-700">{site.company.supportEmail}</span> — just press send.
      </p>

      <button
        type="submit"
        className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-royal-600 px-6 text-sm font-semibold text-white transition hover:bg-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-300"
      >
        Send enquiry
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
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 transition focus:outline-none focus:ring-2 focus:ring-royal-200",
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
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-navy-500">{hint}</p>
      ) : null}
    </div>
  );
}
