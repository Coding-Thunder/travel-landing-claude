"use server";

import { enquirySchema, type EnquiryResult } from "@/lib/enquiry-schema";

/**
 * Handles an enquiry submission. Re-validates on the server, silently drops
 * honeypot-tripped submissions, and (integration point) forwards the enquiry to
 * your email/CRM provider. Returns a serialisable result for the client form.
 */
export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Some details need attention. Please review the form and try again." };
  }

  // Honeypot tripped: accept without processing so bots receive no signal.
  if (parsed.data.companyWebsite) return { ok: true };

  // Integration point: forward `enquiry` to your email or CRM provider.
  const { companyWebsite: _honeypot, ...enquiry } = parsed.data;
  void _honeypot;
  console.info("[enquiry received]", { destination: enquiry.destination, service: enquiry.service });

  return { ok: true };
}
