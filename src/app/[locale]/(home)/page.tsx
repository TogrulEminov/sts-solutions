import { generatePageMetadata } from "@/src/utils/metadata";
import { Metadata } from "next";
import HomePageContainer from "./_container";
import { fetchHome } from "@/src/actions/ui/home.actions";
import { validateLocale } from "@/src/helper/validateLocale";

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
  const validatedLocale = validateLocale(locale);
  const homeData = await fetchHome({
    locale: validatedLocale,
  });
  return <HomePageContainer homeData={homeData as any}/>;
}
