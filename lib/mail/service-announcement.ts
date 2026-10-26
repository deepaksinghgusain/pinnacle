import type { SiteSettings } from "../generated/prisma";
import { sendMail, createMailbox } from "./smtp";

type AnnouncementRecipient = {
  email: string;
  name?: string | null;
};

type ServiceAnnouncementService = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image?: string | null;
  category?: {
    name: string;
  } | null;
  serviceBenefits?: {
    title?: string | null;
    description?: string | null;
    items?: string[] | null;
  } | null;
  capabilities?: {
    title?: string | null;
    description?: string | null;
    items?: string[] | null;
  } | null;
  deliveryProcess?: {
    title?: string | null;
    items?: string[] | null;
  } | null;
  outcomeFocuses?: {
    title?: string | null;
    description?: string | null;
    items?: string[] | null;
  } | null;
};

export type ServiceAnnouncementPayload = ServiceAnnouncementService;

type AnnouncementOptions = {
  settings?: Pick<
    SiteSettings,
    | "siteName"
    | "websiteUrl"
    | "smtpHost"
    | "smtpPort"
    | "smtpUsername"
    | "smtpPassword"
    | "fromName"
    | "fromEmail"
    | "replyToEmail"
    | "emailSignature"
  > | null;
  service: ServiceAnnouncementService;
  recipients: any;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatList(items: string[] = []) {
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function buildBaseUrl(value?: string | null) {
  if (!value) return "http://localhost:3000";

  const trimmed = value.trim();
  if (!trimmed) return "http://localhost:3000";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, "");
  }

  return `https://${trimmed.replace(/\/+$/, "")}`;
}

function resolveImageUrl(baseUrl: string, value?: string | null) {
  if (!value) return null;

  const normalized = value.trim();
  if (!normalized) return null;

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  if (normalized.startsWith("/api/")) {
    return `${baseUrl}${normalized}`;
  }

  if (normalized.startsWith("/uploads/")) {
    return `${baseUrl}/api${normalized}`;
  }

  if (normalized.startsWith("uploads/")) {
    return `${baseUrl}/api/${normalized}`;
  }

  return `${baseUrl}/api/uploads/${normalized.replace(/^\/+/, "")}`;
}

function buildAnnouncementCopy(service: ServiceAnnouncementService) {
  const highlights = [
    service.category ? `Category: ${service.category.name}` : null,
    service.serviceBenefits?.title
      ? `Benefits: ${service.serviceBenefits.title}`
      : null,
    service.capabilities?.title
      ? `Capabilities: ${service.capabilities.title}`
      : null,
    service.deliveryProcess?.title
      ? `Delivery process: ${service.deliveryProcess.title}`
      : null,
    service.outcomeFocuses?.title
      ? `Outcome focus: ${service.outcomeFocuses.title}`
      : null,
  ].filter(Boolean) as string[];

  const benefitItems = formatList(service.serviceBenefits?.items ?? []);
  const capabilityItems = formatList(service.capabilities?.items ?? []);
  const outcomeItems = formatList(service.outcomeFocuses?.items ?? []);

  return {
    highlights,
    benefitItems,
    capabilityItems,
    outcomeItems,
  };
}

