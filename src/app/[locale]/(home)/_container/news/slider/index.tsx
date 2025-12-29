"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import NewsCard from "@/src/globalElements/cards/news";

export default function SliderArea() {
  const breakpoints = {
    0: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView:2, spaceBetween: 10 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1600: { slidesPerView: 6 },
  };
  const autoplayOptions = {
    delay: 3500,
    disableOnInteraction: false,
  };
  const keyboard = {
    enabled: true,
    onlyInViewport: false,
  };
  const slidesLength = 5;
  return (
    <div className={slidesLength > 4 ? "max-w-full" : "container"}>
      <MySwiper
        modules={[Autoplay]}
        breakpoints={breakpoints}
        spaceBetween={24}
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
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <NewsCard />
            </SwiperSlide>
          );
        })}
      </MySwiper>
    </div>
  );
}
