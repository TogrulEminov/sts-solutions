"use client";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    id: 1,
    number: "1",
    title: "Nəticələrin keyfiyyətinin və miqabət qabiliyyətinin artırılması",
  },
  {
    id: 2,
    number: "2",
    title: "Enerji sərfiyyatının optimallaşdırılması və xərcin azaldılması",
  },
  {
    id: 3,
    number: "3",
    title: "İşçi qüvvəsinin səmərəli istifadəsi",
  },
  {
    id: 4,
    number: "4",
    title: "İstehsal həcminin artırılması",
  },
];

export default function ProcessSteps() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="w-full py-12">
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-35 lg:gap-8 relative"
          ref={ref}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease-out ${index * 0.15}s`,
              }}
            >
              <div className="relative group">
                <div className="w-[100px] h-[100px] rounded-full bg-ui-1 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-ui-1/30">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.9833 3.3335H13.0166C6.94992 3.3335 3.33325 6.95016 3.33325 13.0168V26.9668C3.33325 33.0502 6.94992 36.6668 13.0166 36.6668H26.9666C33.0333 36.6668 36.6499 33.0502 36.6499 26.9835V13.0168C36.6666 6.95016 33.0499 3.3335 26.9833 3.3335ZM27.2833 23.9168L23.5833 27.6168C22.6833 28.5168 21.5166 28.9502 20.3499 28.9502C19.1833 28.9502 17.9999 28.5002 17.1166 27.6168C16.2499 26.7502 15.7666 25.6002 15.7666 24.3835C15.7666 23.1668 16.2499 22.0002 17.1166 21.1502L19.4666 18.8002C19.9499 18.3168 20.7499 18.3168 21.2333 18.8002C21.7166 19.2835 21.7166 20.0835 21.2333 20.5668L18.8833 22.9168C18.4833 23.3168 18.2666 23.8335 18.2666 24.3835C18.2666 24.9335 18.4833 25.4668 18.8833 25.8502C19.6999 26.6668 21.0166 26.6668 21.8333 25.8502L25.5333 22.1502C27.6499 20.0335 27.6499 16.6002 25.5333 14.4835C23.4166 12.3668 19.9833 12.3668 17.8666 14.4835L13.8333 18.5168C12.9833 19.3668 12.5166 20.4835 12.5166 21.6668C12.5166 22.8502 12.9833 23.9835 13.8333 24.8168C14.3166 25.3002 14.3166 26.1002 13.8333 26.5835C13.3499 27.0668 12.5499 27.0668 12.0666 26.5835C10.7333 25.3002 9.99992 23.5502 9.99992 21.6835C9.99992 19.8168 10.7166 18.0668 12.0333 16.7502L16.0666 12.7168C19.1499 9.6335 24.1833 9.6335 27.2666 12.7168C30.3666 15.8002 30.3666 20.8335 27.2833 23.9168Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div
                  className="absolute top-8 -right-6 z-3 w-10 h-10 rounded-full bg-ui-5 flex items-center justify-center border-4 border-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "scale(1)" : "scale(0)",
                    transition: `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                      index * 0.15 + 0.3
                    }s`,
                  }}
                >
                  <span className="font-inter font-bold text-lg text-white">
                    {step.number}
                  </span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="block absolute top-70 rotate-90 lg:rotate-[unset] lg:top-[50px] lg:left-[85%]   w-20 lg:w-[147px] h-1 bg-ui-5 overflow-hidden">
                  <div
                    className="h-full bg-ui-1"
                    style={{
                      width: inView ? "100%" : "0%",
                      transition: `width 0.8s ease-out ${index * 0.15 + 0.5}s`,
                    }}
                  ></div>
                </div>
              )}

              <p
                className="mt-8 text-center font-inter font-medium text-base lg:text-lg text-ui-7 max-w-[220px]"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease-out ${index * 0.15 + 0.4}s`,
                }}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
