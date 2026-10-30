import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/auth";

export async function getRequestSession() {
  await connection();
  return getServerSession(authOptions);
}
