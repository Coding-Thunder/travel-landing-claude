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
            <Star className="absolute inset-0 text-slate-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="text-amber-400" />
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
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}
