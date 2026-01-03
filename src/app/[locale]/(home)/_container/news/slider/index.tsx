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
    0: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 10 },
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
  return (
    <div className={existingData?.length > 4 ? "max-w-full" : "container"}>
      <MySwiper
        modules={[Autoplay]}
        breakpoints={breakpoints}
        spaceBetween={24}
        slideToClickedSlide={false}
        watchSlidesProgress={false}
        centeredSlides={existingData?.length > 4}
        slidesPerView={3}
        autoplay={autoplayOptions}
        roundLengths={true}
        keyboard={keyboard}
        className="w-full lg:min-w-screen"
        loop={true}
      >
        {existingData?.map((blog, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <NewsCard blog={blog} />
            </SwiperSlide>
          );
        })}
      </MySwiper>
    </div>
  );
}
