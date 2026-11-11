import { prisma } from "@/lib/db/prisma-helper";
import { Status } from "@/lib/generated/prisma";

function isIndustryTableMissing(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2021",
  );
}

function getDatabaseErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "P1000"
  ) {
    return "The database rejected its credentials. Check DATABASE_URL in the server environment and restart the app after updating it.";
  }
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "P1001"
  ) {
    return "The database server could not be reached. Check the database host, network access, and server status.";
  }
  if (isIndustryTableMissing(error)) {
    return "The Industry table is not available yet. Apply the pending Prisma migration.";
  }
  return "Could not load industries because of a database error. Check the server logs for details.";
}

export async function getIndustries() {
  try {
    return {
      success: true as const,
      data: await prisma.industry.findMany({
        orderBy: [{ updatedAt: "desc" }, { name: "asc" }],
      }),
    };
  } catch (error) {
    console.error("Unable to load industries for the admin page.", error);
    return { success: false as const, message: getDatabaseErrorMessage(error) };
  }
}

export async function getIndustryById(id: string) {
  try {
    return {
      success: true as const,
      data: await prisma.industry.findUnique({ where: { id } }),
    };
  } catch (error) {
    console.error("Unable to load industry for editing.", error);
    return { success: false as const, message: getDatabaseErrorMessage(error) };
  }
}

export async function getIndustryBySlug(slug: string) {
  try {
    return {
      databaseAvailable: true as const,
      industry: await prisma.industry.findUnique({ where: { slug } }),
    };
  } catch (error) {
    if (isIndustryTableMissing(error)) {
      return { databaseAvailable: false as const, industry: null };
    }
    console.error("Unable to load the industry record; using a legacy page if available.", error);
    return { databaseAvailable: false as const, industry: null };
  }
}

export async function getIndustryNavigation() {
  try {
    return await prisma.industry.findMany({
      where: { status: Status.ACTIVE },
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    if (isIndustryTableMissing(error)) return null;
    console.error("Unable to load industry navigation links.", error);
    return null;
  }
}
