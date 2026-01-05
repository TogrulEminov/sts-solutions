import { getDynamicItemsForLocale } from "@/src/actions/ui/get-slug.actions";
import { Locales } from "@/src/generated/prisma/enums";
import { Pathnames, routing } from "@/src/i18n/routing";
import { NextResponse } from "next/server";

function buildUrl(...parts: string[]): string {
  return parts
    .filter(Boolean)
    .join("/")
    .replace(/([^:]\/)\/+/g, "$1")
    .replace(/\/+$/, "");
}

function getTranslatedPath(
  canonicalPath: keyof Pathnames,
  locale: string
): string {
  const pathConfig = routing.pathnames[canonicalPath];
  if (pathConfig && typeof pathConfig === "object") {
    const translated = (pathConfig as any)[locale];
    return translated === "/" ? "" : translated;
  }
  return canonicalPath;
}

function addUniqueUrl(
  uniqueUrls: Set<string>,
  loc: string,
  lastmod: string,
  changefreq: "monthly" | "weekly",
  priority: number
): string {
  const normalizedLoc =
    loc.length > 1 && loc.endsWith("/") ? loc.slice(0, -1) : loc;

  if (uniqueUrls.has(normalizedLoc)) {
    return "";
  }

  uniqueUrls.add(normalizedLoc);

  return `  <url>
    <loc>${normalizedLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const locale = "en" as Locales;

  try {
    const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sts.az";
    const now = new Date().toISOString();

    const uniqueUrls = new Set<string>();
    const sitemapParts: string[] = [];

    const localePrefix = locale === "az" ? "" : `/${locale}`;

    // ══════════════════════════════════════════════════════
    // 1. Statik Səhifələr
    // ══════════════════════════════════════════════════════
    const staticPages: (keyof Pathnames)[] = [
      "/about",
      "/services",
      "/blog",
      "/solutions",
      "/projects",
      "/contact",
    ];

    staticPages.forEach((page) => {
      const translatedPath = getTranslatedPath(page, locale);
      const locPath = buildUrl(websiteUrl, localePrefix, translatedPath);
      sitemapParts.push(addUniqueUrl(uniqueUrls, locPath, now, "monthly", 0.8));
    });

    // ══════════════════════════════════════════════════════
    // 2. Dinamik Səhifələr
    // ══════════════════════════════════════════════════════
    const dynamicPageConfigs = [
      {
        model: "blog" as const,
        path: getTranslatedPath("/blog", locale),
      },
      {
        model: "projects" as const,
        path: getTranslatedPath("/projects", locale),
      },
      {
        model: "solutions" as const,
        path: getTranslatedPath("/solutions", locale),
      },
    ];

    for (const config of dynamicPageConfigs) {
      try {
        const items = await getDynamicItemsForLocale(config.model, locale);

        for (const item of items) {
          if (item.slug) {
            const loc = buildUrl(
              websiteUrl,
              localePrefix,
              config.path,
              item.slug
            );
            const lastmod = new Date(
              item.updatedAt || item.createdAt
            ).toISOString();
            sitemapParts.push(
              addUniqueUrl(uniqueUrls, loc, lastmod, "weekly", 0.7)
            );
          }
        }
      } catch (error) {
        console.error(
          `❌ Error fetching ${config.model} for locale ${locale}:`,
          error
        );
      }
    }

    // ══════════════════════════════════════════════════════
    // 3. Services Categories
    // ══════════════════════════════════════════════════════
    try {
      const categoriesData = await getDynamicItemsForLocale(
        "servicesCategory",
        locale
      );
      const servicesBasePath = getTranslatedPath("/services", locale);

      for (const category of categoriesData) {
        if (category.slug) {
          const loc = buildUrl(
            websiteUrl,
            localePrefix,
            servicesBasePath,
            category.slug
          );
          const lastmod = new Date(
            category.updatedAt || category.createdAt
          ).toISOString();

          sitemapParts.push(
            addUniqueUrl(uniqueUrls, loc, lastmod, "weekly", 0.75)
          );
        }
      }
    } catch (error) {
      console.error(
        `❌ Error fetching service categories for locale ${locale}:`,
        error
      );
    }

    // ══════════════════════════════════════════════════════
    // 4. Services SubCategory
    // ══════════════════════════════════════════════════════
    try {
      const servicesData = await getDynamicItemsForLocale(
        "servicesSubCategory",
        locale
      );
      const servicesBasePath = getTranslatedPath("/services", locale);

      for (const service of servicesData) {
        if (service.slug && service.categorySlug) {
          const loc = buildUrl(
            websiteUrl,
            localePrefix,
            servicesBasePath,
            service.categorySlug,
            service.slug
          );
          const lastmod = new Date(
            service.updatedAt || service.createdAt
          ).toISOString();

          sitemapParts.push(
            addUniqueUrl(uniqueUrls, loc, lastmod, "weekly", 0.7)
          );
        }
      }
    } catch (error) {
      console.error(`❌ Error fetching services for locale ${locale}:`, error);
    }

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapParts.filter(Boolean).join("\n")}
</urlset>`;

    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(`SITEMAP GENERATION FAILED for locale: ${locale}`, error);

    const fallbackXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL || "https://sts.az"}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackXML, {
      status: 500,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
