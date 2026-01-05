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
  if (!parseJSON<CountGenericType>(existingData)?.length) return null;

  return (
    <div
      className="grid grid-cols-2 max-w-lg  items-start lg:items-center"
      ref={ref}
    >
      {parseJSON<CountGenericType>(existingData)?.map((stat, index) => {
        return (
          <div
            className="flex flex-col nth-[3]:border-b-0 nth-[4]:border-b-0 border-ui-22 even:border-r-0 p-5 lg:p-10 space-y-3 border-r border-b"
            key={index}
          >
            <div className="font-inter text-2xl md:text-[56px] lg:text-[80px] lg:leading-[90px] text-ui-1 font-extrabold">
              {inView ? (
                <>
                  <CountUp
                    start={0}
                    end={Number(stat.count)}
                    duration={2.5}
                    separator=","
                  />
                </>
              ) : (
                <span>0</span>
              )}
            </div>

            <span className="font-inter font-semibold min-h-10 lg:min-h-fit md:text-xl lg:text-2xl lg:leading-7 text-ui-2">
              {stat?.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
