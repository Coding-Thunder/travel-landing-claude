"use client";

import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry-schema";
import { site, telHref, mailtoHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

/** The six categories plus the specialist request types. */
const SERVICES = [
  ...site.services.map((s) => s.name),
  "Custom Trip",
  "Business Travel",
  "Group Travel",
  "Existing booking",
  "Other",
];

/**
 * Composes the enquiry as a mailto: link to the support inbox. There is no
 * database or server mailer: submitting opens the visitor's own email app with
 * every detail pre-filled and they press send, so nothing is stored or
 * processed server side.
 */
function buildEnquiryMailto(v: EnquiryValues): string {
  const body = [
    `Name: ${v.fullName}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Service: ${v.service || "Not given"}`,
    `Destination or route: ${v.destination}`,
    `Travel dates: ${v.travelDates || "Not given"}`,
    `Travelers: ${v.travelers || "Not given"}`,
    ...(v.bookingRef ? [`Booking reference: ${v.bookingRef}`] : []),
    "",
    "Message:",
    v.message || "Not given",
    "",
    `Sent from ${site.domain}`,
  ].join("\n");
  const subject = `${site.name} enquiry${v.service ? `: ${v.service}` : ""}${
    v.destination ? ` (${v.destination})` : ""
  }`;
  return `mailto:${site.company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type EnquiryDefaults = {
  destination?: string;
  travelDates?: string;
  travelers?: string;
  service?: string;
  /** Structured extras carried over from the search module. */
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
    control,
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
      // Search selections arrive as notes and seed the message, so the
      // specialist gets the full brief without the visitor retyping it.
      message: defaults?.notes ? `${defaults.notes}\n\n` : "",
      companyWebsite: "",
    },
  });

  const onValid = (values: EnquiryValues) => {
    // Honeypot filled means a bot. Report success without composing anything.
    if (values.companyWebsite) {
      setDone(true);
      return;
    }
    const href = buildEnquiryMailto(values);
    setMailtoLink(href);
    setDone(true);
    reset();
    if (typeof window !== "undefined") window.location.assign(href);
  };

  if (done) {
    return (
      <Card className="p-6" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-base font-semibold">Almost there, just press send</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Your email app should have opened with the request ready to go. Send it and a {site.name} travel
              specialist will follow up during support hours with real options.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Did not open?{" "}
              {mailtoLink ? (
                <>
                  <a href={mailtoLink} className="font-medium text-primary underline-offset-4 hover:underline">
                    Open it again
                  </a>{" "}
                  or email{" "}
                </>
              ) : (
                "Email "
              )}
              <a href={mailtoHref} className="font-medium text-primary underline-offset-4 hover:underline">
                {site.company.supportEmail}
              </a>
              {site.contact.hasPhone ? (
                <>
                  , or call{" "}
                  <a href={telHref} className="font-medium text-primary underline-offset-4 hover:underline">
                    {site.company.phone}
                  </a>
                </>
              ) : null}
              .
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setDone(false);
                setMailtoLink("");
              }}
            >
              Send another request
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="rounded-lg border bg-card p-5 sm:p-6">
      <h3 className="text-base font-semibold">{heading}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        A travel specialist will reply with options, prices and the conditions that apply.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message} required>
          {(p) => <Input {...p} autoComplete="name" placeholder="Jane Smith" {...register("fullName")} />}
        </Field>
        <Field label="Email address" error={errors.email?.message} required>
          {(p) => <Input {...p} type="email" autoComplete="email" placeholder="jane@example.com" {...register("email")} />}
        </Field>
        <Field label="Phone number" error={errors.phone?.message} required>
          {(p) => <Input {...p} type="tel" autoComplete="tel" placeholder="(555) 123-4567" {...register("phone")} />}
        </Field>
        <Field label="Destination or route" error={errors.destination?.message} required>
          {(p) => <Input {...p} placeholder="e.g. New York to London" {...register("destination")} />}
        </Field>
        <Field label="Travel dates" hint="Approximate is fine">
          {(p) => <Input {...p} placeholder="e.g. 12 to 18 August 2026" {...register("travelDates")} />}
        </Field>
        <Field label="Travelers">
          {(p) => <Input {...p} placeholder="e.g. 2 adults, 1 child" {...register("travelers")} />}
        </Field>
        <Field label="Travel service" className={showBookingRef ? undefined : "sm:col-span-2"}>
          {(p) => (
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger {...p} className="h-10">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </Field>
        {showBookingRef ? (
          <Field label="Booking reference" hint="Only if you already have a booking with us">
            {(p) => <Input {...p} placeholder="e.g. FB-123456" {...register("bookingRef")} />}
          </Field>
        ) : null}
        <Field label="Anything else we should know" className="sm:col-span-2">
          {(p) => (
            <Textarea
              {...p}
              rows={5}
              placeholder="Cabin or room preferences, budget, accessibility needs, or anything else that shapes the trip."
              {...register("message")}
            />
          )}
        </Field>
      </div>

      {/* Honeypot: visually hidden, off the keyboard and the a11y tree. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
        </label>
      </div>

      <Alert variant="muted" className="mt-5 text-xs">
        <AlertDescription>
          Submitting opens your email app with these details ready to send to{" "}
          <span className="font-medium text-foreground">{site.company.supportEmail}</span>. Never send full card
          numbers by email. We will never ask for them this way.
        </AlertDescription>
      </Alert>

      <Button type="submit" className="mt-4 w-full">
        Send request
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{site.disclaimer}</p>
    </form>
  );
}

type ControlProps = {
  id: string;
  required?: boolean;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
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
  children: (props: ControlProps) => React.ReactNode;
}) {
  const id = useId();
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>
      {children({
        id,
        // The asterisk is decorative; assistive tech needs the real attribute.
        ...(required ? { required: true, "aria-required": true } : {}),
        "aria-invalid": error ? true : undefined,
        "aria-describedby": messageId,
      })}
      {error ? (
        <p id={messageId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
