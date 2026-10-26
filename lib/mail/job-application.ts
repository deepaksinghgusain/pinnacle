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

type JobApplicationMailPayload = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  location: string;
  resume: string;
  message: string;
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

async function getResumeAttachment(resume: string) {
  const normalized = resume.trim().replace(/^\/+/, "");

  if (!normalized.startsWith("uploads/")) {
    return undefined;
  }

  const filename = path.basename(normalized);
  if (!filename || normalized !== `uploads/${filename}`) {
    return undefined;
  }

  const extension = path.extname(filename).toLowerCase();
  const contentType = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }[extension] ?? "application/octet-stream";

  try {
    return {
      filename,
      contentType,
      content: await fs.readFile(path.join(process.cwd(), "public", "uploads", filename)),
    };
  } catch {
    return undefined;
  }
}

export async function sendJobApplicationEmails({
  settings,
  application,
}: {
  settings: JobApplicationMailSettings | null;
  application: JobApplicationMailPayload;
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
  const applicant = escapeHtml(application.fullName);
  const role = escapeHtml(application.role);
  const resumeAttachment = await getResumeAttachment(application.resume);

  const deliveries = [];

  if (inbox) {
    deliveries.push(
      sendMail({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { username: smtpUsername, password: smtpPassword },
        from,
        to: [createMailbox(inbox)],
        replyTo: createMailbox(application.email, application.fullName),
        subject: `New job application: ${application.role} — ${application.fullName}`,
        text: [
          `New job application for ${application.role}`,
          "",
          `Name: ${application.fullName}`,
          `Email: ${application.email}`,
          `Phone: ${application.phone}`,
          `Experience: ${application.experience}`,
          `Location: ${application.location}`,
          `Resume: ${application.resume}`,
          `Message: ${application.message || "Not provided"}`,
        ].join("\n"),
        html: `
          <h1>New job application</h1>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Name:</strong> ${applicant}</p>
          <p><strong>Email:</strong> ${escapeHtml(application.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(application.phone)}</p>
          <p><strong>Experience:</strong> ${escapeHtml(application.experience)}</p>
          <p><strong>Location:</strong> ${escapeHtml(application.location)}</p>
          <p><strong>Message:</strong><br />${escapeHtml(application.message || "Not provided")}</p>
        `,
        attachments: resumeAttachment ? [resumeAttachment] : undefined,
      }),
    );
  }

  deliveries.push(
    sendMail({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { username: smtpUsername, password: smtpPassword },
      from,
      to: [createMailbox(application.email, application.fullName)],
      replyTo: defaultReplyTo ? createMailbox(defaultReplyTo) : undefined,
      subject: `We received your application for ${application.role}`,
      text: `Hi ${application.fullName},\n\nThank you for applying for the ${application.role} role at ${brandName}. Our recruitment team will review your application and contact you if your profile is a match.\n\nRegards,\n${brandName}`,
      html: `<p>Hi ${applicant},</p><p>Thank you for applying for the <strong>${role}</strong> role at ${escapeHtml(brandName)}. Our recruitment team will review your application and contact you if your profile is a match.</p><p>Regards,<br />${escapeHtml(brandName)}</p>`,
    }),
  );

  await Promise.all(deliveries);
  return { sent: true, skipped: false };
}
