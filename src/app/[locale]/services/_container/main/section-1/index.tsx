import GalleryCard from "@/src/globalElements/cards/gallery";
import React from "react";

export default function SectionOne() {
  return (
    <div className="py-10 lg:py-25 bg-ui-24">
      <div className="container flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <h1 className="font-manrope lg:text-[46px] lg:leading-14.5 text-ui-1">
            Texnologiya və təcrübənin birləşdiyi, etibarlı və effektiv
            xidmətlərimiz
          </h1>
          <p className="text-ui-7 font-manrope text-2xl">
            Şirkətimiz sənaye və texnoloji proseslər üçün geniş spektrdə
            mühəndislik xidmətləri təqdim edir. Avtomatlaşdırma və idarəetmə
            sistemlərindən elektrik təchizatı, mexaniki və elektromexaniki
            sistemlərə, alternativ enerji həllərindən ölçü və nəzarət
            sistemlərinə qədər bütün mərhələlərdə layihələndirmə, icra,
            modernizasiya və texniki dəstək təmin edirik.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <GalleryCard />
          <GalleryCard />
        </div>
      </div>
    </div>
  );
}
