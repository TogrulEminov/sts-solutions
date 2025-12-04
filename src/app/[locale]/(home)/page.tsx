import { generatePageMetadata } from "@/src/utils/metadata";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    customPath: "home",
    dataType: "category",
    detail: false,
  });
}
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return <></>;
}
