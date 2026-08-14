"use server";

import { enquirySchema, type EnquiryResult } from "@/lib/enquiry-schema";
import { sendEnquiryEmails } from "@/lib/email";
import { site } from "@/config/site";

/**
 * Handles an enquiry submission. Re-validates on the server, silently drops
 * honeypot-tripped submissions, and emails the enquiry to the team (with a
 * confirmation to the customer). Returns a serialisable result for the client form.
 *
 * A delivery failure is reported honestly rather than swallowed — the customer
 * sees an error and our direct contact details instead of a false confirmation.
 */
export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Some details need attention. Please review the form and try again." };
  }

  // Honeypot tripped: accept without processing so bots receive no signal.
  if (parsed.data.companyWebsite) return { ok: true };

  const { companyWebsite: _honeypot, ...enquiry } = parsed.data;
  void _honeypot;

  try {
    await sendEnquiryEmails(enquiry);
  } catch (error) {
    // Log the full enquiry so a provider outage never costs us the lead.
    console.error("[enquiry] delivery failed — enquiry not emailed", { enquiry, error });
    return {
      ok: false,
      error: `We could not send your enquiry just now. Please try again, or contact us on ${site.company.phone} or ${site.company.supportEmail}.`,
    };
  }

  return { ok: true };
}
