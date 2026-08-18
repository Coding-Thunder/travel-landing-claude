"use client";

import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-3",
        month_caption: "relative flex h-9 items-center justify-center",
        caption_label: "text-sm font-semibold text-popover-foreground",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between px-1",
        button_previous: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent disabled:opacity-30",
        button_next: "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent disabled:opacity-30",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[11px] font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "h-9 w-9 p-0 text-center text-sm",
        day_button:
          "inline-flex h-9 w-9 items-center justify-center rounded-md font-normal text-muted-foreground transition hover:bg-accent aria-selected:bg-foreground aria-selected:font-medium aria-selected:text-background aria-selected:hover:bg-foreground",
        today: "text-primary [&>button]:font-semibold",
        outside: "text-muted-foreground/50",
        disabled: "text-muted-foreground/40 opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
