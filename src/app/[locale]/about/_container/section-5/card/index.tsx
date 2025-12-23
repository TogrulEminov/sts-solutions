"use client";
import CustomImage from "@/src/globalElements/ImageTag";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  icon: string | StaticImageData;
  title: string;
  description: string;
  index: number;
}

export default function PurposeCard({
  title,
  description,
  icon,
  index,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const direction = index % 2 === 0 ? 100 : -100;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction,
        y: 50,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: (index % 2) * 0.1,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      className="bg-white rounded-3xl p-10 flex flex-col space-y-10 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <motion.div
        className="flex items-center gap-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: (index % 2) * 0.1 + 0.2, duration: 0.4 }}
      >
        <motion.div
          whileHover={{ rotate: 360, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <CustomImage
            width={102}
            height={102}
            className="max-w-25 max-h-25 w-full h-full object-contain"
            title=""
            src={icon}
          />
        </motion.div>
        <strong className="font-inter font-extrabold lg:text-[46px] lg:leading-9 text-ui-2">
          {title}
        </strong>
      </motion.div>
      <motion.article
        className="font-inter text-lg font-medium text-ui-7"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: (index % 2) * 0.1 + 0.4, duration: 0.4 }}
      >
        {description}
      </motion.article>
    </motion.div>
  );
}
