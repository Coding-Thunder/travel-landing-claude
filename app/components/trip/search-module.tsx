"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Minus, Phone, Plus, Search, Users } from "lucide-react";
import { site, telHref, type Service } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type ServiceKey = Service["key"];

const CABINS = ["Economy", "Premium Economy", "Business", "First"];
const TRIP_TYPES = ["Round trip", "One way", "Multi-city"] as const;
const VEHICLE_TYPES = ["Sedan", "SUV", "Van or minibus", "Accessible vehicle"];
const TRANSFER_TYPES = ["Airport to hotel", "Hotel to airport", "Private transfer", "Shared transfer"];
const DRIVER_AGES = ["18 to 20", "21 to 24", "25 to 69", "70 or over"];
const ACTIVITY_CATEGORIES = [
  "City tours",
  "Attractions",
  "Museums",
  "Adventure",
  "Family activities",
  "Food experiences",
  "Cruises",
  "Day trips",
  "Cultural experiences",
];
const PACKAGE_TYPES = [
  "Beach holidays",
  "Family holidays",
  "Honeymoon",
  "Luxury travel",
  "Adventure",
  "City breaks",
  "Weekend trips",
  "International packages",
];

/**
 * Unified travel search across the six categories.
 *
 * No live inventory sits behind this site, so the module does exactly what it
 * says: it captures a complete brief and carries it into the enquiry form for a
 * travel specialist to price. `bookingNotice` states that in the UI so the
 * primary CTA cannot be read as instant self-service booking.
 */
