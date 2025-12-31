"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import {
  GalleryInput,
  gallerySchema,
  ImgInput,
  imgSchema,
} from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
import {
  CreateServiceInput,
  createServiceSchema,
  UpdateServiceInput,
  uptadeServiceSchema,
} from "@/src/schema/service.schema";

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
export async function getServices({ page, pageSize, query, locale }: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.ServicesWhereInput = {
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
  // ✅ PARALEL SORĞU: Data gətirmə və count eyni anda icra olunur.
  const [data, totalCount] = await Promise.all([
    db.services.findMany({
      where: whereClause,
      select: {
        id: true,
        status: true,
        documentId: true,
        expertiseId: true,
        gallery: {
          select: {
            id: true,
            publicUrl: true,
            fileKey: true,
          },
        },
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
    db.services.count({ where: whereClause }),
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
export async function getServicesById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.ServicesWhereInput = byUuid
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

    const category = await db.services.findFirst({
      where: whereClause,
      select: {
        id: true,
        documentId: true,
        status: true,
        createdAt: true,
        expertiseId: true,
        expertise: {
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
            steps: true,
            offerings: true,
            ourStrengths: true,
            description: true,
            slug: true,
            locale: true,
            highlight: true,
            seo: {
              select: {
                metaDescription: true,
                metaKeywords: true,
                metaTitle: true,
                imageUrl: {
                  select: {
                    id: true,
                    publicUrl: true,
                    fileKey: true,
                  },
                },
              },
            },
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
export async function createServices(
  input: CreateServiceInput
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
    const validateData = createServiceSchema.safeParse(input);
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
      expertiseId,
      highlight,
      offerings,
      ourStrengths,
      steps,
      galleryIds,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = validateData.data;

    const customSlug = createSlug(title);
    // ✅ SELECT OPTIMIZATION: Təkrarlığı yoxlamaq üçün yalnız id-ni gətir
    const existingData = await db.services.findFirst({
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

    const newData = await db.services.create({
      data: {
        expertiseId: expertiseId ? String(expertiseId) : null,
        gallery: {
          connect: galleryIds?.map((id) => ({ id: Number(id) })),
        },
        imageId: imageId ? Number(imageId) : null,
        translations: {
          create: {
            title: title,
            description: description ?? "",
            locale: locale,
            slug: customSlug,
            ourStrengths: JSON.stringify(ourStrengths),
            steps: JSON.stringify(steps),
            offerings: JSON.stringify(offerings),
            highlight: highlight,
            seo: {
              create: {
                metaTitle: metaTitle || "",
                metaDescription: metaDescription || "",
                metaKeywords: metaKeywords || "",
                imageId: imageId ? Number(imageId) : null,
                locale: locale,
              },
            },
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
export async function uptadeServices(
  id: string,
  input: UpdateServiceInput
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
    const existingCategory = await db.services.findUnique({
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
    const parsedInput = uptadeServiceSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        error: "Validation failed",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const {
      title,
      description,
      locale,
      highlight,
      expertiseId,
      offerings,
      ourStrengths,
      steps,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = parsedInput.data;

    const customSlug = createSlug(title);

    const existingSlug = existingCategory.translations?.[0]?.slug;
    const finalSlug = customSlug || existingSlug;
    const uptadeData = await db.$transaction(
      async (prisma) => {
        const updatedData = await prisma.services.update({
          where: { documentId: id },
          data: {
            expertiseId: expertiseId ? String(expertiseId) : null,
            translations: {
              upsert: {
                where: {
                  documentId_locale: { documentId: id, locale },
                },
                create: {
                  title: title,
                  description: description ?? null,
                  locale,
                  slug: finalSlug,
                  offerings: JSON.stringify(offerings),
                  steps: JSON.stringify(steps),
                  ourStrengths: JSON.stringify(ourStrengths),
                  highlight: highlight,
                  seo: {
                    create: {
                      metaTitle: metaTitle ?? "",
                      metaDescription: metaDescription ?? "",
                      metaKeywords: metaKeywords ?? "",
                      locale,
                    },
                  },
                },
                update: {
                  title: title,
                  description: description ?? null,
                  locale,
                  slug: finalSlug,
                  offerings: JSON.stringify(offerings),
                  steps: JSON.stringify(steps),
                  ourStrengths: JSON.stringify(ourStrengths),
                  highlight: highlight,
                  seo: {
                    upsert: {
                      create: {
                        metaTitle: metaTitle ?? "",
                        metaDescription: metaDescription ?? "",
                        metaKeywords: metaKeywords ?? "",
                        locale,
                      },
                      update: { metaTitle, metaDescription, metaKeywords },
                    },
                  },
                },
              },
            },
          },
        });

        return updatedData;
      },
      {
        timeout: 10000,
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
export async function uptadeServicesImage(
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
    const existingData = await db.services.findUnique({
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

    const uptadeData = await db.services.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
        translations: {
          update: {
            where: {
              documentId_locale: {
                documentId: id,
                locale: "az",
              },
            },
            data: {
              seo: {
                update: {
                  imageId: Number(imageId),
                },
              },
            },
          },
        },
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
export async function uptadeServicesImages(
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
    const existingData = await db.services.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { id: true, documentId: true },
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
    const uptadeData = await db.services.update({
      where: { documentId: id },
      data: {
        gallery: {
          connect: galleryIds?.map((id) => ({ id: Number(id) })),
        },
      },
    });

    return {
      success: true,
      code: "SUCCESS",
      data: uptadeData,
      message: "Update is successfully",
    };
  } catch (error) {
    console.error("uptadeGalleryImages error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
