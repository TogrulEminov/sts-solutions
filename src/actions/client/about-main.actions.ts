"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import { generateUUID } from "@/src/lib/uuidHelper";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import {
  UpsertAboutMainInput,
  upsertAboutMainSchema,
} from "@/src/schema/about-main.schema";
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
  locale: Locales;
};

// 1. SELECT OPTIMIZATION (getAbout) - Ən təmiz qalır
export async function getMainAbout({ locale }: GetProps) {
  const existingItem = await db.about.findFirst({
    where: {
      translations: {
        some: {
          locale: locale,
        },
      },
    },
    include: {
      imageUrl: {
        select: {
          id: true,
          fileKey: true,
          originalName: true,
          mimeType: true,
          publicUrl: true,
          fileSize: true,
        },
      },
      translations: {
        where: {
          locale: locale,
        },
      },
    },
  });

  return {
    message: "Success",
    data: existingItem,
  };
}

export async function upsertMainAbout(
  input: UpsertAboutMainInput
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
    const validateData = upsertAboutMainSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }

    const {
      title,
      description,
      locale,
      sectors,
      subDescription,
      subTitle,
      experienceDescription,
      experienceYears,
      purpose,
      teamDescription,
      statistics,
    } = validateData.data;
    const custom_slug = createSlug(title);

    const result = await db.$transaction(
      async (prisma) => {
        // 1. Get or Create About record
        let mainRecord = await prisma.about.findFirst({
          where: { isDeleted: false },
          select: {
            id: true,
            documentId: true,
          },
        });

        if (!mainRecord) {
          const uuid = generateUUID();
          mainRecord = await prisma.about.create({
            data: {
              documentId: uuid,
              experienceYears, // ✅ İlk yaradılışda da əlavə et
            },
            select: {
              id: true,
              documentId: true,
            },
          });
        } else {
          // ✅ Mövcud record-u update et
          await prisma.about.update({
            where: { id: mainRecord.id },
            data: { experienceYears },
          });
        }

        // 2. Upsert translation
        const translation = await prisma.aboutTranslations.upsert({
          where: {
            documentId_locale: {
              documentId: mainRecord.documentId,
              locale: locale,
            },
          },
          update: {
            title,
            description: description || "",
            slug: custom_slug,
            subDescription,
            subTitle,
            experienceDescription,
            teamDescription,
            sectors: JSON.stringify(sectors),
            purpose: JSON.stringify(purpose),
            statistics: JSON.stringify(statistics),
          },
          create: {
            title,
            description: description || "",
            slug: custom_slug,
            subDescription,
            subTitle,
            experienceDescription,
            teamDescription,
            sectors: JSON.stringify(sectors),
            purpose: JSON.stringify(purpose),
            statistics: JSON.stringify(statistics),
            locale: locale,
            documentId: mainRecord.documentId, // ✅ ƏSAS: documentId əlaqəsi
          },
        });

        // 3. Return complete data
        return {
          ...mainRecord,
          translations: [translation],
        };
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
    await revalidateAll([CACHE_TAG_GROUPS.ABOUT]);
    return {
      success: true,
      data: result,
      code: "SUCCESS",
      message: "Məlumat uğurla yadda saxlandı",
    };
  } catch (error) {
    console.error("upsertAbout error:", error);

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

// 3. UPDATE ABOUT IMAGE - SELECT SORĞUSU SADƏLƏŞDİRİLDİ
export async function updateMainAboutImage(
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
    // Input Validasiyası - ən tez yoxlanılmalıdır
    const parsedInput = imgSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { imageId } = parsedInput.data;

    // ✅ OPTIMIZATION: Qeydin mövcudluğunu yoxlamaq üçün YALNIZ ID seçilir.
    // Köhnə imageId-yə ehtiyac yoxdur, çünki yeni imageId inputdan gəlir.
    const existingData = await db.about.findUnique({
      where: { documentId: id, isDeleted: false },
      select: {
        id: true, // Yalnız mövcudluğu yoxlamaq üçün
        imageId: true, // Əgər inputda imageId gəlməsə, köhnə dəyəri saxlamaq üçün istifadə edilə bilər
      },
    });

    if (!existingData) {
      return { error: "Data not found", code: "NOT_FOUND", success: false };
    }

    // Əgər imageId inputda yoxdursa, köhnə dəyəri saxla.
    const newImageId = imageId ? Number(imageId) : existingData.imageId;

    const updatedData = await db.about.update({
      where: { documentId: id },
      data: {
        imageId: newImageId,
      },
    });

    return {
      success: true,
      code: "SUCCESS",
      data: updatedData,
      message: "Şəkil uğurla yeniləndi",
    };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
