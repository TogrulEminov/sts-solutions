"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { id: 1, end: 120, label: "Layihə" },
  { id: 2, end: 30, label: "Partnyor şirkət" },
  { id: 3, end: 15, label: "Uğurlu tədbir" },
  { id: 4, end: 6, label: "Əsas sektor" },
];

export default function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div className="grid grid-cols-2 max-w-lg  items-center" ref={ref}>
      {stats?.map((stat, index) => {
        return (
          <div
            className="flex flex-col nth-[3]:border-b-0 nth-[4]:border-b-0 border-ui-22 even:border-r-0 p-10 space-y-3 border-r border-b"
            key={index}
          >
            <div className="font-manrope text-[56px] lg:text-[80px] lg:leading-[90px] text-ui-1 font-extrabold">
              {inView ? (
                <>
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.5}
                    separator=","
                  />
                </>
              ) : (
                <span>0</span>
              )}
            </div>

            <span className="font-manrope font-semibold text-xl lg:text-2xl lg:leading-7 text-ui-2">
              {stat?.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
