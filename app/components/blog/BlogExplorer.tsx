"use client";

import { useMemo, useState } from "react";
import type { PostSummary, Taxon } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostCard from "./PostCard";
import Icon from "../ui/Icon";

const PER_PAGE = 6;

/**
 * The blog index browser.
 *
 * Filtering is a toolbar, not a hero: one row of category pills and one search
 * field on a single line, so the articles start immediately below. The pills
 * are `aria-pressed` toggles rather than tabs — they narrow one list in place,
 * they do not swap panels — and each one is 44px tall on touch before it
 * settles to desktop density.
 */
export default function BlogExplorer({ posts, categories }: { posts: PostSummary[]; categories: Taxon[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip active={category === "all"} onClick={() => { setCategory("all"); setPage(1); }}>
            All articles
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={category === c.slug} onClick={() => { setCategory(c.slug); setPage(1); }}>
              {c.label} <span className="tabular-nums opacity-70">({c.count})</span>
            </Chip>
          ))}
        </div>

        <label className="relative w-full lg:max-w-xs">
          <span className="sr-only">Search articles</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon name="search" className="h-4 w-4" />
          </span>
          <Input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search guides & tips"
            className="h-11 pl-9 sm:h-10"
          />
        </label>
      </div>

      {/* Results */}
      {pageItems.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed bg-muted/40 p-10 text-center">
          <p className="text-[15px] font-medium">No articles found</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Try a different search term or category.</p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => { setQuery(""); setCategory("all"); setPage(1); }}
            className="mt-5"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
          <PagerButton disabled={current === 1} onClick={() => setPage(current - 1)} label="Previous">
            <Icon name="chevronLeft" />
          </PagerButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Button
              key={n}
              type="button"
              variant={n === current ? "default" : "outline"}
              size="icon"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className="size-11 tabular-nums sm:size-10"
            >
              {n}
            </Button>
          ))}
          <PagerButton disabled={current === totalPages} onClick={() => setPage(current + 1)} label="Next">
            <Icon name="chevronRight" />
          </PagerButton>
        </nav>
      ) : null}
    </div>
  );
}

/**
 * Category pill. Selected is the filled primary, unselected the hairline
 * outline — the only two steps needed for a set this small.
 */
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className="min-h-11 rounded-full px-4 sm:min-h-9"
    >
      {children}
    </Button>
  );
}

function PagerButton({ disabled, onClick, label, children }: { disabled: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="size-11 sm:size-10"
    >
      {children}
    </Button>
  );
}
