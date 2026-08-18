import { z } from "zod";

/** Callback request schema (§17). Phone is the only channel that matters here. */
export const callbackSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(40),
  email: z.email("Please enter a valid email address").max(160),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Honeypot. Real users never fill this, bots often do. Must stay empty. */
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type CallbackValues = z.infer<typeof callbackSchema>;
