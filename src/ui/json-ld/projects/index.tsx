import { Projects, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

interface ProjectsJsonLdProps {
  projectsData: Projects;
}
function getLocalizedPath(locale: string, slug: string) {
  const pathMap = {
    az: `/layiheler/${slug}`,
    en: `/projects/${slug}`,
    ru: `/projecti/${slug}`,
  };
  return pathMap[locale as keyof typeof pathMap] || pathMap.az;
}

export function generateProjectsJsonLd({ projectsData }: ProjectsJsonLdProps) {
  const translations = projectsData?.translations?.[0];
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const organizationName = "Sts Solutions";
  const organizationLogo = `${websiteUrl}/assets/logo/logo-color.svg`;
  const projectUrl = `${websiteUrl}${getLocalizedPath(
    translations?.locale,
    translations?.slug
  )}`;
  const imageUrl = getForCards(projectsData?.imageUrl as FileType);

  const galleryImages = projectsData?.gallery
    ?.map((img) => getForCards(img as FileType))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: translations?.title,
    description: translations?.description,
    ...(translations?.subTitle && {
      alternateName: translations.subTitle,
    }),
    image: imageUrl,
    ...(galleryImages &&
      galleryImages.length > 0 && {
        associatedMedia: galleryImages.map((img) => ({
          "@type": "ImageObject",
          contentUrl: img,
        })),
      }),
    creator: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo,
      },
      url: websiteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: organizationLogo,
      },
    },
    dateCreated: projectsData.createdAt,
    dateModified: projectsData.updatedAt,
    datePublished: projectsData.createdAt,
    url: projectUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": projectUrl,
    },
    inLanguage: translations?.locale,
    ...(translations?.seo?.metaTitle && {
      headline: translations.seo.metaTitle,
    }),
    ...(translations?.seo?.metaDescription && {
      abstract: translations.seo.metaDescription,
    }),
  };

  return jsonLd;
}

export function ProjectsJsonLdScript({
  projectsData,
  ...props
}: ProjectsJsonLdProps) {
  const jsonLd = generateProjectsJsonLd({ projectsData, ...props });

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
