import { BlogItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

interface JsonLdSchemaProps {
  blogData: BlogItem;
  authorName?: string;
  authorUrl?: string;
}
function getLocalizedPath(locale: string, slug: string) {
  const pathMap = {
    az: `/bloq/${slug}`,
    en: `/blog/${slug}`,
    ru: `/bloqi/${slug}`,
  };
  return pathMap[locale as keyof typeof pathMap] || pathMap.az;
}
export function generateBlogJsonLd({
  blogData,
  authorName = "STS Solutions",
  authorUrl,
}: JsonLdSchemaProps) {
  const translations = blogData?.translations?.[0];
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const organizationName = "Sts Solutions";
  const organizationLogo = `${websiteUrl}/assets/logo/logo-color.svg`;
  const articleUrl = `${websiteUrl}${getLocalizedPath(
    translations?.locale,
    translations?.slug
  )}`;
  const imageUrl = getForCards(blogData?.imageUrl as FileType);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: translations.title,
    description: translations.description,
    image: imageUrl,
    datePublished: blogData.createdAt,
    dateModified: blogData.updatedAt,
    author: {
      "@type": authorUrl ? "Person" : "Organization",
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      "@type": "Organization",
      name: organizationName,
      ...(organizationLogo && {
        logo: {
          "@type": "ImageObject",
          url: organizationLogo,
        },
      }),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    ...(translations.readTime && {
      timeRequired: translations.readTime,
    }),
    inLanguage: translations?.locale,
    url: articleUrl,
  };

  return jsonLd;
}

// React component-də istifadə üçün
export function BlogJsonLdScript({ blogData, ...props }: JsonLdSchemaProps) {
  const jsonLd = generateBlogJsonLd({ blogData, ...props });

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
