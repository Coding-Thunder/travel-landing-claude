/**
 * Image loader.
 *
 * Every `next/image` source on this site is a remote Unsplash URL that already
 * carries its own `w` and `q` parameters, so Unsplash has already produced a
 * sized, compressed image. Routing those through Next's built-in optimizer made
 * the app server re-download each file and re-encode it with sharp (the most
 * expensive thing this otherwise static site does), and the optimizer's cache
 * lives on ephemeral disk, so every deploy paid that cost again.
 *
 * This asks the image host for the width we actually want instead. It adds no
 * service and no cost: Unsplash already serves every one of these images today.
 * Responsive srcset still works, because Next calls this once per width.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Anything that is not an Unsplash URL is passed through untouched.
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
