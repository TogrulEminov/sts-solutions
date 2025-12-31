"use server";
import { ZodError } from "zod";
import { db } from "../../lib/admin/prismaClient";
import { Prisma } from "@/src/generated/prisma/client";
import { Locales, Role } from "@/src/generated/prisma/enums";
import { isUuid } from "../../utils/checkSlug";
import { formatZodErrors } from "../../utils/format-zod-errors";
import { ImgInput, imgSchema } from "@/src/schema/img.schema";
import {
  CreateYoutubeInput,
  createYoutubeSchema,
  UpdateYoutubeInput,
  uptadeYoutubeSchema, // updateYoutubeSchema kimi istifadə etsəniz daha yaxşıdır
} from "@/src/schema/youtube.schema";
import { createSlug } from "@/src/lib/slugifyHelper";
import {
  formatYoutubeDuration,
  getYouTubeVideoId,
} from "@/src/utils/getYouutbeVideoId";
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

// --- GET ALL YOUTUBE VIDEOS ---

export async function getYoutube({
  page,
  pageSize,
  query,
  locale,
  sort = "desc",
}: GetProps) {
  const customPage = page || 1;
  const customPageSize = Math.min(Number(pageSize) || 12, 100);
  const skip = (customPage - 1) * customPageSize;
  const take = customPageSize;
  const searchTerm = query?.trim();

  try {
    const whereClause: Prisma.YoutubeWhereInput = {
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
      db.youtube.findMany({
        where: whereClause,
        select: {
          status: true,
          documentId: true,
          id: true,
          imageUrl: true,
          duration: true,
          url: true,
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
              description: true,
              documentId: true,
            },
          },
        },
        orderBy: { createdAt: (sort as Prisma.SortOrder) ?? "desc" },
        skip: skip,
        take: take,
      }),
      db.youtube.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / customPageSize);
    return {
      success: true,
      code: "SUCCESS",
      message: "Success",
      data: totalCount < 1 ? [] : data,
      paginations: {
        page: customPage,
        pageSize: customPageSize,
        totalPages: totalPages,
        dataCount: totalCount,
      },
    };
  } catch (error) {
    console.error("getYoutube error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}

// --- GET YOUTUBE VIDEO BY ID ---

export async function getYoutubeById({
  locale,
  id,
}: GetByIDProps): Promise<ActionResult<any>> {
  try {
    const byUuid = isUuid(id);
    const whereClause: Prisma.YoutubeWhereInput = byUuid
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

    const existingData = await db.youtube.findFirst({
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

    if (!existingData) {
      return {
        success: false,
        message: "Data not found",
        code: "NOT_FOUND",
        error: "Data not found",
      };
    }
    return { success: true, data: existingData, code: "SUCCESS" };
  } catch (error) {
    console.error("getYoutubeById error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}

// --- CREATE YOUTUBE VIDEO ---

export async function createYoutube(
  input: CreateYoutubeInput
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
    const validateData = createYoutubeSchema.safeParse(input);
    if (!validateData?.success) {
      return {
        code: "VALIDATION_ERROR",
        success: false,
        errors: formatZodErrors(validateData.error),
      };
    }
    const { title, description, locale, imageId, url } = validateData.data;
    const custom_slug = createSlug(title);

    const existingData = await db.youtube.findFirst({
      where: {
        isDeleted: false,
        translations: {
          some: { locale: locale, slug: custom_slug },
        },
      },
    });

    if (existingData) {
      return {
        success: false,
        error: "Data with this title and slug already exists",
        code: "DUPLICATE",
      };
    }

    let videoId: string | null = null;
    let duration: string | null = null;

    if (url) {
      videoId = getYouTubeVideoId(url);
    }

    if (videoId) {
      // YouTube API-dən video müddətini əldə etmə
      const apiKey = process.env.CLOUD_GOOGLE_API_KEY;
      if (!apiKey) {
        console.error("CLOUD_GOOGLE_API_KEY is not set.");
        // API key olmasa bele davam et, duration boş qalsın
      } else {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          const videoData = data.items?.[0];

          // Duration əldə et
          if (videoData?.contentDetails?.duration) {
            const rawDuration = videoData.contentDetails.duration;
            duration = formatYoutubeDuration(rawDuration);
          } else {
            console.warn("Duration tapılmadı!");
          }
        } else {
          // API xətası varsa console'a yaz, lakin yaratmağa davam et
          console.error(
            `YouTube API error: ${response.status} ${response.statusText}`
          );
        }
      }
    }

    const newData = await db.youtube.create({
      data: {
        imageId: Number(imageId) || null,
        duration: duration ?? "",
        url: url,
        translations: {
          create: {
            slug: custom_slug,
            title: title,
            description: description ?? "",
            locale: locale,
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
    console.error("createYoutube error:", error);
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

// --- UPDATE YOUTUBE VIDEO ---

export async function updateYoutube( // ✅ Adı dəyişdirildi: uptadeYoutube -> updateYoutube
  id: string,
  input: UpdateYoutubeInput
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
    const existingData = await db.youtube.findUnique({
      where: {
        documentId: id,
        isDeleted: false,
      },
      include: {
        translations: true,
      },
    });
    if (!existingData) {
      return { success: false, code: "NOT_FOUND", error: "Video tapılmadı" };
    }
    const parsedInput = uptadeYoutubeSchema.safeParse(input);
    if (!parsedInput.success) {
      return {
        success: false,
        code: "VALIDATION_ERROR",
        error: "Validation failed",
        errors: formatZodErrors(parsedInput.error),
      };
    }
    const { title, description, locale, url } = parsedInput.data;
    const customSlug = createSlug(title);

    let videoId: string | null = null;
    let duration: string | undefined = existingData.duration || undefined; // Mövcud duration-ı qoru

    if (url) {
      videoId = getYouTubeVideoId(url);
    }

    // Yalnız URL dəyişibsə və ya URL mövcuddursa API-ni yoxla
    if (url && (url !== existingData.url || !duration)) {
      if (videoId) {
        const apiKey = process.env.CLOUD_GOOGLE_API_KEY;
        if (!apiKey) {
          console.error("CLOUD_GOOGLE_API_KEY is not set.");
        } else {
          const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
          const response = await fetch(apiUrl);

          if (response.ok) {
            const data = await response.json();
            const videoData = data.items?.[0];

            if (videoData?.contentDetails?.duration) {
              const rawDuration = videoData.contentDetails.duration;
              duration = formatYoutubeDuration(rawDuration);
            } else {
              duration = ""; // Duration tapılmadısa boş qalsın
              console.warn("Duration tapılmadı!");
            }
          } else {
            console.error(
              `YouTube API error during update: ${response.status} ${response.statusText}`
            );
          }
        }
      }
    }

    const updateData = await db.$transaction(async (prisma) => {
      const existingTranslation = existingData.translations.find(
        (t) => t.locale === locale
      );

      const updatedData = await prisma.youtube.update({
        where: { documentId: id },
        data: {
          duration: duration ?? "",
          url: url,
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
                slug: customSlug,
              },
              update: {
                title,
                description: description ?? "",
                // Title dəyişibsə yeni slug, yoxsa mövcud slug istifadə olunur
                slug: customSlug || existingTranslation?.slug,
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

    return {
      success: true,
      data: updateData,
      code: "SUCCESS",
      message: "Video uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateYoutube error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      error: `Internal Server Error - ${errorMessage}`,
      code: "SERVER_ERROR",
    };
  }
}

// --- UPDATE YOUTUBE IMAGE ---

export async function updateYoutubeImage( // ✅ Adı dəyişdirildi: uptadeYoutubeImage -> updateYoutubeImage
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
    const existingData = await db.youtube.findUnique({
      where: { documentId: id, isDeleted: false },
    });
    if (!existingData) {
      return { error: "Video tapılmadı", code: "NOT_FOUND", success: false };
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
    const updateData = await db.youtube.update({
      where: { documentId: id },
      data: {
        imageId: Number(imageId),
      },
    });
    return {
      success: true,
      code: "SUCCESS",
      data: updateData,
      message: "Şəkil uğurla yeniləndi",
    };
  } catch (error) {
    console.error("updateYoutubeImage error:", error);
    const errorMessage = (error as Error).message;
    return {
      success: false,
      code: "SERVER_ERROR",
      error: `Internal Server Error - ${errorMessage}`,
    };
  }
}
