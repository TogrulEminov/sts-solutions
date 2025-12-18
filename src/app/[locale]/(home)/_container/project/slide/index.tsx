"use client";
import ProjectsCards from "@/src/globalElements/cards/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/free-mode";

export default function SlideArea() {
  return (
    <div className="relative flex-1 flex flex-col space-y-6 overflow-hidden w-full py-4">
      {/* First Row - Left to Right */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        {/* Gradient overlays with #1BAFBF */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
          }}
        />

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={12}
          slidesPerView="auto"
          loop={true}
          speed={8000}
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
          {Array.from({ length: 15 }).map((_, index) => (
            <SwiperSlide key={`left-${index}`} className="w-auto!">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.03, 0.8),
                  ease: "easeOut",
                }}
              >
                <ProjectsCards className="mx-1.5" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 blur-sm"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(27, 175, 191, 0.3) 50%, transparent 100%)",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Second Row - Right to Left */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="relative"
      >
        {/* Gradient overlays with #1BAFBF tint */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
          }}
        />

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={12}
          slidesPerView="auto"
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          className="w-full"
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <SwiperSlide key={`right-${index}`} className="w-auto!">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.03, 0.8),
                  ease: "easeOut",
                }}
              >
                <ProjectsCards className="mx-1.5" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom glow effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 blur-sm"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, rgba(27, 175, 191, 0.3) 50%, transparent 100%)",
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </motion.div>
    </div>
  );
}
