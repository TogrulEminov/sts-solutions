// app/rss.xml/route.ts
import { db } from "@/src/lib/admin/prismaClient";
import { NextResponse } from "next/server";
import { routing } from "@/src/i18n/routing";
import { stripHtmlTags } from "@/src/lib/domburify";
import { TIMEOUTS, withDatabaseTimeout } from "@/src/utils/timeout-utils";

async function fetchPostsForLocale(locale: string, pageConfigs: any[]) {
  const allPosts: any[] = [];

  for (const config of pageConfigs) {
    try {
      const result = await withDatabaseTimeout(async () => {
        const modelDelegate = db[config.model as keyof typeof db];

        if (!modelDelegate) {
          console.warn(
            `⚠️  Model ${config.model} not found on Prisma Client. Skipping.`
          );
          return [];
        }

        const selectClause: any = {
          createdAt: true,
          translations: {
            where: { locale: locale },
            select: {
              title: true,
              description: true,
              slug: true,
              locale: true,
            },
          },
        };

        // ✅ Services SubCategory üçün category məlumatı
        if (config.model === "servicesSubCategory") {
          selectClause.servicesCategory = {
            select: {
              translations: {
                where: { locale: locale },
                select: { slug: true },
              },
            },
          };
        }

        const data = await (modelDelegate as any).findMany({
          where: {
            isDeleted: false,
            status: "published",
          },
          select: selectClause,
          orderBy: {
            createdAt: "desc",
          },
          take: 50,
        });

        return data
          .map((item: any) => {
            const translation = item.translations[0];
            if (!translation || !translation.slug) {
              return null;
            }

            const postData: any = {
              ...translation,
              createdAt: item.createdAt,
              model: config.model,
            };

            if (config.model === "servicesSubCategory") {
              postData.categorySlug =
                item.servicesCategory?.translations?.[0]?.slug;
            }

            return postData;
          })
          .filter(Boolean);
      }, TIMEOUTS.DATABASE_QUERY);

      allPosts.push(...result);
    } catch (error) {
      console.error(
        `❌ Error fetching ${config.model} for locale ${locale}:`,
        error
      );
    }
  }

  return allPosts;
}

function getLocalizedPath(model: string, locale: string): string {
  const pathMap: any = {
    blog: {
      az: "/bloq",
      en: "/blog",
      ru: "/bloqi",
    },
    servicesSubCategory: {
      az: "/xidmetler",
      en: "/services",
      ru: "/uslugi",
    },
    servicesCategory: {
      az: "/xidmetler",
      en: "/services",
      ru: "/uslugi",
    },
    solutions: {
      az: "/hellerimiz",
      en: "/solutions",
      ru: "/reseniya",
    },
    projects: {
      az: "/layiheler",
      en: "/projects",
      ru: "/projecti",
    },
  };

  return pathMap[model]?.[locale] || `/${model}`;
}

function generateRSSItem(post: any, websiteUrl: string) {
  try {
    const postLocale = post.locale || "az";
    const localePath = postLocale === "az" ? "" : `/${postLocale}`;
    const localizedBasePath = getLocalizedPath(post.model, postLocale);

    let itemUrl = "";

    // ✅ Services SubCategory üçün xüsusi URL formatı: /xidmetler/[category]/[slug]
    if (post.model === "servicesSubCategory" && post.categorySlug) {
      itemUrl = `${websiteUrl}${localePath}${localizedBasePath}/${post.categorySlug}/${post.slug}`;
    }
    // ✅ Services Category üçün: /xidmetler/[category]
    else if (post.model === "servicesCategory") {
      itemUrl = `${websiteUrl}${localePath}${localizedBasePath}/${post.slug}`;
    }
    // ✅ Digər modellər üçün: /blog/[slug], /solutions/[slug], /projects/[slug]
    else {
      itemUrl = `${websiteUrl}${localePath}${localizedBasePath}/${post.slug}`;
    }

    const title = (post.title || "").replace(/[<>&"']/g, (char: any) => {
      const entities: any = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      };
      return entities[char];
    });

    const description = stripHtmlTags(post.description || "");

    return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${itemUrl}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${itemUrl}</guid>
    </item>`;
  } catch (error) {
    console.error("❌ Error generating RSS item:", error);
    return "";
  }
}

export async function GET() {
  try {
    const locales = ["az", "en", "ru"];
    const pageConfigs = [
      { model: "blog" },
      { model: "servicesCategory" },
      { model: "servicesSubCategory" },
      { model: "solutions" },
      { model: "projects" },
    ];

    const allPosts: any[] = [];

    for (const locale of locales) {
      const posts = await fetchPostsForLocale(locale, pageConfigs);
      allPosts.push(...posts);
    }

    const sortedPosts = allPosts
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 500);

    const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sts.az";
    const defaultLocale = routing.defaultLocale;

    const rssItems = sortedPosts
      .map((post: any) => generateRSSItem(post, websiteUrl))
      .filter(Boolean)
      .join("");

    const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>STS</title>
    <link>${websiteUrl}</link>
    <description>STS - ən son dəyişikliklərimiz</description>
    <language>${defaultLocale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${websiteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXML, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("❌ RSS Generation Error:", error);

    const fallbackRSS = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>STS</title>
    <link>${process.env.NEXT_PUBLIC_BASE_URL || "https://sts.az"}</link>
    <description>RSS temporarily unavailable</description>
  </channel>
</rss>`;

    return new NextResponse(fallbackRSS, {
      status: 500,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
