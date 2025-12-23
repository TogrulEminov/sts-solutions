import React from "react";
import SliderArea from "./slider";

export default function SectionTwo() {
  return (
    <section className="py-25">
      <div className="container mb-20">
        <div className="flex flex-col space-y-5">
          <h2 className="font-inter lg:text-[40px] lg:leading-12 text-ui-7 font-bold">
            Ağıllı sistemlər, etibarlı enerji və davamlı texniki həllər
          </h2>
          <article className="font-inter font-normal lg:text-[28px] lg:leading-9 text-ui-7">
            Müxtəlif sənaye sahələri üçün avtomatlaşdırma, idarəetmə, enerji və
            mexaniki sistemlər üzrə kompleks mühəndislik xidmətləri təqdim
            edirik. Xidmətlərimiz layihələrin planlanmasından icrasına,
            modernizasiyasından texniki dəstəyinə qədər bütün mərhələləri əhatə
            edir. Müasir texnologiyalara və beynəlxalq standartlara əsaslanan
            yanaşmamızla proseslərin təhlükəsiz, səmərəli və fasiləsiz
            işləməsini təmin edirik.
          </article>
        </div>
      </div>
      <SliderArea />
    </section>
  );
}
