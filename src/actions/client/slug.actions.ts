// app/actions/getTranslatedSlug.ts
"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { db } from "@/src/lib/admin/prismaClient";
import z from "zod";

const LocalesSchema = z.enum(["az", "en", "ru"]);
const ContentTypeSchema = z.enum([
  "blog",
  "projects",
  "solutions",
  "servicesCategory",
  "servicesSubCategory",
]);

type GetTranslatedSlugParams = {
  currentLocale: string;
  newLocale: string;
  slug: string;
  type: string;
  category?: string;
};

type GetTranslatedSlugResult = {
  success: boolean;
  translatedSlug?: string;
  translatedCategory?: string;
  message?: string;
  errors?: any;
};

export async function getTranslatedSlug(
  params: GetTranslatedSlugParams
): Promise<GetTranslatedSlugResult> {
  try {
    const { currentLocale, newLocale, slug, type, category } = params;

    // ✅ Validation
    const parsedCurrentLocale = LocalesSchema.safeParse(currentLocale);
    const parsedNewLocale = LocalesSchema.safeParse(newLocale);
    const parsedType = ContentTypeSchema.safeParse(type);

    if (
      !parsedCurrentLocale.success ||
      !parsedNewLocale.success ||
      !parsedType.success
    ) {
      return {
        success: false,
        message: "Incorrect parameters provided",
      };
    }

    const currentLang: Locales = parsedCurrentLocale.data;
    const newLang: Locales = parsedNewLocale.data;
    const contentType: z.infer<typeof ContentTypeSchema> = parsedType.data;

    let translatedSlug: string | undefined;
    let translatedCategory: string | undefined;

    switch (contentType) {
      case "blog":
        const blogItem = await db.blogTranslations.findFirst({
          where: {
            slug: slug,
            locale: currentLang,
            document: { isDeleted: false },
          },
          select: {
            document: {
              select: {
                translations: {
                  where: { locale: newLang },
                  select: { slug: true },
                  take: 1,
                },
              },
            },
          },
        });

        translatedSlug = blogItem?.document?.translations[0]?.slug;
        break;

      case "projects":
        const projectsItem = await db.projectsTranslations.findFirst({
          where: {
            slug: slug,
            locale: currentLang,
            document: { isDeleted: false },
          },
          select: {
            document: {
              select: {
                translations: {
                  where: { locale: newLang },
                  select: { slug: true },
                  take: 1,
                },
              },
            },
          },
        });

        translatedSlug = projectsItem?.document?.translations[0]?.slug;
        break;

      case "solutions":
        const solutionsItem = await db.solutionsTranslation.findFirst({
          where: {
            slug: slug,
            locale: currentLang,
            document: { isDeleted: false },
          },
          select: {
            document: {
              select: {
                translations: {
                  where: { locale: newLang },
                  select: { slug: true },
                  take: 1,
                },
              },
            },
          },
        });

        translatedSlug = solutionsItem?.document?.translations[0]?.slug;
        break;

      case "servicesCategory":
        const serviceItem = await db.servicesCategoryTranslations.findFirst({
          where: {
            slug: slug,
            locale: currentLang,
            document: { isDeleted: false },
          },
          select: {
            document: {
              select: {
                translations: {
                  where: { locale: newLang },
                  select: { slug: true },
                  take: 1,
                },
              },
            },
          },
        });

        translatedSlug = serviceItem?.document?.translations[0]?.slug;
        break;

      case "servicesSubCategory":
        // ✅ DÜZƏLİŞ: categories → servicesCategory
        const [serviceCatItem, categoryItem] = await Promise.all([
          // Service subcategory translation
          db.servicesSubCategoryTranslations.findFirst({
            where: {
              slug: slug,
              locale: currentLang,
              document: {
                isDeleted: false,
                ...(category && {
                  servicesCategory: {
                    translations: {
                      some: {
                        slug: category,
                        locale: currentLang,
                      },
                    },
                  },
                }),
              },
            },
            select: {
              document: {
                select: {
                  translations: {
                    where: { locale: newLang },
                    select: { slug: true },
                    take: 1,
                  },
                },
              },
            },
          }),

          // Category translation (parallel)
          category
            ? db.servicesCategoryTranslations.findFirst({
                where: {
                  slug: category,
                  locale: currentLang,
                  document: { isDeleted: false },
                },
                select: {
                  document: {
                    select: {
                      translations: {
                        where: { locale: newLang },
                        select: { slug: true },
                        take: 1,
                      },
                    },
                  },
                },
              })
            : null,
        ]);

        translatedSlug = serviceCatItem?.document?.translations[0]?.slug;
        translatedCategory = categoryItem?.document?.translations[0]?.slug;
        break;

      default:
        return {
          success: false,
          message: "Invalid content type provided.",
        };
    }

    return {
      success: true,
      translatedSlug: translatedSlug || slug,
      translatedCategory: translatedCategory || category,
    };
  } catch (error) {
    console.error("❌ Error fetching translated slug:", error);

    return {
      success: false,
      message: "Internal Server Error",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
