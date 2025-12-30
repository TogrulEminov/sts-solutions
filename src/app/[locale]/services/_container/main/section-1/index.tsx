import CustomImage from "@/src/globalElements/ImageTag";
import { highlightActiveWord } from "@/src/utils/highlight";

export default function SectionOne() {
  return (
    <div className="py-10 lg:py-25 bg-ui-24">
      <div className="container grid  grid-cols-1 lg:grid-cols-12 items-center gap-5">
        <div className="flex flex-col space-y-5 lg:col-span-7">
          <h1 className="font-inter text-2xl lg:text-[46px] font-semibold lg:leading-14.5 text-ui-1">
            {highlightActiveWord(
              "  Texnologiya və təcrübənin birləşdiyi, etibarlı və effektiv xidmətlərimiz",
              "etibarlı və effektiv xidmətlərimiz",
              "text-ui-2"
            )}
          </h1>
          <p className="text-ui-7 font-inter text-sm text-justify lg:text-start lg:text-2xl">
            Şirkətimiz sənaye və texnoloji proseslər üçün geniş spektrdə
            mühəndislik xidmətləri təqdim edir. Avtomatlaşdırma və idarəetmə
            sistemlərindən elektrik təchizatı, mexaniki və elektromexaniki
            sistemlərə, alternativ enerji həllərindən ölçü və nəzarət
            sistemlərinə qədər bütün mərhələlərdə layihələndirmə, icra,
            modernizasiya və texniki dəstək təmin edirik.
          </p>
        </div>
        <CustomImage
          width={446}
          height={283}
          title=""
          src={
            "https://res.cloudinary.com/da403zlyf/image/upload/v1766332215/068b0ad823abd6d13ea028a7c184bda060f72f3d_fwver7.png"
          }
          className="w-full lg:max-w-[446px] h-auto border-4 border-ui-1/18 rounded-tr-[44px] rounded-bl-[44px]  lg:col-span-5"
        />
      </div>
    </div>
  );
}
