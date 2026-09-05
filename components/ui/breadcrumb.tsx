import * as React from "react";
import Link from "next/link";
import Icon from "@/app/components/ui/Icon";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

/** Trailing item is the current page and is not a link. */
function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 ? <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" /> : null}
              {last ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className={cn("rounded-sm transition-colors hover:text-foreground")}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumb };
