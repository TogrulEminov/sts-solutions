"use client";
import { Link } from "@/src/i18n/navigation";
import { useInView } from "react-intersection-observer";
import { MotionArticle, MotionDiv } from "@/src/lib/motion/motion";

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
        <div className="grid lg:grid-cols-12  gap-5  items-start" ref={ref}>
          <MotionArticle
            className="flex flex-col space-y-3 lg:col-span-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <strong className="font-manrope lg:text-[40px] lg:leading-12 text-ui-21 font-bold">
              Xidmət təkliflərimiz
            </strong>
            <p className="font-manrope font-medium text-base text-ui-21">
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
                  className="relative flex gap-5 items-center justify-start w-full p-4 bg-ui-2 rounded-[20px] min-h-25.5 font-manrope font-bold lg:text-[28px] lg:leading-9 text-white hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full">
                    <span className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  </span>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.7292 4.16675H16.2709C8.68758 4.16675 4.16675 8.68758 4.16675 16.2709V33.7084C4.16675 41.3126 8.68758 45.8334 16.2709 45.8334H33.7084C41.2917 45.8334 45.8126 41.3126 45.8126 33.7293V16.2709C45.8334 8.68758 41.3126 4.16675 33.7292 4.16675ZM34.1042 29.8959L29.4792 34.5209C28.3542 35.6459 26.8959 36.1876 25.4376 36.1876C23.9792 36.1876 22.5001 35.6251 21.3959 34.5209C20.3126 33.4376 19.7084 32.0001 19.7084 30.4792C19.7084 28.9584 20.3126 27.5001 21.3959 26.4376L24.3334 23.5001C24.9376 22.8959 25.9376 22.8959 26.5417 23.5001C27.1459 24.1042 27.1459 25.1042 26.5417 25.7084L23.6042 28.6459C23.1042 29.1459 22.8334 29.7917 22.8334 30.4792C22.8334 31.1667 23.1042 31.8334 23.6042 32.3126C24.6251 33.3334 26.2709 33.3334 27.2917 32.3126L31.9167 27.6876C34.5626 25.0417 34.5626 20.7501 31.9167 18.1042C29.2709 15.4584 24.9792 15.4584 22.3334 18.1042L17.2917 23.1459C16.2292 24.2084 15.6459 25.6042 15.6459 27.0834C15.6459 28.5626 16.2292 29.9792 17.2917 31.0209C17.8959 31.6251 17.8959 32.6251 17.2917 33.2292C16.6876 33.8334 15.6876 33.8334 15.0834 33.2292C13.4167 31.6251 12.5001 29.4376 12.5001 27.1042C12.5001 24.7709 13.3959 22.5834 15.0417 20.9376L20.0834 15.8959C23.9376 12.0417 30.2292 12.0417 34.0834 15.8959C37.9584 19.7501 37.9584 26.0417 34.1042 29.8959Z"
                      fill="white"
                    />
                  </svg>

                  <span className="relative z-10">{item}</span>
                </Link>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
