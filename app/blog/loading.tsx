import Container from "../components/ui/Container";
import Skeleton from "../components/ui/Skeleton";

/**
 * Blog loading state.
 *
 * The whole tree is decorative, so it carries a live region with a real message
 * for assistive technology. Previously every element was aria-hidden with no
 * busy or live indication at all, which announced nothing while the route
 * loaded.
 */
export default function BlogLoading() {
  return (
    <>
      <p role="status" aria-live="polite" className="sr-only">
        Loading rental guides…
      </p>

      <div className="border-b bg-muted/40">
        <Container className="py-8 sm:py-10">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-9 w-80 max-w-full" />
          <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card">
              <Skeleton className="aspect-[16/9] rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
