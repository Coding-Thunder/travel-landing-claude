import { site } from "@/config/site";
import Container from "./container";
import Icon from "./icon";
import Reveal from "./reveal";

export default function TrustBar() {
  return (
    <section aria-label="Why customers trust us" className="border-y border-navy-100 bg-navy-50">
      <Container className="py-8 sm:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {site.trust.map((t, i) => (
            <Reveal as="li" key={t.title} delay={(i % 7) * 0.04} className="flex flex-col items-center gap-2 text-center xl:items-start xl:text-left">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-royal-600 ring-1 ring-navy-100">
                <Icon name={t.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-xs font-medium leading-snug text-navy-700">{t.title}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
