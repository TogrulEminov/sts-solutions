"use server";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";
import { cacheLife, cacheTag } from "next/cache";

type GetProps = {
  locale: Locales;
  category?: string;
};

export const fetchServicesCategory = async ({ locale, category }: GetProps) => {
  "use cache";
  cacheTag(CACHE_TAG_GROUPS.SERVICE_CATEGORY);
  cacheLife("minutes");
  const validatedLocale = validateLocale(locale);

  const [servicesDetailData, servicesData, sectionData] = await Promise.all([
    db.servicesCategory.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: {
            slug: category,
            locale: validatedLocale,
          },
        },
      },
      include: {
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        gallery: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        subCategory: {
          where: {
            isDeleted: false,
            translations: {
              some: {
                locale: validatedLocale,
              },
            },
          },
          include: {
            translations: {
              where: {
                locale: validatedLocale,
              },
            },
          },
        },
        translations: {
          where: {
            locale: validatedLocale,
          },
          include: {
            seo: true,
          },
        },
      },
    }),
    db.servicesCategory.findMany({
      where: {
        isDeleted: false,
        translations: {
          some: {
            locale: validatedLocale,
          },
        },
      },
      include: {
        gallery: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        subCategory: {
          where: {
            isDeleted: false,
            translations: {
              some: {
                locale: validatedLocale,
              },
            },
          },
          include: {
            translations: {
              where: {
                locale: validatedLocale,
              },
            },
          },
        },
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        translations: {
          where: {
            locale: validatedLocale,
          },
        },
      },
      take: 12,
    }),
    db.sectionContent.findFirst({
      where: {
        isDeleted: false,
        key: "servicesMain",
        translations: {
          some: {
            locale: validatedLocale,
          },
        },
      },
      include: {
        translations: {
          where: {
            locale: validatedLocale,
          },
        },
      },
    }),
  ]);

  return {
    data: {
      servicesDetailData,
      servicesData,
    },
    sections: {
      servicesCta: sectionData,
    },
  };
};
