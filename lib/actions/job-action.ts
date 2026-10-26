"use server";

import { prisma } from "../db/prisma-helper";
import { formatError, omitTimestamps } from "../utils";
import { z } from "zod";
import { jobSchema } from "../validators";

type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getJobs() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });

    return jobs.map(omitTimestamps);
  } catch (error) {
    return [];
  }
}

export async function getJobById(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return {
        success: false,
        message: "Job not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(job),
      message: "Job fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createJob(
  data: z.infer<typeof jobSchema>,
): Promise<ActionResponse> {
  try {
    const career = jobSchema.parse(data);

    await prisma.job.create({
      data: {
        title: career.title,
        shortDescription: career.shortDescription,
        description: career.description,
        employmentType: career.employmentType,
        workMode: career.workMode,
        experience: career.experience,
        location: career.location,
        vacancies: career.vacancies,
        status: career.status,
      },
    });

    return {
      success: true,
      message: "Job created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}


export async function updateJob(
  data: z.infer<typeof jobSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const career = jobSchema.parse(data);


    await prisma.job.update({
      where: { id },
      data: {
        title: career.title,
        shortDescription: career.shortDescription,
        description: career.description,
        employmentType: career.employmentType,
        workMode: career.workMode,
        experience: career.experience,
        location: career.location,
        vacancies: career.vacancies,
        status: career.status,
      },
    });

    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteJob(id: string): Promise<ActionResponse> {
  try {
    await prisma.job.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
