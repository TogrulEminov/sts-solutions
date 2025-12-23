import React from "react";
import FaqAccordion from "./accardion";

export default function FagSection() {
  return (
    <section className="lg:py-25">
      <div className="container">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4 flex flex-col space-y-4">
            <strong className="font-inter font-bold lg:text-[32px] lg:leading-[42px] text-ui-4">
              Tez-tez Verilən Suallar
            </strong>
            <p className="font-inter font-bold lg:text-[32px] lg:leading-[42px] text-ui-5">
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
