import Link from "next/link";
import Icons from "@/public/icons";
import s from "./syle.module.css";
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

export default function SliderArea() {
  return (
    <div className="absolute bottom-10 w-full z-4 overflow-hidden">
      <div
        className={`flex ${s.animateMarquee} hover:pause  space-x-2 whitespace-nowrap`}
      >
        {sectors.map((item, index) => (
          <Link
            key={`first-${index}`}
            href={""}
            className="group relative flex w-fit items-center gap-x-2 py-1 px-3 rounded-full bg-ui-20 border-[0.5px] border-white text-white font-manrope font-bold text-xl transition-all duration-300 hover:scale-95 overflow-hidden shrink-0"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Icons.Sector
              fill="currentColor"
              className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="relative z-10">{item}</span>
          </Link>
        ))}

        {sectors.map((item, index) => (
          <Link
            key={`second-${index}`}
            href={""}
            className="group relative flex w-fit items-center gap-x-2 py-1 px-3 rounded-full bg-ui-20 border-[0.5px] border-white text-white font-manrope font-bold text-xl transition-all duration-300 hover:shadow-lg hover:scale-95 overflow-hidden shrink-0"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Icons.Sector
              fill="currentColor"
              className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="relative z-10">{item}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
