"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface Props {
  count: number;
}
export default function CountArea({ count }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className="text-ui-1 font-inter text-[100px] lg:text-[120px] leading-normal font-extrabold"
    >
      {inView ? (
        <CountUp
          start={0}
          end={count}
          className="font-inter"
          duration={2.5}
          separator=","
        />
      ) : (
        <span className="text-current">0</span>
      )}
    </div>
  );
}
