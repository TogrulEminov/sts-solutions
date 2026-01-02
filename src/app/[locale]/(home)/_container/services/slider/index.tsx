"use client";
import { useRef } from "react";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import Icons from "@/public/icons";
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import ServicesMain from "@/src/globalElements/cards/services-main";
import { ServicesCategoryItem } from "@/src/services/interface";
interface Props {
  existingData: ServicesCategoryItem[];
}
export default function SliderArea({ existingData }: Props) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const breakpoints = {
    0: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4.5 },
    1600: { slidesPerView: 5.5 },
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
    <>
      <div className="w-full flex lg:justify-end">
        <div className="flex items-center gap-x-3 justify-center bg-ui-1 rounded-[36px] lg:-mt-10    w-21.5 h-10">
          <button
            type="button"
            aria-label="prev button for services slider"
            onClick={goPrev}
            className="cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <Icons.ArrowLeft />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="next button for services slider"
            className="cursor-pointer transition-all duration-300 hover:scale-110"
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
        {existingData?.map((service) => {
          return (
            <SwiperSlide className="h-full" key={service?.documentId}>
              <ServicesMain service={service} />
            </SwiperSlide>
          );
        })}
      </MySwiper>
    </>
  );
}
