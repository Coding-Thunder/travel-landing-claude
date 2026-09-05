import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import { Button } from "@/components/ui/button";

export default function SeoSection() {
  const { seo, business, phone, phoneVanity, shortName } = siteConfig;

  return (
    <section id="about" className="scroll-mt-20 border-t py-14 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              About {shortName}
            </p>
            <h2 className="mt-1.5 font-display text-2xl tracking-tight sm:text-3xl">{seo.heading}</h2>
            {seo.content.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed text-muted-foreground ${i === 0 ? "mt-4 text-[15px]" : "mt-3 text-sm"}`}
              >
                {p}
              </p>
            ))}

            <div className="mt-6 rounded-lg border bg-muted/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Icon name="shield" className="h-4 w-4 shrink-0 text-primary" />
                {business.serviceType}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{business.description}</p>
            </div>

            <Button asChild className="mt-6" data-cta="about-call">
              <a href={`tel:${phone}`}>
                <Icon name="phone" />
                Call {phoneVanity}
              </a>
            </Button>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
              <Image
                src={seo.aboutImage}
                alt={seo.aboutImageAlt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
