"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import GalleryCard from "@/src/globalElements/cards/gallery";
import ReactFancyBox from "@/src/lib/fancybox";
import { Swiper as SwiperCore } from "swiper/types";
import Icons from "@/public/icons";
import { useRef } from "react";
import { FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: FileType[];
}
export default function SliderArea({ existingData }: Props) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const breakpoints = {
    0: { slidesPerView: 2, spaceBetween: 10 },
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
  if (!existingData?.length) return;
  return (
    <ReactFancyBox className="flex flex-col space-y-5 lg:space-y-10">
      <div className="container flex items-center justify-end">
        <div className="flex items-center gap-x-3 justify-center bg-ui-1 rounded-2xl lg:rounded-[36px] mb-0! w-18 lg:w-21.5 h-8 lg:h-10">
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
        breakpoints={breakpoints}
        spaceBetween={24}
        slideToClickedSlide={false}
        watchSlidesProgress={false}
        centeredSlides={true}
        slidesPerView={3}
        onSwiper={handleSwiper}
        autoplay={autoplayOptions}
        roundLengths={true}
        keyboard={keyboard}
        className="w-full lg:min-w-screen"
        loop={true}
      >
        {existingData.map((img, index) => {
          return (
            <SwiperSlide className="h-40! lg:h-full!" key={index}>
              <GalleryCard img={getForCards(img as FileType)} index={index} />
            </SwiperSlide>
          );
        })}
      </MySwiper>
    </ReactFancyBox>
  );
}
