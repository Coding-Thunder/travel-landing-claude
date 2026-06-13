"use client";

import Image from "next/image";
import { useState } from "react";

type AvatarProps = {
  src: string;
  name: string;
  size?: number;
  className?: string;
};

const GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-orange-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-sky-600",
  "from-amber-500 to-red-600",
];

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
  const gradient = GRADIENTS[name.length % GRADIENTS.length];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white ${className}`}
      style={{ width: size, height: size }}
    >
      {errored ? (
        <span
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} text-sm font-bold text-white`}
        >
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
