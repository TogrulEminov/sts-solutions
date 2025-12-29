"use client";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";
import { Link } from "@/src/i18n/navigation";

export default function NewsCard() {
  return (
    <motion.div
      className="flex flex-col space-y-2  relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={{
          pathname: "/blog/[slug]",
          params: { slug: "test" },
        }}
        className="absolute inset-0 w-full h-full opacity-0 z-2"
      >
        Lorem ipsum dolor sit.
      </Link>
      <figure className="relative overflow-hidden h-40 lg:h-54 rounded-xl">
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <CustomImage
            width={356}
            height={222}
            title=""
            className="w-full h-full object-cover"
            src={
              "https://i.pinimg.com/1200x/83/ee/1b/83ee1b4a5004950f0ae4374ae188076b.jpg"
            }
          />
          <motion.div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </figure>
      <article className="flex flex-col space-y-3">
        <motion.strong
          className="font-inter font-bold text-base lg:text-xl text-ui-7 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Top 20 UI Inspiration Sites (2023)
        </motion.strong>
        <motion.p
          className="font-inter text-xs text-ui-9 line-clamp-2 min-h-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We have collated the top 20 UI inspiration sites, all with links in
          one handy spot! Find your inspiration for your next project.
        </motion.p>
      </article>
    </motion.div>
  );
}
