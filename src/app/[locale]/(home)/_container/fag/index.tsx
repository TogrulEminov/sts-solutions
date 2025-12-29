import React from "react";
import FaqAccordion from "./accardion";

export default function FagSection() {
  return (
    <section className="py-10 lg:py-25">
      <div className="container">
        <div className="flex-col flex lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col space-y-2 lg:space-y-4">
            <strong className="font-inter font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-ui-4">
              Tez-tez Verilən Suallar
            </strong>
            <p className="font-inter font-bold  text-2xl lg:text-[32px] lg:leading-[42px] text-ui-5">
              Cavabları Burada Tapın!
            </p>
          </div>
          <div className="col-span-8">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
