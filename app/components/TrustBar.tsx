import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

export default function TrustBar() {
  return (
    <section aria-label="Why drivers trust us" className="border-b border-slate-200 bg-white">
      <Container className="py-6 sm:py-7">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          {siteConfig.trustBar.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.05} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight text-slate-900">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.sub}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
