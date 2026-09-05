type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Renders a headline figure.
 *
 * Previously this counted up on scroll via framer-motion. The count-up was
 * removed rather than reimplemented: it made a server-rendered number arrive as
 * "0" in the HTML (bad for crawlers and a visible flash for everyone else),
 * and it pulled an animation runtime into the home page for four numbers.
 */
export default function Counter({ value, decimals = 0, prefix = "", suffix = "" }: CounterProps) {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
