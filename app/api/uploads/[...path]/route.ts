import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: fileSegments } = await params;

  if(!fileSegments || fileSegments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
     fileSegments[0].split("&")[0]
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }


  const file = fs.readFileSync(filePath);

  return new NextResponse(file);
}