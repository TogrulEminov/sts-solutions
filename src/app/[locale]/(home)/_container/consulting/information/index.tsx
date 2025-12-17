"use client";
import Icons from "@/public/icons";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

const linkVariants = {
  rest: { x: 0 },
  hover: {
    x: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

const contactItems = [
  {
    icon: Icons.Phone,
    text: "(+994 12) 310 34 84",
    href: "tel:+994123103484",
    ariaLabel: "Call us at +994 12 310 34 84",
  },
  {
    icon: Icons.Email,
    text: "example@example.com",
    href: "mailto:example@example.com",
    ariaLabel: "Email us at example@example.com",
  },
  {
    icon: Icons.Address,
    text: "Baki, Azerbaijan",
    href: "https://maps.google.com/?q=Baku,Azerbaijan",
    ariaLabel: "Our location in Baku, Azerbaijan",
  },
];

export default function Information() {
  return (
    <motion.div
      className="flex flex-col space-y-4 lg:col-span-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.p
        className="font-manrope lg:text-[28px] lg:leading-9 text-white font-medium"
        variants={textVariants}
      >
        Bizim üçün ən yaxşı göstərici sizin fikrinizdir. <br />
        Rəy və təkliflərinizi göndərin, xidmətimizi birgə daha da yaxşılaşdıraq.
      </motion.p>

      <motion.ul
        className="flex flex-col space-y-4"
        variants={containerVariants}
      >
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.li
              key={index}
              variants={listItemVariants}
              className="group relative"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div className="flex items-center gap-3 p-2.5 rounded-bl-[10px] rounded-tl-[10px] bg-white/26 relative min-h-17.5 overflow-hidden">
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" as const }}
                />

                {/* Icon container */}
                <motion.span
                  variants={iconVariants}
                  className="relative z-10 w-12.5 h-12.5 bg-white rounded-full flex items-center justify-center text-ui-1 shadow-md group-hover:shadow-lg transition-shadow duration-300"
                >
                  <IconComponent width={24} height={24} fill="currentColor" />
                </motion.span>

                {/* Link */}
                <motion.div variants={linkVariants} className="relative z-10">
                  <Link
                    href={item.href}
                    className="font-manrope font-medium text-xl text-white tracking-tight inline-block relative"
                    aria-label={item.ariaLabel}
                  >
                    {item.text}
                    
                  </Link>
                </motion.div>

                {/* Right extension */}
                <motion.div
                  className="absolute top-0 bottom-0 bg-white/26 -right-10 w-10"
                  initial={{ opacity: 0.26 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow effect */}
                <span className="absolute inset-0 bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}