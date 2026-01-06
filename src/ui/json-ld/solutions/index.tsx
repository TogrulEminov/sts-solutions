import { SolutionsItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

interface SolutionsJsonLdProps {
  solutionsData: SolutionsItem;
}
function getLocalizedPath(locale: string, slug: string) {
  const pathMap = {
    az: `/hellerimiz/${slug}`,
    en: `/solutions/${slug}`,
    ru: `/reseniya/${slug}`,
  };
  return pathMap[locale as keyof typeof pathMap] || pathMap.az;
}

export function generateSolutionsJsonLd({
  solutionsData,
}: SolutionsJsonLdProps) {
  const translations = solutionsData?.translations?.[0];
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const organizationName = "Sts Solutions";
  const organizationLogo = `${websiteUrl}/assets/logo/logo-color.svg`;
  const serviceUrl = `${websiteUrl}${getLocalizedPath(
    translations?.locale,
    translations?.slug
  )}`;
  const imageUrl = getForCards(solutionsData?.imageUrl as FileType);
  const galleryImages = solutionsData?.gallery
    ?.map((img) => getForCards(img as FileType))
    .filter(Boolean);

  const features = translations?.problems?.map((problem) => problem.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: translations?.title,
    description: translations?.description,
    ...(translations?.subTitle && {
      alternateName: translations.subTitle,
    }),
    ...(translations?.subDescription && {
      disambiguatingDescription: translations.subDescription,
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
        name: translations?.locale === "az" ? "Azerbaijani" : "English",
        alternateName: translations?.locale,
      },
    },
    url: serviceUrl,
    dateCreated: solutionsData.createdAt,
    dateModified: solutionsData.updatedAt,
    ...(translations?.seo?.metaTitle && {
      headline: translations.seo.metaTitle,
    }),
    ...(translations?.seo?.metaDescription && {
      abstract: translations.seo.metaDescription,
    }),
  };

  return jsonLd;
}

export function SolutionsJsonLdScript({
  solutionsData,
  ...props
}: SolutionsJsonLdProps) {
  const jsonLd = generateSolutionsJsonLd({ solutionsData, ...props });

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
