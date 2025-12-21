import { Link } from "@/src/i18n/navigation";
import ApplyBtn from "./applyBtn";

interface Props {
  isSticky?: boolean;
}

const navLinks = [
  { href: "/about", label: "Haqqımızda" },
  { href: "/services", label: "Xidmətlərimiz" },
  { href: "/projects", label: "Layihələrimiz" },
  { href: "/", label: "Həllərimiz" },
  { href: "/", label: "Xəbərlər" },
  { href: "/contact", label: "Əlaqə" },
];

export default function HeaderBottom({ isSticky }: Props) {
  return (
    <div className={`hidden lg:flex items-center transition-all duration-500 ${
      isSticky ? "-mt-3" : "-mt-5"
    }`}>
      <div className="container">
        <nav className={`flex items-center justify-between rounded-[10px] bg-white px-4 transition-all duration-500 ${
          isSticky ? "min-h-12 shadow-md" : "min-h-13.5 shadow-xl"
        }`}>
          <div className="flex items-center gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href as any}
                className="group relative px-2 font-manrope font-medium lg:text-base text-ui-18 py-2 transition-all duration-300 hover:text-ui-1"
              >
                <span className="relative z-10">{link.label}</span>
                
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ui-1 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-ui-1/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </div>
          <ApplyBtn />
        </nav>
      </div>
    </div>
  );
}