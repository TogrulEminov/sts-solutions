"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  CreateTestimonialsInput,
  createTestimonialsSchema,
  UpdateTestimonialsInput,
  uptadeTestimonialsSchema,
} from "@/src/schema/testimonials.schema";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import { revalidateAll } from "@/src/utils/revalidate";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { Prisma } from "@/src/generated/prisma/client";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  code: string;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

type GetProps = {
  page?: number;
  query?: string;
  pageSize?: number;
  locale: Locales;
};
type GetByIDProps = {
  id: string;
  locale: Locales;
};
export async function getTestimonials({
  page,
  pageSize,
  query,
  locale,
}: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.TestimonialsWhereInput = {
    isDeleted: false,
    translations: {
      some: {
        locale: locale,
        ...(searchTerm && {
          OR: [{ title: { contains: searchTerm, mode: "insensitive" } }],
        }),
      },
    },
  };
  const [data, totalCount] = await Promise.all([
    db.testimonials.findMany({
      where: whereClause,
      select: {
        status: true,
        documentId: true,
        id: true,
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        translations: {
          where: {
            locale: locale,
          },
          select: {
            slug: true,
            id: true,
            locale: true,
            description: true,
            title: true,
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    }),
    db.testimonials.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(totalCount / customPageSize);
  return {
    success: true,
    code: "SUCCESS",
    message: "Success",
    data: totalCount < 1 ? [] : data,
    paginations: {
      page: customPage,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
}

export async function getTestimonialsById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.TestimonialsWhereInput = byUuid
      ? {
          isDeleted: false,
          documentId: id,
        }
      : {
          isDeleted: false,
          translations: {
            some: { slug: id, locale },
          },
        };

    const existingData = await db.testimonials.findFirst({
      where: whereClause,
      include: {
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        translations: {
          where: { locale },
        },
      },
    });

    if (!existingData) {
      return { message: "Data not found", code: "NOT_FOUND", success: false };
    }
    return { data: existingData, success: true, code: "SUCCESS" };
  } catch (error) {
    console.error("getTestimonialsById error:", error);
    const errorMessage = (error as Error).message;
    return {
      message: `Internal Server Error - ${errorMessage}`,
      success: false,
      code: "SERVER_ERROR",
    };
  }
}

export async function createTestimonials(
  input: CreateTestimonialsInput
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
    const validateData = createTestimonialsSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, description, locale, imageId } = validateData.data;

    const customSlug = createSlug(title);

    const existingData = await db.testimonials.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: { locale: locale, slug: customSlug },
        },
      },
    });
    if (existingData) {
      return {
        success: false,
        error: "Data with this title and slug already exists",
        code: "DUPLICATE",
      };
    }

    const newData = await db.testimonials.create({
      data: {
        imageId: imageId ? Number(imageId) : null,
        translations: {
          create: {
            slug: customSlug,
            title: title,
            description: description ?? "",
            locale: locale,
          },
        },
      },
    });
    return {
      success: true,
      data: newData,
      code: "SUCCESS",
      message: "Data created successfully",
    };
  } catch (error) {
    console.error("createTestimonials error:", error);
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "Məlumatlar düzgün deyil",
        errors: formatZodErrors(error),
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

export async function updateTestimonials(
  id: string,
  input: UpdateTestimonialsInput
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
    const existingData = await db.testimonials.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      include: {
        translations: true,
      },
    });
    if (!existingData) {
      return { success: false, code: "NOT_FOUND", error: "Rəy tapılmadı" };
    }
    const parsedInput = uptadeTestimonialsSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        error: "Validation failed",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { title, description, locale } = parsedInput.data;

    const customSlug = createSlug(title);

    const updateData = await db.$transaction(async (prisma) => {
      const existingTranslation = existingData.translations.find(
        (t) => t.locale === locale
      );

      const updatedData = await prisma.testimonials.update({
        where: { documentId: id },
        data: {
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
                slug: customSlug || existingData?.translations?.[0]?.slug,
              },
              update: {
                title,
                description: description ?? "",
                slug: customSlug || existingTranslation?.slug,
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
    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      data: updateData,
      code: "SUCCESS",
      message: "Rəy uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateTestimonials error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}
export async function updateTestimonialsImage(
  id: string,
  input: ImgInput
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
    const existingData = await db.testimonials.findUnique({
      where: { documentId: id, isDeleted: false },
    });
    if (!existingData) {
      return { error: "Rəy tapılmadı", code: "NOT_FOUND", success: false };
    }
    const parsedInput = imgSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { imageId } = parsedInput.data;
    const updateData = await db.testimonials.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
      },
    });
    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      code: "SUCCESS",
      data: updateData,
      message: "Şəkil uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateTestimonialsImage error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
