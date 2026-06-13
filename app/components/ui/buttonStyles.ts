export type ButtonVariant = "primary" | "secondary" | "light" | "dark" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_20px_40px_-14px_rgba(37,99,235,0.6)]",
  secondary:
    "bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
  light:
    "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur hover:bg-white/20",
  dark: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return [BASE, VARIANTS[variant], SIZES[size], fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}
