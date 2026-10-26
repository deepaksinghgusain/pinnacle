import type { SiteSettings } from "../generated/prisma";
import { createMailbox, sendMail } from "./smtp";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getEmail(value?: string | null) {
  const email = value?.trim();
  return email || undefined;
}

export async function sendNewsletterSubscriptionEmails({
  settings,
  email,
}: {
  settings: SiteSettings | null | undefined;
  email: string;
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
  const safeEmail = escapeHtml(email);

  const deliveries = [] as Promise<unknown>[];

  deliveries.push(
    sendMail({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { username: smtpUsername, password: smtpPassword },
      from,
      to: [createMailbox(email)],
      subject: `New newsletter subscription: ${email}`,
      text: [
        `New newsletter subscription received`,
        "",
        `Email: ${email}`,
      ].join("\n"),
      html: `
          <h1>New newsletter subscription</h1>
          <p><strong>Email:</strong> ${safeEmail}</p>
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
      to: [createMailbox(email)],
      replyTo: defaultReplyTo ? createMailbox(defaultReplyTo) : undefined,
      subject: `Thanks for subscribing to ${brandName}`,
      text: [
        `Hi there,`,
        "",
        `Thank you for subscribing to ${brandName}. We will share updates and news with you soon.`,
        "",
        "Regards,",
        brandName,
      ].join("\n"),
      html: `
        <p>Hi there,</p>
        <p>Thank you for subscribing to <strong>${escapeHtml(brandName)}</strong>. We will share updates and news with you soon.</p>
        <p>Regards,<br />${escapeHtml(brandName)}</p>
      `,
    }),
  );

  await Promise.all(deliveries);
  return { sent: true, skipped: false };
}
