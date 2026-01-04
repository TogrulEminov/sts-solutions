import { IAbout } from "@/src/services/interface";
import Statistics from "./statistics";
import CustomImage from "@/src/globalElements/ImageTag";
import { sanitizeHtml } from "@/src/lib/domburify";
interface Props {
  existingData: IAbout;
}
export default async function TeamContent({ existingData }: Props) {
  const translations = existingData?.translations?.[0];
  return (
    <section className="pb-10 lg:pb-25">
      <div className="px-0 lg:px-4 container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 p-5 lg:p-10 bg-ui-23 rounded-2xl lg:rounded-4xl">
          <div className="lg:col-span-8 flex flex-col space-y-10">
            {translations?.teamDescription && (
              <article
                className="font-inter font-normal text-base lg:text-2xl text-ui-7"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(translations?.teamDescription),
                }}
              />
            )}
            <Statistics existingData={translations?.statistics || []} />
          </div>
          <figure className="lg:col-span-4">
            <CustomImage
              width={357}
              height={565}
              title=""
              src={
                "https://res.cloudinary.com/da403zlyf/image/upload/v1766317331/Group_1321314574_nfknny.svg"
              }
              className="w-full h-auto max-h-140"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
