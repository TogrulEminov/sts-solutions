import React from "react";
import CardWrapper from "./wrapper";
import GlobalPagination from "@/src/globalElements/pagination";

export default function SolutionsCardWrapper() {
  return (
    <section className="lg:py-20">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <article className="lg:max-w-2xl flex flex-col space-y-2">
          <strong className="font-inter font-bold lg:text-[40px] lg:leading-12 text-ui-3">
            Həllərimiz
          </strong>
          <p className="font-inter font-medium text-base text-ui-3">
            İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv edən
            ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
            hazırlayırıq.
          </p>
        </article>
        <CardWrapper />
        <GlobalPagination total={120} />
      </div>
    </section>
  );
}
