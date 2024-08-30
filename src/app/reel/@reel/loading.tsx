import { Skeleton } from "@/components/ui/skeleton";

const ReelLoading = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="md:w-1/3 w-full h-full flex justify-center items-center relative">
        <Skeleton className="w-full h-full rounded-md" />
        <div className="absolute top-1/2 right-2 flex flex-col items-center gap-5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-2 flex flex-col gap-2">
          <Skeleton className="h-12 w-48 rounded-md" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
};

export default ReelLoading;
