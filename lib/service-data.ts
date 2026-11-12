import { prisma } from "@/lib/db/prisma-helper";
import { Status } from "@/lib/generated/prisma";

export async function getServiceNavigation() {
  try {
    return await prisma.services.findMany({
      where: {
        status: Status.ACTIVE,
        category: { status: Status.ACTIVE },
      },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    });
  } catch (error) {
    console.error("Unable to load service navigation links.", error);
    return null;
  }
}
