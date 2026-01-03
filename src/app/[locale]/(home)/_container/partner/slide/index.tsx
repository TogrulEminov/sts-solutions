"use client";
import PartnerCard from "@/src/globalElements/cards/partners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/free-mode";
import { ConnectionItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";

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
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={8}
        slidesPerView="auto"
        loop={true}
        grabCursor={true}
        allowTouchMove={true}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.5,
          momentumVelocityRatio: 0.5,
        }}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: false,
        }}
        className="w-full lg:min-w-screen"
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
      </Swiper>
    </motion.div>
  );
}
