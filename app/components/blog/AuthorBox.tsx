import type { Author } from "@/content/authors";
import Avatar from "../ui/Avatar";

export default function AuthorBox({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <Avatar src={author.avatar} name={author.name} size={56} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{author.role}</p>
        <p className="text-base font-bold text-slate-900">{author.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{author.bio}</p>
      </div>
    </div>
  );
}
