"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";

interface Props {
  image: string;
  title: string;
}

export default function PartnerCard({ image, title }: Props) {
  return (
    <Link
      href={""}
      className="relative shrink-0 mx-2 flex items-center justify-center overflow-hidden rounded-xl  w-full h-auto max-w-40 mx-h-16 group"
    >
      {/* Image with hover animation */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0.7, scale: 1 }}
        whileHover={{
          opacity: 1,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        transition={{ duration: 0.3 }}
      >
        <CustomImage
          height={40}
          width={100}
          src={image}
          title={title}
          className="h-auto max-w-20 lg:max-w-25 w-full grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </motion.div>
    </Link>
  );
}
