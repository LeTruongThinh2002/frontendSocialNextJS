"use client";
import Chat from "@/components/ui/chat";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BiMessageSquareEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectedUserChat from "@/components/ui/selected-user-chat";
import ChatValue from "@/components/ui/chat-value";

const MessagePage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="md:min-w-[25%] md:w-[30%] w-[15%] min-w-[15%] px-2 flex flex-col gap-4">
        <div className="flex flex-row text-xl items-center py-2">
          <span className="font-bold">User name</span>
          <Dialog>
            <DialogTrigger className="ml-auto">
              <BiMessageSquareEdit className="text-xl" />
            </DialogTrigger>
            <DialogContent className="bg-slate-800 max-h-2/3">
              <DialogHeader>
                <DialogTitle>
                  <Input
                    className="placeholder:text-gray-400 border-0 border-b rounded-none border-gray-400"
                    placeholder="Search user..."
                  />
                </DialogTitle>
                <DialogDescription className="overflow-y-auto h-[20em]">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <SelectedUserChat key={index} keyId={index} />
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Input
          className="placeholder:text-gray-400 border-0 border-b rounded-none border-gray-400"
          placeholder="Search chat..."
        />
        <div className="w-full h-full flex flex-col">
          <div className="flex flex-row font-semibold text-sm text-gray-400">
            <span>Chat result</span>
            <span className="ml-auto">1.123</span>
          </div>
          <div className="flex flex-col gap-4 h-full w-full overflow-y-auto scrollable-content md:pb-27 pb-32">
            {Array.from({ length: 10 }).map((_, index) => (
              <Chat key={index} />
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={windowWidth >= 640 ? 70 : 85}
        className="border-l"
      >
        <ChatValue />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MessagePage;
