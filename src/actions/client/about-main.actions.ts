"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { formatZodErrors } from "../../utils/format-zod-errors";
import {
  ImgInput,
  imgSchema,
} from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import { generateUUID } from "@/src/lib/uuidHelper";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import {
  UpsertAboutMainInput,
  upsertAboutMainSchema,
} from "@/src/schema/about-main.schema";

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
export async function getAboutMain({ locale }: GetProps) {
  const existingItem = await db.about.findFirst({
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
        where: { locale },
      },
    },
  });

  return {
    message: "Success",
    data: existingItem,
  };
}

export async function upsertAboutMain(
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

    const { title, description, locale, advantages, statistics } =
      validateData.data;
    const custom_slug = createSlug(title);

    const result = await db.$transaction(
      async (prisma) => {
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
            },
          });
        }
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
          },
          create: {
            documentId: mainRecord.documentId,
            title,
            description: description || "",
            slug: custom_slug,
            advantages: JSON.stringify(advantages),
            statistics: JSON.stringify(statistics),
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
        maxWait: 5000,
        timeout: 10000, 
      }
    );

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
export async function updateAboutMainImage(
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
    const parsedInput = imgSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { imageId } = parsedInput.data;
    const existingData = await db.about.findUnique({
      where: { documentId: id, isDeleted: false },
      select: {
        id: true,
        imageId: true,
      },
    });

    if (!existingData) {
      return { error: "Data not found", code: "NOT_FOUND", success: false };
    }
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
