// revalidate.ts
"use server";

import { updateTag } from "next/cache";
import { ALL_CACHE_TAG_GROUPS, CacheTag } from "@/src/config/cacheTags";
import { headers } from "next/headers";

type RevalidateInput = CacheTag[] | CacheTag;
async function isAdminRoute(): Promise<boolean> {
  try {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";
    const referer = headersList.get("referer") || "";
    return pathname.startsWith("/manage") || referer.includes("/manage");
  } catch {
    return false;
  }
}

export async function revalidateAll(input?: RevalidateInput) {
  const isAdmin = await isAdminRoute();

  // ✅ Admin route-da heç vaxt revalidate etmə
  if (isAdmin) {
    console.log(
      "⚠️ Admin route - cache təmizlənmədi (React Query istifadə edilir)"
    );
    return;
  }

  const targetTags = input
    ? Array.isArray(input)
      ? input
      : [input]
    : ALL_CACHE_TAG_GROUPS;

  await Promise.all(targetTags.map((tag) => updateTag(tag)));
  console.log("✅ Cache təmizləndi:", targetTags);
}
