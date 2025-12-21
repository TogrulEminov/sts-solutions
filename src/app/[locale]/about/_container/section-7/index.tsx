import React from "react";
import SlideArea from "./slide";

export default function PartnersSection() {
  return (
    <section className="lg:pb-25">
      <div className="flex flex-col space-y-10">
        <div className="container">
          <strong className="font-manrope lg:text-[40px] lg:leading-12 text-ui-2 font-bold">
            10-dan çox şirkətlə əməkdaşlığımız
          </strong>
        </div>
        <SlideArea />
      </div>
    </section>
  );
}
