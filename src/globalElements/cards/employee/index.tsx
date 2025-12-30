"use client";
import React from "react";
import CustomImage from "../../ImageTag";
import Link from "next/link";
import Icons from "@/public/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  name: string;
  position: string;
  phone: string;
  email: string;
  image: string;
  index: number;
}

export default function EmployeeCard({
  name,
  position,
  phone,
  email,
  image,
  index,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.9 }
      }
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.15,
      }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative w-[220px] lg:w-full shrink-0 overflow-hidden rounded-2xl lg:rounded-3xl h-60 lg:h-95 flex items-end p-3 lg:p-4 group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 w-full h-full z-1"
      >
        <CustomImage
          width={262}
          className="w-full h-full object-cover"
          height={381}
          src={image}
          title=""
        />
      </motion.div>

      <motion.div
        className="employeeCardGradient absolute inset-0 w-full h-full z-2"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>

      <motion.article
        className="flex flex-col space-y-1 lg:space-y-3 z-3 relative w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
      >
        <motion.strong
          className="font-inter text-lg lg:text-2xl font-bold text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
          whileHover={{ x: 5 }}
        >
          {name}
        </motion.strong>

        <motion.span
          className="font-inter text-sm lg:text-lg text-white font-normal"
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          {position}
        </motion.span>

        <motion.ul
          className="flex flex-col space-y-0.5 lg:space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
        >
          <motion.li
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.6, duration: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <motion.span
              className="flex items-center justify-center w-6 h-6 rounded-full bg-ui-2 text-white"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <Icons.Phone fill="currentColor" width={16} height={16} />
            </motion.span>
            <Link
              href={`tel:${phone}`}
              className="text-xs lg:text-sm text-white font-inter font-normal hover:underline"
            >
              {phone}
            </Link>
          </motion.li>

          <motion.li
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.7, duration: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <motion.span
              className="flex items-center justify-center w-6 h-6 rounded-full bg-ui-2 text-white"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <Icons.Email fill="currentColor" width={16} height={16} />
            </motion.span>
            <Link
              href={`mailto:${email}`}
              className="text-sm text-white font-inter font-normal hover:underline"
            >
              {email}
            </Link>
          </motion.li>
        </motion.ul>
      </motion.article>
    </motion.div>
  );
}
