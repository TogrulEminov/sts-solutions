"use client";
import { useRef } from "react";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import Icons from "@/public/icons";
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import AnimatedProjectButton from "@/src/ui/link/second";
import SolutionsCard from "@/src/globalElements/cards/solutions";

export default function SliderArea() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const breakpoints = {
    0: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 3.5 },
    1600: { slidesPerView: 4.5 },
  };
  const autoplayOptions = {
    delay: 3500,
    disableOnInteraction: false,
  };
  const keyboard = {
    enabled: true,
    onlyInViewport: false,
  };

  const handleSwiper = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <AnimatedProjectButton link="/" title="Ətraflı bax" />
        <div className="flex items-center gap-x-3 justify-center  w-fit">
          <button
            type="button"
            aria-label="prev button for services slider"
            onClick={goPrev}
            className=" cursor-pointer w-10 h-10 lg:w-17 lg:h-17 flex items-center justify-center rounded-full  bg-ui-1     transition-colors duration-200 hover:bg-ui-2"
          >
            <Icons.ArrowLeft />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="next button for services slider"
            className="w-10 h-10 lg:w-17 lg:h-17 cursor-pointer  flex items-center justify-center rounded-full  bg-ui-1     transition-colors duration-200 hover:bg-ui-2"
          >
            <Icons.ArrowRight />
          </button>
        </div>
      </div>
      <MySwiper
        modules={[Autoplay]}
        onSwiper={handleSwiper}
        breakpoints={breakpoints}
        spaceBetween={24}
        slideToClickedSlide={false}
        watchSlidesProgress={false}
        centeredSlides={false}
        slidesPerView={3}
        autoplay={autoplayOptions}
        roundLengths={true}
        keyboard={keyboard}
        className="w-full lg:min-w-screen"
        loop={true}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <SolutionsCard />
            </SwiperSlide>
          );
        })}
      </MySwiper>
    </div>
  );
}
