"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import {
  CreateSliderInput,
  createSliderSchema,
  UpdateSliderInput,
  updateSliderSchema,
} from "@/src/schema/slider.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
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
  page: number;
  query: string;
  pageSize: number;
  locale: Locales;
};
type GetByIDProps = {
  id: string;
  locale: Locales;
};
export async function getSlider({ page, pageSize, query, locale }: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.SliderWhereInput = {
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
    db.slider.findMany({
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
            title: true,
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    }),
    db.slider.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(totalCount / customPageSize);
  return {
    success: true,
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
export async function getSliderById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.SliderWhereInput = byUuid
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

    const sliderItem = await db.slider.findFirst({
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

    if (!sliderItem) {
      return { message: "Slider not found", code: "NOT_FOUND", success: false };
    }
    return { data: sliderItem, success: true, message: "Success" };
  } catch (error) {
    console.error("getSliderById error:", error);
    const errorMessage = (error as Error).message;
    return {
      message: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
      success: false,
    };
  }
}
export async function createSlider(
  input: CreateSliderInput
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
    const validateData = createSliderSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, description, locale, imageId } = validateData.data;
    const customSlug = createSlug(title);

    // Check if slug already exists for this locale
    const existingData = await db.slider.findFirst({
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

    const newData = await db.slider.create({
      data: {
        // ✅ FIX: imageId Number və ya null olmalıdır, "" yox.
        imageId: imageId ? Number(imageId) : null,
        translations: {
          create: {
            title: title,
            slug: customSlug,
            description: description || "",
            locale: locale,
          },
        },
      },
      include: {
        translations: { where: { locale } },
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
    console.error("createSlider error:", error);
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
export async function updateSlider( 
  id: string,
  input: UpdateSliderInput
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
    const existingSlider = await db.slider.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      include: {
        translations: true,
      },
    });
    if (!existingSlider) {
      return { success: false, code: "NOT_FOUND", error: "Slider not found" };
    }
    // `updateSliderSchema` istifadə edilib. Əgər bu ad dəyişdirilə bilirsə, dəyişdirilməlidir.
    const parsedInput = updateSliderSchema.safeParse(input);
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

    const updateDataResult = await db.$transaction(async (prisma) => {
      const updatedData = await prisma.slider.update({
        where: { documentId: id },
        data: {
          translations: {
            upsert: {
              where: {
                documentId_locale: { documentId: id, locale },
              },
              create: {
                title: title,
                description: description || "",
                locale,
                slug: customSlug,
              },
              update: {
                title,
                description: description || "",
                slug: customSlug,
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
      data: updateDataResult,
      code: "SUCCESS",
      message: "Slider updated successfully",
    };
  } catch (error) {
    console.error("updateSlider error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}
export async function updateSliderImage(
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
    const existingData = await db.slider.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { id: true },
    });
    if (!existingData) {
      return { error: "Slider not found", code: "NOT_FOUND", success: false };
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

    const updatedData = await db.slider.update({
      where: { documentId: id },
      data: {
        // ✅ imageId null ola bilər (şəkli silmək üçün)
        imageId: imageId ? Number(imageId) : null,
      },
    });

    await revalidateAll(CACHE_TAG_GROUPS.HOME);
    return {
      success: true,
      code: "SUCCESS",
      data: updatedData,
      message: "Image updated successfully",
    };
  } catch (error) {
    console.error("updateSliderImage error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
