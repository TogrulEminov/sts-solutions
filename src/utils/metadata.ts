// src/utils/metadata-generator.ts

import { Metadata } from "next";
import { cache } from "react";
import { getPageUrl } from "./checkSlug";
import { getForCards } from "./getFullimageUrl";
import { CustomLocales, FileType } from "../services/interface";
import { getCategoriesById } from "../actions/client/category.actions";
import { TIMEOUTS, withMetadataTimeout } from "./timeout-utils";

type Locales = "az" | "en" | "ru";

type CustomPath =
  | "home"
  | "services"
  | "certificates"
  | "contact"
  | "blog"
  | "partner"
  | "media"
  | "gallery"
  | "about";

interface GeneratePageMetadataParams {
  locale: string;
  slug?: string;
  category?: string;
  detail?: boolean;
  customPath: CustomPath;
  dataType?: "category" | "service" | "blog" | "custom" | "servicesCategory";
  customData?: {
    title?: string;
    description?: string;
    keywords?: string;
    imageUrl?: string;
  };
}

/**
 * ✅ Default titles
 */
const DEFAULT_TITLES: Record<CustomPath, Record<Locales, string>> = {
  home: {
    az: "Ana Səhifə - Profi Transport",
    en: "Home - Profi Transport",
    ru: "Главная - Profi Transport",
  },
  services: {
    az: "Xidmətlər - Profi Transport",
    en: "Services - Profi Transport",
    ru: "Услуги - Profi Transport",
  },
  certificates: {
    az: "Sertifikatlar - Profi Transport",
    en: "Certificates - Profi Transport",
    ru: "Сертификаты - Profi Transport",
  },
  contact: {
    az: "Əlaqə - Profi Transport",
    en: "Contact - Profi Transport",
    ru: "Контакт - Profi Transport",
  },
  blog: {
    az: "Bloq - Profi Transport",
    en: "Blog - Profi Transport",
    ru: "Блог - Profi Transport",
  },
  partner: {
    az: "Tərəfdaşlar - Profi Transport",
    en: "Partners - Profi Transport",
    ru: "Партнеры - Profi Transport",
  },
  media: {
    az: "Media - Profi Transport",
    en: "Media - Profi Transport",
    ru: "Медиа - Profi Transport",
  },
  gallery: {
    az: "Foto Qalereya - Profi Transport",
    en: "Photo Gallery - Profi Transport",
    ru: "Foto Galeriya - Profi Transport",
  },
  about: {
    az: "Haqqımızda - Profi Transport",
    en: "About Us - Profi Transport",
    ru: "О нас - Profi Transport",
  },
};

/**
 * ✅ Default descriptions
 */
const DEFAULT_DESCRIPTIONS: Record<CustomPath, Record<Locales, string>> = {
  home: {
    az: "Profi Transport-un rəsmi ana səhifəsi",
    en: "Official homepage of Profi Transport",
    ru: "Официальная главная страница Profi Transport",
  },
  services: {
    az: "Profi Transport-un təqdim etdiyi xidmətlər haqqında məlumat",
    en: "Information about the services provided by Profi Transport",
    ru: "Информация о услугах, предоставляемых Profi Transport",
  },
  certificates: {
    az: "Profi Transport-un beynəlxalq sertifikatları və akkreditasiyaları haqqında məlumat",
    en: "Information about the international certificates and accreditations of Profi Transport",
    ru: "Информация о международных сертификатах и аккредитациях Profi Transport",
  },
  contact: {
    az: "Profi Transport ilə əlaqə yaratmaq üçün məlumat",
    en: "Information on how to contact Profi Transport",
    ru: "Информация о том, как связаться с Profi Transport",
  },
  blog: {
    az: "Profi Transport ilə əlaqədar məqalələr və bloq yazıları",
    en: "Articles and blog posts related to Profi Transport",
    ru: "Статьи и блоги, связанные с Profi Transport",
  },
  partner: {
    az: "Profi Transport-un tərəfdaşları və əməkdaşlıq imkanları",
    en: "Profi Transport's partners and collaboration opportunities",
    ru: "Партнеры Profi Transport и возможности для сотрудничества",
  },
  media: {
    az: "Profi Transport haqqında media xəbərləri və şəkilləri",
    en: "Media news and images about Profi Transport",
    ru: "Новости и изображения о Profi Transport в СМИ",
  },
  gallery: {
    az: "Profi Transport haqqında media xəbərləri və şəkilləri",
    en: "Media news and images about Profi Transport",
    ru: "Новости и изображения о Profi Transport в СМИ",
  },
  about: {
    az: "Profi Transport-un tarixçəsi və fəaliyyət sahələri",
    en: "The history and areas of activity of Profi Transport",
    ru: "История и сферы деятельности Profi Transport",
  },
};

