import { z } from "zod";

/** Enquiry schema shared by the client form (instant feedback) and the server action. */
export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Please enter a valid email address").max(160),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(40),
  destination: z.string().trim().min(2, "Please tell us your destination").max(120),
  travelDates: z.string().trim().max(120).optional().or(z.literal("")),
  travellers: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Honeypot — real users never fill this; bots often do. Must stay empty. */
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
export type EnquiryResult = { ok: true } | { ok: false; error: string };
