import { Link } from "@/src/i18n/navigation";
import SliderArea from "./slider";
import HeroImage from "./img";
import { IAbout } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  existingData: IAbout;
}
export default async function HeroAbout({ existingData }: Props) {
  const translations = existingData?.translations?.[0];
  const t = await getTranslations("about");
  return (
    <section className="py-12 lg:py-20 h-[55vh] lg:h-lvh flex items-center relative overflow-hidden">
      <HeroImage />
      <div className="absolute inset-0 w-full h-full z-2 bg-black/45"></div>
      <div className="container relative z-4">
        <article className="flex flex-col space-y-5 lg:space-y-10 max-w-4xl animate-fadeInUp">
          <h1 className="font-inter font-extrabold  text-[32px] leading-10.5 lg:text-[56px] lg:leading-16 text-white">
            {translations?.title}
          </h1>
          {translations?.description && (
            <p className="font-inter font-normal text-base lg:text-[28px] lg:leading-9 text-white">
              {translations?.description}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-2 lg:gap-4">
            <Link
              href={"/services"}
              className="flex items-center justify-center bg-ui-20 px-4 lg:px-6 py-2 min-w-25 lg:min-w-38.5 min-h-8 lg:min-h-10 h-fit w-fit  border-[0.5px] border-white rounded-[30px] font-inter font-semibold text-xs lg:text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              {t("services")}
            </Link>
            <Link
              href={"/solutions"}
              className="flex items-center justify-center bg-ui-20 px-4 lg:px-6 py-2 min-w-25 lg:min-w-38.5 min-h-8 lg:min-h-10 h-fit w-fit  border-[0.5px] border-white rounded-[30px] font-inter font-semibold text-xs lg:text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              {t("solutions")}
            </Link>
            <Link
              href={"/projects"}
              className="flex items-center justify-center bg-ui-20 px-4 lg:px-6 py-2 min-w-25 lg:min-w-38.5 min-h-8 lg:min-h-10 h-fit w-fit  border-[0.5px] border-white rounded-[30px] font-inter font-semibold text-xs lg:text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              {t("projects")}
            </Link>
          </div>
        </article>
      </div>
      <SliderArea sectors={translations?.sectors || []} />
    </section>
  );
}
