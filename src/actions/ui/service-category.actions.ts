"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
  category?: string;
};

export const fetchServicesCategory = async ({ locale, category }: GetProps) => {
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
            translations: true,
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
            translations: true,
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
        translations: true,
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
