import { Skeleton } from "@/components/ui/skeleton";

const FriendsLoading = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md md:bg-white/10 bg-transparent p-4">
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <Skeleton className="h-6 w-20 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="ml-auto h-9 w-32" />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Skeleton className="h-24 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsLoading;
