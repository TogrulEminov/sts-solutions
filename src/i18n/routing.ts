import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["az", "en", "ru"],
  defaultLocale: "az",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": {
      az: "/",
      en: "/",
      ru: "/",
    },

    "/about": {
      az: "/haqqimizda",
      en: "/about",
      ru: "/o-nas",
    },

    "/contact": {
      az: "/elaqe",
      en: "/contact",
      ru: "/kontakti",
    },
    "/projects": {
      az: "/layiheler",
      en: "/projects",
      ru: "/projecti",
    },
    "/projects/[slug]": {
      az: "/layiheler/[slug]",
      en: "/projects/[slug]",
      ru: "/projecti/[slug]",
    },
    "/blog": {
      az: "/bloq",
      en: "/blog",
      ru: "/bloqi",
    },
    "/blog/[slug]": {
      az: "/bloq/[slug]",
      en: "/blog/[slug]",
      ru: "/bloqi/[slug]",
    },
    "/services": {
      az: "/xidmetler",
      en: "/services",
      ru: "/uslugi",
    },
    "/services/[category]": {
      az: "/xidmetler/[category]",
      en: "/services/[category]",
      ru: "/uslugi/[category]",
    },
    "/services/[category]/[slug]": {
      az: "/xidmetler/[category]/[slug]",
      en: "/services/[category]/[slug]",
      ru: "/uslugi/[category]/[slug]",
    },
    "/solutions": {
      az: "/hellerimiz/",
      en: "/solutions/",
      ru: "/reseniya/",
    },
    "/solutions/[slug]": {
      az: "/hellerimiz/[slug]",
      en: "/solutions/[slug]",
      ru: "/reseniya/[slug]",
    },
  },
});

export type Pathnames = {
  "/services": { az: string; en: string; ru: string };
  "/projects": { az: string; en: string; ru: string };
  "/projects/[slug]": { az: string; en: string; ru: string };
  "/solutions": { az: string; en: string; ru: string };
  "/solutions/[slug]": { az: string; en: string; ru: string };
  "/blog": { az: string; en: string; ru: string };
  "/blog/[slug]": { az: string; en: string; ru: string };
  "/services/[category]/[slug]": { az: string; en: string; ru: string };
  "/services/[category]": { az: string; en: string; ru: string };
  "/about": { az: string; en: string; ru: string };
  "/contact": { az: string; en: string; ru: string };
};
