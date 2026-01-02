"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
};

export const fetchHome = async ({ locale }: GetProps) => {
  const validatedLocale = validateLocale(locale);

  const [
    sliderData,
    aboutData,
    servicesData,
    solutionsData,
    partnersData,
    projectsData,
    blogsData,
    fagData,
    servicesMainData,
    sections,
  ] = await Promise.all([
    db.slider.findMany({
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
      take: 6,
    }),
    db.aboutHome.findFirst({
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
    db.solutions.findMany({
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
            documentId: true,
            slug: true,
          },
        },
      },
      take: 9,
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
    db.servicesCategory.findMany({
      where: {
        isDeleted: false,
        isMain: true,
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
    // Section Contents
    db.sectionContent.findMany({
      where: {
        isDeleted: false,
        key: {
          in: [
            "servicesMain",
            "servicesSub",
            "partners",
            "consulting",
            "blog",
            "fag",
            "solutions",
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
            highlightWord:true,
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
      sliderData,
      aboutData,
      servicesData,
      solutionsData,
      partnersData,
      projectsData,
      blogsData,
      fagData,
      servicesMainData,
    },
    sections: {
      servicesMainSection: sectionsMap.servicesMainSection,
      servicesSubSection: sectionsMap.servicesSubSection,
      blogSection: sectionsMap.blogSection,
      projectsSection: sectionsMap.projectsSection,
      partnersSection: sectionsMap.partnersSection,
      consultingSection: sectionsMap.consultingSection,
      solutionsSection: sectionsMap.solutionsSection,
      fagSection: sectionsMap.fagSection,
    },
  };
};
