"use server";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";
import { cacheLife, cacheTag } from "next/cache";

type GetProps = {
  locale: Locales;
};

export const fetchContact = async ({ locale }: GetProps) => {
  "use cache";
  cacheTag(CACHE_TAG_GROUPS.CONTACT);
  cacheLife("minutes");
  const validatedLocale = validateLocale(locale);

  const [categoriesData, contactData, servicesData, socialsData, sections] =
    await Promise.all([
      db.categories.findFirst({
        where: {
          slug: "contact",
          translations: {
            some: {
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
          translations: {
            where: {
              locale: validatedLocale,
            },
          },
        },
      }),
      db.contactInformation.findFirst({
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
      }),
      db.servicesCategory.findMany({
        where: {
          isDeleted: false,
          translations: { some: { locale: validatedLocale } },
        },
        include: {
          imageUrl: {
            select: {
              id: true,
              fileKey: true,
              publicUrl: true,
            },
          },
          translations: {
            where: {
              locale: validatedLocale,
            },
            select: {
              title: true,
              slug: true,
            },
          },
        },
      }),
      db.social.findMany({
        where: {
          status: "published",
        },
        orderBy: { createdAt: "asc" },
      }),
      // Section Contents
      db.sectionContent.findMany({
        where: {
          isDeleted: false,
          key: {
            in: ["servicesMain"],
          },
          translations: { some: { locale: validatedLocale } }, // ✅
        },
        select: {
          key: true,
          id: true,
          documentId: true,
          translations: {
            where: { locale: validatedLocale }, // ✅
            select: {
              id: true,
              title: true,
              slug: true,
              subTitle: true,
              description: true,
              highlightWord: true,
            },
          },
        },
      }),
    ]);

  // Sections organize
  const sectionsMap = sections.reduce((acc, section) => {
    acc[`${section?.key}Section`] = section;
    return acc;
  }, {} as Record<string, any>);

  return {
    data: {
      categoriesData,
      contactData,
      servicesData,
      socialsData,
    },
    sections: {
      servicesMainSection: sectionsMap.servicesMainSection,
    },
  };
};