// src/utils/metadata-generator.ts

interface GeneratePageMetadataParams {
  locale: string;
  slug?: string;
  category?: string; // ✅ Artıq var
  detail?: boolean;
  customPath: CustomPath;
  dataType?: "category" | "service" | "blog" | "custom" | "servicesCategory";
  customData?: {
    title?: string;
    description?: string;
    keywords?: string;
    imageUrl?: string;
  };
}

/**
 * ✅ React cache ile metadata fetcher
 */
const getCachedMetadata = cache(
  async (
    dataType: string,
    locale: CustomLocales,
    slug?: string,
    category?: string
  ) => {
    try {
      return await withMetadataTimeout(async () => {
        let result;

        switch (dataType) {
          case "category":
            if (!slug) {
              result = await getCategoriesById({ locale, id: "" });
              return result?.data;
            }
            result = await getCategoriesById({ locale, id: slug });
            return result?.data;
          default:
            return null;
        }
      }, TIMEOUTS.METADATA_FETCH);
    } catch {
      return null;
    }
  }
);

/**
 * ✅ Main metadata generator
 */
export async function generatePageMetadata({
  locale,
  slug,
  category,
  customPath,
  detail,
  dataType = "category",
  customData,
}: GeneratePageMetadataParams): Promise<Metadata> {
  try {
    let title: string | undefined;
    let description: string | undefined;
    let keywords: string | undefined;
    let imageUrl: string | undefined;

    // ✅ 1. Custom data
    if (customData) {
      title = customData.title;
      description = customData.description;
      keywords = customData.keywords;
      imageUrl = customData.imageUrl;
    }
    // ✅ 2. Database fetch
    else {
      const data = await getCachedMetadata(
        dataType,
        locale as CustomLocales,
        slug,
        category
      );

      if (data) {
        const translation = data.translations?.[0];
        const seoData = translation?.seo;

        title = seoData?.metaTitle || translation?.title;
        description = seoData?.metaDescription || translation?.description;
        keywords = seoData?.metaKeywords;
        imageUrl = getForCards(data?.imageUrl as FileType);
      }
    }

    // ✅ 3. Fallback
    if (!title) {
      title =
        DEFAULT_TITLES[customPath]?.[locale as Locales] ||
        DEFAULT_TITLES[customPath]?.az ||
        "Profi Transport";
    }

    if (!description) {
      description = DEFAULT_DESCRIPTIONS[customPath]?.[locale as Locales] || "";
    }

    // ✅ 4. Generate URLs with category support
    const canonicalUrl =
      detail && slug
        ? getPageUrl({
            locale: locale as Locales,
            customPath,
            slug: String(slug),
            category: category,
          })
        : category
        ? getPageUrl({
            locale: locale as Locales,
            customPath,
            category: category,
          })
        : getPageUrl({
            locale: locale as Locales,
            customPath,
          });

    // ✅ 5. Language alternates
    const languages =
      detail && slug
        ? {
            "x-default": getPageUrl({
              locale: "az",
              customPath,
              slug: String(slug),
              category: category,
            }),
            az: getPageUrl({
              locale: "az",
              customPath,
              slug: String(slug),
              category: category,
            }),
            en: getPageUrl({
              locale: "en",
              customPath,
              slug: String(slug),
              category: category,
            }),
            ru: getPageUrl({
              locale: "ru",
              customPath,
              slug: String(slug),
              category: category,
            }),
          }
        : category
        ? {
            "x-default": getPageUrl({
              locale: "az",
              customPath,
              category: category,
            }),
            az: getPageUrl({
              locale: "az",
              customPath,
              category: category,
            }),
            en: getPageUrl({
              locale: "en",
              customPath,
              category: category,
            }),
            ru: getPageUrl({
              locale: "ru",
              customPath,
              category: category,
            }),
          }
        : {
            "x-default": getPageUrl({ locale: "az", customPath }),
            az: getPageUrl({ locale: "az", customPath }),
            en: getPageUrl({ locale: "en", customPath }),
            ru: getPageUrl({ locale: "ru", customPath }),
          };

    // ✅ 6. Return metadata
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: title || "",
                width: 1200,
                height: 630,
              },
            ]
          : undefined,
        locale,
        type: "website",
        url: canonicalUrl,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
      alternates: {
        canonical: canonicalUrl,
        languages,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    const fallbackTitle =
      DEFAULT_TITLES[customPath]?.[locale as Locales] || "Profi Transport";

    return {
      title: fallbackTitle,
      description: DEFAULT_DESCRIPTIONS[customPath]?.[locale as Locales] || "",
    };
  }
}
