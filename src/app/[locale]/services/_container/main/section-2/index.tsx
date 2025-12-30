import React from "react";
import CardWrapper from "./wrapper";

export default function SectionTwo() {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="max-w-2xl flex flex-col space-y-3 lg:space-y-5">
          <h2 className="font-inter text-2xl lg:text-[40px] font-bold lg:leading-12 text-ui-21">
            Xidmət təkliflərimiz
          </h2>
          <p className="font-inter text-base text-ui-21 font-medium">
            İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv edən
            ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
            hazırlayırıq.
          </p>
        </div>
        <CardWrapper />
      </div>
    </section>
  );
}
