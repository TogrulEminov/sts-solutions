"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  CreateFagInput,
  createFagSchema,
  UpdateFagInput,
  uptadeFagSchema,
} from "@/src/schema/fag.schema";
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
  page: number;
  query?: string;
  pageSize: number;
  locale: Locales;
};
type GetByIDProps = {
  id: string;
  locale: Locales;
};

// --- GET FAQ DATA (SİYAHI) ---
export async function getFagData({ page, pageSize, query, locale }: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.FaqWhereInput = {
    isDeleted: false,
    translations: {
      some: {
        locale: locale,
        ...(searchTerm && {
          // Sorğu yalnız başlıq (title) üzrə aparılır
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        }),
      },
    },
  };

  // ✅ PARALEL SORĞU: Data gətirmə və count eyni anda icra olunur.
  const [data, totalCount] = await Promise.all([
    db.faq.findMany({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan sütunlar seçilir
      select: {
        status: true,
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
    db.faq.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / customPageSize);
  return {
    message: "Success",
    data: totalCount < 1 ? [] : data,
    paginations: {
      page: customPage,
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
    success: true,
  };
}

// --- GET FAQ BY ID ---
export async function getFagById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.FaqWhereInput = byUuid
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

    const existingData = await db.faq.findFirst({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Ana modelin lazım olan identifikasiya sütunları əlavə edilir
      select: {
        id: true,
        documentId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        translations: {
          where: { locale },
          select: {
            id: true,
            title: true,
            description: true,
            slug: true,
            locale: true,
          },
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
    return { data: existingData, success: true, message: "Success" };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      message: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
      success: false,
    };
  }
}

// --- CREATE FAQ ---
export async function createFag(input: CreateFagInput): Promise<ActionResult> {
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
    const validateData = createFagSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, description, locale } = validateData.data;

    const customSlug = createSlug(title);
    // ✅ SELECT OPTIMIZATION: Təkrarlığı yoxlamaq üçün yalnız id-ni gətir
    const existingData = await db.faq.findFirst({
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
        error: "Data with this title and key already exists",
        code: "DUPLICATE",
      };
    }

    const newData = await db.faq.create({
      data: {
        translations: {
          create: {
            title: title,
            slug: customSlug,
            description: description ?? "",
            locale: locale,
          },
        },
      },
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan datanı geri qaytar
      select: {
        documentId: true,
        id: true,
        translations: {
          where: { locale },
          select: { title: true, slug: true, description: true },
        },
      },
    });
    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      data: newData,
      code: "SUCCESS",
      message: "Data created successfully",
    };
  } catch (error) {
    console.error("createFag error:", error);
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

// --- UPDATE FAQ ---
export async function uptadeFag(
  id: string,
  input: UpdateFagInput
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
    // ✅ SELECT OPTIMIZATION: Include əvəzinə minimal select istifadə edilir
    const existingData = await db.faq.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      select: {
        documentId: true,
        translations: {
          where: { locale: input.locale },
          select: { slug: true },
        },
      },
    });

    if (!existingData) {
      return { success: false, code: "NOT_FOUND", error: "Data not found" };
    }

    const parsedInput = uptadeFagSchema.safeParse(input);
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

    // Slug məntiqi: Əgər yeni başlıq varsa, yeni slug yaranır, əks halda köhnə slug saxlanılır.
    const existingSlug = existingData.translations?.[0]?.slug;
    const finalSlug = customSlug || existingSlug;

    // ✅ TRANSACTION WITH TIMEOUT: Tranzaksiya icra vaxtı nəzarət altında saxlanılır
    const uptadeData = await db.$transaction(
      async (prisma) => {
        const updatedData = await prisma.faq.update({
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
                  slug: finalSlug,
                },
                update: {
                  title,
                  description,
                  slug: finalSlug,
                },
              },
            },
          },
          // ✅ SELECT OPTIMIZATION: Yalnız update olunan datanı geri qaytar
          select: {
            documentId: true,
            id: true,
            translations: {
              where: { locale: locale },
              select: {
                title: true,
                description: true,
                slug: true,
                locale: true,
              },
            },
          },
        });

        return updatedData;
      },
      {
        timeout: 10000, // 10 saniyə timeout əlavə edildi
      }
    );

    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      data: uptadeData,
      code: "SUCCESS",
      message: "Update is successfully",
    };
  } catch (error) {
    console.error("uptadeFag error:", error);
    const errorMessage = (error as Error).message;

    // ✅ PRISMA/TRANSACTION TIMEOUT ERROR HANDLING
    if (errorMessage.includes("Timed out")) {
      return {
        success: false,
        error:
          "Tranzaksiya icra vaxtı aşıldı. Zəhmət olmasa yenidən cəhd edin.",
        code: "TRANSACTION_TIMEOUT",
      };
    }

    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}
