"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronDown, MapPin, Plane } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";
import { useCall } from "../call/CallProvider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

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

export default function BookingForm({ airports }: { airports: BookingAirport[] }) {
  const { open } = useCall();
  const [differentDropoff, setDifferentDropoff] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { pickup: "", dropoff: "", pickupTime: "10:00", returnTime: "10:00", driverAge: siteConfig.quote.driverAges[0] },
  });

  const pickupDate = useWatch({ control, name: "pickupDate" });

  const onSubmit = (values: Values) => {
    open({ source: "hero-booking", pickup: values.pickup });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-ink">
      {/* Locations */}
      <div className={cn("grid gap-3", differentDropoff ? "sm:grid-cols-2" : "sm:grid-cols-1")}>
        <Field label="Pick-up airport" error={errors.pickup?.message}>
          <Controller
            control={control}
            name="pickup"
            render={({ field }) => (
              <AirportCombobox airports={airports} value={field.value} onChange={field.onChange} invalid={!!errors.pickup} placeholder="Airport or city" />
            )}
          />
        </Field>
        {differentDropoff ? (
          <Field label="Drop-off airport" error={errors.dropoff?.message}>
            <Controller
              control={control}
              name="dropoff"
              render={({ field }) => (
                <AirportCombobox airports={airports} value={field.value ?? ""} onChange={field.onChange} placeholder="Same as pick-up" />
              )}
            />
          </Field>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setDifferentDropoff((v) => !v)}
        className="mt-2 text-[13px] font-medium text-accent transition hover:text-accent-bright"
      >
        {differentDropoff ? "− Return to the same airport" : "+ Return to a different airport"}
      </button>

      {/* Schedule + age + submit */}
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_0.8fr_auto]">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Pick-up date" error={errors.pickupDate?.message}>
            <Controller
              control={control}
              name="pickupDate"
              render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} minDate={new Date()} invalid={!!errors.pickupDate} placeholder="Date" />}
            />
          </Field>
          <Field label="Time">
            <Controller control={control} name="pickupTime" render={({ field }) => <TimeSelect value={field.value} onChange={field.onChange} />} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Return date" error={errors.returnDate?.message}>
            <Controller
              control={control}
              name="returnDate"
              render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} minDate={pickupDate ?? new Date()} invalid={!!errors.returnDate} placeholder="Date" />}
            />
          </Field>
          <Field label="Time">
            <Controller control={control} name="returnTime" render={({ field }) => <TimeSelect value={field.value} onChange={field.onChange} />} />
          </Field>
        </div>

        <Field label="Driver age">
          <Controller
            control={control}
            name="driverAge"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.quote.driverAges.map((a) => (
                    <SelectItem key={a} value={a}>{a} years</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <div className="flex flex-col justify-end">
          <span className="mb-1 hidden lg:block" aria-hidden />
          <Button type="submit" size="lg" className="h-11 w-full lg:w-auto lg:px-7">
            Find my rate
          </Button>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-ink-muted">
        We confirm your best all-in rate by phone — no card required to search.
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-[12px] font-medium text-red-500">{error}</span> : null}
    </label>
  );
}

function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Time" />
      </SelectTrigger>
      <SelectContent>
        {TIMES.map((t) => (
          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
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
  invalid,
}: {
  airports: BookingAirport[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-md border bg-surface px-3 text-left text-sm outline-none transition",
            invalid ? "border-red-400" : "border-line-strong hover:border-ink/40 focus:border-ink",
            value ? "text-ink" : "text-ink-muted"
          )}
        >
          <MapPin className="h-4 w-4 shrink-0 text-ink-muted" />
          <span className="flex-1 truncate">{value || placeholder}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-ink-muted" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[260px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search airports…" />
          <CommandList>
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
                    <Plane className="h-4 w-4 -rotate-45 text-ink-muted" />
                    <span className="flex-1">{a.city}</span>
                    <span className="text-[11px] font-medium text-ink-muted">{a.iata}</span>
                    {value === label ? <Check className="h-4 w-4 text-accent" /> : null}
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
