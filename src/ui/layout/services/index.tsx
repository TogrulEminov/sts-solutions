"use client";
import { Link } from "@/src/i18n/navigation";
import { useInView } from "react-intersection-observer";
import { MotionArticle, MotionDiv } from "@/src/lib/motion/motion";
import Icons from "@/public/icons";
import logo from "@/public/assets/logo/sts-logo.svg";
import CustomImage from "@/src/globalElements/ImageTag";
const services = [
  "Mühəndislik",
  "Təchizat",
  "Service",
  "Energy Management",
  "SmartFactory",
  "Smart City",
  "ERP",
];

export default function ServicesTagSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-10 bg-ui-24">
      <div className="container">
        <div
          className="grid lg:grid-cols-12  gap-2 lg:gap-5  items-start"
          ref={ref}
        >
          <MotionArticle
            className="flex flex-col space-y-3 lg:col-span-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <strong className="font-inter text-2xl lg:text-[40px] lg:leading-12 text-ui-21 font-bold">
              Xidmət təkliflərimiz
            </strong>
            <p className="font-inter font-medium text-base text-ui-21">
              İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv
              edən ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
              hazırlayırıq.
            </p>
          </MotionArticle>

          {services?.map((item, index) => {
            return (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="lg:col-span-4"
              >
                <Link
                  href={"/"}
                  className="relative flex gap-3 lg:gap-5 items-center justify-start w-full p-2 lg:p-4 bg-ui-2 rounded-xl lg:rounded-[20px] min-h-12 lg:min-h-25.5 font-inter font-bold lg:text-[28px] lg:leading-9 text-white hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <span className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  </div>
                  <figure className="rounded-md lg:rounded-xl w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center p-2 bg-white">
                    <CustomImage
                      width={40}
                      height={20}
                      title=""
                      className="max-w-8 lg:max-w-20 invert-0 brightness-0"
                      src={logo}
                    />
                  </figure>

                  <span className="relative z-10 text-sm lg:text-base">
                    {item}
                  </span>
                  <Icons.ArrowEast
                    fill="currentColor"
                    className="lg:hidden block w-6 h-6 text-ui-1 absolute right-5  rotate-45"
                  />
                </Link>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
