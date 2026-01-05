import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { db } from "@/src/lib/admin/prismaClient";
import { cacheLife, cacheTag } from "next/cache";
type GetByIDProps = {
  id: string;
  locale: Locales;
};
export async function getServicesSubMetaById({ locale, id }: GetByIDProps) {
  "use cache";
  cacheTag(CACHE_TAG_GROUPS.SERVICE_CATEGORY_DETAIL);
  cacheLife("minutes");
  try {
    const category = await db.servicesSubCategory.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: {
            slug: id,
            locale: locale,
          },
        },
      },
      select: {
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        translations: {
          where: { locale, slug: id },

          select: {
            title: true,
            description: true,
            seo: {
              select: {
                imageUrl: {
                  select: {
                    id: true,
                    publicUrl: true,
                    fileKey: true,
                  },
                },
                metaDescription: true,
                metaKeywords: true,
                metaTitle: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      return { message: "Category not found", code: "NOT_FOUND" };
    }
    return { data: category };
  } catch (error) {
    console.error("getCategoriesById error:", error);
    const errorMessage = (error as Error).message;
    return { message: `Internal Server Error - ${errorMessage}` };
  }
}
