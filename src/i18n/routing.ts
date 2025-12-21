import { defineRouting } from "next-intl/routing";
export type Pathnames = {
  "/": { az: string; en: string; ru: string };
  "[slug]": { az: string; en: string; ru: string };
  "/about": { az: string; en: string; ru: string };
  "/contact": { az: string; en: string; ru: string };
};
export const routing = defineRouting({
  locales: ["az"],
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
  },
});
