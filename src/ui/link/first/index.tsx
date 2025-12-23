"use client";
import Link from "next/link";
import { motion } from "framer-motion";
interface Props {
  title: string;
  link: string;
}
export function AnimatedLinkV1({ title, link }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <Link
        href={link as any}
        className="relative font-inter font-bold lg:text-2xl text-ui-1 inline-block group"
      >
        <motion.span
          className="relative z-10 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ui-1 group-hover:w-full transition-all duration-300 ease-out" />
        <span className="absolute inset-0 bg-ui-1/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.div>
  );
}
