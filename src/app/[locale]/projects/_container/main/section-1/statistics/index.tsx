"use client";
import { CountGenericType } from "@/src/services/interface";
import { parseJSON } from "@/src/utils/checkSlug";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Props {
  existingData: CountGenericType[];
}

export default function Statistics({ existingData }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div className="relative w-full lg:max-w-sm" ref={ref}>
      <div className="flex justify-start  gap-x-5 lg:gap-x-10 h-20.5 lg:h-29 rounded-tl-md lg:rounded-tl-xl rounded-bl-md lg:rounded-bl-xl border-[0.5px] p-3 lg:p-6 border-white bg-ui-23/10 border-r-transparent items-center relative overflow-visible">
        {parseJSON<CountGenericType>(existingData)?.map((stat, index) => {
          return (
            <div
              className="flex flex-col space-y-1 lg:space-y-3 relative z-10"
              key={index}
            >
              <span className="font-inter font-semibold  text-sm lg:text-base text-white">
                {stat?.title}
              </span>
              <div className="font-inter text-2xl lg:text-4xl text-white font-extrabold">
                {inView ? (
                  <>
                    <CountUp
                      start={0}
                      end={Number(stat.count)}
                      duration={2.5}
                      separator=","
                      suffix="+"
                    />
                  </>
                ) : (
                  <span>0</span>
                )}
              </div>
            </div>
          );
        })}
        <div className="block absolute h-20.5 lg:h-29 left-[100.3%]  w-screen border-t-[0.5px] border-b-[0.5px] border-t-white border-b-white bg-ui-23/10"></div>
      </div>
    </div>
  );
}
