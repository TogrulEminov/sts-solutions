import { ServicesCategoryItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

interface ServicesJsonLdProps {
  servicesData: ServicesCategoryItem;
}

// Helper function to get localized path
function getLocalizedPath(locale: string, category: string) {
  const pathMap = {
    az: `/xidmetler/${category}`,
    en: `/services/${category}`,
    ru: `/uslugi/${category}`,
  };
  return pathMap[locale as keyof typeof pathMap] || pathMap.az;
}

export function generateServicesJsonLd({ servicesData }: ServicesJsonLdProps) {
  const translations = servicesData?.translations?.[0];

  if (!translations) return null;

  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const organizationName = "Sts Solutions";
  const organizationLogo = `${websiteUrl}/assets/logo/logo-color.svg`;
  const serviceUrl = `${websiteUrl}${getLocalizedPath(
    translations?.locale,
    translations.slug
  )}`;
  const imageUrl = getForCards(servicesData?.imageUrl as FileType);

  const galleryImages = servicesData?.gallery
    ?.map((img) => getForCards(img as FileType))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "ProfessionalService",
    name: translations?.title,
    description: translations?.description,
    ...(translations?.subtitle && {
      alternateName: translations.subtitle,
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
    ...(servicesData?.subCategory &&
      servicesData.subCategory.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${translations.title} Services`,
          itemListElement: servicesData.subCategory.map((subCat, index) => {
            const subTranslation = subCat.translations?.[0];
            return {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: subTranslation?.title || "",
                description: subTranslation?.description || "",
                url: `${serviceUrl}/${subTranslation?.slug}`,
              },
              position: index + 1,
            };
          }),
        },
      }),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: serviceUrl,
      availableLanguage: {
        "@type": "Language",
        name:
          translations?.locale === "az"
            ? "Azerbaijani"
            : translations?.locale === "ru"
            ? "Russian"
            : "English",
        alternateName: translations?.locale,
      },
    },
    url: serviceUrl,
    dateCreated: servicesData.createdAt,
    dateModified: servicesData.updatedAt,
    ...(translations?.seo?.metaTitle && {
      headline: translations.seo.metaTitle,
    }),
    ...(translations?.seo?.metaDescription && {
      abstract: translations.seo.metaDescription,
    }),
    ...(servicesData.isMain && {
      additionalType: "MainService",
    }),
  };

  return jsonLd;
}

export function ServicesJsonLdScript({
  servicesData,
  ...props
}: ServicesJsonLdProps) {
  const jsonLd = generateServicesJsonLd({ servicesData, ...props });

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
