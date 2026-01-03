"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
  pageSize: number;
  sort?: string;
  page: number;
};

export const fetchProjects = async ({ locale, page, pageSize }: GetProps) => {
  const validatedLocale = validateLocale(locale);
  const customPageSize = Number(pageSize) || 12;
  const skip = 0;
  const take = Number(page) * customPageSize;

  const [categoriesData, projectsData, totalCount, partnersData, sections] =
    await Promise.all([
      db.categories.findFirst({
        where: {
          slug: "projects",
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
          translations: true,
        },
        orderBy: { createdAt: "desc" },
        skip: skip,
        take: take,
      }),
      db.projects.count({
        where: {
          isDeleted: false,
          translations: {
            some: {
              locale: validatedLocale,
            },
          },
        },

        orderBy: { createdAt: "desc" },
        skip: skip,
        take: take,
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
            in: ["partners", "projects"],
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

  const totalPages = Math.ceil(totalCount / customPageSize);
  return {
    data: {
      categoriesData,
      projectsData,
      partnersData,
    },
    sections: {
      projectsSection: sectionsMap.projectsSection,
      partnersSection: sectionsMap.partnersSection,
    },
    paginations: {
      page,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
};
