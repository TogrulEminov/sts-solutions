import React from "react";
import SolutionsDetailContainer from "../_container/details";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getSolutionsStaticById } from "@/src/actions/static/solutions.actions";
import { routing } from "@/src/i18n/routing";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchSolutionsDetail } from "@/src/actions/ui/solutions-detail.actions";
import { notFound } from "next/navigation";
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

    // 1. Map the data and provide a fallback empty array if data is missing
    const params =
      result?.data?.flatMap((solution) =>
        routing.locales.flatMap((locale) =>
          solution.translations
            .filter((t) => t.locale === locale && t.slug)
            .map((translation) => ({
              locale: locale.toLowerCase(),
              slug: translation.slug,
            }))
        )
      ) ?? []; // Fallback for null/undefined result.data

    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}
export default async function SoluitionDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchSolutionsDetail({
    locale: validatedLocale,
    slug: slug,
  });
  if (!existingData?.data?.solutionsDetailData?.translations?.length) {
    notFound();
  }
  return <SolutionsDetailContainer existingData={existingData} />;
}
