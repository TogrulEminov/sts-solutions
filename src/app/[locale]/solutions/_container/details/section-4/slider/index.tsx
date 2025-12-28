"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SolutionsCard from "@/src/globalElements/cards/solutions";

export default function SliderArea() {
  const breakpoints = {
    0: { slidesPerView: 1.5, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1024: { slidesPerView: 4, spaceBetween: 25 },
  };
  const autoplayOptions = {
    delay: 3500,
    disableOnInteraction: false,
  };
  const keyboard = {
    enabled: true,
    onlyInViewport: false,
  };

  return (
    <MySwiper
      modules={[Autoplay]}
      breakpoints={breakpoints}
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
  );
}
