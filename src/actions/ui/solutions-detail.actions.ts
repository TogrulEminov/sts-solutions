"use server";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { validateLocale } from "@/src/helper/validateLocale";
import { db } from "@/src/lib/admin/prismaClient";
import { cacheLife, cacheTag } from "next/cache";

type GetProps = {
  locale: Locales;
  slug: string;
};

export const fetchSolutionsDetail = async ({ locale, slug }: GetProps) => {
  "use cache";
  cacheTag(CACHE_TAG_GROUPS.SOLUTIONS_DETAIL);
  cacheLife("minutes");
  const validatedLocale = validateLocale(locale);

  const [solutionsDetailData, relatedData] = await Promise.all([
    db.solutions.findFirst({
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
        translations: {
          where: {
            locale: validatedLocale,
          },
          include: {
            seo: true,
          },
        },
      },
    }),
    db.solutions.findMany({
      where: {
        translations: {
          some: {
            NOT: { slug: slug },
            locale: locale,
          },
        },
      },
      include: {
        translations: {
          where: {
            locale: validatedLocale,
          },
        },
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
      solutionsDetailData,
      relatedData,
    },
  };
};
