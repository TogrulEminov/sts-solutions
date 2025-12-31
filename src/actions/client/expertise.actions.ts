"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  CreateExpertiseInput,
  createExpertiseSchema,
  UpdateExpertiseInput,
  uptadeExpertiseSchema,
} from "@/src/schema/expertise.schema";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";

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

export async function getExpertiseData({
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

  const whereClause: Prisma.ExpertiseWhereInput = {
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

  // ✅ SELECT OPTIMIZATION VƏ PARALLEL SORĞU
  const [data, totalCount] = await Promise.all([
    db.expertise.findMany({
      where: whereClause,
      select: {
        status: true,
        documentId: true,
        id: true,
        createdAt: true,
        isActive: true,
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
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    }),
    db.expertise.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / customPageSize);

  return {
    message: "Success",
    data: totalCount < 1 ? [] : data,
    success: true,
    paginations: {
      page: customPage,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
}

export async function getExpertiseById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.ExpertiseWhereInput = byUuid
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

    const existingData = await db.expertise.findFirst({
      where: whereClause,
      select: {
        documentId: true,
        id: true,
        status: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
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
    return {
      data: existingData,
      success: true,
      message: "Success",
      code: "SUCCESS",
    };
  } catch (error) {
    console.error("getPositionById error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}

// --- CREATE POSITION ---

export async function createExpertise(
  input: CreateExpertiseInput
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
    const validateData = createExpertiseSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, locale, isActive } = validateData.data;
    const customSlug = createSlug(title);

    // Dublikat yoxlanışı (eyni dildə eyni slug-ın olmaması)
    const existingData = await db.expertise.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: { locale: locale, slug: customSlug },
        },
      },
      select: { id: true },
    });
    if (existingData) {
      return {
        success: false,
        error: "Bu başlıqla (slug) məlumat artıq mövcuddur",
        code: "DUPLICATE",
      };
    }

    const newData = await db.expertise.create({
      data: {
        isActive: isActive,
        translations: {
          create: {
            title: title,
            slug: customSlug,
            locale: locale,
          },
        },
      },
      // ✅ SELECT OPTIMIZATION
      select: {
        documentId: true,
        id: true,
        createdAt: true,
        status: true,
        isActive: true,
        isDeleted: true,
        translations: {
          where: { locale: locale },
          select: { title: true, slug: true, locale: true },
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
    console.error("createPosition error:", error);
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

// --- UPDATE POSITION ---

export async function updateExpertise( // ✅ Funksiya adı DÜZƏLİŞİ
  id: string,
  input: UpdateExpertiseInput
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
    const existingData = await db.expertise.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      select: {
        documentId: true,
        status: true, // Status update-i üçün lazım ola bilər
      },
    });

    if (!existingData) {
      return { success: false, code: "NOT_FOUND", error: "Data not found" };
    }

    const parsedInput = uptadeExpertiseSchema.safeParse(input); // ✅ Schema adı DÜZƏLİŞİ
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        errors: formatZodErrors(parsedInput.error),
      };
    }

    const { title, locale, isActive } = parsedInput.data;
    const customSlug = createSlug(title);

    // ✅ TRANSACTION istifadəsi
    const updatedData = await db.$transaction(async (prisma) => {
      const result = await prisma.expertise.update({
        where: { documentId: id },
        data: {
          isActive,
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
                locale,
                slug: customSlug,
              },
              update: {
                title,
                slug: customSlug,
              },
            },
          },
        },
      });

      return result;
    });

    return {
      success: true,
      data: updatedData,
      code: "SUCCESS",
      message: "Data updated successfully",
    };
  } catch (error) {
    console.error("updatePosition error:", error);
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "Məlumatlar düzgün deyil",
        errors: formatZodErrors(error),
        code: "VALIDATION_ERROR",
      };
    }
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}
