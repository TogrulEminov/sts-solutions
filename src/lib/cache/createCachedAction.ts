import { unstable_cache } from "next/cache";
import { CacheTag } from "@/src/config/cacheTags";

type CacheParams = Record<string, unknown> | undefined;

type CreateCachedActionOptions<P extends CacheParams, R> = {
  cacheKey: CacheTag; // Artıq CACHE_TAGS-dan birbaşa götürülür
  revalidate?: number;
  fetcher: (params: P) => Promise<R>;
};

export function createCachedAction<P extends CacheParams, R>({
  cacheKey,
  revalidate = 60,
  fetcher,
}: CreateCachedActionOptions<P, R>) {
  return async (params: P) => {
    return unstable_cache(
      () => fetcher(params),
      buildCacheKey(cacheKey, params),
      {
        revalidate,
        tags: [cacheKey], // Tag-ı birbaşa cacheKey-dən götürürük
      }
    )();
  };
}

function buildCacheKey(prefix: string, params: CacheParams) {
  if (!params || (isObject(params) && Object.keys(params).length === 0)) {
    return [prefix];
  }
  return [prefix, serializeParams(params)];
}

function serializeParams(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(serializeParams).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `"${key}":${serializeParams(val)}`);

  return `{${entries.join(",")}}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
