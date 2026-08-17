"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock } from "lucide-react";
import { callbackSchema, type CallbackValues } from "@/lib/callback-schema";
import { site, mailtoHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";
import { cn } from "@/lib/cn";

const SERVICES = [...site.services.map((s) => s.name), "Custom Trip", "Existing booking", "Other"];

const PREFERRED_TIMES = [
  "As soon as possible",
  "Morning (9:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 5:00 PM)",
  "Evening (5:00 PM – 8:00 PM)",
];

function buildCallbackMailto(v: CallbackValues): string {
  const body = [
    "Callback request",
    "",
    `Name: ${v.fullName}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    `Travel service: ${v.service || "—"}`,
    `Destination: ${v.destination || "—"}`,
    `Preferred callback time: ${v.preferredTime || "—"}`,
    "",
    "Message:",
    v.message || "—",
    "",
    `— Sent from ${site.domain}`,
  ].join("\n");
  const subject = `Callback request — ${v.fullName}${v.service ? ` (${v.service})` : ""}`;
  return `mailto:${site.company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Callback request (§17). Uses the same mailto hand-off as the enquiry form —
 * there is no server mailer or database behind this site — and states the real
 * support hours rather than promising an instant or 24/7 response.
 */
export default function CallbackForm({ heading = site.cta.callback }: { heading?: string }) {
  const [done, setDone] = useState(false);
  const [mailtoLink, setMailtoLink] = useState("");
  const status = useSupportStatus();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      destination: "",
      preferredTime: "",
      message: "",
      companyWebsite: "",
    },
  });

  const onValid = (values: CallbackValues) => {
    if (values.companyWebsite) {
      setDone(true);
      return;
    }
    const href = buildCallbackMailto(values);
    setMailtoLink(href);
    setDone(true);
    reset();
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
        <h3 className="mt-5 text-xl font-semibold text-navy-900">Thank you — press send to complete it</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-600">
          Your email app should have opened with the callback request ready to go. Once you send it, a {site.name}{" "}
          representative will contact you during the stated support hours.
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
          .
        </p>
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
        Leave your number and a travel specialist will call you back during support hours.
      </p>

      {status ? (
        <p
          className={cn(
            "mt-4 flex items-start gap-2 rounded-lg px-3.5 py-2.5 text-xs leading-relaxed",
            status.open ? "bg-royal-50 text-royal-800" : "bg-navy-50 text-navy-700"
          )}
        >
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {status.open
              ? `Our support desk is open now — ${site.hoursLabel}.`
              : `Our support team is currently unavailable${status.nextOpen ? `. We are back ${status.nextOpen}` : ""}. Requests sent now are picked up when we reopen.`}
          </span>
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.fullName?.message} required>
          {(p) => <input type="text" autoComplete="name" placeholder="Jane Smith" {...register("fullName")} {...p} />}
        </Field>
        <Field label="Phone" error={errors.phone?.message} required>
          {(p) => <input type="tel" autoComplete="tel" placeholder="(555) 123-4567" {...register("phone")} {...p} />}
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          {(p) => <input type="email" autoComplete="email" placeholder="jane@example.com" {...register("email")} {...p} />}
        </Field>
        <Field label="Travel service">
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
        <Field label="Destination">
          {(p) => <input type="text" placeholder="Where are you heading?" {...register("destination")} {...p} />}
        </Field>
        <Field label="Preferred callback time">
          {(p) => (
            <select {...register("preferredTime")} {...p}>
              <option value="">No preference</option>
              {PREFERRED_TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Message" className="sm:col-span-2">
          {(p) => (
            <textarea
              rows={4}
              placeholder="Anything that would help us prepare before we call."
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

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-royal-600 px-6 text-sm font-semibold text-white transition hover:bg-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-300"
      >
        {site.cta.callback}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-navy-500">
        Callbacks are made during the support hours shown on this page. We do not offer 24/7 or guaranteed instant
        callbacks. Never include full card numbers in this form.
      </p>
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
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: FieldChildProps) => React.ReactNode;
}) {
  const id = useId();
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
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
        className: controlClass,
      })}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
