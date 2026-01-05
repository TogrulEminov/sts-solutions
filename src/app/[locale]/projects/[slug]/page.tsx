import { Metadata } from "next";
import DetailProjectsContainer from "../_container/detail";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getProjectsStaticById } from "@/src/actions/static/projects.actions";
import { routing } from "@/src/i18n/routing";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchProjectsDetail } from "@/src/actions/ui/projects-detail.actions";
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
    customPath: "projects",
    detail: true,
    dataType: "projects",
  });
}
export async function generateStaticParams() {
  try {
    const result = await getProjectsStaticById();
    
    // 1. Ensure we always return an array even if data is missing
    const params = result?.data?.flatMap((blog) =>
      routing.locales.flatMap((locale) =>
        blog.translations
          .filter((t) => t.locale === locale && t.slug)
          .map((translation) => ({
            locale: locale.toLowerCase(),
            slug: translation.slug,
          }))
      )
    ) ?? []; // Fallback if data is null/undefined

    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
    // 2. Return an empty array so the build process doesn't crash
    return []; 
  }
}
export default async function ProjectsDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchProjectsDetail({
    locale: validatedLocale,
    slug: slug,
  });
  if (!existingData?.data?.projectsDetailData?.translations?.length) {
    notFound();
  }
  return <DetailProjectsContainer existingData={existingData as any} />;
}
