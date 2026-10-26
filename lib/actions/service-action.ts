"use server";

import { prisma } from "../db/prisma-helper";
import { serviceSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { z } from "zod";
import { ApplicationStatus } from "../generated/prisma";
import {
  sendNewServiceAnnouncement,
  type ServiceAnnouncementPayload,
} from "../mail/service-announcement";
import { getNewsletter } from "./newsletter-action";
import { Status } from "../types";

type SectionRecord = Record<string, unknown> & {
  items?: unknown;
};

function ensureArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (value == null) {
    return [];
  }

  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // ignore invalid JSON and fall back to comma-separated parsing
    }

    if (value === "[Array]") {
      return [];
    }

    if (value.includes(",")) {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [value];
  }

  return [String(value).trim()].filter(Boolean);
}

function toSectionRecord(value: unknown): SectionRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as SectionRecord;
  }

  return {};
}

function normalizeServicePayload(data: z.infer<typeof serviceSchema>) {
  const serviceBenefits = toSectionRecord(data.serviceBenefits);
  const capabilities = toSectionRecord(data.capabilities);
  const deliveryProcess = toSectionRecord(data.deliveryProcess);
  const outcomeFocuses = toSectionRecord(data.outcomeFocuses);
  const contactSection = toSectionRecord(data.contactSection);

  return {
    ...data,
    serviceBenefits: {
      ...serviceBenefits,
      items: ensureArray(serviceBenefits.items),
    },
    capabilities: {
      ...capabilities,
      items: ensureArray(capabilities.items),
    },
    deliveryProcess: {
      ...deliveryProcess,
      items: ensureArray(deliveryProcess.items),
    },
    outcomeFocuses: {
      ...outcomeFocuses,
      items: ensureArray(outcomeFocuses.items),
    },
    contactSection,
  } as z.infer<typeof serviceSchema>;
}

type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getServices() {

  try {
    const services = await prisma.services.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        serviceBenefits: true,
        capabilities: true,
        deliveryProcess: true,
        outcomeFocuses: true,
        contactSection: true,
      }
    });

    return services.map(omitTimestamps);
  } catch {
    return [];
  }
}

export async function getServiceById(id: string) {


  try {
    const service = await prisma.services.findUnique({
      where: { id },
      include: {
        serviceBenefits: true,
        capabilities: true,
        deliveryProcess: true,
        outcomeFocuses: true,
        category: true,
        contactSection: true,
      },
    });

    if (!service) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    const payload = {
      ...omitTimestamps(service),
      serviceCategory: service.category,
    };

    return {
      success: true,
      data: payload,
      message: "Service fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createService(
  data: z.infer<typeof serviceSchema>,
): Promise<ActionResponse> {
  try {
    const parsedService = serviceSchema.parse(normalizeServicePayload(data));

    const imageValue =
      parsedService.image instanceof File
        ? parsedService.image.name
        : parsedService.image ?? null;

    const createdService = await prisma.services.create({
      data: {
        title: parsedService.title,
        shortDescription: parsedService.shortDescription,
        description: parsedService.description,
        image: imageValue,
        status: parsedService.status,
        categoryId: parsedService.categoryId,
        serviceBenefits: {
          create: {
            title: parsedService.serviceBenefits.title,
            description: parsedService.serviceBenefits.description,
            items: parsedService.serviceBenefits.items,
          },
        },
        capabilities: {
          create: {
            title: parsedService.capabilities.title,
            description: parsedService.capabilities.description || "",
            items: parsedService.capabilities.items,
          },
        },
        deliveryProcess: {
          create: {
            title: parsedService.deliveryProcess.title,
            description: parsedService.deliveryProcess.description || "",
            items: parsedService.deliveryProcess.items,
          },
        },
        outcomeFocuses: {
          create: {
            title: parsedService.outcomeFocuses.title,
            description: parsedService.outcomeFocuses.description || "",
            items: parsedService.outcomeFocuses.items,
          },
        },
        contactSection: {
          create: {
            title: parsedService.contactSection.title,
            description: parsedService.contactSection.description || "",
          },
        }
      },
      include: {
        category: true,
        serviceBenefits: true,
        capabilities: true,
        deliveryProcess: true,
        outcomeFocuses: true,
        contactSection: true,
      },
    });

    try {
      const settings = await prisma.siteSettings.findFirst({
        orderBy: { createdAt: "desc" },
      });

      let recipients = await getNewsletter({ status: Status.ACTIVE });

      await sendNewServiceAnnouncement({
        settings,
        service: createdService as ServiceAnnouncementPayload,
        recipients,
      });
    } catch (error) {
      console.error("Service announcement email failed", error);
    }

    return {
      success: true,
      message: "Service created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}


export async function updateService(
  id: string,
  data: z.infer<typeof serviceSchema>,
): Promise<ActionResponse> {
  try {
    const service = serviceSchema.parse(normalizeServicePayload(data));

    const imageValue =
      service.image instanceof File
        ? service.image.name
        : service.image ?? undefined;

    await prisma.services.update({
      where: { id },
      data: {
        title: service.title,
        shortDescription: service.shortDescription,
        description: service.description,
        image: imageValue,
        status: service.status,
        categoryId: service.categoryId,
      },
    });

    await prisma.serviceBenefits.deleteMany({ where: { serviceId: id } });

    await prisma.serviceBenefits.create({
      data: {
        serviceId: id,
        title: service.serviceBenefits.title,
        description: service.serviceBenefits.description,
        items: service.serviceBenefits.items,
      },
    });

    await prisma.capabilities.deleteMany({ where: { serviceId: id } });

    await prisma.capabilities.create({
      data: {
        serviceId: id,
        title: service.capabilities.title,
        description: service.capabilities.description || "",
        items: service.capabilities.items,
      },
    });

    await prisma.deliveryProcess.deleteMany({ where: { serviceId: id } });

    await prisma.deliveryProcess.create({
      data: {
        serviceId: id,
        title: service.deliveryProcess.title,
        description: service.deliveryProcess.description || "",
        items: service.deliveryProcess.items,
      },
    });

    await prisma.outcomeFocus.deleteMany({ where: { serviceId: id } });

    await prisma.outcomeFocus.create({
      data: {
        serviceId: id,
        title: service.outcomeFocuses.title,
        description: service.outcomeFocuses.description || "",
        items: service.outcomeFocuses.items,
      },
    });

    await prisma.contactSection.deleteMany({ where: { serviceId: id } });

    await prisma.contactSection.create({
      data: {
        serviceId: id,
        title: service.contactSection.title,
        description: service.contactSection.description || "",
      },
    });

    return {
      success: true,
      message: "Service updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  try {
    await prisma.services.delete({
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

