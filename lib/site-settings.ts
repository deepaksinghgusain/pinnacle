import "server-only";
import type { SiteSettings } from "./generated/prisma";
import { prisma } from "./db/prisma-helper";

export async function getSiteSettings(): Promise<SiteSettings | undefined> {
  try {
    const siteSetting = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return siteSetting ?? undefined;
  } catch {
    return undefined;
  }
}