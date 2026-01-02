import { db } from "@/src/lib/admin/prismaClient";

// ✅ Build zamanı "use cache" istifadə etməyin
export async function getBlogStaticById() {
  try {
    const blogs = await db.blog.findMany({
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
      take: 100, // ✅ Build üçün daha çox blog
      orderBy: { createdAt: "desc" },
    });

    return { data: blogs };
  } catch (error) {
    console.error("getBlogStaticById error:", error);
    // ✅ Build zamanı boş array qaytarın, error yox
    return { data: [] };
  }
}