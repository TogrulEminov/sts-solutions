import { FileType, StrategicItem } from "@/src/services/interface";
import PurposeCard from "./card";
import { getForCards } from "@/src/utils/getFullimageUrl";
import { getTranslations } from "next-intl/server";
interface Props {
  existingData: StrategicItem[];
}
export default async function PurposeSection({ existingData }: Props) {
  const t = await getTranslations("about");
  if (!existingData?.length) return null;
  return (
    <section className="py-10 lg:py-25 bg-ui-1/11">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <strong className="font-inter max-w-lg font-extrabold text-2xl lg:text-[56px] lg:leading-16 text-ui-7">
          {t("purpose")}
        </strong>
        <div className="grid lg:grid-cols-2 gap-6">
          {existingData?.map((item, index) => {
            const tr = item?.translations?.[0];
            return (
              <PurposeCard
                index={index}
                key={index}
                title={tr?.title}
                icon={getForCards(item?.imageUrl as FileType)}
                description={tr?.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
