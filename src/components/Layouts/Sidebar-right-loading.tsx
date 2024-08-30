import { Skeleton } from "../ui/skeleton";

const SidebarRightLoading = ({ ...prop }) => {
  return (
    <div {...prop}>
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="ml-auto h-8 w-16" />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <Skeleton className="h-4 w-40" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-20" />
            </div>
            <Skeleton className="ml-auto h-6 w-16" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
};

export default SidebarRightLoading;
