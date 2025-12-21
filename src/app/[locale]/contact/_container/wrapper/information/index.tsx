import Icons from "@/public/icons";
import Link from "next/link";
import Social from "./social";

export default function InformationArea() {
  return (
    <div className="col-span-6 flex flex-col  space-y-6">
      <article className="flex flex-col space-y-3">
        <h1 className="text-3xl lg:text-[40px] lg:leading-12 font-bold text-ui-21 font-manrope ">
          Əməkdaşlıq etmək üçün
          <span className="text-ui-1 block">əlaqə saxlayın</span>
        </h1>
        <p className="text-lg font-manrope text-ui-7 max-w-2xl">
          Bizimlə əlaqə saxlamaq üçün aşağıdakı məlumatlardan istifadə edə və ya
          əlaqə formasını doldura bilərsiniz. Komandamız sizə ən qısa müddətdə
          cavab verəcək.
        </p>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" rounded-xl p-6 border border-ui-24 hover:border-ui-27 transition-all duration-300 group">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-ui-23 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ui-24 transition-colors">
              <Icons.Phone fill="currentColor" className="text-ui-7 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold font-manrope text-ui-2 mb-1.5">
                Telefon
              </h3>
              <Link
                href="tel:+994552624037"
                className="text-1 font-medium hover:text-ui-7 transition-colors text-sm block"
              >
                +994 55 262 40 37
              </Link>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className=" rounded-xl p-6 border border-ui-24 hover:border-ui-27 transition-all duration-300 group">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-ui-23 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ui-24 transition-colors">
              <Icons.Email fill="currentColor" className="text-ui-7 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold font-manrope text-ui-2 mb-1.5">
                Email
              </h3>
              <Link
                href="mailto:example@example.com"
                className="text-1 font-medium hover:text-ui-7 transition-colors text-sm block break-all"
              >
                example@example.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Card */}
      <div className="bg-linear-to-r from-[#dcf8c6]/40 to-[#dcf8c6]/20 rounded-xl p-6 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 group">
        <div className="flex items-center flex-col md:flex-row justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 w-full! lg:flex-1 min-w-0">
            <div className="w-14 h-14 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div className="flex-1 md:min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h3 className="text-base font-semibold font-manrope text-1">
                  WhatsApp
                </h3>
                <span className="px-2 py-0.5 bg-[#25D366] text-white text-[10px] font-semibold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Online
                </span>
              </div>
              <p className="text-xs text-12">
                Dərhal cavab - ən sürətli ünsiyyət yolu
              </p>
            </div>
          </div>
          <Link
            href="https://wa.me/994552624037"
            className="px-6 w-full text-center md:w-fit py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap shadow-sm"
          >
            Mesaj göndər
          </Link>
        </div>
      </div>

      <div className=" rounded-xl p-6 border border-ui-24 hover:border-ui-27 transition-all duration-300 group">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-ui-23 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-ui-24 transition-colors">
            <Icons.Address fill="currentColor" className="text-ui-7 w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold font-manrope text-ui-2 mb-1.5">
              Ünvanımız
            </h3>
            <Link
              href=""
              className="text-1 font-medium hover:text-ui-7 transition-colors text-sm block"
            >
              Baku, Azerbaijan
            </Link>
          </div>
        </div>
      </div>

      <div className=" rounded-xl p-6 border border-ui-24 hover:border-ui-27 transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-ui-23 rounded-xl flex items-center text-ui-1 justify-center shrink-0">
            <svg
              className="w-5 h-5 text-ui-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold font-manrope text-ui-2 mb-1">
              Sosial şəbəkələrimiz
            </h3>
            <p className="text-xs text-12 mb-3">
              Bizi sosial şəbəkələrdə izləyin
            </p>
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
}
