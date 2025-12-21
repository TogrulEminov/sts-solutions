import React from "react";
import ProcessSteps from "./line";

export default function ProcessSection() {
  return (
    <section className="lg:pb-25">
      <div className="container flex flex-col space-y-10">
        <div className="flex items-center lg:justify-between">
          <strong className="font-manrope font-extrabold lg:text-[46px] lg:leading-13.5 text-ui-1">
            Məqsədimiz
          </strong>
          <p className="lg:text-right lg:max-w-lg  font-manrope font-normal text-lg text-ui-7">
            Məqsədimiz texniki həlləri effektiv təşkil etməklə sifarişçilərin
            aşağıdakı nəticələrin əldə olunmasına yönəlmişdir:
          </p>
        </div>
        <ProcessSteps/>
      </div>
    </section>
  );
}
