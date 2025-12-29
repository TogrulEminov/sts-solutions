"use client";
import { useRef, useState } from "react";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import Icons from "@/public/icons";
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import ProjectsCards from "./card";
import "swiper/css/pagination";

export default function SliderArea() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const breakpoints = {
    0: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.5 },
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
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
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
    <div className="relative  projects-slider">
      <MySwiper
        modules={[Autoplay]}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        breakpoints={breakpoints}
        spaceBetween={12}
        slideToClickedSlide={false}
        watchSlidesProgress={false}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={autoplayOptions}
        roundLengths={true}
        keyboard={keyboard}
        className="w-full lg:min-w-screen"
        loop={true}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <div
                className={`transition-all duration-500 ease-out ${
                  activeIndex === index ? "scale-100" : "scale-95 lg:scale-85"
                }`}
              >
                <ProjectsCards />
              </div>
            </SwiperSlide>
          );
        })}
      </MySwiper>

      <div className="flex items-center mx-auto w-fit justify-center gap-5 mt-8">
        <button
          type="button"
          aria-label="prev button for projects slider"
          onClick={goPrev}
          className="w-12 h-12 shrink-0 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-ui-1 hover:scale-110 active:scale-95"
        >
          <Icons.ArrowLeft className="text-white" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="next button for projects slider"
          className="w-12 h-12 shrink-0 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-ui-1 hover:scale-110 active:scale-95"
        >
          <Icons.ArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
}
