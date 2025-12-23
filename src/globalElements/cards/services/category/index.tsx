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

export default function ServicesCategoryCard() {
  return (
    <Link
      href={{
        pathname: "/services/[category]/[slug]",
        params: {
          category: "muhendislik-xidmetleri",
          slug: "avtomatlasdirma-ve-idaretme-sistemleri",
        },
      }}
      className="block"
    >
      <MotionDiv
        className="flex flex-col relative p-4 lg:h-60 rounded-2xl overflow-hidden border border-ui-27 bg-white group"
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { y: 0 },
          hover: { y: -8 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background overlay animation */}
        <MotionDiv
          className="absolute w-full h-full inset-0 z-1 bg-ui-2"
          variants={{
            initial: { scaleY: 0 },
            hover: { scaleY: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "bottom" }}
        />

        {/* Icon container */}
        <MotionFigure
          className="w-16 h-16 mb-5 rounded-xl relative z-2 flex items-center justify-center"
          variants={{
            initial: { backgroundColor: "var(--ui-1)" },
            hover: { backgroundColor: "#ffffff" },
          }}
          transition={{ duration: 0.3 }}
        >
          <MotionDiv
            variants={{
              initial: { scale: 1, rotate: 0 },
              hover: { scale: 1.1, rotate: [0, -10, 10, 0] },
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <MotionDiv
              variants={{
                initial: { filter: "brightness(0) invert(1)" },
                hover: { filter: "brightness(1) invert(0)" },
              }}
              transition={{ duration: 0.3 }}
            >
              <CustomImage
                width={32}
                height={32}
                title=""
                src="https://res.cloudinary.com/da403zlyf/image/upload/v1766404896/worker_cuqick.png"
                className="w-8 h-8"
              />
            </MotionDiv>
          </MotionDiv>
        </MotionFigure>

        {/* Title */}
        <MotionStrong
          className="relative z-2 lg:text-[32px] lg:leading-9 font-extrabold"
          variants={{
            initial: { color: "var(--color-ui-7)" },
            hover: { color: "var(--color-ui-1)" },
          }}
          transition={{ duration: 0.3 }}
        >
          Mühəndislik xidmətlərimiz
        </MotionStrong>

        {/* Arrow button */}
        <MotionSpan
          className="w-14 h-14 absolute z-2 rounded-2xl bg-ui-1 bottom-4 text-white flex items-center justify-center right-4"
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
