// src/utils/calculateReadTime.ts
import { Locales } from "@/src/generated/prisma/client";

type SupportedLocale = keyof typeof translations;

const translations = {
  az: (count: number) => `${count} dəqiqə`,
  en: (count: number) => `${count} ${count === 1 ? "minute" : "minutes"}`,
  ru: (count: number) => {
    // Russian plural rules
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${count} минут`;
    }
    if (lastDigit === 1) {
      return `${count} минута`;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} минуты`;
    }
    return `${count} минут`;
  },
} as const;

function isSupportedLocale(locale: Locales): locale is SupportedLocale {
  return locale in translations;
}

export function calculateReadTime(
  text: string,
  locale: Locales = "az"
): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  // Use locale if supported, otherwise fallback to 'az'
  const selectedLocale = isSupportedLocale(locale) ? locale : "az";
  return translations[selectedLocale](minutes);
}
