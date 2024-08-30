import { Skeleton } from "@/components/ui/skeleton";

const ProfileNewItemLoading = () => (
  <div className="flex flex-col justify-center items-center">
    <Skeleton className="w-[74px] h-[74px] rounded-full" />
    <Skeleton className="w-16 h-4 mt-2" />
  </div>
);

const ProfileNewsLoading = () => {
  return (
    <div className="flex flex-row gap-5 w-full px-2">
      <div className="w-full max-h-[30em] relative">
        <div className="flex overflow-hidden">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="basis-[24%] md:basis-[18%] flex-shrink-0 mr-5"
            >
              <ProfileNewItemLoading />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileNewsLoading;
