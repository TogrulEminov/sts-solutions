"use client";
import MySwiper from "@/src/lib/swiper";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper as SwiperCore } from "swiper/types";
import { Link } from "@/src/i18n/navigation";
import Icons from "@/public/icons";
import { useRef } from "react";
import HeroImageAnimation from "./image";

export default function SliderArea() {
  const swiperRef = useRef<SwiperCore | null>(null);

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

  const breakpoints = {
    0: { slidesPerView: 1 },
  };

  const autoplayOptions = {
    delay: 3500,
    disableOnInteraction: false,
  };

  const keyboard = {
    enabled: true,
    onlyInViewport: false,
  };

  const paginationOptions = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  return (
    <div className="relative h-full hero-slider">
      <MySwiper
        modules={[Autoplay, Pagination, EffectFade]}
        breakpoints={breakpoints}
        spaceBetween={24}
        slideToClickedSlide={false}
        onSwiper={handleSwiper}
        watchSlidesProgress={false}
        centeredSlides={false}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        autoplay={autoplayOptions}
        roundLengths={true}
        keyboard={keyboard}
        pagination={paginationOptions}
        className="w-full h-full"
        loop={true}
      >
        {[
          "https://res.cloudinary.com/da403zlyf/image/upload/v1766260482/120440_p3ocpo.jpg",
          "https://res.cloudinary.com/da403zlyf/image/upload/v1766260496/2151615117_u2mtid.jpg",
        ].map((item, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <div className="relative h-full flex items-center z-6">
                <div className="heroFirstLinear"></div>
                <div className="heroSecondLinear"></div>
                <HeroImageAnimation src={item} />
                <div className="container relative z-4">
                  <div className="flex flex-col h-full space-y-10">
                    <Link
                      href={"/"}
                      className="group flex min-w-65 items-center gap-x-3 bg-ui-2 font-manrope font-extrabold lg:text-lg border-2 border-ui-17 rounded-4xl w-fit px-5 h-10.5 text-white relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(27,175,191,0.5)] hover:border-ui-1"
                    >
                      <span className="bg-ui-1 w-4 h-4 rounded-full animate-pulse"></span>
                      <Icons.AngleLong
                        fill="#1BAFBF"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      <span className="relative z-10">Bütün xidmətlərimiz</span>

                      <span className="absolute inset-0  bg-linear-to-r from-ui-1/0 via-ui-1/20 to-ui-1/0 translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    </Link>
                    <strong className="lg:max-w-101 font-manrope font-extrabold lg:text-[56px] lg:leading-16 text-white">
                      Mühəndislik xidmətlərimiz
                    </strong>
                    <div className="flex items-center gap-5">
                      <Link
                        href={"/"}
                        className="group lg:w-[161px] lg:h-12.5 text-white bg-ui-1 rounded-4xl flex items-center gap-2 font-manrope font-normal text-base justify-center transition-all duration-300 hover:gap-4 hover:pr-2 hover:shadow-[0_8px_30px_rgba(27,175,191,0.5)] active:scale-95"
                      >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">
                          Daha ətraflı
                        </span>
                        <Icons.ArrowEast className="transition-all duration-500 group-hover:translate-x-2 group-hover:-rotate-45" />
                      </Link>

                      <button
                        type="button"
                        className="group flex items-center justify-center gap-4 font-manrope font-normal lg:text-base text-white cursor-pointer bg-white/14 backdrop-blur-sm border-2 border-white/60 rounded-[30px] w-[198px] h-12.5 transition-all duration-300 hover:gap-3 hover:bg-white hover:text-ui-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] active:scale-95"
                      >
                        <Icons.Phone
                          fill="currentColor"
                          className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
                        />
                        <span>Bizə müraciət et</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </MySwiper>

      <div className="absolute left-1/2  xl:left-[2%] bottom-12 xl:bottom-[unset]  xl:top-[55%] xl:-translate-y-1/2 z-10 hidden lg:flex xl:flex-col items-center gap-5">
        <button
          type="button"
          aria-label="prev button for services slider"
          onClick={goPrev}
          className="w-12 h-12 rounded-full shrink-0 border-2 border-white/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-110"
        >
          <Icons.ArrowLeft />
        </button>

        <div className="custom-pagination flex flex-row xl:flex-col gap-3"></div>

        <button
          type="button"
          onClick={goNext}
          aria-label="next button for services slider"
          className="w-12 h-12 rounded-full shrink-0 border-2 border-white/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-110"
        >
          <Icons.ArrowRight />
        </button>
      </div>

      <style jsx global>{`
        .hero-slider .custom-pagination {
          gap: 12px;
          align-items: center;
        }

        .hero-slider .custom-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          margin: 0;
          transition: all 0.3s ease;
          border-radius: 50%;
          cursor: pointer;
        }

        .hero-slider .custom-pagination .swiper-pagination-bullet-active {
          background: #ffffff;
          transform: scale(1.3);
        }

        .hero-slider .custom-pagination .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
