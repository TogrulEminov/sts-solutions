import Image from "next/image";
export default function AboutImage() {
  return (
    <div className="relative w-full   lg:-left-16 2xl:-left-25">
      <div className="relative flex flex-col  min-h-[300px] lg:min-h-[600px]">
        <div className="relative z-10 animate-fade-in-left">
          <div className="relative group">
            <div className="relative w-[220px] sm:w-[350px] lg:w-[400px] h-70 sm:h-[400px] lg:h-[480px] overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl">
              <Image
                width={420}
                height={480}
                src="https://i.pinimg.com/1200x/84/7c/b6/847cb696c3080ad4d29d496b48f18ef1.jpg"
                alt="Engineer with safety helmet"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
        <div className="relative z-20 border-6 border-white overflow-hidden  animate-fade-in-right rounded-2xl ml-30 lg:ml-55 -mt-60">
          <div className="relative group">
            <div className="relative w-full sm:w-[300px] lg:w-[360px] h-[280px] sm:h-[350px] lg:h-[420px] overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl hover:-translate-y-2">
              <Image
                width={360}
                height={420}
                src="https://i.pinimg.com/1200x/b3/92/a9/b392a9634e95c53797ec26e31fc992fc.jpg"
                alt="Engineering tools and blueprint"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
