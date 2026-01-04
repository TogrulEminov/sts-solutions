"use client";
import { IContactInformation } from "@/src/services/interface";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  existingData: IContactInformation;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function MapSection({ existingData }: Props) {
  const t = useTranslations("contact");
  const { latitude, longitude } = existingData;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        try {
          // Əgər xəritə artıq varsa, təmizlə
          if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
          }

          // Yeni xəritə yarat
          const map = new window.ymaps.Map(mapRef.current, {
            center: [Number(latitude), Number(longitude)],
            zoom: 15,
            controls: [
              "zoomControl",
              "fullscreenControl",
              "geolocationControl",
            ],
          });

          // Custom marker əlavə et
          const placemark = new window.ymaps.Placemark(
            [Number(latitude), Number(longitude)],
            {
              balloonContentBody: "Baku, Azerbaijan",
            },
            {
              preset: "islands#redDotIcon",
              iconColor: "#a30010",
            }
          );

          map.geoObjects.add(placemark);
          mapInstanceRef.current = map;
        } catch (error) {
          console.error("Map initialization error:", error);
        }
      });
    };

    // Yandex Maps API yüklənənə qədər gözlə
    if (window.ymaps) {
      initMap();
    } else {
      const checkInterval = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 100);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return (
    <section className="pb-10 lg:pb-20">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[200px] lg:h-[500px] rounded-2xl overflow-hidden border border-ui-24 shadow-sm">
          <div ref={mapRef} className="w-full h-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="lg:rounded-xl p-4 rounded-md lg:p-6 border border-ui-24">
            <div className="flex items-start gap-3">
              <div className="lg:w-10 lg:h-10 w-8 h-8 bg-ui-23 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="lg:w-5 lg:h-5 text-ui-7 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ui-9 mb-1">Ünvan</h3>
                <p className="text-sm text-ui-2">Baku, Azerbaijan</p>
              </div>
            </div>
          </div>
          <div className="lg:rounded-xl p-4 rounded-md lg:p-6 border border-ui-24">
            <div className="flex items-start gap-3">
              <div className="lg:w-10 lg:h-10 w-8 h-8 bg-ui-23 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="lg:w-5 lg:h-5 text-ui-7 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ui-9 mb-1">
                  {t("roadmap")}
                </h3>

                <Link
                  href={`https://yandex.com/maps/?pt=${longitude},${latitude}&z=15&l=map`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-6 hover:text-ui-9 transition-colors font-medium"
                >
                  {t("viewMap")} →
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:rounded-xl p-4 rounded-md lg:p-6 border border-ui-24">
            <div className="flex items-start gap-3">
              <div className="lg:w-10 lg:h-10 w-8 h-8 bg-ui-23 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="lg:w-5 lg:h-5 text-ui-7 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ui-9 mb-1">
                  {t("workHours")}
                </h3>
                <p className="text-sm text-ui-2">
                  {existingData?.translations?.[0]?.workHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
