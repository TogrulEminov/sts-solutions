import React from "react";
import Statistics from "../statistics";
import AnimatedProjectButton from "@/src/ui/link/second";
import Link from "next/link";
import Icons from "@/public/icons";
const sectors = [
  "Qeyri qida",
  "Qida",
  "Alternativ enerji",
  "Plastik",
  "Enerji depolama",
  "Aqro",
  "Su təsərrüfatı",
  "Lojistika",
  "Enerji",
  "Nəqliyyat",
  "Tikinti",
];
export default function Content() {
  return (
    <article className="flex flex-col space-y-6">
      <strong className="font-extrabold font-manrope lg:text-[60px] lg:leading-[76px] text-ui-7">
        Biz kimik
      </strong>
      <span className="font-normal  max-w-lg lg:text-[30px] lg:leading-[38px] text-ui-15">
        Sənayenin hər sahəsi üçün ağıllı mühəndislik
      </span>
      <p className="font-manrope lg:text-lg font-normal">
        STS Mühəndislik – qida sənayesi, logistika, enerji və alternativ enerji,
        su və kənd təsərrüfatı sektorları üçün texniki həllər, avtomatlaşdırma,
        proqramlaşdırma və proses idarəetməsi üzrə ixtisaslaşmış peşəkar
        mühəndis komandasıdır.Uzun illik təcrübəmizlə hər bir sifarişçinin
        məqsədinə uyğun, effektiv və çevik həllər təqdim edirik.
      </p>
      <Statistics />
      <AnimatedProjectButton title="Daha çox məlumat al" link="/about" />
      <strong className="text-ui-15">Xidmət sektorlarımız</strong>
      <div className="flex items-center gap-2 flex-wrap">
        {sectors?.map((item, index) => {
          return (
            <Link
              key={index}
              href={""}
              className="group relative flex items-center gap-x-2 py-2 px-3 rounded-full bg-ui-1/16 border-[0.5px] border-ui-1 text-ui-2 font-manrope font-bold text-xl transition-all duration-300 hover:bg-ui-2 hover:text-white hover:border-ui-2 hover:shadow-lg hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Icons.Sector
                fill="currentColor"
                className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              />
              <span className="relative z-10">{item}</span>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
