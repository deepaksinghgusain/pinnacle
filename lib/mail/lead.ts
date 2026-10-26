import { createMailbox, sendMail } from "./smtp";
import fs from "node:fs/promises";
import path from "node:path";

type JobApplicationMailSettings = {
  siteName?: string | null;
  primaryEmail?: string | null;
  supportInbox?: string | null;
  smtpHost?: string | null;
  smtpPort?: string | null;
  smtpUsername?: string | null;
  smtpPassword?: string | null;
  fromName?: string | null;
  fromEmail?: string | null;
  replyToEmail?: string | null;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function getEmail(value?: string | null) {
  const email = value?.trim();
  return email || undefined;
}


export async function sendLeadEmails({
  settings,
  person,
}: {
  settings: JobApplicationMailSettings | null;
  person: any;
}) {
  const smtpHost = getEmail(settings?.smtpHost);
  const smtpPort = Number(settings?.smtpPort ?? 0);
  const smtpUsername = getEmail(settings?.smtpUsername);
  const smtpPassword = settings?.smtpPassword?.trim();

  if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
    return { sent: false, skipped: true, reason: "SMTP settings are incomplete" };
  }

  const brandName = settings?.siteName?.trim() || "Pinnacle";
  const fromName = settings?.fromName?.trim() || brandName;
  const fromEmail = getEmail(settings?.fromEmail) || smtpUsername;
  const inbox = getEmail(settings?.supportInbox) || getEmail(settings?.primaryEmail);
  const defaultReplyTo = getEmail(settings?.replyToEmail) || inbox;
  const from = createMailbox(`${fromName} <${fromEmail}>`, fromName);
  const applicant = escapeHtml(person.fullName);

  const deliveries = [];

  deliveries.push(
    sendMail({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { username: smtpUsername, password: smtpPassword },
      from,
      to: [createMailbox(`${fromName} <${fromEmail}>`, fromName)],
      subject: `New lead inquiry: ${person.subject} — ${person.fullName}`,
      text: [
        `New lead inquiry for ${person.subject}`,
        "",
        `Name: ${person.fullName}`,
        `Email: ${person.email}`,
        `Phone: ${person.phoneNumber}`,
        `Message: ${person.message || "Not provided"}`,
      ].join("\n"),
      html: `
          <h1>New lead inquiry</h1>
          <p><strong>Subject:</strong> ${person.subject}</p>
          <p><strong>Name:</strong> ${applicant}</p>
          <p><strong>Email:</strong> ${escapeHtml(person.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(person.phoneNumber)}</p>
          <p><strong>Message:</strong><br />${escapeHtml(person.message || "Not provided")}</p>
        `,
    }),
  );

  deliveries.push(
    sendMail({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { username: smtpUsername, password: smtpPassword },
      from,
      to: [createMailbox(person.email, person.fullName)],
      replyTo: defaultReplyTo ? createMailbox(defaultReplyTo) : undefined,
      subject: `We received your inquiry`,
      text: `Hi ${person.fullName},\n\nThank you for your inquiry. Our team will review your message and contact you shortly.\n\nRegards,\n${brandName}`,
      html: `<p>Hi ${applicant},</p><p>Thank you for your inquiry. Our team will review your message and contact you shortly.</p><p>Regards,<br />${escapeHtml(brandName)}</p>`,
    }),
  );

  await Promise.all(deliveries);
  return { sent: true, skipped: false };
}
