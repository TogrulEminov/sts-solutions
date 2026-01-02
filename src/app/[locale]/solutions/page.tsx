import { connection } from "next/server";
import SolutionsMainPageContainer from "./_container/main";
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
    slug: "solutions",
    customPath: "solutions",
    dataType: "category",
    detail: false,
  });
}
export default async function SolutionsPage() {
  await connection();
  return <SolutionsMainPageContainer />;
}
