"use server";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";
import { cacheLife, cacheTag } from "next/cache";

type GetProps = {
  locale: Locales;
  slug: string;
};

export const fetchProjectsDetail = async ({ locale, slug }: GetProps) => {
  "use cache";
  cacheTag(CACHE_TAG_GROUPS.PROJECTS_DETAIL);
  cacheLife("minutes");
  const validatedLocale = validateLocale(locale);

  const [projectsDetailData, servicesData, sections] = await Promise.all([
    db.projects.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: {
            slug: slug,
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

    db.sectionContent.findMany({
      where: {
        isDeleted: false,
        key: {
          in: ["servicesCategoriesMain"],
        },
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

  const sectionsMap = sections?.reduce((acc, section) => {
    acc[`${section?.key}Section`] = section;
    return acc;
  }, {} as Record<string, any>);

  return {
    data: {
      projectsDetailData,
      servicesData,
    },
    sections: {
      servicesSection: sectionsMap.servicesCategoriesMainSection,
    },
  };
};
