import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".avi": "video/x-msvideo",
  ".bmp": "image/bmp",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".ogg": "video/ogg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: fileSegments } = await params;

  if (!fileSegments || fileSegments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fileName = fileSegments[0].split("&")[0];
  if (
    !fileName ||
    fileName === "." ||
    fileName === ".." ||
    fileName.includes("/") ||
    fileName.includes("\\")
  ) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    fileName
  );

  let file: Buffer;
  try {
    file = await fs.readFile(filePath);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error.code === "ENOENT" || error.code === "EISDIR")
    ) {
      return new NextResponse("Not found", { status: 404 });
    }
    throw error;
  }

  const contentType =
    contentTypes[path.extname(fileName).toLowerCase()] ?? "application/octet-stream";
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": contentType,
    },
  });
}