"use client";
import { getTranslatedSlug } from "@/src/actions/client/slug.actions";
import useOutSideClick from "@/src/hooks/useOutSideClick";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { CustomLocales } from "@/src/services/interface";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";

interface Props {
  isSticky?: boolean;
}

type Language = {
  code: CustomLocales;
  name: string;
  display: string;
};

export default function LanguageBtn({ isSticky }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale() as CustomLocales;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { handleToggle, open, handleClose } = useOutSideClick({ ref });
  const [isPending, startTransition] = useTransition();

  const languages: Language[] = [
    { code: "az", name: "Azərbaycan", display: "Az" },
    { code: "en", name: "English", display: "En" },
    { code: "ru", name: "Русский", display: "Ru" },
  ];

  const [selectedLang, setSelectedLang] = useState<Language>(
    languages.find((l) => l.code === currentLocale) || languages[0]
  );

  const handleChangeLanguage = async (lang: Language) => {
    const newLocale = lang.code;

    if (currentLocale === newLocale || isPending) return;

    setSelectedLang(lang);
    handleClose();

    startTransition(async () => {
      try {
        const rawSlug = params?.slug;
        const rawCategory = params?.category;

        const slug =
          typeof rawSlug === "string"
            ? rawSlug
            : Array.isArray(rawSlug)
            ? rawSlug[rawSlug.length - 1]
            : undefined;

        const category =
          typeof rawCategory === "string"
            ? rawCategory
            : Array.isArray(rawCategory)
            ? rawCategory[rawCategory.length - 1]
            : undefined;

        // Pathname-dən type-ı müəyyən et
        const pathSegments = pathname.split("/").filter(Boolean);
        const locales = ["az", "en", "ru"];
        const cleanSegments = pathSegments.filter(
          (seg) => !locales.includes(seg)
        );

        let type = cleanSegments[0];

        // Routing mapping
        const routingMap: Record<string, string> = {
          // services
          xidmetler: "services",
          services: "services",
          uslugi: "services",
          // blog
          bloq: "blog",
          blog: "blog",
          bloqi: "blog",
          // solutions
          hellerimiz: "solutions",
          solutions: "solutions",
          reseniya: "solutions",
          // projects
          layiheler: "projects",
          projects: "projects",
          projecti: "projects",
        };

        type = routingMap[type] || type;

        let newSlug = slug;
        let newCategory = category;

        // 🔴 Case 1: /services/[category]/[slug] - SubCategory
        if (type === "services" && category && slug) {
          const result = await getTranslatedSlug({
            currentLocale,
            newLocale,
            slug: slug,
            type: "servicesSubCategory",
            category: category,
          });

          if (result.success) {
            newSlug = result.translatedSlug;
            newCategory = result.translatedCategory;
          }
        }
        // 🔴 Case 2: /services/[category] - Category
        else if (type === "services" && category && !slug) {
          const result = await getTranslatedSlug({
            currentLocale,
            newLocale,
            slug: category,
            type: "servicesCategory",
          });

          if (result.success) {
            newCategory = result.translatedSlug;
          }
        }
        // 🔴 Case 3: /blog/[slug], /solutions/[slug], /projects/[slug]
        else if (slug && type) {
          const result = await getTranslatedSlug({
            currentLocale,
            newLocale,
            slug: slug,
            type: type,
          });

          if (result.success) {
            newSlug = result.translatedSlug;
          }
        }

        // Yeni params yaratmaq
        const newParams: Record<string, string> = {};

        if (newCategory) {
          newParams.category = newCategory;
        }

        if (newSlug) {
          newParams.slug = newSlug;
        }

        // Router yönləndirmə
        if (Object.keys(newParams).length > 0) {
          router.push(
            {
              pathname,
              params: newParams,
            } as any,
            { locale: newLocale }
          );
        } else {
          router.push(pathname as any, { locale: newLocale });
        }
      } catch (error) {
        console.error("Language change error:", error);
        // Fallback: sadəcə locale dəyişdir
        router.push(pathname as any, { locale: newLocale });
      }
    });
  };

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        animation: isSticky ? "none" : "slideInRight 0.6s ease-out 0.2s both",
      }}
    >
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105 overflow-hidden"
        aria-label="Dil seçimi"
        aria-expanded={open}
        disabled={isPending}
      >
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>

        <Globe className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300" />
        <span className="text-white text-sm font-inter font-medium">
          {selectedLang.display}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute z-100 top-full left-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-100 visible translate-y-0"
            : "opacity-0 scale-95 invisible -translate-y-2"
        }`}
      >
        <div className="h-1 bg-linear-to-r from-ui-1 via-cyan-400 to-ui-1"></div>

        <div className="p-2">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleChangeLanguage(lang)}
              disabled={isPending}
              className={`group w-full cursor-pointer flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                currentLocale === lang.code
                  ? "bg-ui-1 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 text-gray-700 hover:scale-102 hover:translate-x-1"
              } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{
                animation: open
                  ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-inter text-sm font-medium">
                  {lang.display}
                </span>
              </div>

              {currentLocale === lang.code && (
                <Check className="w-4 h-4 animate-[scaleIn_0.3s_ease-out]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
