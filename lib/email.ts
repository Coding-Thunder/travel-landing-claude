import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/config/site";
import type { EnquiryValues } from "@/lib/enquiry-schema";

/** An enquiry with the honeypot stripped — what actually reaches the inbox. */
export type Enquiry = Omit<EnquiryValues, "companyWebsite">;

/**
 * SMTP transport, built once per server instance and reused.
 *
 * Works with any SMTP provider — Google Workspace, Microsoft 365, cPanel, or an
 * API provider's SMTP bridge (Resend, SendGrid, Mailgun). Required environment
 * variables are listed in `.env.example`.
 */
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  const missing = [
    ["SMTP_HOST", host],
    ["SMTP_USER", user],
    ["SMTP_PASSWORD", pass],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(
      `Email is not configured — missing ${missing.join(", ")}. Enquiries cannot be delivered until these are set.`
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  if (!Number.isFinite(port)) throw new Error(`SMTP_PORT is not a number: ${process.env.SMTP_PORT}`);

  transporter = nodemailer.createTransport({
    host,
    port,
    // Implicit TLS on 465; STARTTLS is negotiated on 587 and 25.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: user as string, pass: pass as string },
  });

  return transporter;
}

/** Where enquiry notifications land. Comma-separated for multiple recipients. */
function notificationRecipients(): string {
  return process.env.ENQUIRY_TO?.trim() || site.company.supportEmail;
}

/** The envelope sender. Must be an address the SMTP account is allowed to send as. */
function sender(): string {
  const from = process.env.ENQUIRY_FROM?.trim() || (process.env.SMTP_USER as string);
  return `"${site.name} Website" <${from}>`;
}

/** Strips CR/LF so user input can never inject additional email headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Ordered label/value pairs shared by the plain-text and HTML bodies. */
function enquiryRows(enquiry: Enquiry): Array<[string, string]> {
  return (
    [
      ["Full name", enquiry.fullName],
      ["Email", enquiry.email],
      ["Phone", enquiry.phone],
      ["Destination", enquiry.destination],
      ["Travel dates", enquiry.travelDates],
      ["Travellers", enquiry.travellers],
      ["Service", enquiry.service],
      ["Special requests", enquiry.message],
    ] as Array<[string, string | undefined]>
  )
    .filter((row): row is [string, string] => Boolean(row[1]))
    .map(([label, value]) => [label, value]);
}

function receivedAt(): string {
  return new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });
}

function notificationBodies(enquiry: Enquiry) {
  const rows = enquiryRows(enquiry);
  const stamp = receivedAt();

  const text = [
    "New quote request from the website.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Received: ${stamp}`,
    `Reply directly to this email to reach ${enquiry.fullName}.`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0f172a;max-width:640px">
      <h2 style="margin:0 0 4px;font-size:18px">New quote request</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:13px">${escapeHtml(stamp)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;vertical-align:top;color:#64748b;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:8px 0;vertical-align:top;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#64748b;font-size:13px">
        Reply directly to this email to reach ${escapeHtml(enquiry.fullName)}.
      </p>
    </div>`;

  return { text, html };
}

function autoReplyBodies(enquiry: Enquiry) {
  const rows = enquiryRows(enquiry).filter(([label]) => label !== "Full name" && label !== "Email" && label !== "Phone");
  const hours = site.hours.map((h) => `${h.day}: ${h.time}`);

  const text = [
    `Dear ${enquiry.fullName},`,
    "",
    `Thank you for contacting ${site.legalName}. We have received your enquiry and one of our reservation specialists will review it and respond during business hours.`,
    "",
    "Your request:",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Our business hours:",
    ...hours,
    "",
    "If your request is urgent, please contact us directly:",
    `Telephone: ${site.company.phone}`,
    `Email: ${site.company.supportEmail}`,
    "",
    site.disclaimer,
    "",
    `${site.company.registeredName} — Company number ${site.company.companyNumber}`,
    site.company.registeredOffice,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0f172a;max-width:640px;line-height:1.6">
      <p style="margin:0 0 16px">Dear ${escapeHtml(enquiry.fullName)},</p>
      <p style="margin:0 0 16px">
        Thank you for contacting ${escapeHtml(site.legalName)}. We have received your enquiry and one of our
        reservation specialists will review it and respond during business hours.
      </p>
      <h3 style="margin:24px 0 8px;font-size:15px">Your request</h3>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;vertical-align:top;color:#64748b;font-size:13px;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="padding:6px 0;vertical-align:top;font-size:14px;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px">Business hours</h3>
      <p style="margin:0 0 16px;font-size:14px;color:#475569">${hours.map(escapeHtml).join("<br>")}</p>
      <p style="margin:0 0 16px;font-size:14px">
        If your request is urgent, please contact us directly on
        <a href="tel:${escapeHtml(site.company.phoneHref)}" style="color:#2563eb">${escapeHtml(site.company.phone)}</a>
        or at <a href="mailto:${escapeHtml(site.company.supportEmail)}" style="color:#2563eb">${escapeHtml(site.company.supportEmail)}</a>.
      </p>
      <hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0">
      <p style="margin:0 0 12px;font-size:12px;color:#64748b">${escapeHtml(site.disclaimer)}</p>
      <p style="margin:0;font-size:12px;color:#64748b">
        ${escapeHtml(site.company.registeredName)} — Company number ${escapeHtml(site.company.companyNumber)}<br>
        ${escapeHtml(site.company.registeredOffice)}
      </p>
    </div>`;

  return { text, html };
}

/**
 * Emails the enquiry to the team, then acknowledges it to the customer.
 *
 * Throws if the team notification fails — the caller surfaces that to the user
 * rather than showing a false confirmation. A failed auto-reply is logged but
 * not thrown, since the lead has already been captured by that point.
 */
export async function sendEnquiryEmails(enquiry: Enquiry): Promise<void> {
  const transport = getTransporter();
  const notification = notificationBodies(enquiry);
  const subjectDetail = headerSafe(enquiry.destination) || headerSafe(enquiry.service ?? "") || "website";

  await transport.sendMail({
    from: sender(),
    to: notificationRecipients(),
    replyTo: `"${headerSafe(enquiry.fullName)}" <${headerSafe(enquiry.email)}>`,
    subject: `New quote request — ${subjectDetail}`,
    text: notification.text,
    html: notification.html,
  });

  const autoReply = autoReplyBodies(enquiry);

  try {
    await transport.sendMail({
      from: sender(),
      to: `"${headerSafe(enquiry.fullName)}" <${headerSafe(enquiry.email)}>`,
      replyTo: site.company.supportEmail,
      subject: `We have received your enquiry — ${site.name}`,
      text: autoReply.text,
      html: autoReply.html,
    });
  } catch (error) {
    // The team already has the lead; never fail the submission over the receipt.
    console.error("[enquiry] auto-reply to customer failed", error);
  }
}
