import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { SiteSettings } from "./generated/prisma";
import { prisma } from "./db/prisma-helper";

export async function getCachedSettings(): Promise<SiteSettings | undefined> {
  "use cache";
  cacheLife("minutes");
  cacheTag("site-settings");

  try {
    const siteSetting = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return siteSetting ?? undefined;
  } catch {
    return undefined;
  }
}