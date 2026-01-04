import ServicesCategoryPageContainer from "../_container/category";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { getServicesStaticById } from "@/src/actions/static/service.actions";
import { routing } from "@/src/i18n/routing";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchServicesCategory } from "@/src/actions/ui/service-category.actions";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ locale: string; category: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  return generatePageMetadata({
    locale: locale,
    customPath: "services",
    category: category,
    dataType: "servicesCategory",
    detail: true,
  });
}
export async function generateStaticParams() {
  try {
    const result = await getServicesStaticById();
    
    // 1. Use ?? [] to handle null/undefined data
    const params = result?.data?.flatMap((service) =>
      routing.locales.flatMap((locale) =>
        service.translations
          .filter((t) => t.locale === locale && t.slug)
          .map((translation) => ({
            locale: locale.toLowerCase(),
            // 2. IMPORTANT: This key must match your folder name [slug]
            slug: translation.slug, 
          }))
      )
    ) ?? []; 

    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
    // 3. Explicitly return an empty array to satisfy TypeScript/Next.js
    return []; 
  }
}
export default async function ServicesPage({ params }: PageProps) {
  const { locale, category } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchServicesCategory({
    locale: validatedLocale,
    category: category,
  });

  if (!existingData?.data?.servicesDetailData?.translations?.length) {
    notFound();
  }
  return <ServicesCategoryPageContainer existingData={existingData}/>;
}
