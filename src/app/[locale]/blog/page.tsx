import { connection } from "next/server";
import BlogPageContainer from "./_container/main";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
interface PageProps {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    slug: "blog",
    customPath: "blog",
    dataType: "category",
    detail: false,
  });
}

export default async function BlogPage() {
  await connection();
  return <BlogPageContainer />;
}
