"use client";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";
import { Link } from "@/src/i18n/navigation";
import { FileType, SolutionsItem } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  solution: SolutionsItem;
}
export default function SolutionsCard({ solution }: Props) {
  const { imageUrl, translations } = solution;
  const { slug, title } = translations?.[0];
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg lg:rounded-[20px] h-60 lg:h-120 flex items-end justify-start group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
    >
      <Link
        href={{
          pathname: "/solutions/[slug]",
          params: {
            slug: slug,
          },
        }}
        className="absolute inset-0 w-full h-full z-1 opacity-0"
      >
        {title}
      </Link>
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden"
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <CustomImage
          width={453}
          height={481}
          title=""
          className="w-full h-full object-cover"
          src={getForCards(imageUrl as FileType)}
        />
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-t from-ui-2/40 via-ui-2/10 to-transparent"
          variants={{
            hover: {
              opacity: 1,
            },
          }}
          initial={{ opacity: 0.7 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(to top, rgba(0, 74, 82, 0.4), rgba(0, 74, 82, 0.1), transparent)",
          }}
        />
      </motion.div>

      <motion.strong
        className="bg-white relative z-10 max-w-full mr-4 lg:max-w-90 w-fit rounded-tr-lg lg:rounded-tr-2xl p-3 lg:p-6 font-inter font-bold text-sm lg:text-2xl text-ui-2 shadow-lg"
        variants={{
          hover: {
            backgroundColor: "#004A52",
            color: "#ffffff",
            scale: 1.05,
          },
        }}
        initial={{ opacity: 0, x: -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {title}
      </motion.strong>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            x: ["100%", "-100%"],
          },
        }}
        initial={{ x: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0, 74, 82, 0.2), transparent)",
        }}
      />
    </motion.div>
  );
}
