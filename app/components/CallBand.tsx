import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

/**
 * The reusable phone-first conversion band for content pages.
 *
 * One dominant action (the number), one step down (the callback), and nothing
 * else competing — which is the whole point of a band that repeats on every
 * commercial page.
 */
export default function CallBand({
  heading = "Ready to lock in your rate?",
  subtext,
}: {
  heading?: string;
  subtext?: string;
}) {
  const { phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;
  return (
    <div className="rounded-lg border bg-muted/50 p-6 sm:p-7">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{heading}</p>
          <a
            href={`tel:${phone}`}
            data-cta="callband-number"
            className="mt-1 block text-2xl font-semibold tracking-tight transition-colors hover:text-primary sm:text-3xl"
          >
            {phoneVanity}
          </a>
          <p className="mt-1 text-sm text-muted-foreground">
            {subtext ?? `${phoneDisplay} · ${callResponse}`}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button asChild size="lg" data-cta="callband-call">
            <a href={`tel:${phone}`}>
              <Icon name="phone" />
              Call Now
            </a>
          </Button>
          <CtaButton source="callband-callback" variant="outline" size="lg">
            <Icon name="headset" />
            Request a Callback
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
