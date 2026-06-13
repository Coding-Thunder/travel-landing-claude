"use client";

import { useCall } from "./CallProvider";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "../ui/buttonStyles";

type CtaButtonProps = {
  children: React.ReactNode;
  /** Analytics label, e.g. "book-now", "get-quote", "check-availability". */
  source: string;
  /** Pre-fills the callback form's pickup-location field. */
  pickup?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

/**
 * The universal "soft" conversion CTA. Any high-intent action — Book Now,
 * Get Quote, Check Availability, Rent Now, Reserve, Learn More — renders this,
 * which opens the global call/callback popup instead of a booking flow.
 */
export default function CtaButton({
  children,
  source,
  pickup,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  icon,
}: CtaButtonProps) {
  const { open } = useCall();
  return (
    <button
      type="button"
      onClick={() => open({ source, pickup })}
      className={buttonClasses({ variant, size, fullWidth, className })}
    >
      {icon}
      {children}
    </button>
  );
}
