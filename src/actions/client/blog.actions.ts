"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import {
  CreateBlogInput,
  createBlogSchema,
  UpdateBlogInput,
  updateBlogSchema,
} from "@/src/schema/blog.schema";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import { calculateReadTime } from "@/src/utils/calcualateReadTime";
import { checkAuthServerAction } from "@/src/middleware/checkAuthorization";
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
  page?: number;
  query?: string;
  pageSize?: number;
  locale: Locales;
  sort?: string;
};

type GetByIDProps = {
  id: string;
  locale: Locales;
};

// --- GET BLOG (SİYAHI) ---
// Paralel sorğular və Select optimallaşdırılması artıq mövcuddur.
export async function getBlog({
  page,
  pageSize,
  query,
  locale,
  sort,
}: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  const whereClause: Prisma.BlogWhereInput = {
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

  // ✅ PARALEL SORĞU: Data gətirmə və count əməliyyatları eyni anda icra olunur.
  const [data, totalCount] = await Promise.all([
    db.blog.findMany({
      where: whereClause,
      // ✅ SELECT OPTIMIZATION: Yalnız lazım olan sütunlar seçilir
      select: {
        status: true,
        documentId: true,
        id: true,
        view: true,
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
          where: { locale: locale },
          select: {
            id: true,
            locale: true,
            slug: true,
            title: true,
            description: true,
            readTime: true,
            documentId: true,
          },
        },
      },
      orderBy: { createdAt: (sort as Prisma.SortOrder) ?? "desc" },
      skip: skip,
      take: take,
    }),
    db.blog.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / customPageSize);

  return {
    message: "Success",
    data: totalCount < 1 ? [] : data,
    paginations: {
      page: customPage, // page əvəzinə customPage istifadə edildi
      pageSize: customPageSize,
      totalPages: totalPages,
      dataCount: totalCount,
    },
  };
}

// --- GET BLOG BY ID ---
// IP tracking məntiqi optimize edilmədən saxlanılır (çünki artıq funksionallıqdır)
export async function getBlogById({ locale, id }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause = byUuid
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

    // ✅ SELECT OPTIMIZATION: Lazım olan bütün data seçilir
    const existingData = await db.blog.findFirst({
      where: whereClause,
      select: {
        id: true,
        documentId: true,
        status: true,
        view: true,
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
            readTime: true,
            locale: true,
            seo: {
              select: {
                metaTitle: true,
                metaDescription: true,
                metaKeywords: true,
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

    if (!existingData) {
      return {
        message: "Data not found",
        code: "NOT_FOUND",
        success: false,
      };
    }

    return { data: existingData, success: true };
  } catch (error) {
    const errorMessage = (error as Error).message;
    return {
      message: `Internal Server Error - ${errorMessage}`,
      success: false,
      code: "SERVER_ERROR",
    };
  }
}

// --- CREATE BLOG ---
export async function createBlog(
  input: CreateBlogInput
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
    const validateData = createBlogSchema.safeParse(input);
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
      metaTitle,
      metaDescription,
      locale,
      metaKeywords,
      imageId,
    } = validateData.data;

    const customSlug = createSlug(title);
    const readTime = calculateReadTime(description || "", locale);

    // Check if slug already exists for this locale
    // ✅ SELECT OPTIMIZATION: Yalnız mövcudluğu yoxlamaq üçün kiçik sorğu
    const existingData = await db.blog.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: { locale: locale, slug: customSlug },
        },
      },
      select: { id: true }, // Yalnız id-ni seç
    });

    if (existingData) {
      return {
        success: false,
        error: "Bu başlıq ilə məqalə artıq mövcuddur",
        code: "DUPLICATE",
      };
    }

    // ✅ Use transaction for proper SEO creation
    const newData = await db.$transaction(async (prisma) => {
      // 1. Create SEO first
      const seo = await prisma.seo.create({
        data: {
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || description || "",
          metaKeywords: metaKeywords || "",
          imageId: imageId ? Number(imageId) : null,
          locale: locale,
        },
        select: { id: true }, // ✅ SELECT OPTIMIZATION
      });

      // 2. Create Blog with translation connected to SEO
      const blog = await prisma.blog.create({
        data: {
          imageId: imageId ? Number(imageId) : null,
          translations: {
            create: {
              title: title,
              slug: customSlug,
              description: description || "",
              readTime: readTime,
              locale: locale,
              seoId: seo.id, // ✅ Connect to SEO
            },
          },
        },
        // ✅ Include daxilində də Select Optimallaşdırılması
        include: {
          translations: {
            where: { locale },
            select: {
              id: true,
              title: true,
              slug: true,
              seo: {
                select: { id: true, metaTitle: true }, // Minimal SEO məlumatı
              },
            },
          },
        },
      });

      return blog;
    });

    return {
      success: true,
      data: newData,
      code: "SUCCESS",
      message: "Məqalə uğurla yaradıldı",
    };
  } catch (error) {
    console.error("createBlog error:", error);

    if (error instanceof ZodError) {
      // ZodError formatı Zod tərəfindən idarə olunur
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

// --- UPDATE BLOG ---

export async function updateBlog(
  id: string,
  input: UpdateBlogInput
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
    // ✅ SELECT OPTIMIZATION: Yalnız update üçün lazım olan cari dilin translation və SEO-su gətirilir.
    // Bütün translationları gətirməyə ehtiyac yoxdur.
    const existingData = await db.blog.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      select: {
        documentId: true,
        translations: {
          where: { locale: input.locale }, // Yalnız cari dilin translation-u
          select: {
            id: true,
            locale: true,
            seoId: true,
            seo: {
              select: { id: true }, // Yalnız SEO id-si
            },
          },
        },
      },
    });

    if (!existingData) {
      return {
        success: false,
        code: "NOT_FOUND",
        error: "Məqalə tapılmadı",
      };
    }

    const parsedInput = updateBlogSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        errors: formatZodErrors(parsedInput.error),
      };
    }

    const {
      title,
      description,
      metaTitle,
      metaDescription,
      metaKeywords,
      locale,
    } = parsedInput.data;

    const customSlug = createSlug(title);
    const readTime = calculateReadTime(description || "", locale);

    const updatedData = await db.$transaction(async (prisma) => {
      // Artıq yuxarıdakı Select sayəsində existingData.translations-da yalnız 1 element (və ya 0) olacaq.
      const existingTranslation = existingData.translations[0];

      if (existingTranslation) {
        // ✅ UPDATE: Translation exists
        if (existingTranslation.seoId) {
          // Update existing SEO
          await prisma.seo.update({
            where: { id: existingTranslation.seoId },
            data: {
              metaTitle: metaTitle || title,
              metaDescription: metaDescription || description || "",
              metaKeywords: metaKeywords || "",
            },
            select: { id: true }, // SELECT OPTIMIZATION: Nəticə geri qaytarılmırsa
          });
        } else {
          // Create new SEO and link it (Nadirdir, amma məntiq qorunur)
          const newSeo = await prisma.seo.create({
            data: {
              metaTitle: metaTitle || title,
              metaDescription: metaDescription || description || "",
              metaKeywords: metaKeywords || "",
              locale: locale,
            },
            select: { id: true }, // SELECT OPTIMIZATION
          });

          await prisma.blogTranslations.update({
            where: { id: existingTranslation.id },
            data: {
              seoId: newSeo.id,
            },
            select: { id: true }, // SELECT OPTIMIZATION
          });
        }

        // Update translation
        await prisma.blogTranslations.update({
          where: { id: existingTranslation.id },
          data: {
            title,
            description: description || "",
            slug: customSlug,
            readTime: readTime,
          },
          select: { id: true }, // SELECT OPTIMIZATION
        });
      } else {
        // ✅ CREATE: Translation doesn't exist
        const newSeo = await prisma.seo.create({
          data: {
            metaTitle: metaTitle || title,
            metaDescription: metaDescription || description || "",
            metaKeywords: metaKeywords || "",
            locale: locale,
          },
          select: { id: true }, // SELECT OPTIMIZATION
        });

        await prisma.blogTranslations.create({
          data: {
            documentId: id,
            title: title,
            description: description || "",
            locale,
            slug: customSlug,
            readTime: readTime,
            seoId: newSeo.id,
          },
          select: { id: true }, // SELECT OPTIMIZATION
        });
      }

      // Return updated blog with minimal required data
      return await prisma.blog.findUnique({
        where: { documentId: id },
        select: {
          documentId: true,
          id: true,
          status: true,
          updatedAt: true,
          translations: {
            where: { locale: locale },
            select: {
              title: true,
              slug: true,
              description: true,
              readTime: true,
              seo: {
                select: { metaTitle: true }, // Minimal nəticə select
              },
            },
          },
        },
      });
    });

    return {
      success: true,
      data: updatedData,
      code: "SUCCESS",
      message: "Məqalə uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateBlog error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}

// --- UPDATE BLOG IMAGE ---

export async function updateBlogImage(
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
    // ✅ SELECT OPTIMIZATION: Yalnız varlığı yoxlamaq üçün minimal select
    const existingData = await db.blog.findUnique({
      where: { documentId: id, isDeleted: false },
      select: { documentId: true },
    });

    if (!existingData) {
      return {
        error: "Məqalə tapılmadı",
        code: "NOT_FOUND",
        success: false,
      };
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

    const updatedData = await db.blog.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
      },
      // ✅ SELECT OPTIMIZATION
      select: { documentId: true, imageId: true },
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

// --- GET BLOG NAVIGATION ---
// Performans üçün bütün SELECT-lər optimallaşdırılıb.
export async function getBlogNavigation({ id, locale }: GetByIDProps) {
  try {
    const byUuid = isUuid(id);
    const whereClause = byUuid
      ? { isDeleted: false, documentId: id }
      : {
          isDeleted: false,
          translations: { some: { slug: id, locale } },
        };

    const currentBlog = await db.blog.findFirst({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
      },
    });

    if (!currentBlog) {
      return {
        success: false,
        code: "NOT_FOUND",
        message: "Blog tapılmadı",
      };
    }

    // Previous blog (older)
    // ✅ SELECT OPTIMIZATION: Yalnız lazım olan title və slug
    const previousBlog = await db.blog.findFirst({
      where: {
        isDeleted: false,
        createdAt: { lt: currentBlog.createdAt },
        translations: { some: { locale } },
      },
      orderBy: { createdAt: "desc" },
      select: {
        documentId: true,
        translations: {
          where: { locale },
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    // Next blog (newer)
    // ✅ SELECT OPTIMIZATION: Yalnız lazım olan title və slug
    const nextBlog = await db.blog.findFirst({
      where: {
        isDeleted: false,
        createdAt: { gt: currentBlog.createdAt },
        translations: { some: { locale } },
      },
      orderBy: { createdAt: "asc" },
      select: {
        documentId: true,
        translations: {
          where: { locale },
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    return {
      success: true,
      data: {
        previous: previousBlog?.translations?.[0]
          ? {
              title: previousBlog.translations[0].title,
              slug: previousBlog.translations[0].slug,
            }
          : null,
        next: nextBlog?.translations?.[0]
          ? {
              title: nextBlog.translations[0].title,
              slug: nextBlog.translations[0].slug,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("getBlogNavigation error:", error);
    return {
      success: false,
      code: "SERVER_ERROR",
      message: "Xəta baş verdi",
    };
  }
}
