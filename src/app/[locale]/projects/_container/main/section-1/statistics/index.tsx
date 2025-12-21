"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { id: 1, end: 10, label: "Təcrübə" },
  { id: 2, end: 30, label: "Partnyor şirkət" },
];

export default function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div className="relative w-full lg:max-w-sm" ref={ref}>
      <div className="flex justify-start gap-x-10 h-29 rounded-tl-xl rounded-bl-xl border-[0.5px] p-6 border-white bg-ui-23/10 border-r-transparent items-stretch relative overflow-visible">
        {stats?.map((stat, index) => {
          return (
            <div className="flex flex-col space-y-3 relative z-10" key={index}>
              <span className="font-manrope font-semibold lg:text-base text-white">
                {stat?.label}
              </span>
              <div className="font-manrope lg:text-4xl text-white font-extrabold">
                {inView ? (
                  <>
                    <CountUp
                      start={0}
                      end={stat.end}
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
        <div className="hidden lg:block absolute h-29 left-[100.1%] -top-[0.5px] bottom-0 w-screen border-t-[0.5px] border-b-[0.5px] border-t-white border-b-white bg-ui-23/10"></div>
      </div>
    </div>
  );
}