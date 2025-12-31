"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/client";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  CreatePartnersInput,
  createPartnersSchema,
  UpdatePartnersInput,
  uptadePartnersSchema,
} from "@/src/schema/partners.schema";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
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
  page?: number;
  query?: string;
  pageSize?: number;
  locale: Locales;
};
type GetByIDProps = {
  id: string;
  locale: Locales;
};

// --- GET PARTNERS (SİYAHI) ---

export async function getPartners({ page, pageSize, query, locale }: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.PartnersWhereInput = {
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

  // ✅ PERFORMACE: Paralel sorğu və minimal select
  const [data, totalCount] = await Promise.all([
    db.partners.findMany({
      where: whereClause,
      select: {
        status: true,
        documentId: true,
        url: true,
        id: true,
        // Yalnız lazım olan Image məlumatları seçilir
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
            title: true,
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    }),
    db.partners.count({ where: whereClause }),
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

// --- GET PARTNERS BY ID ---

export async function getPartnersById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.PartnersWhereInput = byUuid
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

    const existingData = await db.partners.findFirst({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Include əvəzinə minimal select istifadə edilir
      select: {
        id: true,
        documentId: true,
        url: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        imageUrl: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
        translations: {
          where: { locale },
          select: {
            id: true,
            title: true,
            slug: true,
            locale: true,
          },
        },
      },
    });

    if (!existingData) {
      return { success: false, message: "Data not found", code: "NOT_FOUND" };
    }
    return {
      data: existingData,
      success: true,
      message: "Success",
      code: "SUCCESS",
    };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
      message: "Server xətası baş verdi",
    };
  }
}

// --- CREATE PARTNERS ---

export async function createPartners(
  input: CreatePartnersInput
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
    const validateData = createPartnersSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, url, locale, imageId } = validateData.data;

    const customSlug = createSlug(title);

    // Dublikat yoxlanışı
    const existingData = await db.partners.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: { locale: locale, slug: customSlug },
        },
      },
      select: { id: true }, // Minimal select
    });
    if (existingData) {
      return {
        success: false,
        error: "Bu başlıqla (slug) məlumat artıq mövcuddur",
        code: "DUPLICATE",
      };
    }

    // ✅ DATA TEMİZLƏNMƏSİ: Boş stringlər null-a çevrilir
    const newData = await db.partners.create({
      data: {
        imageId:
          imageId && imageId.toString().length > 0 ? Number(imageId) : null,
        url: url && url.length > 0 ? url : null,
        translations: {
          create: {
            slug: customSlug,
            title: title,
            locale: locale,
          },
        },
      },
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan məlumatları geri qaytarır
      select: {
        documentId: true,
        id: true,
        url: true,
        translations: {
          where: { locale: locale },
          select: { title: true, slug: true },
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
    console.error("createPartners error:", error);
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

// --- UPDATE PARTNERS ---

export async function updatePartners( // ✅ Funksiya adı Düzəlişi
  id: string,
  input: UpdatePartnersInput
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
    // SELECT OPTIMIZATION: Yalnız yoxlama üçün
    const existingPartner = await db.partners.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      select: { documentId: true },
    });

    if (!existingPartner) {
      return { success: false, code: "NOT_FOUND", error: "Partner not found" };
    }

    const parsedInput = uptadePartnersSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { title, url, locale } = parsedInput.data;
    const customSlug = createSlug(title);

    // ✅ TRANSACTION istifadəsi və DATA TEMİZLƏNMƏSİ
    const updatedData = await db.$transaction(async (prisma) => {
      const result = await prisma.partners.update({
        where: { documentId: id },
        data: {
          url: url && url.length > 0 ? url : null, // Boş string əvəzinə null
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
        // SELECT OPTIMIZATION: Yalnız yenilənmiş datanı geri qaytarır
        select: {
          documentId: true,
          url: true,
          translations: {
            where: { locale: locale },
            select: { title: true, slug: true, locale: true },
          },
        },
      });

      return result;
    });

    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      data: updatedData,
      code: "SUCCESS",
      message: "Data updated successfully",
    };
  } catch (error) {
    console.error("updatePartners error:", error);
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

// --- UPDATE PARTNERS IMAGE ---

export async function updatePartnersImage( // ✅ Funksiya adı Düzəlişi
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
    // SELECT OPTIMIZATION: Sadəcə varlığı yoxlamaq üçün
    const existingData = await db.partners.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { documentId: true },
    });
    if (!existingData) {
      return { error: "Partner not found", code: "NOT_FOUND", success: false };
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

    const updatedData = await db.partners.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
      },
      // SELECT OPTIMIZATION: Yalnız yenilənmiş məlumatları qaytarır
      select: { documentId: true, imageId: true },
    });

    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      code: "SUCCESS",
      data: updatedData,
      message: "Image updated successfully",
    };
  } catch (error) {
    console.error("updatePartnersImage error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
