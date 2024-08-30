import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ReelItemLoading = () => (
  <AspectRatio
    ratio={1 / 1.5}
    className="bg-muted max-h-[30em] relative aspect-ratio"
  >
    <Skeleton className="w-full h-full" />
    <div className="absolute top-2 right-2">
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
    <div className="absolute bottom-2 left-2 right-2">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-1 items-center">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  </AspectRatio>
);

const ReelsLoading = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {Array.from({ length: 8 }).map((_, index) => (
        <ReelItemLoading key={index} />
      ))}
    </div>
  );
};

export default ReelsLoading;
