"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Icons from "@/public/icons";
interface Props {
  title: string;
  link: string;
}
export default function AnimatedProjectButton({ title, link }: Props) {
  return (
    <Link href={link}>
      <motion.div
        className="relative group flex items-center gap-x-3 py-3 px-6 h-12 font-manrope font-medium text-base text-white rounded-4xl bg-ui-1 justify-center overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" as const }}
      >
        {/* Background gradient wave animation */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-ui-1 via-ui-1/80 to-ui-1"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" as const }}
        />

        {/* Glow effect */}
        <span className="absolute inset-0 bg-ui-1/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-x-3">
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.span>

          {/* Animated Arrow */}
          <motion.span
            className="inline-flex"
            initial={{ x: 0, rotate: 0 }}
            whileHover={{ x: 4, rotate: -45 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          >
            <Icons.ArrowEast className="group-hover:rotate-45 duration-300 transition-all" />
          </motion.span>
        </span>

        {/* Ripple effect on click */}
        <motion.span
          className="absolute inset-0 bg-white/20 rounded-4xl"
          initial={{ scale: 0, opacity: 1 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%", skewX: -20 }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.8, ease: "easeInOut" as const }}
        />
      </motion.div>
    </Link>
  );
}
