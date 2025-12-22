"use client";
import {
  MotionDiv,
  MotionParagraph,
  MotionStrong,
} from "@/src/lib/motion/motion";

interface Props {
  index: number;
}

export default function ServicesProduct({ index }: Props) {
  return (
    <MotionDiv
      className="bg-ui-23 px-8 py-4 rounded-[20px] flex flex-col space-y-5"
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        hover: { scale: 1.02 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <MotionStrong
        className="flex items-center gap-2 font-manrope text-ui-7 font-bold lg:text-[28px] lg:leading-9"
        variants={{
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
        }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className="w-13.5 h-13.5 rounded-full bg-ui-2 font-manrope font-extrabold text-white flex items-center justify-center">
          {index}
        </span>
        Avtomatika idarəetmə panellərinin yığılması, təmiri, modernizasiyası
      </MotionStrong>

      <MotionParagraph
        className="font-manrope lg:text-2xl text-ui-7 font-normal"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Avtomatika idarəetmə panelləri sənaye və texnoloji proseslərin mərkəzi
        idarəetmə nöqtəsi olaraq avadanlıqların təhlükəsiz, stabil və effektiv
        işləməsini təmin edir. Şirkətimiz müxtəlif təyinatlı avtomatika
        panellərinin layihələndirilməsi, yığılması, istismara verilməsi, texniki
        baxışı və modernizasiyası üzrə kompleks mühəndislik xidmətləri təqdim
        edir.
      </MotionParagraph>
    </MotionDiv>
  );
}
