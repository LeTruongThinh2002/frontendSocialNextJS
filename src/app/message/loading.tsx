import { Skeleton } from "@/components/ui/skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const MessageLoading = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="md:min-w-[25%] md:w-[30%] w-[15%] min-w-[15%] px-2 flex flex-col gap-4">
        <div className="flex flex-row text-xl items-center py-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 ml-auto" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-row font-semibold text-sm text-gray-400">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-10 ml-auto" />
          </div>
          <div className="flex flex-col gap-4 h-full w-full overflow-y-auto scrollable-content md:pb-27 pb-32">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-row items-center w-full gap-2 py-2"
              >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col flex-grow">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className="border-l">
        <div className="flex flex-col gap-1 h-full">
          <div className="flex flex-none flex-row gap-2 p-2 items-center border-b border-white/10">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-6 ml-auto" />
          </div>
          <div className="grow h-full flex flex-col p-2 gap-2 overflow-y-auto scrollable-content">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Skeleton
                  className={`h-20 ${
                    index % 2 === 0 ? "w-2/3" : "w-1/2"
                  } rounded-lg`}
                />
              </div>
            ))}
          </div>
          <div className="flex-none flex flex-row gap-2 items-center p-2 mt-auto border-t border-white/10">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MessageLoading;
