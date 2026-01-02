import BlogDetailPageContainer from "../_container/detail";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getBlogStaticById } from "@/src/actions/static/blog.actions";
import { routing } from "@/src/i18n/routing";
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}
export async function generateStaticParams() {
  try {
    const result = await getBlogStaticById();
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
export default async function BlogDetailPage() {
  return <BlogDetailPageContainer />;
}
