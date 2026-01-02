import { db } from "@/src/lib/admin/prismaClient";

export async function getServicesStaticById() {
  try {
    const services = await db.servicesCategory.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        subCategory: {
          select: {
            translations: {
              select: {
                slug: true,
                locale: true,
              },
            },
          },
        },
        translations: {
          select: {
            slug: true,
            locale: true,
          },
        },
      },
      take: 100, 
      orderBy: { createdAt: "desc" },
    });

    return { data: services };
  } catch (error) {
    console.error("getServicesStaticById error:", error);
    return { data: [] };
  }
}
