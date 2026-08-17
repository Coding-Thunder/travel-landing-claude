"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowRight, Info, Phone } from "lucide-react";
import { site, telHref, type Service } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "./lucide-icon";

type ServiceKey = Service["key"];

const CABINS = ["Economy", "Premium Economy", "Business", "First"];
const TRIP_TYPES = ["Round Trip", "One Way", "Multi-City"] as const;
const COUNTS = ["0", "1", "2", "3", "4", "5", "6+"];
const ADULT_COUNTS = ["1", "2", "3", "4", "5", "6+"];
const VEHICLE_TYPES = ["Sedan", "SUV", "Van / Minibus", "Accessible vehicle"];
const TRANSFER_DIRECTIONS = ["Airport → Hotel", "Hotel → Airport", "Private Transfer", "Shared Transfer"];
const ACTIVITY_CATEGORIES = [
  "City Tours",
  "Attractions",
  "Museums",
  "Adventure",
  "Family Activities",
  "Food Experiences",
  "Cruises",
  "Day Trips",
  "Cultural Experiences",
];
const PACKAGE_TYPES = [
  "Beach Holidays",
  "Family Holidays",
  "Honeymoon",
  "Luxury Travel",
  "Adventure",
  "City Breaks",
  "Weekend Trips",
  "International Packages",
];

const inputCls =
  "h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-900 placeholder:text-navy-400 transition focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-200";

