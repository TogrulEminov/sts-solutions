"use client";

import CustomImage from "@/src/globalElements/ImageTag";
import actionImg from "@/public/assets/call-action.webp";
import Icons from "@/public/icons";
import { motion } from "framer-motion";

export default function CallAction() {
  return (
    <section className="lg:py-14 relative flex items-center overflow-hidden lg:min-h-56">
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
        <div className="grid grid-cols-12 gap-10">
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-4 lg:col-span-8"
          >
            <strong className="font-inter font-bold lg:text-[32px] lg:leading-[42px] text-white">
              STS Mühəndislik- texniki problemlərin ağıllı həlli
            </strong>
            <p className="font-inter text-lg text-white font-normal">
              Şirkətimiz, müştərinin iş proseslərini effektiv şəkildə
              təkmilləşdirərək, texnologiyaların avtomatlaşması ilə həllər
              təqdim edir.
            </p>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 flex justify-end">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center group text-white cursor-pointer gap-x-3 bg-ui-1 gap-2 font-inter h-12.5 py-3 px-6 rounded-[30px] transition-all duration-300 group"
              >
                Bizimlə əməkdaşlıq et
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
              Təmir və servis
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
              24/7 xidmətinizdə
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
