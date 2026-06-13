import Link from "next/link";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "./buttonStyles";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  /** For external links / tel / mailto. */
  external?: boolean;
  "aria-label"?: string;
};

/**
 * Styled link button. Renders a Next.js <Link> for internal routes and a plain
 * <a> for tel:, mailto:, hash and external URLs.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  external,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const isBare =
    external ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http") ||
    href.startsWith("#");

  if (isBare) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
