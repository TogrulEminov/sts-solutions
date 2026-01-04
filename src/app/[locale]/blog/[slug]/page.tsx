import BlogDetailPageContainer from "../_container/detail";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getBlogStaticById } from "@/src/actions/static/blog.actions";
import { routing } from "@/src/i18n/routing";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchBlogDetail } from "@/src/actions/ui/blog-detail.actions";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}
export async function generateStaticParams() {
  try {
    const result = await getBlogStaticById();

    // Ensure result?.data exists, otherwise default to empty array
    const params =
      result?.data?.flatMap((blog) =>
        routing.locales.flatMap((locale) =>
          blog.translations
            .filter((t) => t.locale === locale && t.slug)
            .map((translation) => ({
              locale: locale.toLowerCase(),
              slug: translation.slug,
            }))
        )
      ) ?? []; // Fallback to empty array if flatMap result is null/undefined

    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
    // MUST return an empty array here so the build doesn't fail
    return [];
  }
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    customPath: "blog",
    detail: true,
    dataType: "blog",
  });
}
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchBlogDetail({
    locale: validatedLocale,
    slug: slug,
  });
  if (!existingData?.data?.blogDetailData?.translations?.length) {
    notFound();
  }
  return <BlogDetailPageContainer existingData={existingData} />;
}
