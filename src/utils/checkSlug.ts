import { NextRequest } from "next/server";
import z from "zod";
import { routing } from "../i18n/routing";

export function isUuid(id: string): boolean {
  if (typeof id !== "string" || id.length === 0) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const cuidRegex = /^[a-z0-9]{16,32}$/;

  return uuidRegex.test(id) || cuidRegex.test(id);
}
const LocalesSchema = z.enum(["az", "en", "ru"]);
type SupportedLocale = z.infer<typeof LocalesSchema>;
export function parseLocaleFromReq(req: NextRequest): SupportedLocale | null {
  const loc = req.nextUrl.searchParams.get("locale") ?? "az";
  const parsed = LocalesSchema.safeParse(loc);
  return parsed.success ? parsed.data : null;
}

export const parseJSON = <T>(data: any): T[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function getPageUrl({
  locale,
  customPath,
  slug,
  category,
}: {
  locale: string;
  customPath: string;
  slug?: string;
  category?: string;
}): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  // Home page
  if (customPath === "home") {
    return locale === "az" ? baseUrl : `${baseUrl}/${locale}`;
  }

  // Path key - category və slug kombinasiyasına görə
  let pathKey: string;

  if (customPath === "services" && category && slug) {
    pathKey = "/services/[category]/[slug]";
  } else if (customPath === "services" && category) {
    pathKey = "/services/[category]";
  } else if (slug) {
    pathKey = `/${customPath}/[slug]`;
  } else {
    pathKey = `/${customPath}`;
  }

  const pathnames = (
    routing.pathnames as Record<string, Record<string, string>>
  )[pathKey];

  if (!pathnames) {
    // Fallback path
    let fallbackPath = customPath;
    if (category) fallbackPath += `/${category}`;
    if (slug) fallbackPath += `/${slug}`;

    return locale === "az"
      ? `${baseUrl}/${fallbackPath}`
      : `${baseUrl}/${locale}/${fallbackPath}`;
  }

  // Localized path
  let localizedPath = String(pathnames[locale] || `/${customPath}`);

  // Category replacement
  if (category) {
    localizedPath = localizedPath.replace("[category]", category);
  }

  // Slug replacement
  if (slug) {
    localizedPath = localizedPath.replace("[slug]", slug);
  }

  // Clean path
  const cleanPath = localizedPath.replace(/^\/+/, "");

  // Return URL
  return locale === "az"
    ? `${baseUrl}/${cleanPath}`
    : `${baseUrl}/${locale}/${cleanPath}`;
}
