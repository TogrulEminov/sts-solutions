import NewsCard from "@/src/globalElements/cards/news";

export default function CardWrapper() {
  return (
    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
      {Array.from({ length: 12 }).map((_, index) => {
        return <NewsCard key={index} />;
      })}
    </div>
  );
}
