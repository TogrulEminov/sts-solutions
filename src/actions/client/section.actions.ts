"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { isUuid } from "../../utils/checkSlug";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  CreateSectionContentInput,
  createSectionContentSchema,
  UpdateSectionContentInput,
  uptadeSectionContentSchema,
} from "@/src/schema/section.schema";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import { Role } from "@/src/generated/prisma/enums";
import { formatZodErrors } from "@/src/utils/format-zod-errors";
import { Prisma } from "@/src/generated/prisma/browser";
import { CustomLocales } from "@/src/services/interface";
import { revalidateAll } from "@/src/utils/revalidate";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  code: string;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

type GetProps = {
  page: number;
  query: string;
  pageSize: number;
  locale: CustomLocales;
};
type GetByIDProps = {
  id: string;
  locale: CustomLocales;
};

export async function getSectionContent({
  page,
  pageSize,
  query,
  locale,
}: GetProps) {
  const customPageSize = Number(pageSize) || Number(12);
  const skip = 0;
  const take = Number(page) * customPageSize;
  const searchTerm = query?.trim();
  const whereClause: Prisma.SectionContentWhereInput = {
    isDeleted: false,
    translations: {
      some: {
        locale: locale,
        ...(searchTerm && {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        }),
      },
    },
  };
  const [data, totalCount] = await Promise.all([
    db.sectionContent.findMany({
      where: whereClause,
      select: {
        status: true,
        key: true,
        documentId: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          where: {
            locale: locale,
          },
          select: {
            id: true,
            locale: true,
            slug: true,
            title: true,
            subTitle: true,
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    }),
    db.sectionContent.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(totalCount / customPageSize);
  return {
    message: "Success",
    data: totalCount < 1 ? [] : data,
    paginations: {
      page,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
}

export async function getSectionContentById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);

    const whereClause = byUuid
      ? {
          isDeleted: false,
          documentId: id,
        }
      : {
          isDeleted: false,
          key: id,
          translations: {
            some: { locale },
          },
        };

    const existingData = await db.sectionContent.findFirst({
      where: whereClause,
      include: {
        translations: {
          where: { locale },
        },
      },
    });

    if (!existingData) {
      return {
        message: "Data not found",
        code: "NOT_FOUND",
        success: false,
      };
    }
    return { data: existingData };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return { message: `Internal Server Error - ${errorMessage}` };
  }
}

export async function createSectionContent(
  input: CreateSectionContentInput
): Promise<ActionResult> {
  const { user, error } = await checkAuthServerAction([
    Role.ADMIN,
    Role.SUPER_ADMIN,
    Role.CONTENT_MANAGER,
  ]);

  if (error || !user) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      error: error || "Giriş edilməyib",
    };
  }
  try {
    const validateData = createSectionContentSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, description, locale, key, highlightWord } =
      validateData.data;

    const customSlug = createSlug(title);
    const existingData = await db.sectionContent.findFirst({
      where: {
        isDeleted: false,
        key,
        translations: {
          some: { locale: locale, slug: customSlug },
        },
      },
    });
    if (existingData) {
      return {
        success: false,
        error: "Data with this title and key already exists",
        code: "DUPLICATE",
      };
    }

    const newData = await db.sectionContent.create({
      data: {
        key,
        translations: {
          create: {
            title: title,
            slug: customSlug,
            description: description ?? "",
            locale: locale,
            highlightWord,
          },
        },
      },
    });

    await revalidateAll([
      CACHE_TAG_GROUPS.PROJECTS,
      CACHE_TAG_GROUPS.HOME,
      CACHE_TAG_GROUPS.BLOG,
      CACHE_TAG_GROUPS.SOLUTIONS,
      CACHE_TAG_GROUPS.SERVICE,
      CACHE_TAG_GROUPS.SERVICE_CATEGORY,
      CACHE_TAG_GROUPS.ABOUT,
    ]);
    return {
      success: true,
      data: newData,
      code: "SUCCESS",
      message: "Data created successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};

      error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(err.message);
      });

      return {
        success: false,
        error: "Məlumatlar düzgün deyil",
        errors: fieldErrors,
        code: "VALIDATION_ERROR",
      };
    }
    return {
      success: false,
      code: "SERVER_ERROR",
      error: "Məlumat yadda saxlanarkən xəta baş verdi",
    };
  }
}

export async function uptadeSectionContent(
  id: string,
  input: UpdateSectionContentInput
): Promise<ActionResult> {
  const { user, error } = await checkAuthServerAction([
    Role.ADMIN,
    Role.SUPER_ADMIN,
    Role.CONTENT_MANAGER,
  ]);

  if (error || !user) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      error: error || "Giriş edilməyib",
    };
  }
  try {
    const existingData = await db.sectionContent.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      include: {
        translations: true,
      },
    });
    if (!existingData) {
      return { success: false, code: "NOT_FOUND", error: "Data not found" };
    }
    const parsedInput = uptadeSectionContentSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        error: "Validation failed",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { title, description, key, locale, highlightWord } = parsedInput.data;
    const customSlug = createSlug(title);
    const uptadeData = await db.$transaction(async (prisma: any) => {
      const updatedData = await prisma.sectionContent.update({
        where: { documentId: id },
        data: {
          key,
          translations: {
            upsert: {
              where: {
                documentId_locale: {
                  documentId: id,
                  locale,
                },
              },
              create: {
                title: title,
                description: description ?? "",
                locale,
                slug: customSlug || existingData.translations?.[0]?.slug,
                highlightWord,
              },
              update: {
                title,
                description,
                slug: customSlug || existingData.translations?.[0]?.slug,
                highlightWord,
              },
            },
          },
        },
        include: {
          translations: { where: { locale: locale } },
        },
      });

      return updatedData;
    });
    await revalidateAll([
      CACHE_TAG_GROUPS.PROJECTS,
      CACHE_TAG_GROUPS.HOME,
      CACHE_TAG_GROUPS.BLOG,
      CACHE_TAG_GROUPS.SOLUTIONS,
      CACHE_TAG_GROUPS.SERVICE,
      CACHE_TAG_GROUPS.SERVICE_CATEGORY,
      CACHE_TAG_GROUPS.ABOUT,
    ]);
    return { success: true, data: uptadeData, code: "Success" };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}
