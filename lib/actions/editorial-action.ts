"use server";

import { revalidatePath } from "next/cache";
import { getRequestSession } from "@/lib/auth-session";
import { prisma } from "@/lib/db/prisma-helper";
import {
  caseStudySchema,
  insightSchema,
  type CaseStudyInput,
  type InsightInput,
} from "@/lib/editorial-content";
import { formatError } from "@/lib/utils";

type ActionResult = { success: boolean; message: string };

async function requireSignedInAdmin() {
  const session = await getRequestSession();
  if (!session?.user) throw new Error("You must be signed in to manage editorial content.");
}

function revalidateEditorial(kind: "case-study" | "insight", ...slugs: string[]) {
  const base = kind === "case-study" ? "/case-studies" : "/insights";
  revalidatePath(`/admin${base}`);
  revalidatePath(base);
  for (const slug of slugs) revalidatePath(`${base}/${slug}`);
  if (kind === "case-study") revalidatePath("/customer-delight");
}

function invalidInput(error: { issues: Array<{ message: string }> }): ActionResult {
  return {
    success: false,
    message: error.issues.map((issue) => issue.message).join(". "),
  };
}

export async function createCaseStudy(input: CaseStudyInput): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const parsed = caseStudySchema.safeParse(input);
    if (!parsed.success) return invalidInput(parsed.error);
    await prisma.caseStudy.create({
      data: {
        ...parsed.data,
        content: JSON.stringify(parsed.data.content),
      },
    });
    revalidateEditorial("case-study", parsed.data.slug);
    return { success: true, message: "Case study created successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateCaseStudy(
  id: string,
  input: CaseStudyInput,
): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const parsed = caseStudySchema.safeParse(input);
    if (!parsed.success) return invalidInput(parsed.error);
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Case study not found." };
    await prisma.caseStudy.update({
      where: { id },
      data: { ...parsed.data, content: JSON.stringify(parsed.data.content) },
    });
    revalidateEditorial("case-study", existing.slug, parsed.data.slug);
    return { success: true, message: "Case study updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteCaseStudy(id: string): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Case study not found." };
    await prisma.caseStudy.delete({ where: { id } });
    revalidateEditorial("case-study", existing.slug);
    return { success: true, message: "Case study deleted successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function createInsight(input: InsightInput): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const parsed = insightSchema.safeParse(input);
    if (!parsed.success) return invalidInput(parsed.error);
    await prisma.insight.create({
      data: { ...parsed.data, content: JSON.stringify(parsed.data.content) },
    });
    revalidateEditorial("insight", parsed.data.slug);
    return { success: true, message: "Insight created successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateInsight(id: string, input: InsightInput): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const parsed = insightSchema.safeParse(input);
    if (!parsed.success) return invalidInput(parsed.error);
    const existing = await prisma.insight.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Insight not found." };
    await prisma.insight.update({
      where: { id },
      data: { ...parsed.data, content: JSON.stringify(parsed.data.content) },
    });
    revalidateEditorial("insight", existing.slug, parsed.data.slug);
    return { success: true, message: "Insight updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteInsight(id: string): Promise<ActionResult> {
  try {
    await requireSignedInAdmin();
    const existing = await prisma.insight.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Insight not found." };
    await prisma.insight.delete({ where: { id } });
    revalidateEditorial("insight", existing.slug);
    return { success: true, message: "Insight deleted successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
