"use client";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";

export default function SolutionsCard() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px] lg:h-120 flex items-end justify-start group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden"
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <CustomImage
          width={453}
          height={481}
          title=""
          className="w-full h-full object-cover"
          src={
            "https://i.pinimg.com/736x/44/bd/f0/44bdf034c61356032e5931a3343edc1f.jpg"
          }
        />
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-ui-2/40 via-ui-2/10 to-transparent"
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          initial={{ opacity: 0.7 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(to top, rgba(0, 74, 82, 0.4), rgba(0, 74, 82, 0.1), transparent)",
          }}
        />
      </motion.div>

      <motion.div
        className="bg-white relative z-10 max-w-90 w-fit rounded-tr-2xl p-6 font-manrope font-bold text-2xl text-ui-2 shadow-lg"
        variants={{
          hover: {
            backgroundColor: "#004A52",
            color: "#ffffff",
            scale: 1.05,
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 74, 82, 0.3)",
          },
        }}
        initial={{ opacity: 0, x: -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        PLC, SCADA sistemlərinin qurulması
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            x: ["100%", "-100%"],
          },
        }}
        initial={{ x: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0, 74, 82, 0.2), transparent)",
        }}
      />
    </motion.div>
  );
}
