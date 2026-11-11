"use server";

import { revalidatePath } from "next/cache";
import { getRequestSession } from "@/lib/auth-session";
import { prisma } from "@/lib/db/prisma-helper";
import { industrySchema, type IndustryInput } from "@/lib/industry-content";
import { formatError } from "@/lib/utils";

type ActionResponse = {
  success: boolean;
  message: string;
};

async function requireAdminSession() {
  const session = await getRequestSession();
  if (!session?.user) throw new Error("You must be signed in to manage industries");
}

function revalidateIndustryRoutes(slug?: string) {
  revalidatePath("/admin/industry");
  revalidatePath("/industries");
  if (slug) revalidatePath(`/industries/${slug}`);
}

export async function createIndustry(input: IndustryInput): Promise<ActionResponse> {
  try {
    await requireAdminSession();
    const parsed = industrySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((issue) => issue.message).join(". "),
      };
    }
    const industry = parsed.data;
    await prisma.industry.create({
      data: {
        name: industry.name,
        slug: industry.slug,
        status: industry.status,
        content: JSON.stringify(industry.content),
      },
    });
    revalidateIndustryRoutes(industry.slug);
    return { success: true, message: "Industry created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateIndustry(
  id: string,
  input: IndustryInput,
): Promise<ActionResponse> {
  try {
    await requireAdminSession();
    const parsed = industrySchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues.map((issue) => issue.message).join(". "),
      };
    }
    const industry = parsed.data;
    const existing = await prisma.industry.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Industry not found" };

    await prisma.industry.update({
      where: { id },
      data: {
        name: industry.name,
        slug: industry.slug,
        status: industry.status,
        content: JSON.stringify(industry.content),
      },
    });
    revalidateIndustryRoutes(existing.slug);
    revalidateIndustryRoutes(industry.slug);
    return { success: true, message: "Industry updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteIndustry(id: string): Promise<ActionResponse> {
  try {
    await requireAdminSession();
    const existing = await prisma.industry.findUnique({ where: { id } });
    if (!existing) return { success: false, message: "Industry not found" };
    await prisma.industry.delete({ where: { id } });
    revalidateIndustryRoutes(existing.slug);
    return { success: true, message: "Industry deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
