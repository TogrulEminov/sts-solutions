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

export const fetchBlogs = async ({ locale, page, pageSize }: GetProps) => {
  const validatedLocale = validateLocale(locale);
  const customPageSize = Number(pageSize) || 12;
  const skip = 0;
  const take = Number(page) * customPageSize;

  const [categoriesData, blogData, totalCount, sections] = await Promise.all([
    db.categories.findFirst({
      where: {
        slug: "blog",
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
    db.blog.findMany({
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

    db.blog.count({
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

    // Section Contents
    db.sectionContent.findMany({
      where: {
        isDeleted: false,
        key: {
          in: ["blog"],
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
      blogData,
    },
    sections: {
      blogSection: sectionsMap.blogSection,
    },
    paginations: {
      page,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
};
