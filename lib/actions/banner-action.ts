"use server";

import { prisma } from "../db/prisma-helper";
import { bannerSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { z } from "zod";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function getBanner(): Promise<any> {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return banners;
  } catch (error) {
    return [];
  }
}

export async function createBanner(data: z.infer<typeof bannerSchema>): Promise<ActionResponse> {
  try {
    const banner = bannerSchema.parse(data);

    const imageValue =
      banner.image instanceof File
        ? banner.image.name
        : banner.image ?? null;


    await prisma.banner.create({
      data: {
        tagline: banner.tagline,
        title: banner.title,
        description: banner.description,
        image: imageValue,
        status: banner.status,
      },
    });

    return {
      success: true,
      message: "Banner created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getBannerById(id: string) {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id }
    });

    if (!banner) {
      return {
        success: false,
        message: "Banner not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(banner),
      message: "banner fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateBanner(
  data: z.infer<typeof bannerSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const banner = bannerSchema.parse(data);

    const imageValue =
      banner.image instanceof File
        ? banner.image.name
        : banner.image ?? null;

    const updateData: any = {
      tagline: banner.tagline,
      title: banner.title,
      description: banner.description,
      image: imageValue,
      status: banner.status,
    };

    await prisma.banner.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "Banner updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteBanner(id: string): Promise<ActionResponse> {
  try {
    await prisma.banner.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Banner deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
