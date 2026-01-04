"use server";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";

type GetProps = {
  locale: Locales;
  slug: string;
};

export const fetchBlogDetail = async ({ locale, slug }: GetProps) => {
  const validatedLocale = validateLocale(locale);

  const [blogDetailData, relatedData] = await Promise.all([
    db.blog.findFirst({
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
        translations: {
          include: {
            seo: true,
          },
        },
      },
    }),
    db.blog.findMany({
      where: {
        translations: {
          some: {
            NOT: { slug: slug },
            locale: locale,
          },
        },
      },
      include: {
        translations: true,
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
      },
    }),
  ]);

  return {
    data: {
      blogDetailData,
      relatedData,
    },
  };
};
