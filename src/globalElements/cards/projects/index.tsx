"use client";
import { Link } from "@/src/i18n/navigation";
import { motion } from "framer-motion";
import CustomImage from "../../ImageTag";
import Icons from "@/public/icons";

interface Props {
  className?: string;
}

export default function ProjectsCards({ className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <Link
        href={{
          pathname: "/projects/[slug]",
          params: {
            slug: "test",
          },
        }}
        className={`${className} group relative h-60 lg:h-90 overflow-hidden rounded-[18px] block w-full xl:min-w-90`}
      >
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
        >
          <CustomImage
            width={356}
            height={426}
            src={
              "https://i.pinimg.com/736x/1a/0a/b4/1a0ab4e00a136fbdbf475d4bc3f0b7aa.jpg"
            }
            title=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute projectsOverlay inset-0 transition-opacity duration-500 group-hover:opacity-0" />

        <div className="absolute inset-0 translate-y-20 transition-transform duration-500 ease-out group-hover:translate-y-0 projectsCardGradinet group-hover:bg-ui-14/68 group-hover:opacity-40" />

        <article className="absolute inset-0 p-5 flex flex-col justify-end pb-8">
          <div className="space-y-2 relative z-10 translate-y-0 group-hover:-translate-y-[40%] md:group-hover:-translate-y-[45%] lg:group-hover:-translate-y-[50%] transition-transform duration-500 ease-out">
            <motion.strong
              className="font-inter lg:text-xl text-lg text-white font-bold block"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tomat və Soyulmuş Pomidor Sahəsinin Kompleks Şəklində Qurulması və
              Avtomatlaşdırılması Layihəsi
            </motion.strong>

            <motion.p
              className="text-base text-white font-inter font-normal overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-3 line-clamp-3 text-ellipsis"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              2023-cü ildə həyata keçirilmişdir. Layihə çərçivəsində sutkalıq
              300 ton tomat və 12 ton soyulmuş pomidor istehsal gücünə malik
              müəssisə qurulmuş və avtomatlaşdırılmışdır. Avtomatik idarəetmə
              sistemi Siemens platforması üzərində qurulmuşdur.
            </motion.p>
          </div>
          <motion.span
            className="absolute right-5 bottom-5 opacity-0 translate-x-2 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Icons.ArrowUp className="text-white w-6 h-6" />
          </motion.span>
        </article>
      </Link>
    </motion.div>
  );
}
