/**
 * TripReservations brand mark — a location pin (destinations / reservations)
 * on a royal-blue gradient tile. Used in the header, footer and favicons.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="TripReservations" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tr-mark-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3168ea" />
          <stop offset="1" stopColor="#1a3a89" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#tr-mark-grad)" />
      <path
        fill="#ffffff"
        d="M32 12c-8.8 0-15.5 6.8-15.5 15.4 0 10.7 13.6 22.2 14.9 23.2a1 1 0 0 0 1.2 0c1.3-1 14.9-12.5 14.9-23.2C47.5 18.8 40.8 12 32 12Z"
      />
      <circle cx="32" cy="27" r="5.4" fill="url(#tr-mark-grad)" />
    </svg>
  );
}
