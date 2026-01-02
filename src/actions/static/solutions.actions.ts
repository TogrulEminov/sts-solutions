import { db } from "@/src/lib/admin/prismaClient";

export async function getSolutionsStaticById() {
  try {
    const solutions = await db.solutions.findMany({
      where: {
        isDeleted: false,
      },
      select: {
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

    return { data: solutions };
  } catch (error) {
    console.error("getSolutionsStaticById error:", error);
    return { data: [] };
  }
}