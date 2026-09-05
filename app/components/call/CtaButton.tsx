"use client";

import { useCall } from "./CallProvider";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type CtaButtonProps = {
  children: React.ReactNode;
  /** Analytics label, e.g. "book-now", "get-quote", "check-availability". */
  source: string;
  /** Pre-fills the callback form's pickup-location field. */
  pickup?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

/**
 * The universal "soft" conversion CTA. Any high-intent action that is not a
 * direct dial (Check Availability, Get Rental Information, Reserve by Phone)
 * renders this, which opens the call/callback popup.
 */
export default function CtaButton({
  children,
  source,
  pickup,
  variant = "default",
  size = "default",
  fullWidth = false,
  className,
  icon,
}: CtaButtonProps) {
  const { open } = useCall();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={[fullWidth ? "w-full" : "", className].filter(Boolean).join(" ")}
      onClick={() => {
        trackEvent("quote_request", { cta_source: source, pickup_location: pickup ?? "" });
        open({ source, pickup });
      }}
    >
      {icon}
      {children}
    </Button>
  );
}
