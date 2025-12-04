import { CACHE_TAG_GROUPS } from "@/src/config/cacheTags";
import { Locales } from "@/src/generated/prisma/enums";
import { db } from "@/src/lib/admin/prismaClient";
import { createCachedAction } from "@/src/lib/cache/createCachedAction";

type GetProps = {
  locale: Locales;
};

const fetchLayout = async ({ locale }: GetProps) => {
  const [socialData] = await Promise.all([
    db.social.findMany({
      where: {
        status: "published",
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);
  return {
    data: {
      socialData,
    },
  };
};

export const getLayoutServer = createCachedAction({
  cacheKey: CACHE_TAG_GROUPS.LAYOUT,
  revalidate: 60,
  fetcher: fetchLayout,
});
