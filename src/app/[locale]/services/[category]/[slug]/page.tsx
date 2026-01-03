import { generatePageMetadata } from "@/src/utils/metadata";
import ServicesDetailPageContainer from "../../_container/slug";
import { Metadata } from "next";
import { getServicesStaticById } from "@/src/actions/static/service.actions";
import { routing } from "@/src/i18n/routing";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchServicesSubCategory } from "@/src/actions/ui/service-sub-category.actions";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ locale: string; slug: string; category: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  return generatePageMetadata({
    locale: locale,
    customPath: "services",
    dataType: "servicesSubCategory",
    slug: slug,
    detail: true,
  });
}

export async function generateStaticParams() {
  try {
    const result = await getServicesStaticById();
    const params = result.data.flatMap((service) =>
      routing.locales.flatMap((locale) => {
        const serviceTranslation = service.translations.find(
          (t) => t.locale === locale && t.slug
        );
        if (!serviceTranslation) return [];
        return (service.subCategory || []).flatMap((category) => {
          const categoryTranslation = category.translations?.find(
            (t) => t.locale === locale && t.slug
          );
          if (categoryTranslation) {
            return {
              locale: locale.toLowerCase(),
              category: serviceTranslation.slug,
              slug: categoryTranslation.slug,
            };
          }

          return [];
        });
      })
    );
    return params;
  } catch (error) {
    console.error("generateStaticParams error:", error);
  }
}
export default async function ServicesDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchServicesSubCategory({
    locale: validatedLocale,
    slug: slug,
  });
  if (!existingData?.data?.servicesDetailData?.translations?.length) {
    notFound();
  }
  return <ServicesDetailPageContainer existingData={existingData}/>;
}
