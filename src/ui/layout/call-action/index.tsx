"use client";

import CustomImage from "@/src/globalElements/ImageTag";
import actionImg from "@/public/assets/call-action.webp";
import Icons from "@/public/icons";
import { motion } from "framer-motion";
import { useToggleStore } from "@/src/lib/zustand/useMultiToggleStore";
import { useTranslations } from "next-intl";
import { SectionContent } from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
}
export default function CallAction({ sectionData }: Props) {
  const { open } = useToggleStore();
  const t = useTranslations();
  const handleOpen = () => {
    document.body.classList.toggle("overflow-hidden");
    open("apply-button");
  };
  return (
    <section className="py-8 lg:py-14 relative flex items-center overflow-hidden min-h-fit lg:min-h-56">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-1"
      >
        <CustomImage
          width={1920}
          height={400}
          title=""
          src={actionImg}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute z-2 inset-0 w-full h-full bg-ui-3/75"></div>

      <div className="container relative z-3">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-4 lg:col-span-8"
          >
            <strong className="font-inter font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-white">
              {sectionData?.translations?.[0]?.title}
            </strong>
            <p className="font-inter text-base lg:text-lg text-white font-normal">
              {sectionData?.translations?.[0]?.description}
            </p>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 lg:flex lg:justify-end">
              <motion.button
                type="button"
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center w-full justify-center lg:w-fit group text-white cursor-pointer gap-x-3 bg-ui-1 gap-2 font-inter h-12.5 py-3 px-6 rounded-[30px] transition-all duration-300 group"
              >
                {t("cta.partnersBtn")}
                <motion.div
                  className="inline-block"
                  whileHover={{ rotate: 45, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icons.ArrowEast className="group-hover:rotate-45 duration-300 transition-all" />
                </motion.div>
              </motion.button>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-x-2 font-inter font-bold lg:text-[21px] lg:leading-[27px] text-white"
            >
              <Icons.Settings />
              {t("cta.first")}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-x-2 font-inter font-bold lg:text-[21px] lg:leading-[27px] text-white"
            >
              <Icons.CallCenter />
              {t("cta.second")}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
