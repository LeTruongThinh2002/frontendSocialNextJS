"use client";
import Chat from "@/components/ui/chat";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import ChatValue from "@/components/ui/chat-value";
import { useSelector } from "react-redux";
import SearchUserFromData from "@/components/model/SearchUserFromData";

const MessagePage = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  const [selectedFriends, setSelectedFriends] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectUser = (selectedData: any[]) => {
    setSelectedFriends(selectedData);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="md:min-w-[25%] md:w-[30%] w-[15%] min-w-[15%] px-2 flex flex-col gap-4">
        <div className="flex flex-row text-xl items-center py-2">
          <span className="font-bold">
            {user.first_name} {user.last_name}
          </span>
          <SearchUserFromData
            data={user.friends}
            onSelect={handleSelectUser}
            type="chat"
            props={{ className: "ml-auto" }}
          >
            <>
              <BiSolidMessageSquareEdit className="text-xl" />
            </>
          </SearchUserFromData>
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
