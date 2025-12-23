import React from "react";
import SliderArea from "./slider";
import { AnimatedLinkV1 } from "@/src/ui/link/first";

export default function NewsSection() {
  return (
    <section className="py-10 lg:py-25 flex flex-col space-y-10  overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between gap-10">
          <article className="flex flex-col space-y-2">
            <strong className="font-inter font-bold lg:text-4xl text-ui-7">
              Xəbərlərimiz
            </strong>
            <p className="font-inter font-normal text-base text-ui-8">
              Discover articles and tutorials to help you build better
            </p>
          </article>
          <AnimatedLinkV1 link="/" title="Hamısı" />
        </div>
      </div>
      <SliderArea />
    </section>
  );
}
