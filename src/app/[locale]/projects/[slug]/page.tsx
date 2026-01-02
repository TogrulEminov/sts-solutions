import { Metadata } from "next";
import DetailProjectsContainer from "../_container/detail";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getProjectsStaticById } from "@/src/actions/static/projects.actions";
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
    customPath: "projects",
    detail: true,
    dataType: "projects",
  });
}
export async function generateStaticParams() {
  try {
    const result = await getProjectsStaticById();
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
export default function ProjectsDetailPage() {
  return <DetailProjectsContainer />;
}
