"use client";
import PartnerCard from "@/src/globalElements/cards/partners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/free-mode";

const partners = [
  {
    id: 1,
    name: "Company 1",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 2,
    name: "Company 2",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 3,
    name: "Company 3",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 4,
    name: "Company 4",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 5,
    name: "Company 5",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 6,
    name: "Company 6",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
  {
    id: 7,
    name: "Company 7",
    logo: "https://res.cloudinary.com/da403zlyf/image/upload/v1765486544/logo_smhyo8.webp",
  },
];

export default function SlideArea() {
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
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
          pauseOnMouseEnter: true,
        }}
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        className="w-full"
      >
        {partners.map((partner, index) => (
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
              <PartnerCard image={partner.logo} title={partner.name} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}