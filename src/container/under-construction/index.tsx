"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UnderConstructionPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // ✅ NEXT_PUBLIC_ prefix ilə .env-dən oxuyur
    const launchTimeStr =
      process.env.NEXT_PUBLIC_LAUNCH_TIME || "2026-12-31T23:59:59";
    const launchTime = new Date(launchTimeStr);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = launchTime.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ui-1">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 lg:py-20 flex items-center justify-center bg-linear-to-br from-ui-1 via-ui-5 to-ui-14 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 lg:w-72 h-64 lg:h-72 bg-ui-4/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 lg:w-96 h-80 lg:h-96 bg-ui-11/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-ui-4/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Logo & Title Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-6 lg:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-ui-4/20 rounded-3xl blur-2xl" />
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-linear-to-br from-ui-4 to-ui-15 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-white mb-4 lg:mb-6 tracking-tight">
            Tezliklə
          </h1>
          <p className="text-xl lg:text-3xl text-ui-19 font-light max-w-2xl mx-auto px-4">
            Smart Technology Solutions
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mt-6 lg:mt-8">
            <div className="h-px w-16 lg:w-20 bg-linear-to-r from-transparent to-ui-4" />
            <div className="w-2 h-2 bg-ui-4 rounded-full animate-pulse" />
            <div className="h-px w-16 lg:w-20 bg-linear-to-l from-transparent to-ui-4" />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12 lg:mb-16 px-2">
          {[
            { label: "Gün", value: timeLeft.days },
            { label: "Saat", value: timeLeft.hours },
            { label: "Dəqiqə", value: timeLeft.minutes },
            { label: "Saniyə", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-ui-4/20 to-ui-15/20 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 p-6 lg:p-10 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-ui-4/50">
                <div className="text-4xl lg:text-7xl font-black text-white mb-2 lg:mb-3 tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs lg:text-base text-ui-19 uppercase tracking-widest font-semibold">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-8 lg:mb-12 px-4">
          <p className="text-ui-19 text-lg lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Sizə inanılmaz bir təcrübə gətirmək üçün çox çalışırıq. <br />
            <span className="text-ui-4 font-semibold"> Xüsusi bir şey </span>
            üçün bizimlə qalın!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12 px-2">
          <Link
            href="mailto:togruleminov3@gmail.com"
            className="group relative"
          >
            <div className="absolute inset-0 bg-linear-to-br from-ui-4/20 to-transparent rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 hover:border-ui-4/50">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-linear-to-br from-ui-4 to-ui-15 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-ui-19 text-xs lg:text-sm font-semibold mb-1">
                    Email
                  </div>
                  <div className="text-white text-sm lg:text-lg font-bold truncate">
                    togruleminov3@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="tel:+994553183569" className="group relative">
            <div className="absolute inset-0 bg-linear-to-br from-ui-15/20 to-transparent rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 hover:border-ui-15/50">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-linear-to-br from-ui-15 to-ui-4 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-ui-19 text-xs lg:text-sm font-semibold mb-1">
                    Telefon
                  </div>
                  <div className="text-white text-sm lg:text-lg font-bold">
                    +994 55 318 35 69
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 px-4">
          <span className="text-ui-19 text-sm font-medium">Bizi izləyin:</span>
          {[
            {
              link: "https://wa.me/994553183569",
              name: "WhatsApp",
              icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
            },
           
            {
              link: "https://www.linkedin.com/in/togruleminov/",
              name: "LinkedIn",
              icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
            },
          ].map((social, index) => (
            <Link
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 lg:w-12 lg:h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-ui-4/20 transition-all hover:scale-110 border border-white/10 hover:border-ui-4/50 group"
              aria-label={social.name}
            >
              <svg
                className="w-5 h-5 text-white group-hover:text-ui-4 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