function buildHtml({
  settings,
  service,
  baseUrl,
  imageUrl,
}: {
  settings?: Pick<SiteSettings, "siteName" | "emailSignature"> | null;
  service: ServiceAnnouncementService;
  baseUrl: string;
  imageUrl: string | null;
}) {
  const brandName = settings?.siteName ?? "Pinnacle";
  const serviceUrl = `${baseUrl.replace(/\/+$/, "")}/service/${service.id}`;
  const { highlights, benefitItems, capabilityItems, outcomeItems } =
    buildAnnouncementCopy(service);

  const signatureHtml = settings?.emailSignature
    ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#475569;font-size:14px;line-height:1.7">${escapeHtml(
      settings.emailSignature,
    ).replace(/\n/g, "<br />")}</div>`
    : "";

  return `
  <div style="margin:0;background:#f8fafc;padding:0;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
    <div style="max-width:720px;margin:0 auto;padding:32px 20px">
      <div style="background:linear-gradient(135deg,#062B36 0%,#0f4c5c 100%);border-radius:24px;padding:32px;color:#fff;overflow:hidden">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85">${escapeHtml(
    brandName,
  )}</div>
        <div style="margin-top:12px;font-size:30px;line-height:1.1;font-weight:700">${escapeHtml(
    service.title,
  )}</div>
        <div style="margin-top:12px;font-size:16px;line-height:1.7;opacity:.92;max-width:620px">${escapeHtml(
    service.shortDescription,
  )}</div>
        <div style="margin-top:24px">
          <a href="${serviceUrl}" style="display:inline-block;background:#f97316;color:#fff;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700">View service</a>
        </div>
      </div>

      ${imageUrl
      ? `<div style="margin-top:20px;overflow:hidden;border-radius:20px;border:1px solid #e2e8f0;background:#fff">
              <img src="${imageUrl}" alt="${escapeHtml(
        service.title,
      )}" style="display:block;width:100%;max-height:320px;object-fit:cover" />
            </div>`
      : ""
    }

      <div style="margin-top:20px;background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:28px">
        <div style="font-size:18px;font-weight:700;color:#0f172a">What is new</div>
        <p style="margin:12px 0 0;color:#475569;line-height:1.8">
          We have just published a new service on ${escapeHtml(brandName)}. This update is being shared with our active career community so you can stay aware of how the business is growing and where we are expanding delivery capability.
        </p>

        <div style="margin-top:24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px">
          ${highlights
      .map(
        (item) => `
              <div style="border:1px solid #e2e8f0;border-radius:18px;padding:16px;background:#f8fafc">
                <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#f97316;font-weight:700">Highlight</div>
                <div style="margin-top:8px;font-size:14px;line-height:1.6;color:#0f172a">${escapeHtml(
          item,
        )}</div>
              </div>`,
      )
      .join("")}
        </div>

        <div style="margin-top:24px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px">
          <div style="border:1px solid #dbeafe;border-radius:18px;padding:16px;background:#eff6ff">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;font-weight:700">Benefits</div>
            <ul style="margin:10px 0 0;padding-left:18px;color:#334155;line-height:1.8">
              ${benefitItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
          <div style="border:1px solid #dbeafe;border-radius:18px;padding:16px;background:#eff6ff">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;font-weight:700">Capabilities</div>
            <ul style="margin:10px 0 0;padding-left:18px;color:#334155;line-height:1.8">
              ${capabilityItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
          <div style="border:1px solid #dbeafe;border-radius:18px;padding:16px;background:#eff6ff">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#2563eb;font-weight:700">Outcome focus</div>
            <ul style="margin:10px 0 0;padding-left:18px;color:#334155;line-height:1.8">
              ${outcomeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div style="margin-top:24px;padding:18px 20px;border-left:4px solid #f97316;background:#fff7ed;border-radius:16px;color:#7c2d12;line-height:1.7">
          ${escapeHtml(service.description)}
        </div>

        <p style="margin-top:20px;color:#475569;line-height:1.7">
          If this new service sounds like a good fit for your background or future interests, keep an eye on the careers page. You can also reply to this email if you want to reach our team directly.
        </p>

        ${signatureHtml}
      </div>
    </div>
  </div>`;
}

function buildText({
  settings,
  service,
  baseUrl,
}: {
  settings?: Pick<SiteSettings, "siteName" | "emailSignature"> | null;
  service: ServiceAnnouncementService;
  baseUrl: string;
}) {
  const brandName = settings?.siteName ?? "Pinnacle";
  const serviceUrl = `${baseUrl.replace(/\/+$/, "")}/service/${service.id}`;
  const { highlights, benefitItems, capabilityItems, outcomeItems } =
    buildAnnouncementCopy(service);

  return [
    `${brandName} - New service announcement`,
    "",
    `New service: ${service.title}`,
    `Short description: ${service.shortDescription}`,
    "",
    "Highlights:",
    ...highlights.map((item) => `- ${item}`),
    "",
    "Benefits:",
    ...benefitItems.map((item) => `- ${item}`),
    "",
    "Capabilities:",
    ...capabilityItems.map((item) => `- ${item}`),
    "",
    "Outcome focus:",
    ...outcomeItems.map((item) => `- ${item}`),
    "",
    `Service details: ${serviceUrl}`,
    "",
    service.description,
    "",
    settings?.emailSignature ? settings.emailSignature : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendNewServiceAnnouncement({
  settings,
  service,
  recipients,
}: AnnouncementOptions) {
  const smtpHost = settings?.smtpHost?.trim();
  const smtpPort = Number(settings?.smtpPort ?? 0);
  const smtpUsername = settings?.smtpUsername?.trim();
  const smtpPassword = settings?.smtpPassword?.trim();
  const fromEmail = settings?.fromEmail?.trim() || smtpUsername || "no-reply@localhost";
  const fromName = settings?.fromName?.trim() || settings?.siteName || "Pinnacle";

  if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
    return { sent: false, skipped: true, reason: "SMTP settings are incomplete" };
  }

  const baseUrl = buildBaseUrl(settings?.websiteUrl);
  const imageUrl = resolveImageUrl(baseUrl, service.image);
  const subject = `New service added: ${service.title}`;
  const from = createMailbox(`${fromName} <${fromEmail}>`, fromName);
  const to = recipients.map((recipient: any) =>
    createMailbox(
      recipient.email
        ? ` <${recipient.email}>`
        : recipient.email,
    ),
  );

  await sendMail({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      username: smtpUsername,
      password: smtpPassword,
    },
    from,
    to,
    replyTo: settings?.replyToEmail?.trim()
      ? createMailbox(settings.replyToEmail.trim())
      : undefined,
    subject,
    text: buildText({ settings, service, baseUrl }),
    html: buildHtml({ settings, service, baseUrl, imageUrl }),
  });

  return { sent: true, skipped: false };
}
