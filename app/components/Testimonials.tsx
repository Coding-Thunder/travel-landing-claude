import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Avatar from "./ui/Avatar";
import StarRating from "./ui/StarRating";
import { Badge } from "@/components/ui/badge";

export default function Testimonials() {
  const { testimonials, trust } = siteConfig;

  return (
    <Section id="reviews">
      <SectionHeading
        eyebrow="Customer reviews"
        title="Loved by drivers across the country"
        subtitle={
          <>
            Rated <span className="font-medium text-foreground">{trust.rating} / 5</span> from{" "}
            {trust.ratingCount} verified rentals.
          </>
        }
      />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name} className="flex">
            <figure className="flex w-full flex-col rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <StarRating rating={t.rating} />
                <Badge variant="muted">Verified</Badge>
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t pt-4">
                <Avatar src={t.avatar} name={t.name} size={36} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.location} · {t.tripType}
                  </p>
                </div>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">{t.date}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
