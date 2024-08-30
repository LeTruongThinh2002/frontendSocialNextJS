import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PostItemLoading = () => (
  <AspectRatio ratio={1 / 1} className="bg-muted max-h-[30em] relative">
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

const PostsLoading = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <PostItemLoading key={index} />
      ))}
    </div>
  );
};

export default PostsLoading;
