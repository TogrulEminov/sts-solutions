"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import GalleryCard from "@/src/globalElements/cards/gallery";
import ReactFancyBox from "@/src/lib/fancybox";
import { FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  gallery: FileType[];
}
export default function SliderArea({ gallery }: Props) {
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
  if (!gallery?.length) return;
  return (
    <ReactFancyBox>
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
        {gallery?.map((img, index) => {
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
