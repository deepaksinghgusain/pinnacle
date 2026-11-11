import { prisma } from "@/lib/db/prisma-helper";
import { Status } from "@/lib/generated/prisma";

type EditorialKind = "case-study" | "insight";

function isTableMissing(error: unknown, kind: EditorialKind) {
  const expectedTable = kind === "case-study" ? "CaseStudy" : "Insight";
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2021" &&
      "meta" in error &&
      error.meta &&
      typeof error.meta === "object" &&
      "table" in error.meta &&
      error.meta.table === expectedTable,
  );
}

function databaseMessage(error: unknown, kind: EditorialKind) {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "P1000"
  ) {
    return "Database credentials were rejected. Check DATABASE_URL in the server environment.";
  }
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "P1001"
  ) {
    return "The database server could not be reached. Check the database host and network.";
  }
  if (isTableMissing(error, kind)) {
    return `The ${kind === "case-study" ? "CaseStudy" : "Insight"} table is missing. Apply the pending Prisma migration.`;
  }
  return "Could not load content because of a database error. Check server logs for details.";
}

export async function listCaseStudies() {
  try {
    return { success: true as const, data: await prisma.caseStudy.findMany({ orderBy: { updatedAt: "desc" } }) };
  } catch (error) {
    console.error("Unable to load case studies.", error);
    return { success: false as const, message: databaseMessage(error, "case-study") };
  }
}

export async function listInsights() {
  try {
    return { success: true as const, data: await prisma.insight.findMany({ orderBy: { updatedAt: "desc" } }) };
  } catch (error) {
    console.error("Unable to load insights.", error);
    return { success: false as const, message: databaseMessage(error, "insight") };
  }
}

export async function getCaseStudyById(id: string) {
  try {
    return { success: true as const, data: await prisma.caseStudy.findUnique({ where: { id } }) };
  } catch (error) {
    console.error("Unable to load case study for editing.", error);
    return { success: false as const, message: databaseMessage(error, "case-study") };
  }
}

export async function getInsightById(id: string) {
  try {
    return { success: true as const, data: await prisma.insight.findUnique({ where: { id } }) };
  } catch (error) {
    console.error("Unable to load insight for editing.", error);
    return { success: false as const, message: databaseMessage(error, "insight") };
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    return { databaseAvailable: true as const, data: await prisma.caseStudy.findUnique({ where: { slug } }) };
  } catch (error) {
    if (isTableMissing(error, "case-study")) return { databaseAvailable: false as const, data: null };
    console.error("Unable to load case study by slug; using legacy content if available.", error);
    return { databaseAvailable: false as const, data: null };
  }
}

export async function getInsightBySlug(slug: string) {
  try {
    return { databaseAvailable: true as const, data: await prisma.insight.findUnique({ where: { slug } }) };
  } catch (error) {
    if (isTableMissing(error, "insight")) return { databaseAvailable: false as const, data: null };
    console.error("Unable to load insight by slug; using legacy content if available.", error);
    return { databaseAvailable: false as const, data: null };
  }
}

export async function getEditorialNavigation() {
  try {
    const [caseStudies, insights] = await Promise.all([
      prisma.caseStudy.findMany({
        where: { status: Status.ACTIVE },
        select: { name: true, slug: true },
        orderBy: { name: "asc" },
      }),
      prisma.insight.findMany({
        where: { status: Status.ACTIVE },
        select: { name: true, slug: true },
        orderBy: { name: "asc" },
      }),
    ]);
    return { caseStudies, insights };
  } catch (error) {
    const missingCaseStudy = isTableMissing(error, "case-study");
    const missingInsight = isTableMissing(error, "insight");
    if (!missingCaseStudy && !missingInsight) {
      console.error("Unable to load editorial navigation links.", error);
    }
    return null;
  }
}
