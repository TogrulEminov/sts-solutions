import React from "react";
import ReactFancyBox from "@/src/lib/fancybox";
import GalleryCard from "@/src/globalElements/cards/gallery";

export default function ProjectsContent() {
  const getSpanClass = (index: number) => {
    const patterns = [
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-6 lg:row-span-2",
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-3",
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-3",
      "h-60  shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-6",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex flex-col space-y-2 lg:space-y-4">
          <strong className="font-inter text-ui-21 text-2xl lg:text-[40px] lg:leading-12 font-bold">
            Layihə haqqında məlumat
          </strong>
          <article className="font-inter font-normal text-base lg:text-xl text-ui-7">
            2023-cü ildə həyata keçirilmişdir. Layihə çərçivəsində sutkalıq 300
            ton tomat və 12 ton soyulmuş pomidor istehsal gücünə malik müəssisə
            qurulmuş və avtomatlaşdırılmışdır. Avtomatik idarəetmə sistemi
            Siemens platforması üzərində qurulmuşdur.
          </article>
        </div>
        <ReactFancyBox className="flex scrollbar-hidden items-center max-w-5xl lg:max-w-full overflow-x-auto lg:overflow-x-hidden lg:items-[unset] lg:grid lg:grid-cols-12  md:auto-rows-[240px] lg:auto-rows-[280px] gap-4 lg:gap-5">
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <div key={index} className={getSpanClass(index)}>
                <GalleryCard index={index} className="w-full shrink-0" />
              </div>
            );
          })}
        </ReactFancyBox>
      </div>
    </section>
  );
}
