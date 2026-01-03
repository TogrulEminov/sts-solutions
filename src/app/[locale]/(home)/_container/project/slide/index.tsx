"use client";
import ProjectsCards from "@/src/globalElements/cards/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/free-mode";
import { Projects } from "@/src/services/interface";
interface Props {
  existingData: Projects[];
}
export default function SlideArea({ existingData }: Props) {
  if (!existingData?.length) return;
  return (
    <div
      className={`relative flex-1 flex flex-col space-y-6 overflow-hidden w-full py-4 ${
        existingData?.length > 3 ? "max-w-full" : "container"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        {existingData?.length > 3 && (
          <>
            <div
              className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
              }}
            />
            <div
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
              }}
            />
          </>
        )}

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
          {existingData?.map((item, index) => (
            <SwiperSlide
              key={`left-${item?.documentId}`}
              className="w-[280px]! lg:w-auto!"
            >
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
                <ProjectsCards className="mx-1.5 max-w-90" project={item} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {existingData?.length > 3 && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Gradient overlays with #1BAFBF tint */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 100%)",
            }}
          />
          <div
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
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
            {existingData?.map((item, index) => (
              <SwiperSlide
                key={`right-${item?.documentId}`}
                className="w-[280px]! lg:w-auto!"
              >
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
                  <ProjectsCards className="mx-1.5" project={item} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </div>
  );
}
