export const CACHE_TAG_GROUPS = {
  HOME: "homepage-cache",
  LAYOUT: "layout-cache",
  ABOUT: "about-cache",
  BLOG: "blog-cache",
  BLOG_DETAIL: "blog-detail-cache",
  CONTACT: "contact-cache",
  PROJECTS: "projects-cache",
  PROJECTS_DETAIL: "projects-detail-cache",
  SERVICE: "service-cache",
  SERVICE_CATEGORY: "service-category-cache",
  SERVICE_CATEGORY_DETAIL: "service-category-detail-cache",
  SOLUTIONS: "solutions-cache",
  SOLUTIONS_DETAIL: "solutions-detail-cache",
  CATEGORIES: "categories-cache",
} as const;
export type CacheTag = (typeof CACHE_TAG_GROUPS)[keyof typeof CACHE_TAG_GROUPS];

export const ALL_CACHE_TAG_GROUPS: CacheTag[] = Object.values(CACHE_TAG_GROUPS);
