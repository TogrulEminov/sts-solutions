import React from "react";
import FirstArea from "./first-area";
import SecondArea from "./second-area";

export default function ServicesCategorySection() {
  return (
    <section className="py-20 bg-ui-2   overflow-hidden rounded-tl-[50px] rounded-br-[50px]">
      <div className="container flex flex-col  space-y-10">
        <div className="flex items-center justify-between">
          <strong className="max-w-sm font-inter font-extrabold lg:text-[46px] lg:leading-[54px] text-white">
            Xidmət təkliflərimiz
          </strong>
          <p className="font-inter font-normal lg:max-w-lg text-base text-right text-white">
            İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv edən
            ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
            hazırlayırıq.
          </p>
        </div>
        <FirstArea />
        <SecondArea />
      </div>
    </section>
  );
}
