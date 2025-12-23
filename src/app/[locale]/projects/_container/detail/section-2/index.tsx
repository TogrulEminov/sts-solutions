import React from "react";
import ReactFancyBox from "@/src/lib/fancybox";
import GalleryCard from "@/src/globalElements/cards/gallery";

export default function ProjectsContent() {
  const getSpanClass = (index: number) => {
    const patterns = [
      "col-span-12 md:col-span-6 lg:col-span-6 lg:row-span-2",
      "col-span-12 md:col-span-6 lg:col-span-3",
      "col-span-12 md:col-span-6 lg:col-span-3",
      "col-span-12 md:col-span-6 lg:col-span-6",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <section className="lg:py-25">
      <div className="container flex flex-col space-y-10">
        <div className="flex flex-col space-y-4">
          <strong className="font-inter text-ui-21 lg:text-[40px] lg:leading-12 font-bold">
            Layihə haqqında məlumat
          </strong>
          <article className="font-inter font-normal lg:text-xl text-ui-7">
            2023-cü ildə həyata keçirilmişdir. Layihə çərçivəsində sutkalıq 300
            ton tomat və 12 ton soyulmuş pomidor istehsal gücünə malik müəssisə
            qurulmuş və avtomatlaşdırılmışdır. Avtomatik idarəetmə sistemi
            Siemens platforması üzərində qurulmuşdur.
          </article>
        </div>
        <ReactFancyBox className="grid grid-cols-12 auto-rows-[200px] md:auto-rows-[240px] lg:auto-rows-[280px] gap-4 lg:gap-5">
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <div key={index} className={getSpanClass(index)}>
                <GalleryCard index={index} />
              </div>
            );
          })}
        </ReactFancyBox>
      </div>
    </section>
  );
}
