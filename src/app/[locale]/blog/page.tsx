import BlogPageContainer from "./_container/main";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchBlogs } from "@/src/actions/ui/blog.actions";
import { notFound } from "next/navigation";
import { connection } from "next/server";
interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | number | boolean }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  await connection();
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    slug: "blog",
    customPath: "blog",
    dataType: "category",
    detail: false,
  });
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  await connection();
  const { locale } = await params;
  const validatedLocale = validateLocale(locale);
  const searchParamsData = await searchParams;
  const { sort = "desc", page = 1 } = searchParamsData;
  const pageNumber = Number(page) || 1;
  const pageSize = 12;

  const existingData = await fetchBlogs({
    page: pageNumber,
    pageSize: pageSize,
    sort: sort as string,
    locale: validatedLocale,
  });
  if (!existingData?.data?.categoriesData?.translations) {
    notFound();
  }
  return <BlogPageContainer existingData={existingData} />;
}
