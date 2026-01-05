"use client";
import { CountGenericType } from "@/src/services/interface";
import { parseJSON } from "@/src/utils/checkSlug";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Props {
  existingData?: CountGenericType[];
}

export default function Statistics({ existingData }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  if (!existingData?.length) return;
  return (
    <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5" ref={ref}>
      {parseJSON<CountGenericType>(existingData)?.map((stat, index) => {
        return (
          <div className="flex flex-col space-y-1" key={index}>
            <div className="font-inter  text-[40px] leading-[58px] text-ui-1 font-extrabold">
              {inView ? (
                <CountUp
                  start={0}
                  end={Number(stat.count)}
                  className="font-inter"
                  duration={2.5}
                  suffix={stat.suffix}
                  separator=","
                />
              ) : (
                <span>0{stat.suffix}</span>
              )}
            </div>

            <span className="font-inter font-medium  text-sm lg:text-lg lg:leading-[22px] text-ui-5">
              {stat?.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
