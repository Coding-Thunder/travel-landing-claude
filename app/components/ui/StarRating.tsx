type StarRatingProps = {
  rating: number;
  className?: string;
  starClassName?: string;
};

/** Accessible 5-star rating. Supports half-stars via fractional rating. */
export default function StarRating({
  rating,
  className = "",
  starClassName = "h-4 w-4",
}: StarRatingProps) {
  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={`relative inline-block ${starClassName}`}>
            <Star className="absolute inset-0 text-border" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="text-rating" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`h-full w-full ${className}`} aria-hidden="true">
      {/* Same geometry as the `star` glyph in the icon family. */}
      <path d="M12 3.3l2.29 5.55 5.98.46-4.56 3.9 1.4 5.83L12 15.9l-5.11 3.14 1.4-5.83-4.56-3.9 5.98-.46Z" />
    </svg>
  );
}
