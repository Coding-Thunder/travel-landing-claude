"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/app/actions/enquiry";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const SERVICES = ["Flight Reservation", "Business Travel", "Group Travel", "Other"];

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
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [done, setDone] = useState(false);

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

  const onValid = async (values: EnquiryValues) => {
    setStatus("submitting");
    const res = await submitEnquiry(values);
    if (res.ok) {
      setDone(true);
      reset();
    } else {
      setStatus("error");
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm" role="status" aria-live="polite">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-50 text-royal-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-navy-900">Thank you — your enquiry has been received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          One of our reservation specialists will review your request and respond during business hours. A copy of your
          details has not been shared with any supplier without your instruction.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStatus("idle");
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
        <Field label="Destination" error={errors.destination?.message} required>
          {(p) => <input type="text" placeholder="City, region or country" {...register("destination")} {...p} />}
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
          {(p) => <textarea rows={4} placeholder="Room preferences, accessibility needs, budget or anything else we should know." {...register("message")} {...p} />}
        </Field>
      </div>

      {/* Honeypot — visually hidden, off keyboard + a11y tree */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          Something went wrong while sending your enquiry. Please try again, or contact us directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-royal-600 px-6 text-sm font-semibold text-white transition hover:bg-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-300 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Request a personalized quote"
        )}
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
