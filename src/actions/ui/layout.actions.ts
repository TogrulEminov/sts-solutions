import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
};

export const fetchLayout = async ({ locale }: GetProps) => {
  const validatedLocale = validateLocale(locale);
  const [socialData, contactData, servicesData, sections] = await Promise.all([
    db.social.findMany({
      where: {
        status: "published",
      },
      orderBy: { createdAt: "asc" },
    }),
    db.contactInformation.findFirst({
      where: {
        translations: {
          some: {
            locale: "az",
          },
        },
      },
      include: {
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
    db.sectionContent.findMany({
      where: {
        isDeleted: false,
        key: {
          in: ["contactCta"],
        },
        translations: { some: { locale: validatedLocale } },
      },
      select: {
        key: true,
        id: true,
        documentId: true,
        translations: {
          where: { locale: validatedLocale },
          select: {
            id: true,
            title: true,
            slug: true,
            subTitle: true,
            description: true,
          },
        },
      },
    }),
  ]);

  // Sections organize
  const sectionsMap = sections.reduce((acc, section) => {
    acc[`${section.key}Section`] = section;
    return acc;
  }, {} as Record<string, any>);
  return {
    data: {
      socialData,
      contactData,
      servicesData,
    },
    sections: {
      contactCta: sectionsMap?.contactCtaSection,
    },
  };
};
 