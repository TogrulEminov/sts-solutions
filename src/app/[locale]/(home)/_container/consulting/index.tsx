import CustomImage from "@/src/globalElements/ImageTag";
import React from "react";
import bgImage from "@/public/assets/consulting-bg.webp";
import FormContactWrapper from "./form";
import Information from "./information";
export default function ConsultingSection() {
  return (
    <section className="lg:py-25">
      <div className="container">
        <div className="relative rounded-[40px] bg-ui-10 p-10 overflow-hidden">
          <CustomImage
            width={1200}
            height={880}
            title=""
            src={bgImage}
            className="absolute inset-0 w-full h-full object-cover z-1"
          />
          <div className="z-2 absolute inset-0 w-full h-full consultingGradient"></div>
          <div className="flex flex-col space-y-10 relative z-3">
            <article className="flex flex-col space-y-5 ">
              <strong className="font-manrope font-bold lg:leading-[54px] lg:text-[46px] text-white">
                Rəy və təklifləriniz
              </strong>
              <p className="font-manrope text-sm text-white max-w-sm">
                See how the world has fastest-growing companies use Clearbit to
                power efficient revenue engines.
              </p>
            </article>
            <div className=" grid lg:grid-cols-12 gap-10 items-center">
              <FormContactWrapper />
              <Information/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
