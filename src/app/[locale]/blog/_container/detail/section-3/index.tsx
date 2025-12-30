import React from "react";
import SliderArea from "./slider";

export default function ThirdSection() {
  return (
    <section className="pb-10 lg:pb-20 overflow-hidden">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <strong className="font-bold text-2xl lg:text-[40px] text-ui-3 font-inter lg:leading-12">
          Digər Digər bloqlar
        </strong>
        <SliderArea />
      </div>
    </section>
  );
}
