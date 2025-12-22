import { defineRouting } from "next-intl/routing";

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
  },
});
