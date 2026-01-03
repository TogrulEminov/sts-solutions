"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { IContactInformation, SectionContent } from "@/src/services/interface";
import { clearPhoneRegex } from "@/src/lib/domburify";
import Icons from "@/public/icons";

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

interface Props {
  sectionData: SectionContent;
  existingData: IContactInformation;
}
export default function Information({ sectionData, existingData }: Props) {
  return (
    <motion.div
      className="flex flex-col  lg:col-span-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.strong
        className="font-inter text-xl mb-3 lg:text-[28px] lg:leading-9 text-ui-7 font-medium"
        variants={textVariants}
      >
        {sectionData?.translations?.[0]?.title}
      </motion.strong>
      <motion.p
        className="font-inter text-xl mb-6 lg:text-base  text-ui-9 font-normal"
        variants={textVariants}
      >
        {sectionData?.translations?.[0]?.description}
      </motion.p>

      <motion.ul
        className="flex flex-col space-y-4"
        variants={containerVariants}
      >
        {existingData?.phone && (
          <motion.li
            variants={listItemVariants}
            className="group relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div className="flex items-center gap-3 p-2.5 rounded-[10px] bg-ui-19 relative min-h-11.5 lg:min-h-17.5 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-ui-2 "
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" as const }}
              />

              <motion.span
                variants={iconVariants}
                className="relative z-10 w-8 h-8 lg:w-12.5 lg:h-12.5 bg-ui-2 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
              >
                <Icons.Phone />
              </motion.span>

              <motion.div variants={linkVariants} className="relative z-10">
                <Link
                  href={`tel:${clearPhoneRegex(existingData?.phone)}`}
                  className="font-inter font-medium lg:text-xl text-ui-7 tracking-tight inline-block relative"
                  aria-label={existingData?.phone}
                >
                  {existingData?.phone}
                </Link>
              </motion.div>

              <motion.div
                className="absolute top-0 bottom-0 bg-ui-2 -right-10 w-10"
                initial={{ opacity: 0.26 }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
              <span className="absolute inset-0 bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.li>
        )}
        {existingData?.email && (
          <motion.li
            variants={listItemVariants}
            className="group relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div className="flex items-center gap-3 p-2.5 rounded-[10px] bg-ui-19 relative min-h-11.5 lg:min-h-17.5 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-ui-2 "
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" as const }}
              />

              <motion.span
                variants={iconVariants}
                className="relative z-10 w-8 h-8 lg:w-12.5 lg:h-12.5 bg-ui-2 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
              >
                <Icons.Email />
              </motion.span>

              <motion.div variants={linkVariants} className="relative z-10">
                <Link
                  href={`mailto:${existingData?.email}`}
                  className="font-inter font-medium lg:text-xl text-ui-7 tracking-tight inline-block relative"
                  aria-label={existingData?.email}
                >
                  {existingData?.email}
                </Link>
              </motion.div>

              <motion.div
                className="absolute top-0 bottom-0 bg-ui-2 -right-10 w-10"
                initial={{ opacity: 0.26 }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />

              <span className="absolute inset-0 bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.li>
        )}
        {existingData?.translations?.[0]?.adress && (
          <motion.li
            variants={listItemVariants}
            className="group relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div className="flex items-center gap-3 p-2.5 rounded-[10px] bg-ui-19 relative min-h-11.5 lg:min-h-17.5 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-ui-2 "
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" as const }}
              />

              <motion.span
                variants={iconVariants}
                className="relative z-10 w-8 h-8 lg:w-12.5 lg:h-12.5 bg-ui-2 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
              >
                <Icons.Address />
              </motion.span>

              <motion.div variants={linkVariants} className="relative z-10">
                <Link
                  href={existingData?.adressLink || "#"}
                  className="font-inter font-medium lg:text-xl text-ui-7 tracking-tight inline-block relative"
                  aria-label={existingData?.translations?.[0]?.adress}
                >
                  {existingData?.translations?.[0]?.adress}
                </Link>
              </motion.div>

              <motion.div
                className="absolute top-0 bottom-0 bg-ui-2 -right-10 w-10"
                initial={{ opacity: 0.26 }}
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />

              <span className="absolute inset-0 bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.li>
        )}
      </motion.ul>
    </motion.div>
  );
}
