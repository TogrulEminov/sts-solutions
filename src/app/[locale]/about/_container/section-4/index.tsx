import React from "react";
import ProcessSteps from "./line";

export default function ProcessSection() {
  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <strong className="font-inter font-extrabold text-2xl lg:text-[46px] lg:leading-13.5 text-ui-1">
            Məqsədimiz
          </strong>
          <p className="lg:text-right lg:max-w-lg  font-inter font-normal text-base lg:text-lg text-ui-7">
            Məqsədimiz texniki həlləri effektiv təşkil etməklə sifarişçilərin
            aşağıdakı nəticələrin əldə olunmasına yönəlmişdir:
          </p>
        </div>
        <ProcessSteps />
      </div>
    </section>
  );
}
