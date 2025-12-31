"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { generateUUID } from "@/src/lib/uuidHelper";
import {
  UpsertContactInput,
  upsertContactSchema,
} from "@/src/schema/contact.schema"
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
  locale: Locales;
};

// --- GET CONTACT (OXUMA) ---
export async function getContact({ locale }: GetProps) {
  // ✅ SELECT OPTIMIZATION: Include əvəzinə Select istifadə edilir
  const existingItem = await db.contactInformation.findFirst({
    select: {
      id: true,
      documentId: true,
      phone: true,
      email: true,
      phoneSecond: true,
      adressLink: true,
      whatsapp: true,
      latitude: true,
      longitude: true,
      createdAt: true,
      updatedAt: true,
      translations: {
        where: { locale },
        select: {
          id: true,
          title: true,
          description: true,
          adress: true,
      about:true,
          workHours: true,
          tag: true,
          support: true,
          locale: true,
        },
      },
    },
  });

  return {
    message: "Success",
    data: existingItem,
    success: true,
  };
}

// --- UPSERT CONTACT (YAZMA/YENİLƏMƏ) ---
export async function upsertContact(
  input: UpsertContactInput
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
    const validateData = upsertContactSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }

    const {
      phone,
      phoneSecond,
      email,
      whatsapp,
      adressLink,
      adress,
      workHours,
      tag,
      support,
      locale,
      title,
      description,
      longitude,
      latitude,
      about,hightlightWord
    } = validateData.data;

    // ✅ TRANSACTION WITH TIMEOUT: Ardıcıl yazma əməliyyatlarını qorumaq üçün
    const result = await db.$transaction(
      async (prisma) => {
        // 1. Get or Create contact record
        // ✅ SELECT OPTIMIZATION: Yalnız id və documentId-ni gətir
        let mainRecord = await prisma.contactInformation.findFirst({
          where: { isDeleted: false },
          select: { id: true, documentId: true },
        });

        if (!mainRecord) {
          const uuid = generateUUID();
          mainRecord = await prisma.contactInformation.create({
            data: {
              documentId: uuid,
              phone,
              email,
              phoneSecond: phoneSecond || null,
              adressLink,
              whatsapp,
              latitude: latitude || null,
              longitude: longitude || null,
            },
            // ✅ SELECT OPTIMIZATION: Geri qayıtma üçün lazım olan əsas sütunlar
            select: {
              id: true,
              documentId: true,
              phone: true,
              email: true,
              phoneSecond: true,
              adressLink: true,
              whatsapp: true,
              latitude: true,
              longitude: true,
            },
          });
        } else {
          // Update main record
          mainRecord = await prisma.contactInformation.update({
            where: { id: mainRecord.id },
            data: {
              phone,
              email,
              phoneSecond: phoneSecond || null,
              adressLink,
              whatsapp,
              latitude: latitude || null,
              longitude: longitude || null,
            },
            // ✅ SELECT OPTIMIZATION: Geri qayıtma üçün lazım olan əsas sütunlar
            select: {
              id: true,
              documentId: true,
              phone: true,
              email: true,
              phoneSecond: true,
              adressLink: true,
              whatsapp: true,
              latitude: true,
              longitude: true,
            },
          });
        }

        // 2. Check and Upsert translation
        // Translation üçün xüsusi 'upsert' metodu istifadə edilə bilər, lakin mövcud 'findUnique' və 'update/create' məntiqi saxlanılır
        // ✅ SELECT OPTIMIZATION: Yalnız mövcudluğu yoxlamaq üçün minimal select
        const existingTranslation =
          await prisma.contactInformationTranslation.findUnique({
            where: {
              documentId_locale: {
                documentId: mainRecord.documentId,
                locale: locale,
              },
            },
            select: { id: true },
          });

        let translation;
        const translationData = {
          workHours: workHours || "",
          tag: tag || "",
          support: support || "",
          adress,
          title,
          description,
          about,hightlightWord
        };

        // Translation UPDATE
        if (existingTranslation) {
          translation = await prisma.contactInformationTranslation.update({
            where: { id: existingTranslation.id }, // ID ilə update daha sürətli ola bilər
            data: translationData,
            select: {
              id: true,
              title: true,
              description: true,
              adress: true,
              workHours: true,
              about:true,
              tag: true,
              support: true,
              locale: true,
              documentId: true,
              hightlightWord:true,
            }, // ✅ SELECT OPTIMIZATION
          });
          // Translation CREATE
        } else {
          translation = await prisma.contactInformationTranslation.create({
            data: {
              ...translationData,
              documentId: mainRecord.documentId,
              locale: locale,
            },
            select: {
              id: true,
              title: true,
              description: true,
              about:true,
              adress: true,
              workHours: true,
              tag: true,
              support: true,hightlightWord:true,
              locale: true,
              documentId: true,
            }, // ✅ SELECT OPTIMIZATION
          });
        }

        // 3. Return complete data
        return {
          ...mainRecord,
          translations: [translation],
        };
      },
      {
        timeout: 10000, // 10 saniyə timeout əlavə edildi
      }
    );


    return {
      success: true,
      data: result,
      code: "SUCCESS",
      message: "Məlumat uğurla yadda saxlandı",
    };
  } catch (error) {
    console.error("Contact upsert error:", error);

    // ✅ PRISMA/TRANSACTION TIMEOUT ERROR HANDLING
    if (error instanceof Error && error.message.includes("Timed out")) {
      return {
        success: false,
        error:
          "Tranzaksiya icra vaxtı aşıldı. Zəhmət olmasa yenidən cəhd edin.",
        code: "TRANSACTION_TIMEOUT",
      };
    }

    if (error instanceof ZodError) {
      // Zod Error Handling
      return {
        success: false,
        error: "Məlumatlar düzgün deyil",
        errors: formatZodErrors(error),
        code: "VALIDATION_ERROR",
      };
    }

    // General Server Error Handling
    return {
      success: false,
      code: "SERVER_ERROR",
      error:
        error instanceof Error
          ? error.message
          : "Məlumat yadda saxlanarkən xəta baş verdi",
    };
  }
}
