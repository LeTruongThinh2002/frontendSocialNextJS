import { Skeleton } from "@/components/ui/skeleton";

const NewItemLoading = () => (
  <div className="flex flex-col justify-center items-center">
    <Skeleton className="w-[62px] h-[62px] rounded-full " />
    <Skeleton className="w-16 h-4 mt-2 " />
  </div>
);

const NewsLoading = () => {
  return (
    <div className="flex flex-row gap-5 w-full px-2 ">
      <div className="w-full max-h-[30em] relative">
        <div className="flex overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="basis-[18%] md:basis-[12%] flex-shrink-0 mr-5"
            >
              <NewItemLoading />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsLoading;