export default function SearchModule({
  defaultTab = "flights",
  className,
}: {
  defaultTab?: ServiceKey;
  className?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<ServiceKey>(defaultTab);

  const handoff = (service: string, destination: string, dates: string, travelers: string, notes: string[]) => {
    const kept = notes.filter(Boolean);
    const params = new URLSearchParams({
      service,
      destination,
      ...(dates ? { dates } : {}),
      ...(travelers ? { travelers } : {}),
      ...(kept.length ? { notes: kept.join(". ") } : {}),
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <section
      aria-label="Travel search"
      className={cn("rounded-xl border bg-card p-4 shadow-md sm:p-5", className)}
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as ServiceKey)}>
        <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pb-1">
          <TabsList>
            {site.services.map((s) => (
              <TabsTrigger key={s.key} value={s.key}>
                {s.shortName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="flights">
            <FlightsPanel onSubmit={handoff} />
          </TabsContent>
          <TabsContent value="hotels">
            <HotelsPanel onSubmit={handoff} />
          </TabsContent>
          <TabsContent value="cars">
            <CarsPanel onSubmit={handoff} />
          </TabsContent>
          <TabsContent value="transfers">
            <TransfersPanel onSubmit={handoff} />
          </TabsContent>
          <TabsContent value="activities">
            <ActivitiesPanel onSubmit={handoff} />
          </TabsContent>
          <TabsContent value="packages">
            <PackagesPanel onSubmit={handoff} />
          </TabsContent>
        </div>
      </Tabs>

      <Separator className="mt-5" />
      <p className="pt-3 text-xs leading-relaxed text-muted-foreground">{site.bookingNotice}</p>
    </section>
  );
}

type Submit = (service: string, destination: string, dates: string, travelers: string, notes: string[]) => void;

const fmt = (d?: Date) => (d ? format(d, "d MMM yyyy") : "");
const span = (a?: Date, b?: Date) => [fmt(a), fmt(b)].filter(Boolean).join(" to ");

/* -------------------------------------------------------------------------- */
/* Panels                                                                       */
/* -------------------------------------------------------------------------- */

function FlightsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [tripType, setTripType] = useState<(typeof TRIP_TYPES)[number]>("Round trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState<Date | undefined>();
  const [ret, setRet] = useState<Date | undefined>();
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState(CABINS[0]);
  const [opts, setOpts] = useState({ flexible: false, nearby: false, direct: false });
  const [touched, setTouched] = useState(false);

  const needsReturn = tripType !== "One way";

  return (
    <PanelForm
      label="Search flights"
      onSubmit={() => {
        setTouched(true);
        if (!from.trim() || !to.trim()) return;
        onSubmit("Flights", `${from.trim()} to ${to.trim()}`, needsReturn ? span(depart, ret) : fmt(depart), paxLabel(pax), [
          tripType,
          `Cabin: ${cabin}`,
          opts.flexible ? "Flexible dates" : "",
          opts.nearby ? "Include nearby airports" : "",
          opts.direct ? "Direct flights only" : "",
        ]);
      }}
      options={
        <>
          <Check label="Flexible dates" checked={opts.flexible} onChange={(v) => setOpts({ ...opts, flexible: v })} />
          <Check label="Nearby airports" checked={opts.nearby} onChange={(v) => setOpts({ ...opts, nearby: v })} />
          <Check label="Direct only" checked={opts.direct} onChange={(v) => setOpts({ ...opts, direct: v })} />
        </>
      }
    >
      <div className="mb-3">
        <Segmented options={TRIP_TYPES} value={tripType} onChange={setTripType} label="Trip type" />
      </div>

      <Row>
        <Field label="From" error={touched && !from.trim() ? "Required" : undefined}>
          {(p) => <Input {...p} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="City or airport" />}
        </Field>
        <Field label="To" error={touched && !to.trim() ? "Required" : undefined}>
          {(p) => <Input {...p} value={to} onChange={(e) => setTo(e.target.value)} placeholder="City or airport" />}
        </Field>
        <Field label="Depart">
          {(p) => <DatePicker {...p} value={depart} onChange={setDepart} minDate={new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Return">
          {(p) =>
            needsReturn ? (
              <DatePicker {...p} value={ret} onChange={setRet} minDate={depart ?? new Date()} placeholder="Add date" />
            ) : (
              <Input {...p} disabled readOnly value="Not needed" className="border-dashed" />
            )
          }
        </Field>
      </Row>

      <Row className="mt-3 lg:grid-cols-2">
        <Field label="Travelers">{(p) => <Travelers {...p} value={pax} onChange={setPax} />}</Field>
        <Field label="Cabin">{(p) => <Choice {...p} value={cabin} onChange={setCabin} options={CABINS} />}</Field>
      </Row>
    </PanelForm>
  );
}

function HotelsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [rooms, setRooms] = useState("1");
  const [pax, setPax] = useState({ adults: 2, children: 0, infants: 0 });
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search hotels"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Hotels & Stays", destination.trim(), span(checkIn, checkOut), paxLabel(pax), [
          `${rooms} room${rooms === "1" ? "" : "s"}`,
        ]);
      }}
    >
      <Row>
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          {(p) => (
            <Input
              {...p}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City, area or property"
            />
          )}
        </Field>
        <Field label="Check in">
          {(p) => <DatePicker {...p} value={checkIn} onChange={setCheckIn} minDate={new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Check out">
          {(p) => (
            <DatePicker {...p} value={checkOut} onChange={setCheckOut} minDate={checkIn ?? new Date()} placeholder="Add date" />
          )}
        </Field>
        <Field label="Rooms">
          {(p) => <Choice {...p} value={rooms} onChange={setRooms} options={["1", "2", "3", "4", "5 or more"]} />}
        </Field>
      </Row>
      <Row className="mt-3 lg:grid-cols-2">
        <Field label="Guests">{(p) => <Travelers {...p} value={pax} onChange={setPax} hideInfants />}</Field>
      </Row>
    </PanelForm>
  );
}

function CarsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [sameLocation, setSameLocation] = useState(true);
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [driverAge, setDriverAge] = useState(DRIVER_AGES[2]);
  const [touched, setTouched] = useState(false);

  const dropMissing = touched && !sameLocation && !dropoff.trim();

  return (
    <PanelForm
      label="Search cars"
      onSubmit={() => {
        setTouched(true);
        if (!pickup.trim() || (!sameLocation && !dropoff.trim())) return;
        const drop = sameLocation ? pickup.trim() : dropoff.trim();
        onSubmit("Car Rentals", sameLocation ? pickup.trim() : `${pickup.trim()} to ${drop}`, span(from, to), "", [
          `Driver age: ${driverAge}`,
          sameLocation ? "Returning to the pickup location" : "One way rental",
        ]);
      }}
      options={
        <Check label="Return to the same location" checked={sameLocation} onChange={setSameLocation} />
      }
    >
      <Row>
        <Field label="Pick up" error={touched && !pickup.trim() ? "Required" : undefined}>
          {(p) => (
            <Input {...p} value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Airport, city or address" />
          )}
        </Field>
        <Field label="Drop off" error={dropMissing ? "Required for a one way rental" : undefined}>
          {(p) =>
            sameLocation ? (
              <Input {...p} disabled readOnly value="Same as pick up" className="border-dashed" />
            ) : (
              <Input
                {...p}
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Airport, city or address"
              />
            )
          }
        </Field>
        <Field label="From">
          {(p) => <DatePicker {...p} value={from} onChange={setFrom} minDate={new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Until">
          {(p) => <DatePicker {...p} value={to} onChange={setTo} minDate={from ?? new Date()} placeholder="Add date" />}
        </Field>
      </Row>
      <Row className="mt-3 lg:grid-cols-2">
        <Field label="Driver age">
          {(p) => <Choice {...p} value={driverAge} onChange={setDriverAge} options={DRIVER_AGES} />}
        </Field>
      </Row>
    </PanelForm>
  );
}

function TransfersPanel({ onSubmit }: { onSubmit: Submit }) {
  const [type, setType] = useState(TRANSFER_TYPES[0]);
  const [airport, setAirport] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [pax, setPax] = useState({ adults: 2, children: 0, infants: 0 });
  const [vehicle, setVehicle] = useState(VEHICLE_TYPES[0]);
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search transfers"
      onSubmit={() => {
        setTouched(true);
        if (!airport.trim() || !destination.trim()) return;
        onSubmit(
          "Airport Transfers",
          `${airport.trim()} and ${destination.trim()}`,
          [fmt(date), time].filter(Boolean).join(", "),
          paxLabel(pax),
          [type, `Vehicle: ${vehicle}`]
        );
      }}
    >
      <Row>
        <Field label="Transfer type">{(p) => <Choice {...p} value={type} onChange={setType} options={TRANSFER_TYPES} />}</Field>
        <Field label="Airport" error={touched && !airport.trim() ? "Required" : undefined}>
          {(p) => <Input {...p} value={airport} onChange={(e) => setAirport(e.target.value)} placeholder="Name or code" />}
        </Field>
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          {(p) => (
            <Input {...p} value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Hotel or address" />
          )}
        </Field>
        <Field label="Date">
          {(p) => <DatePicker {...p} value={date} onChange={setDate} minDate={new Date()} placeholder="Add date" />}
        </Field>
      </Row>
      <Row className="mt-3 lg:grid-cols-3">
        <Field label="Pick up time" hint="Local time at pick up">
          {(p) => <Input {...p} type="time" value={time} onChange={(e) => setTime(e.target.value)} />}
        </Field>
        <Field label="Passengers">{(p) => <Travelers {...p} value={pax} onChange={setPax} hideInfants />}</Field>
        <Field label="Vehicle">{(p) => <Choice {...p} value={vehicle} onChange={setVehicle} options={VEHICLE_TYPES} />}</Field>
      </Row>
    </PanelForm>
  );
}

function ActivitiesPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState(ACTIVITY_CATEGORIES[0]);
  const [pax, setPax] = useState({ adults: 2, children: 0, infants: 0 });
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search experiences"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Tours & Activities", destination.trim(), fmt(date), paxLabel(pax), [`Category: ${category}`]);
      }}
    >
      <Row>
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          {(p) => (
            <Input {...p} value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="City or region" />
          )}
        </Field>
        <Field label="Date">
          {(p) => <DatePicker {...p} value={date} onChange={setDate} minDate={new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Travelers">{(p) => <Travelers {...p} value={pax} onChange={setPax} hideInfants />}</Field>
        <Field label="Type">
          {(p) => <Choice {...p} value={category} onChange={setCategory} options={ACTIVITY_CATEGORIES} />}
        </Field>
      </Row>
    </PanelForm>
  );
}

function PackagesPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [type, setType] = useState(PACKAGE_TYPES[0]);
  const [pax, setPax] = useState({ adults: 2, children: 0, infants: 0 });
  const [budget, setBudget] = useState("");
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search packages"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Vacation Packages", destination.trim(), span(from, to), paxLabel(pax), [
          `Package type: ${type}`,
          budget.trim() ? `Budget: ${budget.trim()}` : "",
        ]);
      }}
    >
      <Row>
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          {(p) => (
            <Input {...p} value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" />
          )}
        </Field>
        <Field label="Depart">
          {(p) => <DatePicker {...p} value={from} onChange={setFrom} minDate={new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Return">
          {(p) => <DatePicker {...p} value={to} onChange={setTo} minDate={from ?? new Date()} placeholder="Add date" />}
        </Field>
        <Field label="Package type">{(p) => <Choice {...p} value={type} onChange={setType} options={PACKAGE_TYPES} />}</Field>
      </Row>
      <Row className="mt-3 lg:grid-cols-2">
        <Field label="Travelers">{(p) => <Travelers {...p} value={pax} onChange={setPax} />}</Field>
        <Field label="Budget" hint="Optional, per person or total">
          {(p) => <Input {...p} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $2,500 per person" />}
        </Field>
      </Row>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared controls                                                              */
/* -------------------------------------------------------------------------- */

type Pax = { adults: number; children: number; infants: number };

function paxLabel(p: Pax): string {
  return [
    `${p.adults} adult${p.adults === 1 ? "" : "s"}`,
    p.children ? `${p.children} child${p.children === 1 ? "" : "ren"}` : "",
    p.infants ? `${p.infants} infant${p.infants === 1 ? "" : "s"}` : "",
  ]
    .filter(Boolean)
    .join(", ");
}

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>{children}</div>;
}

/** Every panel offers the same two ways forward: continue online, or call. */
function PanelForm({
  label,
  onSubmit,
  options,
  children,
}: {
  label: string;
  onSubmit: () => void;
  options?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {options ? <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{options}</div> : <span />}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {site.contact.hasPhone ? (
            <Button asChild variant="ghost" className="sm:order-1">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.cta.secondary}
              </a>
            </Button>
          ) : null}
          <Button type="submit" className="sm:order-2">
            <Search aria-hidden />
            {label}
          </Button>
        </div>
      </div>
    </form>
  );
}

/** Traveler stepper. The real booking pattern, and far fewer controls than three selects. */
function Travelers({
  value,
  onChange,
  hideInfants,
  id,
  "aria-describedby": describedBy,
}: {
  value: Pax;
  onChange: (v: Pax) => void;
  hideInfants?: boolean;
  id?: string;
  "aria-describedby"?: string;
}) {
  const rows: { key: keyof Pax; label: string; hint: string; min: number }[] = [
    { key: "adults", label: "Adults", hint: "12 and over", min: 1 },
    { key: "children", label: "Children", hint: "2 to 11", min: 0 },
    ...(hideInfants ? [] : [{ key: "infants" as const, label: "Infants", hint: "Under 2", min: 0 }]),
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          aria-describedby={describedBy}
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm",
            "transition-colors hover:border-ring",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          <Users className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="truncate">{paxLabel(value)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <div className="space-y-1">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-3 py-1.5">
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.hint}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={value[row.key] <= row.min}
                  aria-label={`Remove one ${row.label.toLowerCase().replace(/s$/, "")}`}
                  onClick={() => onChange({ ...value, [row.key]: Math.max(row.min, value[row.key] - 1) })}
                >
                  <Minus aria-hidden />
                </Button>
                <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
                  {value[row.key]}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8"
                  disabled={value[row.key] >= 9}
                  aria-label={`Add one ${row.label.toLowerCase().replace(/s$/, "")}`}
                  onClick={() => onChange({ ...value, [row.key]: Math.min(9, value[row.key] + 1) })}
                >
                  <Plus aria-hidden />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-muted p-1" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            value === opt ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Choice({
  value,
  onChange,
  options,
  id,
  "aria-describedby": describedBy,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  id?: string;
  "aria-describedby"?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-describedby={describedBy} className="h-10">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-input accent-[var(--primary)]"
      />
      {label}
    </label>
  );
}

type ControlProps = { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string };

/**
 * Label and control are associated by id rather than by nesting, because the
 * Radix Select and the traveler popover render buttons, which a wrapping
 * label does not label.
 */
function Field({
  label,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const id = useId();
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": messageId })}
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
