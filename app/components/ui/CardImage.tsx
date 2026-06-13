import Image from "next/image";

type CardImageProps = {
  src: string;
  alt: string;
  gradient: string;
  sizes: string;
  className?: string;
  /** Dark overlay for text legibility on top of the image. */
  overlay?: boolean;
  priority?: boolean;
};

/**
 * Image that sits on top of a brand gradient. If the remote image fails to
 * load, the gradient remains as an intentional, premium-looking fallback.
 */
export default function CardImage({
  src,
  alt,
  gradient,
  sizes,
  className = "",
  overlay = false,
  priority = false,
}: CardImageProps) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"
        />
      ) : null}
    </div>
  );
}
