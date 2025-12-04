export const CACHE_TAG_GROUPS = {
  HOME: "homepage-cache",
  LAYOUT: "layout-cache",
} as const;
export type CacheTag = (typeof CACHE_TAG_GROUPS)[keyof typeof CACHE_TAG_GROUPS];

export const ALL_CACHE_TAG_GROUPS: CacheTag[] = Object.values(CACHE_TAG_GROUPS);
