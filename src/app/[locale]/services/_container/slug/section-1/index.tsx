import CustomImage from "@/src/globalElements/ImageTag";
import React from "react";
import logo from "@/public/assets/logo/sts-logo.svg";
export default function SectionOne() {
  return (
    <section className="py-10 lg:py-25 bg-ui-23">
      <div className="container">
        <div className="flex flex-col space-y-5 lg:space-y-10">
          <figure className="w-15 h-15 lg:w-20 lg:h-20   flex items-center justify-center bg-ui-1 border-4 border-white rounded-lg lg:rounded-2xl">
            <CustomImage
              width={40}
              title=""
              src={logo}
              height={40}
              className="w-8 lg:w-12 brightness-0 invert-100"
            />
          </figure>
          <h1 className="font-inter  max-w-3xl font-bold text-2xl lg:text-[46px] lg:leading-14.5 text-ui-1">
            Avtomatlaşdırma və İdarəetmə Sistemləri
          </h1>
        </div>
      </div>
    </section>
  );
}
