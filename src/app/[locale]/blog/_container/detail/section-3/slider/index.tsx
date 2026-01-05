"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import NewsCard from "@/src/globalElements/cards/news";
import { BlogItem } from "@/src/services/interface";
interface Props {
  existingData: BlogItem[];
}
export default function SliderArea({ existingData }: Props) {
  const breakpoints = {
    0: { slidesPerView: 1.2, spaceBetween: 10 },
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
      {existingData?.map((item, index) => {
        return (
          <SwiperSlide className="h-full" key={item?.documentId}>
            <NewsCard blog={item} key={index} />
          </SwiperSlide>
        );
      })}
    </MySwiper>
  );
}
