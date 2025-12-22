import React from "react";
import CardWrapper from "./card-wrapper";

export default function SectionThree() {
  return (
    <section className="pb-25">
      <div className="container flex flex-col space-y-10">
        <h2 className="font-manrope font-bold lg:text-[40px] lg:leading-12 text-ui-7">
          Mühəndislik xidmətlərimizə aiddir
        </h2>
        <CardWrapper />
      </div>
    </section>
  );
}
