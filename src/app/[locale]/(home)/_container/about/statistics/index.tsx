"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { id: 1, end: 1250, label: "Uğurlu tədbir", suffix: "+" },
  { id: 2, end: 120, label: "Layihə", suffix: "+" },
  { id: 3, end: 30, label: "Partnyor şirkət", suffix: "+" },
  { id: 3, end: 6, label: "Əsas sektor" },
];

export default function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div className="flex items-center flex-wrap gap-5" ref={ref}>
      {stats?.map((stat, index) => {
        return (
          <div className="flex flex-col space-y-1" key={index}>
            <div className="font-inter  text-[32px] lg:text-[40px] lg:leading-[58px] text-ui-1 font-extrabold">
              {inView ? (
                <CountUp
                  start={0}
                  end={stat.end}
                  className="font-inter"
                  duration={2.5}
                  suffix={stat.suffix}
                  separator=","
                />
              ) : (
                <span>0{stat.suffix}</span>
              )}
            </div>

            <span className="font-inter font-medium lg:text-lg lg:leading-[22px] text-ui-5">
              {stat?.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
