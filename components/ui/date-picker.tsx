"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Calendar } from "./calendar";
import { cn } from "@/lib/cn";

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  minDate?: Date;
  id?: string;
  invalid?: boolean;
  "aria-label"?: string;
};

export function DatePicker({ value, onChange, placeholder = "Add date", minDate, id, invalid, ...rest }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className={cn(
            "flex h-11 w-full items-center gap-2 rounded-md border bg-surface px-3 text-left text-sm outline-none transition",
            invalid ? "border-red-400" : "border-line-strong hover:border-ink/40 focus:border-ink",
            value ? "text-ink" : "text-ink-muted"
          )}
          {...rest}
        >
          <CalendarIcon className="h-4 w-4 shrink-0 text-ink-muted" />
          <span className="truncate">{value ? format(value, "EEE, MMM d") : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value ?? minDate}
          disabled={minDate ? { before: minDate } : undefined}
          onSelect={(date) => {
            onChange(date);
            if (date) setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
