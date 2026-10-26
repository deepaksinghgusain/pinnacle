"use server";

import { prisma } from "../db/prisma-helper";
import { userSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import bcrypt from "bcrypt";
import { User } from "../types";
import { z } from "zod";

type ActionResponse = {
  success: boolean;
  message: string;
};

function mapUser(u: any): User {
  return {
    id: u.id,
    name: u.name ?? "",            
    email: u.email ?? "",          
    image: u.image ?? null,
    status: u.status,
    password: u.password,
    createdAt: u.createdAt ? u.createdAt.toISOString() : "",
    updatedAt: u.updatedAt ? u.updatedAt.toISOString() : undefined,
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users.map(mapUser);
  } catch (error) {
    return [];
  }
}

export async function createUser(
  data: z.infer<typeof userSchema>
): Promise<ActionResponse> {
  try {
    const user = userSchema.parse(data);

    const imageValue =
      user.image instanceof File
        ? user.image.name
        : user.image ?? null;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        image: imageValue,
        password: hashedPassword,
        status: user.status,
      },
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: omitTimestamps(user), 
      message: "User fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateUser(
  data: z.infer<typeof userSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const user = userSchema.parse(data);

    const imageValue =
      user.image instanceof File
        ? user.image.name
        : user.image ?? null;

    const updateData: any = {
      name: user.name,
      email: user.email,
      image: imageValue,
      status: user.status,
    };

    if (user.password) {
      updateData.password = await bcrypt.hash(user.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteUser(id: string): Promise<ActionResponse> {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
