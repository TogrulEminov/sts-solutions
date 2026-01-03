"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
  slug: string;
};

export const fetchServicesSubCategory = async ({ locale, slug }: GetProps) => {
  const validatedLocale = validateLocale(locale);

  const [servicesDetailData, servicesData, contactData, sections] =
    await Promise.all([
      db.servicesSubCategory.findFirst({
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
          translations: true,
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
          translations: true,
        },
        take: 12,
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
          translations: true,
        },
      }),
      db.sectionContent.findMany({
        where: {
          isDeleted: false,
          key: {
            in: ["servicesCategoriesMain", "consulting"],
          },
          translations: {
            some: {
              locale: validatedLocale,
            },
          },
        },
        include: {
          translations: true,
        },
      }),
    ]);

  const sectionsMap = sections?.reduce((acc, section) => {
    acc[`${section?.key}Section`] = section;
    return acc;
  }, {} as Record<string, any>);

  return {
    data: {
      servicesDetailData,contactData,
      servicesData,
    },
    sections: {
      servicesSection: sectionsMap.servicesCategoriesMainSection,
      consultingSection: sectionsMap.consultingSection,
    },
  };
};
