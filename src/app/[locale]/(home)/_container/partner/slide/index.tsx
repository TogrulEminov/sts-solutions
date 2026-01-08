"use client";
import PartnerCard from "@/src/globalElements/cards/partners";
import { SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css/autoplay";
import "swiper/css";
import { ConnectionItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import MySwiper from "@/src/lib/swiper";
interface Props {
  existingData?: ConnectionItem[];
}
export default function SlideArea({ existingData }: Props) {
  return (
    <motion.div
      className="relative flex-1 overflow-hidden w-full py-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <MySwiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto" 
        spaceBetween={8}
        loop={existingData && existingData.length > 5} 
        speed={2000}
        grabCursor={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {existingData?.map((partner, index) => (
          <SwiperSlide key={partner.id} className="w-auto!">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.1, 0.7),
                ease: "easeOut",
              }}
            >
              <PartnerCard
                image={getForCards(partner?.imageUrl as FileType)}
                title={partner.translations?.[0]?.title}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </MySwiper>
    </motion.div>
  );
}
