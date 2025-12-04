import { CustomLocales } from "../services/interface";

// Middleware və ya helper funksiya
export function validateLocale(locale: string): CustomLocales {
  const validLocales: CustomLocales[] = ["az", "en", "ru"]; // sizin locales

  if (!validLocales.includes(locale as CustomLocales)) {
    throw new Error("Invalid locale");
  }

  return locale as CustomLocales;
}
