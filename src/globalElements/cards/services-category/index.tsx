"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";
import { FileType, ServicesSubCategoryItem } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import { Link } from "@/src/i18n/navigation";
interface Props {
  service: ServicesSubCategoryItem;
  category: string;
}
export default function ServicesCard({ service, category }: Props) {
  const { translations, imageUrl } = service;
  const { title, slug } = translations?.[0];
  return (
    <motion.div
      className="rounded-xl relative overflow-hidden bg-white/17 border-2 border-transparent p-2 flex flex-col space-y-3 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      variants={{
        hover: {
          borderColor: "#ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
        },
      }}
    >
      <Link
        className="absolute block w-full h-full inset-0 z-2 opacity-0"
        aria-label="Service Detail page link"
        href={{
          pathname: "/services/[category]/[slug]",
          params: {
            category: category,
            slug: slug,
          },
        }}
      >
        {title}
      </Link>
      {/* Image Container */}
      <motion.figure
        className="h-60 rounded-lg overflow-hidden relative"
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <CustomImage
          width={347}
          height={240}
          src={getForCards(imageUrl as FileType)}
          title=""
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.figure>
      <motion.strong
        className="min-h-9 lg:min-h-12 font-inter text-sm lg:text-base line-clamp-2 text-ellipsis font-bold text-white"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={{
          hover: {
            y: -2,
          },
        }}
      >
        {title}
      </motion.strong>
    </motion.div>
  );
}
