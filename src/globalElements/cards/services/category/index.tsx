"use client";

import Icons from "@/public/icons";
import CustomImage from "@/src/globalElements/ImageTag";
import { Link } from "@/src/i18n/navigation";
import {
  MotionDiv,
  MotionFigure,
  MotionSpan,
  MotionStrong,
} from "@/src/lib/motion/motion";
import logo from "@/public/assets/logo/sts-logo.svg";
import { ServicesSubCategoryItem } from "@/src/services/interface";
interface Props {
  service: ServicesSubCategoryItem;
  category: string;
}
export default function ServicesCategoryCard({ service, category }: Props) {
  const { translations } = service;
  const { title, slug, seo } = translations?.[0];
  return (
    <Link
      href={{
        pathname: "/services/[category]/[slug]",
        params: {
          category: category,
          slug: slug,
        },
      }}
      className="block"
    >
      <MotionDiv
        className="flex flex-col relative p-4 h-60 lg:h-80 rounded-2xl overflow-hidden border border-ui-27 bg-white group"
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { y: 0 },
          hover: { y: -8 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <MotionDiv
          className="absolute w-full h-full inset-0 z-1 bg-ui-2"
          variants={{
            initial: { scaleY: 0 },
            hover: { scaleY: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom" }}
        />

        <MotionFigure
          className="w-10 lg:w-16 h-10 lg:h-16 mb-5 rounded-xl relative z-2 flex items-center justify-center"
          variants={{
            initial: { backgroundColor: "var(--color-ui-1)" },
            hover: { backgroundColor: "#ffffff" },
          }}
          transition={{ duration: 0.3 }}
        >
          <CustomImage
            width={32}
            height={32}
            title={seo?.metaTitle}
            src={logo}
            className="w-8 lg:w-13 h-auto lg:h-10 brightness-0 invert-100 duration-300 transition-all group-hover:invert-0"
          />
        </MotionFigure>

        <MotionStrong
          className="relative z-2 text-xl lg:text-[28px] lg:leading-8 font-extrabold"
          variants={{
            initial: { color: "var(--color-ui-7)" },
            hover: { color: "var(--color-ui-1)" },
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </MotionStrong>
        <MotionSpan
          className="w-10 h-10 lg:w-14 lg:h-14  absolute z-2 rounded-lg bg-ui-1 bottom-4 text-white flex items-center justify-center right-4"
          variants={{
            initial: { scale: 1 },
            hover: {
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            },
          }}
          transition={{ duration: 0.3 }}
        >
          <MotionDiv
            variants={{
              initial: { rotate: 0 },
              hover: { rotate: 45 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Icons.ArrowEast fill="currentColor" />
          </MotionDiv>
        </MotionSpan>
      </MotionDiv>
    </Link>
  );
}
