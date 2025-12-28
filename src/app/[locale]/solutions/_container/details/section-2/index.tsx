import CustomImage from "@/src/globalElements/ImageTag";
import React from "react";

export default function SectionTwo() {
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="grid  grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="flex flex-col space-y-5 lg:col-span-7">
            <strong className="font-inter font-extrabold lg:text-[40px] lg:leading-12 text-ui-2">
              Bu həll nə üçündür?
            </strong>
            <article className="lg:text-2xl text-ui-7 font-inter font-normal">
              PLC və SCADA sistemləri istehsal və sənaye proseslərinin avtomatik
              idarə olunmasını təmin edir. Bu həllər vasitəsilə avadanlıqların
              işi mərkəzləşdirilmiş şəkildə nəzarətdə saxlanılır, insan
              faktorundan yaranan risklər azalır və istehsalın səmərəliliyi
              artır.
            </article>
          </div>
          <CustomImage
            width={446}
            height={283}
            title=""
            src={
              "https://res.cloudinary.com/da403zlyf/image/upload/v1766332215/068b0ad823abd6d13ea028a7c184bda060f72f3d_fwver7.png"
            }
            className="w-full lg:max-w-[446px] h-auto border-4 border-ui-1/18 rounded-tr-[44px] rounded-bl-[44px]  lg:col-span-5"
          />
        </div>
      </div>
    </section>
  );
}
