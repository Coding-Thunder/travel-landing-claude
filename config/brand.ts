import {
  BRANDS,
  DEFAULT_BRAND_ID,
  formatPhone,
  formatPhoneVanity,
  type BrandConfig,
  type BrandId,
} from "./brands";

/**
 * The ACTIVE brand for this build.
 *
 * This is the single switch the entire white-label site reads from. Per-branch
 * deploys set `NEXT_PUBLIC_BRAND`; otherwise the build falls back to
 * `ACTIVE_BRAND_ID` below. Change one of those two and the whole site rebrands.
 */
const ACTIVE_BRAND_ID: BrandId =
  (process.env.NEXT_PUBLIC_BRAND as BrandId | undefined) ?? DEFAULT_BRAND_ID;

export const brandConfig: BrandConfig = BRANDS[ACTIVE_BRAND_ID] ?? BRANDS[DEFAULT_BRAND_ID];

/** Convenience derived contact values shared everywhere. */
export const brandPhone = {
  /** Raw digits for tel: links, e.g. "8557616979". */
  digits: brandConfig.phoneNumber,
  /** tel: href target. */
  href: `tel:${brandConfig.phoneNumber}`,
  /** "(855) 761-6979" */
  display: formatPhone(brandConfig.phoneNumber),
  /** "1-855-761-6979" */
  vanity: formatPhoneVanity(brandConfig.phoneNumber),
  /** WhatsApp number with US country code. */
  whatsapp: `1${brandConfig.phoneNumber}`,
};
