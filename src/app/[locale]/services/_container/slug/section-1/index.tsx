import CustomImage from "@/src/globalElements/ImageTag";
import React from "react";

export default function SectionOne() {
  return (
    <section className="lg:py-30 bg-ui-23">
      <div className="container">
        <div className="flex flex-col space-y-10">
          <figure className="w-20 h-20   flex items-center justify-center bg-ui-1 border-4 border-white rounded-2xl">
            <CustomImage
              width={40}
              title=""
              src={
                "https://res.cloudinary.com/da403zlyf/image/upload/v1766404896/worker_cuqick.png"
              }
              height={40}
              className="w-10 h-10 brightness-0 invert-100"
            />
          </figure>
          <h1 className="font-inter  max-w-3xl font-bold lg:text-[46px] lg:leading-14.5 text-ui-1">
            Avtomatlaşdırma və İdarəetmə Sistemləri
          </h1>
        </div>
      </div>
    </section>
  );
}
