"use client";
import React from "react";
import SlideArea from "./slide";

export default function PartnerSection() {
  return (
    <section className="py-10 overflow-hidden bg-ui-1/13">
      <div className="container">
        <div className="flex lg:items-center flex-col lg:flex-row gap-8 lg:mb-8">
          <strong className="font-manrope  text-start font-bold text-2xl lg:text-[43px] lg:leading-16 text-ui-2 whitespace-nowrap">
            <span className="text-6 block">10-dan çox şirkətlə</span>
            əməkdaşlığımız
          </strong>
          <SlideArea />
        </div>
      </div>
    </section>
  );
}
