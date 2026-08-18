import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const alertVariants = cva("relative w-full rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      muted: "border-transparent bg-muted text-muted-foreground",
      destructive: "border-destructive/40 bg-destructive/5 text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div role="note" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mb-1 font-medium text-foreground", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("leading-relaxed [&_p]:leading-relaxed", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
