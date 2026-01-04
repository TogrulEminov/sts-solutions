"use client";
import Icons from "@/public/icons";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import "dayjs/locale/az";
import "dayjs/locale/ru";
import "dayjs/locale/en";
interface Props {
  date: string;
  readTime: string;
  locale: string;
}
export default function DateArea({ date, locale, readTime }: Props) {
  const t = useTranslations();
  dayjs.locale(locale);
  return (
    <div className="flex items-center gap-2 lg:gap-10">
      <div className="flex items-center gap-1 lg:gap-3">
        <figure className="bg-white/20 rounded-full w-8 h-8 lg:w-12.5 lg:h-12.5 flex items-center justify-center">
          <Icons.Calendar className="w-4 h-4 lg:w-6 lg:h-6" />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-[10px] lg:text-xs text-white font-normal">
            {t("blog.date")}
          </span>
          <time className="text-white text-sm lg:text-base font-inter font-medium">
            {dayjs(date).format("D MMMM YYYY")}
          </time>
        </article>
      </div>
      <div className="flex items-center gap-3">
        <figure className="bg-white/20  rounded-full w-8 h-8 lg:w-12.5 lg:h-12.5 flex items-center justify-center">
          <Icons.Clock className="w-4 h-4 lg:w-6 lg:h-6" />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-[10px] lg:text-xs text-white font-normal">
            {t("blog.readTime")}
          </span>
          <strong className="text-white text-sm lg:text-base font-inter font-medium">
            {readTime}
          </strong>
        </article>
      </div>
    </div>
  );
}
