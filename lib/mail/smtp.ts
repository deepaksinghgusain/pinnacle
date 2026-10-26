import nodemailer from "nodemailer";

export type MailAddress = {
  name?: string;
  address: string;
};

type SmtpAuth = {
  username: string;
  password: string;
};

type MailAttachment = {
  filename: string;
  contentType: string;
  content: Buffer;
};

type SendMailOptions = {
  host: string;
  port: number;
  secure?: boolean;
  auth: SmtpAuth;
  from: MailAddress;
  to: MailAddress[];
  bcc?: MailAddress[];
  replyTo?: MailAddress;
  subject: string;
  text: string;
  html: string;
  attachments?: MailAttachment[];
};

function normalizeSmtpHost(host: string) {
  const normalized = host.trim().toLowerCase();

  if (
    normalized === "smtp.office365.com" ||
    normalized === "outlook.office365.com" ||
    normalized === "smtp.live.com" ||
    normalized === "smtp-mail.outlook.com"
  ) {
    return "smtp-mail.outlook.com";
  }

  return normalized;
}

function resolveSmtpSettings(host: string, port: number, secure?: boolean) {
  const normalizedHost = normalizeSmtpHost(host);
  const isOutlookHost = normalizedHost.includes("outlook") || normalizedHost.includes("office365");
  const resolvedPort = isOutlookHost ? 587 : Number(port) || 587;
  const resolvedSecure = isOutlookHost ? false : (secure ?? resolvedPort === 465);

  return {
    host: normalizedHost,
    port: resolvedPort,
    secure: resolvedSecure,
  };
}

function toTransporter(options: SendMailOptions) {
  const { host, port, secure } = resolveSmtpSettings(options.host, options.port, options.secure);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user: options.auth.username,
      pass: options.auth.password,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

export async function sendMail(options: SendMailOptions) {
  const transporter = toTransporter(options);

  const recipients = options.to.map((address) => address.address);
  const bccRecipients = (options.bcc ?? []).map((address) => address.address);

  return transporter.sendMail({
    from: `${options.from.name ?? options.from.address} <${options.from.address}>`,
    to: recipients,
    bcc: bccRecipients,
    replyTo: options.replyTo ? `${options.replyTo.name ?? options.replyTo.address} <${options.replyTo.address}>` : undefined,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments?.map((attachment) => ({
      filename: attachment.filename,
      contentType: attachment.contentType,
      content: attachment.content,
    })),
  });
}

export function createMailbox(value: string, fallbackName?: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*)<([^<>]+)>$/);

  if (match) {
    const name = match[1].trim().replace(/^"|"$/g, "");
    const address = match[2].trim();
    return { name: name || fallbackName, address };
  }

  return {
    name: fallbackName,
    address: trimmed,
  };
}
