"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Social } from "@/src/services/interface";
import { renderSocialIcon } from "@/src/utils/renderSocials";

interface Props {
  socialData: Social[] | undefined;
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const hoverVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function SocialComponent({ socialData }: Props) {
  return (
    <motion.nav
      className="flex items-center gap-3"
      role="navigation"
      aria-label="Social media links"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {socialData?.map((social) => {
        return (
          <motion.div key={social.socialName} variants={itemVariants}>
            <motion.div
              variants={hoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={social.socialLink}
                className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/50 hover:bg-white/70 lg:bg-white text-white lg:text-black rounded-full shadow-sm hover:shadow-md transition-shadow"
                aria-label={`Visit our ${social.socialName} page`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {renderSocialIcon({
                  iconName: social?.iconName,
                  fill: "currentColor",
                })}
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
