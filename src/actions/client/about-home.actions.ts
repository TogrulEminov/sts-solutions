"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { formatZodErrors } from "../../utils/format-zod-errors";
import {
  GalleryInput,
  gallerySchema,
  ImgInput,
  imgSchema,
} from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import { generateUUID } from "@/src/lib/uuidHelper";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import { revalidateAll } from "@/src/utils/revalidate";
import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import {
  UpsertHomeAboutInput,
  upsertHomeAboutSchema,
} from "@/src/schema/about-home.schema";

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
export async function getHomeAbout({ locale }: GetProps) {
  const existingItem = await db.aboutHome.findFirst({
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
      gallery: {
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
        where: { locale },
      },
    },
  });

  return {
    message: "Success",
    data: existingItem,
  };
}

// 2. UPSERT ABOUT - Transaction və Select Optimallaşdırılması qorunur
export async function upsertHomeAbout(
  input: UpsertHomeAboutInput
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
    // Validate input
    const validateData = upsertHomeAboutSchema.safeParse(input);
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
      advantages,
      statistics,
      chairmanMessage,
      chairmanName,
      chairmanRole,
      chairmanTitle,
    } = validateData.data;
    const custom_slug = createSlug(title);

    // ✅ TRANSACTION WITH TIMEOUT (5s/10s)
    const result = await db.$transaction(
      async (prisma) => {
        // 1. Get or Create About record (Select yalnız id və documentId)
        let mainRecord = await prisma.aboutHome.findFirst({
          where: { isDeleted: false },
          select: {
            id: true,
            documentId: true,
          },
        });

        if (!mainRecord) {
          const uuid = generateUUID();
          mainRecord = await prisma.aboutHome.create({
            data: {
              documentId: uuid,
            },
          });
        }
        // Yersiz update bloku əvvəlki versiyada silinib, çox yaxşı.

        // 2. Upsert translation
        const translation = await prisma.aboutHomeTranslations.upsert({
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
            advantages: JSON.stringify(advantages),
            statistics: JSON.stringify(statistics),
            chairmanMessage,
            chairmanName,
            chairmanRole,
            chairmanTitle,
          },
          create: {
            documentId: mainRecord.documentId,
            title,
            description: description || "",
            slug: custom_slug,
            advantages: JSON.stringify(advantages),
            statistics: JSON.stringify(statistics),
            chairmanMessage,
            chairmanName,
            chairmanRole,
            chairmanTitle,
            locale: locale,
          },
        });

        // 3. Return complete data
        return {
          ...mainRecord,
          translations: [translation],
        };
      },
      {
        maxWait: 5000, // 5 saniyə - queue-da gözləmə
        timeout: 10000, // 10 saniyə - icra müddəti
      }
    );

    return {
      success: true,
      data: result,
      code: "SUCCESS",
      message: "Məlumat uğurla yadda saxlandı",
    };
  } catch (error) {
    console.error("upsertAbout error:", error); // Error logging

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
export async function updateHomeAboutImage(
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
    const existingData = await db.aboutHome.findUnique({
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

    const updatedData = await db.aboutHome.update({
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

export async function uptadeHomeAboutGalleryImages( 
  id: string,
  input: GalleryInput
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
    const existingData = await db.aboutHome.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { id: true },
    });
    if (!existingData) {
      return { error: "Category not found", code: "NOT_FOUND", success: false };
    }
    const parsedInput = gallerySchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { galleryIds } = parsedInput.data;

    const updatedData = await db.aboutHome.update({
      where: { documentId: id },
      data: {
        gallery: {
          // ✅ SET istifadəsi bütün mövcud şəkilləri yeniləyir
          set: galleryIds?.map((id) => ({ id: Number(id) })) || [],
        },
      },
      select: { documentId: true, gallery: { select: { id: true } } },
    });

    return {
      success: true,
      code: "SUCCESS",
      data: updatedData,
      message: "Qalereya uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateServiceGalleryImages error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
