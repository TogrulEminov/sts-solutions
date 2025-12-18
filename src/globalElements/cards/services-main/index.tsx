"use client";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";

export default function Services3DTilt() {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden h-96 flex items-end justify-start cursor-pointer perspective-1000"
      initial={{ opacity: 0, rotateX: -15 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        rotateY: 2, 
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.6 }}
      >
        <CustomImage
          width={356}
          className="h-full w-full object-cover"
          height={327}
          title=""
          src="https://i.pinimg.com/1200x/84/7c/b6/847cb696c3080ad4d29d496b48f18ef1.jpg"
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-ui-2/20 to-ui-2/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>

      <motion.article
        className="flex items-center h-24 bg-white relative z-10 rounded-tr-lg shadow-xl overflow-hidden w-[calc(100%-1rem)] mr-2"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
      >
        <motion.div
          className="flex items-center justify-center shrink-0 bg-ui-1 h-full w-20"
          whileHover={{ backgroundColor: "#1e40af" }}
        >
          <CustomImage width={32} height={32} title="" src="https://res.cloudinary.com/da403zlyf/image/upload/v1766078331/image_qsnjuk.png" />
        </motion.div>
        <strong className="font-manrope mr-4 p-5 font-semibold text-2xl text-ui-16">
          Mühəndislik xidmətləri
        </strong>
      </motion.article>
    </motion.div>
  );
}