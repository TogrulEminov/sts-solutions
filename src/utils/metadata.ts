// src/utils/metadata-generator.ts

import { Metadata } from "next";
import { cache } from "react";
import { getPageUrl } from "./checkSlug";
import { getForCards } from "./getFullimageUrl";
import { CustomLocales, FileType } from "../services/interface";
import { getCategoriesById } from "../actions/client/category.actions";
import { TIMEOUTS, withMetadataTimeout } from "./timeout-utils";
import { getServicesCategoryMetaById } from "../actions/meta/services-category.actions";
import { getServicesSubMetaById } from "../actions/meta/services-sub-category.actions";
import { getBlogMetaById } from "../actions/meta/blog.actions";
import { getSolutionsMetaById } from "../actions/meta/solutions.actions";
import { getProjectsMetaById } from "../actions/meta/projects.actions";

type Locales = "az" | "en" | "ru";

type CustomPath =
  | "home"
  | "services"
  | "contact"
  | "blog"
  | "projects"
  | "solutions"
  | "about";

interface GeneratePageMetadataParams {
  locale: string;
  slug?: string;
  category?: string;
  detail?: boolean;
  customPath: CustomPath;
  dataType?:
    | "category"
    | "servicesCategory"
    | "custom"
    | "solutions"
    | "projects"
    | "blog"
    | "servicesSubCategory";
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
    az: "Ana Səhifə - Sts Solutions",
    en: "Home - Sts Solutions",
    ru: "Главная - Sts Solutions",
  },
  services: {
    az: "Xidmətlər - Sts Solutions",
    en: "Services - Sts Solutions",
    ru: "Услуги - Sts Solutions",
  },
  solutions: {
    az: "Həllər - Sts Solutions",
    en: "Solutions - Sts Solutions",
    ru: "Решения - Sts Solutions",
  },
  blog: {
    az: "Bloq - Sts Solutions",
    en: "Blog - Sts Solutions",
    ru: "Блог - Sts Solutions",
  },
  projects: {
    az: "Layihələr - Sts Solutions",
    en: "Projects - Sts Solutions",
    ru: "Проекты - Sts Solutions",
  },
  contact: {
    az: "Əlaqə - Sts Solutions",
    en: "Contact - Sts Solutions",
    ru: "Контакт - Sts Solutions",
  },
  about: {
    az: "Haqqımızda - Sts Solutions",
    en: "About Us - Sts Solutions",
    ru: "О нас - Sts Solutions",
  },
};
/**
 * ✅ Default descriptions
 */
const DEFAULT_DESCRIPTIONS: Record<CustomPath, Record<Locales, string>> = {
  home: {
    az: "Sts Solutions-un rəsmi ana səhifəsi",
    en: "Official homepage of Sts Solutions",
    ru: "Официальная главная страница Sts Solutions",
  },
  services: {
    az: "Sts Solutions-un təqdim etdiyi xidmətlər haqqında məlumat",
    en: "Information about the services provided by Sts Solutions",
    ru: "Информация о услугах, предоставляемых Sts Solutions",
  },
  solutions: {
    az: "Biznesiniz üçün innovativ texnoloji həllər",
    en: "Innovative technological solutions for your business",
    ru: "Инновационные технологические решения для вашего бизнеса",
  },
  blog: {
    az: "Texnologiya və yeniliklər haqqında son məqalələr",
    en: "Latest articles about technology and innovation",
    ru: "Последние статьи о технологиях и инновациях",
  },
  projects: {
    az: "Uğurla tamamladığımız layihələrlə tanış olun",
    en: "Get to know the projects we have successfully completed",
    ru: "Познакомьтесь с проектами, которые мы успешно завершили",
  },
  contact: {
    az: "Sts Solutions ilə əlaqə yaratmaq üçün məlumat",
    en: "Information on how to contact Sts Solutions",
    ru: "Информация о том, как связаться с Sts Solutions",
  },
  about: {
    az: "Sts Solutions-un tarixçəsi və fəaliyyət sahələri",
    en: "The history and areas of activity of Sts Solutions",
    ru: "История и сферы деятельности Sts Solutions",
  },
};

// src/utils/metadata-generator.ts

interface GeneratePageMetadataParams {
  locale: string;
  slug?: string;
  category?: string; // ✅ Artıq var
  detail?: boolean;
  customPath: CustomPath;
  dataType?:
    | "category"
    | "servicesCategory"
    | "custom"
    | "solutions"
    | "projects"
    | "blog"
    | "servicesSubCategory";
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

          case "servicesCategory":
            if (!category) {
              console.warn("⚠️ Service Category dataType requires category parameter");
              return null;
            }
            result = await getServicesCategoryMetaById({
              locale,
              id: category,
            });
            return result?.data;
          case "servicesSubCategory":
            if (!slug) {
              console.warn("⚠️ Service  SubCategory dataType requires category parameter");
              return null;
            }
            result = await getServicesSubMetaById({
              locale,
              id: slug,
            });
            return result?.data;

          case "blog":
            if (!slug) {
              console.warn("⚠️ Blog dataType requires slug parameter");
              return null;
            }
            result = await getBlogMetaById({ locale, id: slug });
            return result?.data;
          case "solutions":
            if (!slug) {
              console.warn("⚠️ Solutions dataType requires slug parameter");
              return null;
            }
            result = await getSolutionsMetaById({ locale, id: slug });
            return result?.data;
          case "projects":
            if (!slug) {
              console.warn("⚠️ Projects dataType requires slug parameter");
              return null;
            }
            result = await getProjectsMetaById({ locale, id: slug });
            return result?.data;
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

        title = (seoData?.metaTitle || translation?.title) ?? undefined;
        description =
          (seoData?.metaDescription || translation?.description) ?? undefined;
        keywords = seoData?.metaKeywords ?? undefined;
        imageUrl = getForCards(data?.imageUrl as FileType);
      }
    }

    // ✅ 3. Fallback
    if (!title) {
      title =
        DEFAULT_TITLES[customPath]?.[locale as Locales] ||
        DEFAULT_TITLES[customPath]?.az ||
        "Sts Solutions";
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
      DEFAULT_TITLES[customPath]?.[locale as Locales] || "Sts Solutions";

    return {
      title: fallbackTitle,
      description: DEFAULT_DESCRIPTIONS[customPath]?.[locale as Locales] || "",
    };
  }
}
