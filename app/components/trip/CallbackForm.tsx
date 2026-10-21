"use client";

import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { callbackSchema, type CallbackValues } from "@/lib/callback-schema";
import { site, mailtoHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const SERVICES = [...site.services.map((s) => s.name), "Custom Trip", "Existing booking", "Other"];

const PREFERRED_TIMES = [
  "As soon as possible",
  "Morning, 9:00 AM to 12:00 PM",
  "Afternoon, 12:00 PM to 5:00 PM",
  "Evening, 5:00 PM to 8:00 PM",
];

function buildCallbackMailto(v: CallbackValues): string {
  const body = [
    "Callback request",
    "",
    `Name: ${v.fullName}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email}`,
    `Travel service: ${v.service || "Not given"}`,
    `Destination: ${v.destination || "Not given"}`,
    `Preferred callback time: ${v.preferredTime || "No preference"}`,
    "",
    "Message:",
    v.message || "Not given",
    "",
    `Sent from ${site.domain}`,
  ].join("\n");
  const subject = `Callback request: ${v.fullName}${v.service ? ` (${v.service})` : ""}`;
  return `mailto:${site.company.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Callback request. Uses the same mailto hand-off as the enquiry form, and
 * states the real support hours rather than promising instant or 24/7 contact.
 */
export default function CallbackForm({ heading = site.cta.callback }: { heading?: string }) {
  const [done, setDone] = useState(false);
  const [mailtoLink, setMailtoLink] = useState("");
  const status = useSupportStatus();

  const {
    register,
    control,
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
      <Card className="p-6" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="text-base font-semibold">Thank you, press send to complete it</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Your email app should have opened with the callback request ready to go. Once you send it, a{" "}
              {site.name} representative will contact you during the stated support hours.
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
              .
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="rounded-lg border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold">{heading}</h3>
        {status ? (
          <Badge variant={status.open ? "secondary" : "muted"}>{status.open ? "Support open" : "Support closed"}</Badge>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Leave your number and a travel specialist will call you back during support hours.
      </p>

      {status && !status.open ? (
        <Alert variant="muted" className="mt-4 text-xs">
          <AlertDescription>
            Our support team is currently unavailable
            {status.nextOpen ? `. We are back ${status.nextOpen}` : ""}. Requests sent now are picked up when we
            reopen.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.fullName?.message} required>
          {(p) => <Input {...p} autoComplete="name" placeholder="Jane Smith" {...register("fullName")} />}
        </Field>
        <Field label="Phone" error={errors.phone?.message} required>
          {(p) => <Input {...p} type="tel" autoComplete="tel" placeholder="(555) 123-4567" {...register("phone")} />}
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          {(p) => <Input {...p} type="email" autoComplete="email" placeholder="jane@example.com" {...register("email")} />}
        </Field>
        <Field label="Travel service">
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
        <Field label="Destination">
          {(p) => <Input {...p} placeholder="Where are you heading?" {...register("destination")} />}
        </Field>
        <Field label="Preferred callback time">
          {(p) => (
            <Controller
              name="preferredTime"
              control={control}
              render={({ field }) => (
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger {...p} className="h-10">
                    <SelectValue placeholder="No preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREFERRED_TIMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </Field>
        <Field label="Message" className="sm:col-span-2">
          {(p) => (
            <Textarea {...p} rows={4} placeholder="Anything that would help us prepare before we call." {...register("message")} />
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

      <Button type="submit" className="mt-5 w-full">
        {site.cta.callback}
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Callbacks are made during the support hours shown on this page. We do not offer 24/7 or guaranteed instant
        callbacks. Never include full card numbers in this form.
      </p>
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
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const id = useId();
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
        "aria-describedby": error ? `${id}-error` : undefined,
      })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
