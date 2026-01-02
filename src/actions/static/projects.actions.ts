import { db } from "@/src/lib/admin/prismaClient";

// ✅ Build zamanı "use cache" istifadə etməyin
export async function getProjectsStaticById() {
  try {
    const projects = await db.projects.findMany({
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
      take: 100, // ✅ Build üçün daha çox 
      orderBy: { createdAt: "desc" },
    });

    return { data: projects };
  } catch (error) {
    console.error("getProjectsStaticById error:", error);
    // ✅ Build zamanı boş array qaytarın, error yox
    return { data: [] };
  }
}