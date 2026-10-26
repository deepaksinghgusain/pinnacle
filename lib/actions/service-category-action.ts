"use server";

import { prisma } from "../db/prisma-helper";
import { enquirySchema, serviceCategorySchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { includes, z } from "zod";

type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getServiceCategory() {
  try {
    const serviceCategories = await prisma.serviceCategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return serviceCategories.map(omitTimestamps);
  } catch (error) {
    return [];
  }
}

export async function getServiceCategoryById(id: string) {
  try {
    const serviceCategory = await prisma.serviceCategory.findUnique({
      where: { id },
    });

    if (!serviceCategory) {
      return {
        success: false,
        message: "Service Category not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(serviceCategory),
      message: "Service Category fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createServiceCategory(
  data: z.infer<typeof serviceCategorySchema>,
): Promise<ActionResponse> {
  try {
    const serviceCategory = serviceCategorySchema.parse(data);

    await prisma.serviceCategory.create({
      data: {
        name: serviceCategory.name,
        status: serviceCategory.status,
      },
    });

    return {
      success: true,
      message: "Service Category created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}


export async function updateServiceCategory(
  id: string,
  data: z.infer<typeof serviceCategorySchema>,
): Promise<ActionResponse> {
  try {
    const serviceCategory = serviceCategorySchema.parse(data);

    const updateData: any = {
      name: serviceCategory.name,
      status: serviceCategory.status,
    };

    await prisma.serviceCategory.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "Service Category updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteServiceCategory(id: string): Promise<ActionResponse> {
  try {
    await prisma.serviceCategory.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Service Category deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

