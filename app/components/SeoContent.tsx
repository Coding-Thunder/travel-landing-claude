import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { allPosts } from "@/lib/blog";
import { Section, SectionHeading } from "./ui/Section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function SeoContent() {
  const { seoArticles, phone, phoneVanity } = siteConfig;
  /**
   * The six cards below are static copy. This section is titled "Rental guides"
   * and, until now, linked to no guide at all: the blog was reachable from the
   * home page only through the header dropdown and the footer. Surfacing the
   * four newest articles here gives /blog and the articles a real contextual
   * link from the strongest page on the site.
   */
  const latest = allPosts.slice(0, 4);

  return (
    <Section tone="gray" id="guides">
      <SectionHeading
        eyebrow="Rental guides"
        title="Everything you need to know about renting a car"
        subtitle="Straight answers on how renting works, what you need, and the rentals we specialize in, so you can call ready to drive."
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              All rental guides
              <Icon name="arrowRight" />
            </Link>
          </Button>
        }
      />

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
        {seoArticles.map((article) => (
          <article key={article.id} id={article.id} className="scroll-mt-20 bg-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-medium">
              <Icon name={article.icon} className="h-4 w-4 shrink-0 text-primary" />
              {article.title}
            </h3>
            <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {article.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <Separator className="my-10" />

      <h3 className="text-[15px] font-medium">Latest from the rental guides</h3>
      <ul className="mt-4 divide-y divide-border border-t">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-start justify-between gap-4 py-3.5 transition-colors hover:text-primary"
            >
              <span>
                <span className="text-sm font-medium">{post.title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{post.excerpt}</span>
              </span>
              <Icon
                name="arrowRight"
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>

      <Separator className="my-10" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Have a question about your rental? A live US-based agent can answer it in under a minute.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button asChild data-cta="guides-call">
            <a href={`tel:${phone}`}>
              <Icon name="phone" />
              Call {phoneVanity}
            </a>
          </Button>
          <CtaButton source="guides-quote" variant="outline">
            Get a Quote
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
