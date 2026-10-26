"use server";

import { prisma } from "../db/prisma-helper";
import { newsletterSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { Newsletter } from "../types";
import { z } from "zod";
import { Status } from "../generated/prisma";
import { sendNewsletterSubscriptionEmails } from "../mail/newletter";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function getNewsletter(props?: any): Promise<Newsletter[]> {
  try {
    const newsletter = await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: "desc" },
      where: {...props}
    });

    return newsletter;
  } catch (error) {
    return [];
  }
}

export async function createNewsletter(data: z.infer<typeof newsletterSchema>): Promise<ActionResponse> {

  try {
    const newsletter = newsletterSchema.parse(data);

    const createdSubscription = await prisma.newsletterSubscription.create({
      data: {
        email: newsletter.email,
        status: newsletter.status,
      },
    });

    try {
      const settings = await prisma.siteSettings.findFirst({
        orderBy: { createdAt: "desc" },
      });

      await sendNewsletterSubscriptionEmails({
        settings,
        email: createdSubscription.email,
      });
    } catch (error) {
      console.error("Newsletter email failed", error);
    }

    return {
      success: true,
      message: "Newsletter subscription created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getNewsletterById(id: string) {
  try {
    const newsletter = await prisma.newsletterSubscription.findUnique({
      where: { id }
    });

    if (!newsletter) {
      return {
        success: false,
        message: "Newsletter subscription not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(newsletter),
      message: "newsletter subscription fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateNewsletter(
  data: z.infer<typeof newsletterSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const newsletter = newsletterSchema.parse(data);


    await prisma.newsletterSubscription.update({
      where: { id },
      data: {
        email: newsletter.email,
        status: newsletter.status,
      },
    });

    return {
      success: true,
      message: "Newsletter subscription updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteNewsletter(id: string): Promise<ActionResponse> {
  try {
    await prisma.newsletterSubscription.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Newsletter subscription deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