/**
 * The unified travel search across all six categories (§5).
 *
 * There is no live inventory behind this site, so the module does exactly what
 * it says: it captures a complete, structured brief and carries it into the
 * enquiry form, where a travel specialist picks it up and comes back with real
 * availability and pricing. `bookingNotice` states that in the UI so the
 * "Search & Book" CTA can never be read as an instant self-service booking.
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

  /** Shared handoff: everything captured becomes the enquiry pre-fill. */
  const handoff = (service: string, destination: string, dates: string, travelers: string, notes: string[]) => {
    const params = new URLSearchParams({
      service,
      destination,
      ...(dates ? { dates } : {}),
      ...(travelers ? { travelers } : {}),
      ...(notes.filter(Boolean).length ? { notes: notes.filter(Boolean).join(" · ") } : {}),
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className={cn("rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-navy-100 sm:p-6", className)}>
      <Tabs value={tab} onValueChange={(v) => setTab(v as ServiceKey)}>
        <TabsList className="no-scrollbar -mx-1 overflow-x-auto px-1 pb-1">
          {site.services.map((s) => (
            <TabsTrigger key={s.key} value={s.key}>
              <Icon name={s.icon} className="h-4 w-4" />
              {s.name.replace(" & Stays", "").replace("Vacation ", "").replace("Tours & ", "")}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
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

      <p className="mt-5 flex items-start gap-2 border-t border-navy-100 pt-4 text-xs leading-relaxed text-navy-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-400" />
        <span>{site.bookingNotice}</span>
      </p>
    </div>
  );
}

type Submit = (service: string, destination: string, dates: string, travelers: string, notes: string[]) => void;

const fmt = (d?: Date) => (d ? format(d, "d MMM yyyy") : "");
const range = (a?: Date, b?: Date) => [fmt(a), fmt(b)].filter(Boolean).join(" – ");

/* -------------------------------------------------------------------------- */
/* Flights (§6)                                                                */
/* -------------------------------------------------------------------------- */

function FlightsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [tripType, setTripType] = useState<(typeof TRIP_TYPES)[number]>("Round Trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState<Date | undefined>();
  const [ret, setRet] = useState<Date | undefined>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [cabin, setCabin] = useState(CABINS[0]);
  const [flexible, setFlexible] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [direct, setDirect] = useState(false);
  const [touched, setTouched] = useState(false);

  const invalid = touched && (!from.trim() || !to.trim());
  const roundTrip = tripType === "Round Trip";

  return (
    <PanelForm
      label="Search Flights"
      onSubmit={() => {
        setTouched(true);
        if (!from.trim() || !to.trim()) return;
        onSubmit(
          "Flights",
          `${from.trim()} → ${to.trim()}`,
          roundTrip ? range(depart, ret) : fmt(depart),
          travellerLabel(adults, children, infants),
          [
            tripType,
            `Cabin: ${cabin}`,
            flexible ? "Flexible dates" : "",
            nearby ? "Include nearby airports" : "",
            direct ? "Direct flights only" : "",
          ]
        );
      }}
    >
      <SegmentedControl options={TRIP_TYPES} value={tripType} onChange={setTripType} label="Trip type" />

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="From" error={invalid && !from.trim() ? "Required" : undefined}>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="City or airport" className={inputCls} />
        </Field>
        <Field label="To" error={invalid && !to.trim() ? "Required" : undefined}>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="City or airport" className={inputCls} />
        </Field>
        <Field label="Departure">
          <DatePicker value={depart} onChange={setDepart} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label={tripType === "Multi-City" ? "Final return" : "Return"}>
          {roundTrip || tripType === "Multi-City" ? (
            <DatePicker value={ret} onChange={setRet} minDate={depart ?? new Date()} placeholder="Add date" />
          ) : (
            <div className="flex h-11 items-center rounded-lg border border-dashed border-navy-200 px-3 text-sm text-navy-400">
              Not required
            </div>
          )}
        </Field>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Adults">
          <Choice value={adults} onChange={setAdults} options={ADULT_COUNTS} />
        </Field>
        <Field label="Children">
          <Choice value={children} onChange={setChildren} options={COUNTS} />
        </Field>
        <Field label="Infants">
          <Choice value={infants} onChange={setInfants} options={COUNTS} />
        </Field>
        <Field label="Cabin class">
          <Choice value={cabin} onChange={setCabin} options={CABINS} />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
        <Toggle checked={flexible} onChange={setFlexible} label="Flexible dates" />
        <Toggle checked={nearby} onChange={setNearby} label="Nearby airports" />
        <Toggle checked={direct} onChange={setDirect} label="Direct flights only" />
      </div>

      {tripType === "Multi-City" ? (
        <p className="mt-3 text-xs leading-relaxed text-navy-500">
          Add each leg in the message field on the next step and a specialist will price the full itinerary as one
          booking.
        </p>
      ) : null}
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Hotels (§8)                                                                 */
/* -------------------------------------------------------------------------- */

function HotelsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search Hotels"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Hotels & Stays", destination.trim(), range(checkIn, checkOut), travellerLabel(adults, children, "0"), [
          `${rooms} room${rooms === "1" ? "" : "s"}`,
        ]);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined} className="lg:col-span-1">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City, area or property"
            className={inputCls}
          />
        </Field>
        <Field label="Check-in">
          <DatePicker value={checkIn} onChange={setCheckIn} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label="Check-out">
          <DatePicker value={checkOut} onChange={setCheckOut} minDate={checkIn ?? new Date()} placeholder="Add date" />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="Rooms">
          <Choice value={rooms} onChange={setRooms} options={ADULT_COUNTS} />
        </Field>
        <Field label="Adults">
          <Choice value={adults} onChange={setAdults} options={ADULT_COUNTS} />
        </Field>
        <Field label="Children">
          <Choice value={children} onChange={setChildren} options={COUNTS} />
        </Field>
      </div>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Car rentals (§9)                                                            */
/* -------------------------------------------------------------------------- */

function CarsPanel({ onSubmit }: { onSubmit: Submit }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [sameLocation, setSameLocation] = useState(true);
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [driverAge, setDriverAge] = useState("25–69");
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search Cars"
      onSubmit={() => {
        setTouched(true);
        if (!pickup.trim()) return;
        const drop = sameLocation ? pickup.trim() : dropoff.trim();
        onSubmit("Car Rentals", `${pickup.trim()}${drop && drop !== pickup.trim() ? ` → ${drop}` : ""}`, range(from, to), "", [
          `Driver age: ${driverAge}`,
          sameLocation ? "Return to pickup location" : "One-way rental",
        ]);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Pickup location" error={touched && !pickup.trim() ? "Required" : undefined}>
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Airport, city or address"
            className={inputCls}
          />
        </Field>
        <Field label="Drop-off location">
          {sameLocation ? (
            <div className="flex h-11 items-center rounded-lg border border-dashed border-navy-200 px-3 text-sm text-navy-400">
              Same as pickup
            </div>
          ) : (
            <input
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Airport, city or address"
              className={inputCls}
            />
          )}
        </Field>
        <Field label="Pickup date">
          <DatePicker value={from} onChange={setFrom} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label="Drop-off date">
          <DatePicker value={to} onChange={setTo} minDate={from ?? new Date()} placeholder="Add date" />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Driver age">
          <Choice value={driverAge} onChange={setDriverAge} options={["18–20", "21–24", "25–69", "70+"]} />
        </Field>
        <div className="flex items-end pb-2.5">
          <Toggle checked={sameLocation} onChange={setSameLocation} label="Return to the same location" />
        </div>
      </div>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Airport transfers (§10)                                                     */
/* -------------------------------------------------------------------------- */

function TransfersPanel({ onSubmit }: { onSubmit: Submit }) {
  const [direction, setDirection] = useState(TRANSFER_DIRECTIONS[0]);
  const [airport, setAirport] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [vehicle, setVehicle] = useState(VEHICLE_TYPES[0]);
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search Transfers"
      onSubmit={() => {
        setTouched(true);
        if (!airport.trim() || !destination.trim()) return;
        onSubmit(
          "Airport Transfers",
          `${airport.trim()} ↔ ${destination.trim()}`,
          [fmt(date), time].filter(Boolean).join(" "),
          `${passengers} passenger${passengers === "1" ? "" : "s"}`,
          [direction, `Vehicle: ${vehicle}`]
        );
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Transfer type">
          <Choice value={direction} onChange={setDirection} options={TRANSFER_DIRECTIONS} />
        </Field>
        <Field label="Airport" error={touched && !airport.trim() ? "Required" : undefined}>
          <input value={airport} onChange={(e) => setAirport(e.target.value)} placeholder="Airport name or code" className={inputCls} />
        </Field>
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Hotel or address"
            className={inputCls}
          />
        </Field>
        <Field label="Date">
          <DatePicker value={date} onChange={setDate} minDate={new Date()} placeholder="Add date" />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="Pickup time" hint="Local time at pickup">
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Passengers">
          <Choice value={passengers} onChange={setPassengers} options={ADULT_COUNTS} />
        </Field>
        <Field label="Vehicle type">
          <Choice value={vehicle} onChange={setVehicle} options={VEHICLE_TYPES} />
        </Field>
      </div>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Tours & activities (§11)                                                    */
/* -------------------------------------------------------------------------- */

function ActivitiesPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState(ACTIVITY_CATEGORIES[0]);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search Experiences"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Tours & Activities", destination.trim(), fmt(date), travellerLabel(adults, children, "0"), [
          `Category: ${category}`,
        ]);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="City or region"
            className={inputCls}
          />
        </Field>
        <Field label="Date">
          <DatePicker value={date} onChange={setDate} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label="Adults">
          <Choice value={adults} onChange={setAdults} options={ADULT_COUNTS} />
        </Field>
        <Field label="Children">
          <Choice value={children} onChange={setChildren} options={COUNTS} />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Experience type">
          <Choice value={category} onChange={setCategory} options={ACTIVITY_CATEGORIES} />
        </Field>
      </div>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Vacation packages (§12)                                                     */
/* -------------------------------------------------------------------------- */

function PackagesPanel({ onSubmit }: { onSubmit: Submit }) {
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [type, setType] = useState(PACKAGE_TYPES[0]);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [budget, setBudget] = useState("");
  const [touched, setTouched] = useState(false);

  return (
    <PanelForm
      label="Search Packages"
      onSubmit={() => {
        setTouched(true);
        if (!destination.trim()) return;
        onSubmit("Vacation Packages", destination.trim(), range(from, to), travellerLabel(adults, children, "0"), [
          `Package type: ${type}`,
          budget.trim() ? `Budget: ${budget.trim()}` : "",
        ]);
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Destination" error={touched && !destination.trim() ? "Required" : undefined}>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className={inputCls}
          />
        </Field>
        <Field label="Departing">
          <DatePicker value={from} onChange={setFrom} minDate={new Date()} placeholder="Add date" />
        </Field>
        <Field label="Returning">
          <DatePicker value={to} onChange={setTo} minDate={from ?? new Date()} placeholder="Add date" />
        </Field>
        <Field label="Package type">
          <Choice value={type} onChange={setType} options={PACKAGE_TYPES} />
        </Field>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="Adults">
          <Choice value={adults} onChange={setAdults} options={ADULT_COUNTS} />
        </Field>
        <Field label="Children">
          <Choice value={children} onChange={setChildren} options={COUNTS} />
        </Field>
        <Field label="Budget" hint="Per person or total — optional">
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $2,500 pp" className={inputCls} />
        </Field>
      </div>
    </PanelForm>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                           */
/* -------------------------------------------------------------------------- */

function travellerLabel(adults: string, children: string, infants: string): string {
  return [
    `${adults} adult${adults === "1" ? "" : "s"}`,
    children !== "0" ? `${children} child${children === "1" ? "" : "ren"}` : "",
    infants !== "0" ? `${infants} infant${infants === "1" ? "" : "s"}` : "",
  ]
    .filter(Boolean)
    .join(", ");
}

/** Wraps a panel's fields with the two CTAs every search surface must offer (§14). */
function PanelForm({
  label,
  onSubmit,
  children,
}: {
  label: string;
  onSubmit: () => void;
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
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <Button type="submit" variant="royal" size="lg" className="h-12 w-full sm:w-auto sm:px-8">
          {label}
          <ArrowRight className="h-4 w-4" />
        </Button>
        {site.contact.hasPhone ? (
          <Button asChild variant="navyOutline" size="lg" className="h-12 w-full sm:w-auto">
            <a href={telHref}>
              <Phone className="h-4 w-4" />
              {site.cta.secondary}
            </a>
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function SegmentedControl<T extends string>({
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
    <div className="inline-flex rounded-lg bg-navy-50 p-1" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            "rounded-md px-3.5 py-1.5 text-sm font-medium transition sm:px-4",
            value === opt ? "bg-white text-navy-900 shadow-sm" : "text-navy-600 hover:text-navy-900"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Choice({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 rounded-lg border-navy-200 text-navy-900 focus:border-royal-500">
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

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-navy-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-navy-400 text-royal-600 accent-royal-600"
      />
      {label}
    </label>
  );
}

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
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-navy-500">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-navy-500">{hint}</span>
      ) : null}
    </label>
  );
}
