'use client'
import { useEffect, useState } from "react";
import HeaderTop from "./top";
import HeaderCenter from "./center";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`w-full top-0 z-99 transition-all duration-300 ${isSticky ? "fixed shadow-lg" : "absolute"}`}>
      <HeaderTop isSticky={isSticky} />
      <HeaderCenter isSticky={isSticky} />
    </header>
  );
}