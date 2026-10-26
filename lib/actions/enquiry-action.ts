"use server";

import { prisma } from "../db/prisma-helper";
import { enquirySchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { z } from "zod";
import { getSettings } from "./settings-action";
import { sendLeadEmails } from "../mail/lead";

type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getEnquiry() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return enquiries.map(omitTimestamps);
  } catch (error) {
    return [];
  }
}

export async function getEnquiryById(id: string) {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return {
        success: false,
        message: "Enquiry not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(enquiry),
      message: "Enquiry fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createEnquiry(
  data: z.infer<typeof enquirySchema>,
): Promise<ActionResponse> {
  try {
    const enquiry = enquirySchema.parse(data);

    await prisma.enquiry.create({
      data: {
        fullName: enquiry.fullName,
        email: enquiry.email,
        phoneNumber: enquiry.phoneNumber,
        companyName: enquiry.companyName || null,
        subject: enquiry.subject,
        message: enquiry.message,
      },
    });

    const settings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    await sendLeadEmails({
      settings,
      person: data,
    });

    return {
      success: true,
      message: "Enquiry created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
