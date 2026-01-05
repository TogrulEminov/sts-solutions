"use server";
import { Locale } from "next-intl";
import { db } from "@/src/lib/admin/prismaClient";
import { getTranslatedSlug } from "../client/slug.actions";
import { CustomLocales } from "@/src/services/interface";

export async function getSlug(
  currentLocale: Locale,
  newLocale: Locale,
  slug: string,
  type: string
): Promise<string> {
  const validPagesRouting = {
    // blog
    blog: "blog",
    bloqi: "blog",
    blogi: "blog",

    // services
    services: "services",
    xidmetler: "services",
    uslugi: "services",
    // solutions
    hellerimiz: "solutions",
    solutions: "solutions",
    reseniya: "solutions",
    // projects
    layiheler: "projects",
    projects: "projects",
    projecti: "projects",
  } as const;

  type ValidPageRoutingKey = keyof typeof validPagesRouting;
  const normalizedType = validPagesRouting[type as ValidPageRoutingKey] || type;

  const response = await getTranslatedSlug({
    currentLocale: currentLocale,
    newLocale: newLocale,
    slug: slug,
    type: normalizedType,
  });

  if (!response.success || !response.translatedSlug) {
    return slug;
  }

  return response.translatedSlug;
}

type DynamicModelName =
  | "servicesSubCategory"
  | "servicesCategory"
  | "blog"
  | "projects"
  | "solutions";

export async function getDynamicItemsForLocale(
  modelName: DynamicModelName,
  locale: string
) {
  try {
    // ✅ Services üçün xüsusi məntiq
    if (modelName === "servicesSubCategory") {
      console.log(`🔍 Fetching services for locale: ${locale}`);
      const items = await db.servicesSubCategory.findMany({
        where: {
          isDeleted: false,
          status: "published",
          translations: { some: { locale: locale as CustomLocales } },
        },
        select: {
          createdAt: true,
          updatedAt: true,
          translations: {
            where: { locale: locale as CustomLocales },
            select: { slug: true },
          },
          servicesCategory: {
            // Burada kateqoriya slug-nı götürürük
            select: {
              translations: {
                where: { locale: locale as CustomLocales },
                select: { slug: true },
              },
            },
          },
        },
      });

      const result = items
        .map((item) => {
          const translation = item.translations[0];
          const categoryTranslation = item.servicesCategory?.translations?.[0];

          if (!translation) {
            return null;
          }

          if (!categoryTranslation) {
            return null;
          }

          return {
            slug: translation.slug,
            categorySlug: categoryTranslation.slug,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        })
        .filter(Boolean);

      return result;
    }
    if (modelName === "servicesCategory") {
      const items = await db.servicesCategory.findMany({
        where: {
          isDeleted: false,
          status: "published",
          translations: {
            some: {
              locale: locale as CustomLocales,
            },
          },
        },
        select: {
          createdAt: true,
          updatedAt: true,
          translations: {
            where: {
              locale: locale as CustomLocales,
            },
            select: {
              slug: true,
            },
          },
        },
      });
      const result = items
        .map((item) => {
          const translation = item.translations[0];

          if (!translation) {
            return null;
          }

          return {
            slug: translation.slug,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        })
        .filter(Boolean);
      return result;
    }

    // ✅ Digər modellər üçün
    const modelDelegate = db[modelName as keyof typeof db];
    if (!modelDelegate) {
      return [];
    }

    const items = await (modelDelegate as any).findMany({
      where: {
        isDeleted: false,
        status: "published",
        translations: {
          some: {
            locale: locale,
          },
        },
      },
      select: {
        createdAt: true,
        updatedAt: true,
        translations: {
          where: {
            locale: locale,
          },
          select: {
            slug: true,
          },
        },
      },
    });

    return items
      .map((item: any) => {
        const translation = item.translations[0];
        if (!translation) return null;
        return {
          slug: translation.slug,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.log("err", error);

    return [];
  }
}
