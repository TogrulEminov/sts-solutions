"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
};

export const fetchAbout = async ({ locale }: GetProps) => {
  const validatedLocale = validateLocale(locale);

  const [
    aboutData,
    servicesData,
    partnersData,
    projectsData,
    employeeData,
    fagData,
    strategicGoals,
    sections,
  ] = await Promise.all([
    db.about.findFirst({
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
    }),
    db.projects.findMany({
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
            slug: true,
            description: true,
            documentId: true,
          },
        },
      },
      take: 12,
    }),
    db.employee.findMany({
      where: {
        isDeleted: false,
        translations: {
          some: {
            locale: validatedLocale,
          },
        },
      },
      include: {
        position: {
          where: {
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
    db.faq.findMany({
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
          select: {
            title: true,
            description: true,
            documentId: true,
          },
        },
      },
      take: 12,
    }),
    db.strategicGoals.findMany({
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
        translations: true,
      },
      take: 2,
    }),
    // Section Contents
    db.sectionContent.findMany({
      where: {
        isDeleted: false,
        key: {
          in: [
            "servicesMain",
            "partners",
            "projects",
            "employee",
            "fag",
            "process",
          ],
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
      aboutData,
      servicesData,
      partnersData,
      projectsData,
      fagData,
      employeeData,
      strategicGoals,
    },
    sections: {
      servicesMainSection: sectionsMap.servicesMainSection,
      projectsSection: sectionsMap.projectsSection,
      partnersSection: sectionsMap.partnersSection,
      fagSection: sectionsMap.fagSection,
      processSection: sectionsMap.processSection,
      employeeSection: sectionsMap.employeeSection,
    },
  };
};
