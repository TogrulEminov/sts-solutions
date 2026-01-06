import { ServicesSubCategoryItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

interface ServicesSubCategoryJsonLdProps {
  subCategoryData: ServicesSubCategoryItem;
}

function getLocalizedPath(
  locale: string,
  category: string,
  subcategory?: string
) {
  const pathMap = {
    az: subcategory
      ? `/xidmetler/${category}/${subcategory}`
      : `/xidmetler/${category}`,
    en: subcategory
      ? `/services/${category}/${subcategory}`
      : `/services/${category}`,
    ru: subcategory
      ? `/uslugi/${category}/${subcategory}`
      : `/uslugi/${category}`,
  };
  return pathMap[locale as keyof typeof pathMap] || pathMap.az;
}

export function generateServicesSubCategoryJsonLd({
  subCategoryData,
}: ServicesSubCategoryJsonLdProps) {
  const subTranslation = subCategoryData?.translations?.[0];

  const categoryData = subCategoryData?.servicesCategory?.[0];
  const categoryTranslation = categoryData?.translations?.[0];

  if (!subTranslation || !categoryTranslation) return null;

  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const organizationName = "Sts Solutions";
  const organizationLogo = `${websiteUrl}/assets/logo/logo-color.svg`;
  const serviceUrl = `${websiteUrl}${getLocalizedPath(
    categoryTranslation?.locale,
    categoryTranslation.slug,
    subTranslation.slug
  )}`;
  const imageUrl = getForCards(subCategoryData?.imageUrl as FileType);

  const galleryImages = subCategoryData?.gallery
    ?.map((img) => getForCards(img as FileType))
    .filter(Boolean);

  const features = subTranslation?.features?.map((feature) => feature.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "ProfessionalService",
    name: subTranslation?.title,
    description: subTranslation?.description,
    ...(subTranslation?.subtitle && {
      alternateName: subTranslation.subtitle,
    }),
    image: imageUrl,
    ...(galleryImages &&
      galleryImages.length > 0 && {
        additionalProperty: galleryImages.map((img, index) => ({
          "@type": "PropertyValue",
          name: `Gallery Image ${index + 1}`,
          value: img,
        })),
      }),
    provider: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo,
      },
      url: websiteUrl,
    },
    category: {
      "@type": "Service",
      name: categoryTranslation.title,
      url: `${websiteUrl}${getLocalizedPath(
        subTranslation?.locale,
        categoryTranslation.slug
      )}`,
    },
    ...(features &&
      features.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Service Features",
          itemListElement: features.map((feature, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: feature,
            },
            position: index + 1,
          })),
        },
      }),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: serviceUrl,
      availableLanguage: {
        "@type": "Language",
        name:
          subTranslation?.locale === "az"
            ? "Azerbaijani"
            : subTranslation?.locale === "ru"
            ? "Russian"
            : "English",
        alternateName: subTranslation?.locale,
      },
    },
    url: serviceUrl,
    dateCreated: subCategoryData.createdAt,
    dateModified: subCategoryData.updatedAt,
    ...(subTranslation?.seo?.metaTitle && {
      headline: subTranslation.seo.metaTitle,
    }),
    ...(subTranslation?.seo?.metaDescription && {
      abstract: subTranslation.seo.metaDescription,
    }),
  };

  return jsonLd;
}

export function ServicesSubCategoryJsonLdScript({
  subCategoryData,
}: ServicesSubCategoryJsonLdProps) {
  const jsonLd = generateServicesSubCategoryJsonLd({
    subCategoryData,
  });

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
