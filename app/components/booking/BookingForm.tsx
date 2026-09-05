"use client";

import { useId, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";
import { useCall } from "../call/CallProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import Icon from "../ui/Icon";

export type BookingAirport = { iata: string; city: string };

const TIMES = (() => {
  const out: { value: string; label: string }[] = [];
  for (let h = 5; h <= 23; h++) {
    for (const m of [0, 30]) {
      const value = `${String(h).padStart(2, "0")}:${m === 0 ? "00" : "30"}`;
      const hour12 = ((h + 11) % 12) + 1;
      out.push({ value, label: `${hour12}:${m === 0 ? "00" : "30"} ${h < 12 ? "AM" : "PM"}` });
    }
  }
  return out;
})();

const timeLabel = (value: string) => TIMES.find((t) => t.value === value)?.label ?? value;

const schema = z
  .object({
    pickup: z.string().min(1, "Choose a pick-up airport"),
    dropoff: z.string().optional(),
    pickupDate: z.date({ error: "Add a pick-up date" }),
    pickupTime: z.string().min(1, "Add a time"),
    returnDate: z.date({ error: "Add a return date" }),
    returnTime: z.string().min(1, "Add a time"),
    driverAge: z.string().min(1),
  })
  .refine((d) => d.returnDate >= d.pickupDate, { error: "Return is before pick-up", path: ["returnDate"] });

type Values = z.infer<typeof schema>;

/**
 * The hero rental search.
 *
 * There is no live inventory behind this site, so the form's job is to collect
 * a complete brief and hand it to an agent. It therefore forwards EVERY field
 * into the call popup as `notes` — the previous version discarded the dates,
 * times and driver age the visitor had just filled in, which meant they had to
 * repeat all of it on the phone.
 */
export default function BookingForm({ airports }: { airports: BookingAirport[] }) {
  const { open } = useCall();
  const [differentDropoff, setDifferentDropoff] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickup: "",
      dropoff: "",
      pickupTime: "10:00",
      returnTime: "10:00",
      driverAge: siteConfig.quote.driverAges[0],
    },
  });

  const pickupDate = useWatch({ control, name: "pickupDate" });

  const onSubmit = (v: Values) => {
    const notes = [
      v.dropoff ? `Drop-off: ${v.dropoff}` : "Returning to the pick-up airport",
      `Pick-up: ${format(v.pickupDate, "EEE d MMM yyyy")} at ${timeLabel(v.pickupTime)}`,
      `Return: ${format(v.returnDate, "EEE d MMM yyyy")} at ${timeLabel(v.returnTime)}`,
      `Driver age: ${v.driverAge}`,
    ].join(" · ");

    open({ source: "hero-booking", pickup: v.pickup, notes });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Rental car search">
      <div className={cn("grid gap-3", differentDropoff ? "sm:grid-cols-2" : "sm:grid-cols-1")}>
        <Field label="Pick-up airport" error={errors.pickup?.message}>
          {(p) => (
            <Controller
              control={control}
              name="pickup"
              render={({ field }) => (
                <AirportCombobox
                  {...p}
                  airports={airports}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Airport or city"
                />
              )}
            />
          )}
        </Field>
        {differentDropoff ? (
          <Field label="Drop-off airport" error={errors.dropoff?.message}>
            {(p) => (
              <Controller
                control={control}
                name="dropoff"
                render={({ field }) => (
                  <AirportCombobox
                    {...p}
                    airports={airports}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="Same as pick-up"
                  />
                )}
              />
            )}
          </Field>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setDifferentDropoff((v) => !v)}
        aria-pressed={differentDropoff}
        className="mt-1 inline-flex min-h-11 items-center rounded-sm py-2 text-[13px] font-medium text-primary transition-colors hover:underline"
      >
        {differentDropoff ? "− Return to the same airport" : "+ Return to a different airport"}
      </button>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_0.8fr_auto]">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Pick-up date" error={errors.pickupDate?.message}>
            {(p) => (
              <Controller
                control={control}
                name="pickupDate"
                render={({ field }) => (
                  <DatePicker {...p} value={field.value} onChange={field.onChange} minDate={new Date()} placeholder="Date" />
                )}
              />
            )}
          </Field>
          {/* Labelled "Pick-up time", not "Time": two controls named "Time" in
              the same form are indistinguishable to a screen reader. */}
          <Field label="Pick-up time" visualLabel="Time">
            {(p) => (
              <Controller
                control={control}
                name="pickupTime"
                render={({ field }) => <TimeSelect {...p} value={field.value} onChange={field.onChange} />}
              />
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Return date" error={errors.returnDate?.message}>
            {(p) => (
              <Controller
                control={control}
                name="returnDate"
                render={({ field }) => (
                  <DatePicker
                    {...p}
                    value={field.value}
                    onChange={field.onChange}
                    minDate={pickupDate ?? new Date()}
                    placeholder="Date"
                  />
                )}
              />
            )}
          </Field>
          <Field label="Return time" visualLabel="Time">
            {(p) => (
              <Controller
                control={control}
                name="returnTime"
                render={({ field }) => <TimeSelect {...p} value={field.value} onChange={field.onChange} />}
              />
            )}
          </Field>
        </div>

        <Field label="Driver age">
          {(p) => (
            <Controller
              control={control}
              name="driverAge"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger {...p}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {siteConfig.quote.driverAges.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </Field>

        <div className="flex flex-col justify-end">
          <Button type="submit" className="w-full lg:w-auto lg:px-7">
            <Icon name="search" />
            Find my rate
          </Button>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-muted-foreground">
        We confirm your best all-in rate by phone — no card required to search.
      </p>
    </form>
  );
}

/**
 * Field wrapper.
 *
 * Passes id / aria-invalid / aria-describedby down to the control via a render
 * prop, so a Radix trigger button is genuinely named by its label and its error
 * is genuinely associated — a wrapping `<label>` does neither for a button.
 */
function Field({
  label,
  visualLabel,
  error,
  children,
}: {
  label: string;
  /** Shorter text to display when the accessible name needs to be more specific. */
  visualLabel?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
    "aria-label"?: string;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <Label htmlFor={id} className="mb-1 block text-xs text-muted-foreground">
        {visualLabel ?? label}
      </Label>
      {children({
        id,
        ...(error ? { "aria-invalid": true as const, "aria-describedby": errorId } : {}),
        ...(visualLabel ? { "aria-label": label } : {}),
      })}
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TimeSelect({
  value,
  onChange,
  ...trigger
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
  "aria-label"?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger {...trigger}>
        <SelectValue placeholder="Time" />
      </SelectTrigger>
      <SelectContent>
        {TIMES.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function AirportCombobox({
  airports,
  value,
  onChange,
  placeholder,
  id,
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
}: {
  airports: BookingAirport[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  id?: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          // `combobox`, not the implicit `button` role: this control opens a
          // listbox and carries a validation state, and `aria-invalid` is not
          // supported on role=button.
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm transition-colors",
            "hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            invalid && "border-destructive",
            !value && "text-muted-foreground"
          )}
        >
          <Icon name="pin" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate">{value || placeholder}</span>
          <Icon name="chevronDown" className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[260px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search airports…" />
          <CommandList id={listId}>
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup heading="Popular airports">
              {airports.map((a) => {
                const label = `${a.iata} — ${a.city}`;
                return (
                  <CommandItem
                    key={a.iata}
                    value={`${a.city} ${a.iata}`}
                    onSelect={() => {
                      onChange(label);
                      setOpen(false);
                    }}
                  >
                    <Icon name="airport" className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{a.city}</span>
                    <span className="text-xs text-muted-foreground">{a.iata}</span>
                    {value === label ? <Icon name="check" className="h-4 w-4 text-primary" /> : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
