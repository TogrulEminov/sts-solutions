import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import GoBack from "./button";

type NotFoundContainerProps = {
  locale: "az" | "en" | "ru";
};

const translations = {
  az: {
    title: "Səhifə Tapılmadı",
    description:
      "Axtardığınız səhifə mövcud deyil və ya köçürülüb. Zəhmət olmasa əsas səhifəyə qayıdın.",
    homeButton: "Ana Səhifə",
    popularLinks: "Populyar səhifələrə keçid:",
    links: {
      about: "Haqqımızda",
      services: "Xidmətlər",
      solutions: "Həllər",
      projects: "Layihələr",
      news: "Xəbərlər",
      contact: "Əlaqə",
    },
  },
  en: {
    title: "Page Not Found",
    description:
      "The page you are looking for does not exist or has been moved. Please return to the home page.",
    homeButton: "Home Page",
    popularLinks: "Popular pages:",
    links: {
      about: "About Us",
      services: "Services",
      solutions: "Solutions",
      projects: "Projects",
      news: "News",
      contact: "Contact",
    },
  },
  ru: {
    title: "Страница не найдена",
    description:
      "Страница, которую вы ищете, не существует или была перемещена. Пожалуйста, вернитесь на главную страницу.",
    homeButton: "Главная страница",
    popularLinks: "Популярные страницы:",
    links: {
      about: "О нас",
      services: "Услуги",
      solutions: "Решения",
      projects: "Проекты",
      news: "Новости",
      contact: "Контакты",
    },
  },
};

export default function NotFoundContainer({ locale }: NotFoundContainerProps) {
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-ui-21 flex items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-linear-to-br from-ui-2/30 via-ui-21 to-ui-14/50" />
      
      <div className="max-w-3xl w-full text-center relative z-10">
        {/* 404 Text */}
        <div className="relative mb-6 sm:mb-8">
          <h1 className="text-[120px] sm:text-[180px] md:text-[280px] font-bold text-ui-2/40 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-linear-to-br from-ui-1/20 to-ui-4/20 animate-pulse" />
          </div>
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-2 border-ui-1/30 animate-ping" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-14 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-ui-19 max-w-xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col relative z-4 sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-12 sm:mb-16">
          <GoBack locale={locale} />
          <Link
            href={`/${locale}`}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-ui-1 text-white rounded-lg font-semibold hover:bg-ui-4 transition-all duration-300 shadow-lg shadow-ui-1/20 hover:shadow-xl hover:shadow-ui-1/30 hover:scale-105"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
            <span className="text-sm sm:text-base">{t.homeButton}</span>
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-ui-2/50 px-4">
          <p className="text-ui-19 font-semibold mb-5 sm:mb-7 text-sm sm:text-base">
            {t.popularLinks}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Link
              href={`/${locale}/about`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.about}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.services}
            </Link>
            <Link
              href={`/${locale}/solutions`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.solutions}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.projects}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.news}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-ui-2/50 backdrop-blur-sm text-ui-1 rounded-full hover:bg-ui-1 hover:text-white transition-all duration-300 border border-ui-1/30 hover:border-ui-1 hover:scale-105"
            >
              {t.links.contact}
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-ui-1/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-ui-4/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-ui-1/5 to-ui-4/5 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}