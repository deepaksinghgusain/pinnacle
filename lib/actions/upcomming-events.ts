"use server";

import { prisma } from "../db/prisma-helper";
import { upcommingEventSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { UpcommingEvent } from "../types";
import { z } from "zod";

type ActionResponse = {
    success: boolean;
    message: string;
};

export async function getUpcommingFeatureEvent(): Promise<any> {
    try {
        const upcommingEvent = await prisma.upcommingEvents.findFirst({
            where: { status: "NEW" },
            orderBy: { createdAt: "desc" },
            include: { images: { orderBy: { sortOrder: "asc" } } },
        });

        return upcommingEvent;
    } catch {
        return null;
    }
}


export async function getUpcommingEvents(): Promise<any> {
    try {
        const upcommingEvents = await prisma.upcommingEvents.findMany({
            orderBy: { createdAt: "desc" },
            include: { images: { orderBy: { sortOrder: "asc" } } },
        });

        return upcommingEvents.map(({ images, ...event }) => ({
            ...event,
            images: images.map((image) => { return { id: image.id, url: image.url }; }),
        }));
    } catch {
        return [];
    }
}

export async function createUpcommingEvent(data: z.infer<typeof upcommingEventSchema>): Promise<ActionResponse> {
    try {
        const upcommingEvent = upcommingEventSchema.parse(data);

        console.log("Creating upcomming event:", upcommingEvent);

        await prisma.upcommingEvents.create({
            data: {
                title: upcommingEvent.title,
                description: upcommingEvent.description,
                category: upcommingEvent.category,
                eventDate: upcommingEvent.eventDate,
                startTime: upcommingEvent.startTime,
                endTime: upcommingEvent.endTime,
                location: upcommingEvent.location,
                showSaveTheDate: upcommingEvent.showSaveTheDate,
                saveTheDateText: upcommingEvent.saveTheDateText,
                status: upcommingEvent.status,
            },
        });

        return {
            success: true,
            message: "Upcoming event created successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function getUpcommingEventById(id: string) {
    try {
        const upcommingEvent = await prisma.upcommingEvents.findUnique({
            where: { id },
            include: { images: { orderBy: { sortOrder: "asc" } } },
        });

        if (!upcommingEvent) {
            return {
                success: false,
                message: "Upcoming event not found",
            };
        }

        return {
            success: true,
            data: {
                ...omitTimestamps(upcommingEvent),
                images: upcommingEvent.images.map((image) => {
                    return { id: image.id, url: image.url };
                }),
            },
            message: "Upcoming event fetched successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function updateUpcommingEvents(
    data: z.infer<typeof upcommingEventSchema>,
    id: string
): Promise<ActionResponse> {
    try {
        const upcommingEvent = upcommingEventSchema.parse(data);
        const updateData = {
            title: upcommingEvent.title,
            description: upcommingEvent.description,
            category: upcommingEvent.category,
            eventDate: upcommingEvent.eventDate,
            startTime: upcommingEvent.startTime,
            endTime: upcommingEvent.endTime,
            location: upcommingEvent.location,
            showSaveTheDate: upcommingEvent.showSaveTheDate,
            saveTheDateText: upcommingEvent.saveTheDateText,
            status: upcommingEvent.status,
        };

        await prisma.upcommingEvents.update({
            where: { id },
            data: {
                ...updateData,
            },
        });

        return {
            success: true,
            message: "Upcoming event updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}


export async function deleteUpcommingEvent(id: string): Promise<ActionResponse> {
    try {
        await prisma.upcommingEvents.delete({
            where: { id },
        });

        return {
            success: true,
            message: "Upcomming Event deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function deleteImagesUpcommingEvent(imageId: string, eventId: string ): Promise<ActionResponse> {
    try {
        await prisma.eventImage.delete({
            where: { id : imageId , eventId : eventId },
        });

        return {
            success: true,
            message: "Upcomming Event Image deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function addImagesUpcommingEvent(eventId: string, urls: string[]): Promise<ActionResponse & { images?: { id: string; url: string }[] }> {
    try {
        if (urls.length === 0) {
            return { success: false, message: "Please select at least one image or video" };
        }

        const event = await prisma.upcommingEvents.findUnique({
            where: { id: eventId },
            select: { imageUrl: true },
        });
        if (!event) throw new Error("Upcoming event not found");

        const lastImage = await prisma.eventImage.findFirst({
            where: { eventId },
            orderBy: { sortOrder: "desc" },
            select: { sortOrder: true },
        });
        const sortOrder = (lastImage?.sortOrder ?? -1) + 1;

        await prisma.eventImage.createMany({
            data: urls.map((url, index) => ({ eventId, url, sortOrder: sortOrder + index })),
        });

        if (!event.imageUrl) {
            await prisma.upcommingEvents.update({
                where: { id: eventId },
                data: { imageUrl: urls[0] },
            });
        }

        const images = await prisma.eventImage.findMany({
            where: { eventId },
            orderBy: { sortOrder: "asc" },
            select: { id: true, url: true },
        });

        return {
            success: true,
            message: "Media uploaded successfully",
            images,
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}
