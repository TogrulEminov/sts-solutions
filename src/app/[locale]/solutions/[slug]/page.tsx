import React from "react";
import SolutionsDetailContainer from "../_container/details";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getSolutionsStaticById } from "@/src/actions/static/solutions.actions";
import { routing } from "@/src/i18n/routing";
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    customPath: "solutions",
    detail: true,
    dataType: "solutions",
  });
}
export async function generateStaticParams() {
  try {
    const result = await getSolutionsStaticById();
    const params = result?.data?.flatMap((blog) =>
      routing.locales.flatMap((locale) =>
        blog.translations
          .filter((t) => t.locale === locale && t.slug) // ✅ Filter by locale
          .map((translation) => ({
            locale: locale.toLowerCase(),
            slug: translation.slug,
          }))
      )
    );
    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
  }
}
export default async function SoluitionDetailPage() {
  return <SolutionsDetailContainer />;
}
