import Image from "next/image";

type CardImageProps = {
  src: string;
  /** Empty string marks the image decorative, correct when the card's own text already names the subject. */
  alt: string;
  gradient: string;
  sizes: string;
  className?: string;
  /** Dark overlay for text legibility on top of the image. */
  overlay?: boolean;
  /** Preload as the LCP candidate. Next 16 deprecated `priority` in favour of this. */
  preload?: boolean;
};

/**
 * Image that sits on top of a brand gradient. If the remote image fails to
 * load, the gradient remains as an intentional fallback rather than a blank box.
 */
export default function CardImage({
  src,
  alt,
  gradient,
  sizes,
  className = "",
  overlay = false,
  preload = false,
}: CardImageProps) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
      <Image
        src={src}
        alt={alt}
        aria-hidden={alt === "" ? true : undefined}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${className}`}
      />
      {overlay ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
        />
      ) : null}
    </div>
  );
}
