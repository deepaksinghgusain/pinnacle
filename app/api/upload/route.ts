import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") ?? formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "No file uploaded" },
      { status: 400 }
    );
  }

  const allowedDocumentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime", // .mov
    "video/x-msvideo", // .avi
    "video/x-matroska", // .mkv
  ];

  const contentType = file.type || "";

  const isValid =
    contentType.startsWith("image/") ||
    allowedDocumentTypes.includes(contentType) ||
    allowedVideoTypes.includes(contentType);

  if (!isValid) {
    return NextResponse.json(
      {
        message:
          "Invalid file type. Only images, videos, PDF, DOC, and DOCX are allowed.",
      },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const extension = path.extname(file.name) || ".bin";
  const filename = `${crypto.randomUUID()}${extension}`;

  await fs.writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({
    success: true,
    url: `/uploads/${filename}`,
    type: contentType,
  });
}