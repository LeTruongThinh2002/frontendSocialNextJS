import HeaderTop from "@/components/Layouts/Header-top";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingLayout = () => {
  return (
    <div className="grid lg:grid-cols-12 grid-rows-12 w-full h-full">
      <HeaderTop className="lg:hidden block row-start-1 row-end-2 col-start-1 col-end-13" />
      <div className="md:px-5 py-4 overflow-y-auto scrollable-content lg:col-start-1 lg:col-end-9 lg:row-start-1 col-start-1 col-end-13 row-start-2 row-end-13">
        <div className="flex flex-col gap-32 justify-center items-center">
          <div className="w-full flex flex-col items-center">
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
          </div>
          <div className="z-10 w-full flex flex-col gap-5">
            <div className="lg:hidden grid md:grid-cols-3 grid-cols-1 gap-1">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingLayout;
