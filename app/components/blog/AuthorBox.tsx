import type { Author } from "@/content/authors";
import { Card } from "@/components/ui/card";
import Avatar from "../ui/Avatar";

/**
 * Byline panel at the foot of a post.
 *
 * A quiet muted surface rather than a card, so it reads as an aside to the
 * article instead of competing with the prev/next cards that follow it. The
 * role sits above the name as a label, not a coloured banner. Blue is reserved
 * for the call action.
 */
export default function AuthorBox({ author }: { author: Author }) {
  return (
    <Card className="flex items-start gap-4 bg-muted p-5">
      <Avatar src={author.avatar} name={author.name} size={56} />
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{author.role}</p>
        <p className="mt-0.5 text-[15px] font-medium">{author.name}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
      </div>
    </Card>
  );
}
