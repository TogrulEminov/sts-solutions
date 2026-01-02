"use client";
import { useInView } from "react-intersection-observer";
import logo from "@/public/assets/logo/sts-logo.svg"
import CustomImage from "@/src/globalElements/ImageTag";
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
                <div className="w-[100px] h-[100px] p-3 rounded-full bg-ui-1 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-ui-1/30">
                 <CustomImage src={logo} width={100} height={40} title="" className="max-w-13 h-auto"/>
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
