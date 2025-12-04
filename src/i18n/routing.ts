import { defineRouting } from "next-intl/routing";
export type Pathnames = {
  "/": { az: string; en: string; ru: string };
  "[slug]": { az: string; en: string; ru: string };
  "/about": { az: string; en: string; ru: string };
  "/contact": { az: string; en: string; ru: string };
};
export const routing = defineRouting({
  // locales: ["az", "en", "ru"],
  locales: ["az"],
  defaultLocale: "az",
  localePrefix: "as-needed", // 🔴 as-needed-ə qayıtdıq
  localeDetection: false, // 🔴 Loop qarşısını alır
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
  },
});
