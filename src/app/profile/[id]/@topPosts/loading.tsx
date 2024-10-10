import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const TopPostsLoading = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-transparent p-4">
      <span className="font-bold text-lg">
        <Skeleton className="h-6 w-32" />
      </span>
      <div className="grid grid-cols-3 gap-1 h-full w-full">
        {Array.from({ length: 9 }).map((_, key) => (
          <div key={key}>
            <AspectRatio
              ratio={1 / 1}
              className="bg-muted max-h-[30em] overflow-hidden"
            >
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPostsLoading;
