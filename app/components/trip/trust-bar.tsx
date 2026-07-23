import { site } from "@/config/site";
import Container from "./container";
import Icon from "./lucide-icon";
import Reveal from "./reveal";

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="border-y border-navy-100 bg-white">
      <Container className="py-8 sm:py-10">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {site.trust.map((t, i) => (
            <Reveal
              as="li"
              key={t.title}
              delay={(i % 4) * 0.06}
              className="flex items-start gap-3.5 lg:px-7 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-navy-100"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900">{t.title}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-navy-500">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
