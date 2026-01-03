import NewsCard from "@/src/globalElements/cards/news";
import { BlogItem } from "@/src/services/interface";
import NoData from "@/src/ui/essential/no-data";
interface Props {
  existingData: BlogItem[];
}
export default function CardWrapper({ existingData }: Props) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
      {existingData?.length ? (
        existingData?.map((blog, index) => {
          return <NewsCard key={index} blog={blog} />;
        })
      ) : (
        <NoData className="col-span-1 md:col-span-2 lg:col-span-3" />
      )}
    </div>
  );
}
