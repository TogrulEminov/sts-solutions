"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
};

export const fetchServices = async ({ locale }: GetProps) => {
  const validatedLocale = validateLocale(locale);

  const [categoriesData, servicesData, partnersData, sections] =
    await Promise.all([
      db.categories.findFirst({
        where: {
          slug: "services",
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
          subCategory: true,
          imageUrl: {
            select: {
              id: true,
              publicUrl: true,
              fileKey: true,
            },
          },
          translations: true,
        },
        take: 12,
      }),
      db.partners.findMany({
        where: {
          isDeleted: false,
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
            select: {
              title: true,
            },
          },
        },
        take: 12,
      }),
      // Section Contents
      db.sectionContent.findMany({
        where: {
          isDeleted: false,
          key: {
            in: ["partners", "servicesCategoriesMain"],
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
      servicesData,
      partnersData,
    },
    sections: {
      servicesSection: sectionsMap.servicesCategoriesMainSection,
      partnersSection: sectionsMap.partnersSection,
    },
  };
};
