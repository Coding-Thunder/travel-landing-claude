"use client";

import Image from "next/image";
import { useState } from "react";

type AvatarProps = {
  src: string;
  name: string;
  size?: number;
  className?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Customer photo with a graceful initials fallback if the image fails to load,
 * so the UI never shows a broken image.
 */
export default function Avatar({ src, name, size = 48, className = "" }: AvatarProps) {
  const [errored, setErrored] = useState(false);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {errored ? (
        <span className="flex h-full w-full items-center justify-center bg-secondary text-xs font-medium text-secondary-foreground">
          {initials(name)}
        </span>
      ) : (
        <Image
          src={src}
          alt={`${name}, verified customer`}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </span>
  );
}
