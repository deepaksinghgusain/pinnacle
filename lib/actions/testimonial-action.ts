"use server";

import { prisma } from "../db/prisma-helper";
import { bannerSchema, testimonialSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { Testimonial } from "../types";
import { z } from "zod";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return testimonials;
  } catch (error) {
    return [];
  }
}

export async function createTestimonial(data: z.infer<typeof testimonialSchema>): Promise<ActionResponse> {
  try {
    const testimonial = testimonialSchema.parse(data);

    const imageValue =
      testimonial.image instanceof File
        ? testimonial.image.name
        : testimonial.image ?? null;


    await prisma.testimonial.create({
      data: {
        name: testimonial.name,
        designation: testimonial.designation,
        company: testimonial.company,
        tag: testimonial.tag,
        content: testimonial.content,
        image: imageValue,
        status: testimonial.status,
      },
    });

    return {
      success: true,
      message: "Testimonial created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getTestimonialById(id: string) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id }
    });

    if (!testimonial) {
      return {
        success: false,
        message: "Testimonial not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(testimonial),
      message: "Testimonial fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateTestimonial(
  data: z.infer<typeof testimonialSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const testimonial = testimonialSchema.parse(data);

    const imageValue =
      testimonial.image instanceof File
        ? testimonial.image.name
        : testimonial.image ?? null;

    const updateData: any = {
      name: testimonial.name,
      designation: testimonial.designation,
      company: testimonial.company,
      tag: testimonial.tag,
      content: testimonial.content,
      image: imageValue,
      status: testimonial.status,
    };

    await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "Testimonial updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Testimonial deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
