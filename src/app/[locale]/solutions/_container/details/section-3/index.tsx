import GalleryCard from "@/src/globalElements/cards/gallery";
import React from "react";

export default function SectionThree() {
  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <strong className="font-inter  font-extrabold text-2xl lg:text-[40px] lg:leading-12 text-ui-2">
          Hansı problemləri həll edir?
        </strong>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6">
          {Array.from({ length: 5 }).map((item, index) => {
            return (
              <div
                className="flex text-base lg:text-2xl text-ui-7 font-inter font-normal  items-center gap-4"
                key={index}
              >
                <span className="w-8 lg:w-14 font-extrabold  text-sm shrink-0 lg:text-2xl bg-ui-23 text-ui-1 h-8 lg:h-14 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                Əl ilə idarə olunan proseslər
              </div>
            );
          })}
        </div>
        <div className="flex items-center max-w-5xl overflow-x-auto scrollbar-hidden pb-4  lg:max-w-full lg:grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((item, index) => {
            return (
              <GalleryCard
                key={index}
                className="h-60! shrink-0 w-[250px] lg:w-full lg:h-full!"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
