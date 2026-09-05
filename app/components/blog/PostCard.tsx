import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import CardImage from "../ui/CardImage";
import { Badge } from "@/components/ui/badge";

/**
 * Blog index card.
 *
 * The whole card is one link target. Hover is a surface tint rather than a lift
 * and a shadow — the hairline border already carries the card's edge, so the
 * grid stays flat and the eye is not pulled around by six competing panels.
 */
export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <CardImage
          src={post.heroImage}
          alt={post.heroAlt}
          gradient="from-slate-700 to-slate-900"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <Badge variant="default" className="absolute left-2.5 top-2.5">
          {post.categoryLabel}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-medium leading-snug">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{post.authorName}</span>
          <span>·</span>
          <span>{post.dateLabel}</span>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
