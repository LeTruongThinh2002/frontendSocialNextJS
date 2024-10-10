import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="relative max-h-[18em] w-full">
      <Skeleton className="h-[18em] w-full rounded-md" />
      <Skeleton className="absolute h-[10em] w-[10em] -bottom-24 left-5 rounded-full" />
      <div className="absolute md:-bottom-20 -bottom-24 left-52">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-40" />
          <div className="flex flex-row gap-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
