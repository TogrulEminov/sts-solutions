"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import {
  CreateEmployeeInput,
  createEmployeeSchema,
  UpdateEmployeeInput,
  uptadeEmployeeSchema,
} from "@/src/schema/employee.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
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
  page: number;
  query?: string;
  pageSize: number;
  locale: Locales;
  emailRespone?: boolean;
};
type GetByIDProps = {
  id: string;
  locale: Locales;
};

// --- GET EMPLOYEE (SİYAHI) ---
export async function getEmployee({
  page,
  pageSize,
  query,
  locale,
  emailRespone,
}: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.EmployeeWhereInput = {
    isDeleted: false,
    ...(emailRespone !== undefined && { emailResponse: emailRespone }),
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
  // ✅ PARALEL SORĞU: Data gətirmə və count eyni anda icra olunur.
  const [data, totalCount] = await Promise.all([
    db.employee.findMany({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan sütunlar seçilir
      select: {
        status: true,
        documentId: true,
        email: true,
        position: true,
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
            id: true,
            slug: true,
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
    db.employee.count({ where: whereClause }),
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
  };
}

// --- GET EMPLOYEE BY ID ---
export async function getEmployeeById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    // Qeyd: Slug-a görə axtarış translations modelində olmalıdır, lakin cari modeldə slug main modeldə yoxdur.
    // Təqdim edilmiş kodda `slug: id` istifadə olunub, lakin bu adətən translation modelində olur.
    // Əgər slug translation modelindədirsə, bu axtarış məntiqi problem yarada bilər.
    // Təkmilləşdirilmiş versiyada, slug-a görə axtarış translation modeli üzərindən aparılır.
    const whereClause: Prisma.EmployeeWhereInput = byUuid
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

    const category = await db.employee.findFirst({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Include əvəzinə Select istifadə edilir
      select: {
        id: true,
        documentId: true,
        status: true,
        phone:true,
        email: true,
        orderNumber: true,
        createdAt: true,
        positionId: true,
        position: {
          where: {
            isDeleted: false,
            translations: {
              some: {
                locale: locale,
              },
            },
          },
          include: {
            translations: true,
          },
        },
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
            description: true,
            slug: true,
            locale: true,
          },
        },
      },
    });

    if (!category) {
      return {
        message: "Category not found",
        code: "NOT_FOUND",
        success: false,
      };
    }
    return { data: category, success: true };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      message: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
      success: false,
    };
  }
}

// --- CREATE EMPLOYEE ---
export async function createEmployee(
  input: CreateEmployeeInput
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
    const validateData = createEmployeeSchema.safeParse(input);
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
      imageId,
      orderNumber,
      positionId,
      email,
      phone,
    } = validateData.data;

    const customSlug = createSlug(title);
    // ✅ SELECT OPTIMIZATION: Təkrarlığı yoxlamaq üçün yalnız id-ni gətir
    const existingData = await db.employee.findFirst({
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
        error: "Data with this title and slug already exists",
        code: "DUPLICATE",
      };
    }

    const newData = await db.employee.create({
      data: {
        orderNumber: Number(orderNumber) || null,
        email: email ?? "",
        phone,
        positionId: positionId,
        imageId: imageId ? Number(imageId) : null,
        translations: {
          create: {
            title: title,
            description: description ?? "",
            locale: locale,
            slug: customSlug,
          },
        },
      },
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan datanı geri qaytar
      select: {
        documentId: true,
        id: true,
        email: true,
        translations: {
          where: { locale },
          select: { title: true, slug: true },
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
    console.error("createEmployee error:", error);
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

// --- UPDATE EMPLOYEE ---
export async function uptadeEmployee(
  id: string,
  input: UpdateEmployeeInput
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
    const existingCategory = await db.employee.findUnique({
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

    if (!existingCategory) {
      return { success: false, code: "NOT_FOUND", error: "Category not found" };
    }
    const parsedInput = uptadeEmployeeSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        error: "Validation failed",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { title, description, locale, orderNumber, positionId, email ,phone} =
      parsedInput.data;

    const customSlug = createSlug(title);

    // Qeyd: Əgər `title` dəyişibsə, yeni `customSlug` istifadə olunmalıdır.
    // Əgər dəyişməyibsə, köhnə slug-ın istifadəsi məqsədəuyğundur.
    const existingSlug = existingCategory.translations?.[0]?.slug;
    const finalSlug = customSlug || existingSlug;

    // ✅ TRANSACTION WITH TIMEOUT: Tranzaksiya icra vaxtı nəzarət altında saxlanılır
    const uptadeData = await db.$transaction(
      async (prisma) => {
        const updatedData = await prisma.employee.update({
          where: { documentId: id },
          data: {
            positionId: positionId,
            orderNumber: Number(orderNumber) || null,
            phone,
            email: email ?? "",
            translations: {
              upsert: {
                where: {
                  documentId_locale: { documentId: id, locale },
                },
                create: {
                  title: title,
                  description: description ?? "",
                  locale,
                  slug: finalSlug,
                },
                update: {
                  title: title,
                  description: description ?? "",
                  locale,
                  slug: finalSlug,
                },
              },
            },
          },
          // ✅ SELECT OPTIMIZATION: Yalnız update olunan datanı geri qaytar
          select: {
            documentId: true,
            id: true,
            email: true,
            translations: {
              where: { locale: locale },
              select: { title: true, slug: true, locale: true },
            },
          },
        });

        return updatedData;
      },
      {
        timeout: 10000, // 10 saniyə timeout əlavə edildi
      }
    );

    return {
      success: true,
      data: uptadeData,
      code: "Success",
      message: "Update is successfully",
    };
  } catch (error) {
    console.error("uptadeEmployee error:", error);
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

// --- UPDATE EMPLOYEE IMAGE ---
export async function uptadeEmployeeImage(
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
    const existingData = await db.employee.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { id: true, imageId: true },
    });
    if (!existingData) {
      return { error: "Category not found", code: "NOT_FOUND", success: false };
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

    const uptadeData = await db.employee.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
      },
      select: { documentId: true, imageId: true },
    });

    return {
      success: true,
      code: "SUCCESS",
      data: uptadeData,
      message: "Update is successfully",
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
