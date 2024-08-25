"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { FaInfoCircle } from "react-icons/fa";
import { Input } from "./input";
import { IoImagesSharp } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { GrSend } from "react-icons/gr";
import { useState } from "react";
import Message from "./message";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatInfo from "./chat-info";

const ChatValue = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex flex-none flex-row gap-2 p-2 items-center border-b border-white/10">
        <Avatar className="h-[3em] w-[3em] p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-bold text-md">User name</span>
        <Popover>
          <PopoverTrigger className="md:group-hover:bg-white/10 rounded-full text-xl p-1 ml-auto">
            <FaInfoCircle />
          </PopoverTrigger>
          <PopoverContent className="bg-slate-800 border-0 flex flex-col w-fit">
            <ChatInfo />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grow h-full flex flex-col p-2 gap-2 overflow-y-auto scrollable-content">
        <Message media={true} />
        <Message right={true} />
        <Message />
        <Message right={true} />
        <Message />
        <Message right={true} media={true} />
        <Message media={true} />
        <Message />
        <Message media={true} />
      </div>
      <div className="flex-none flex flex-row gap-2 items-center p-2 mt-auto border-t border-white/10">
        <IoImagesSharp className="text-[1.5em]" />
        <RiVideoAddLine className="text-[1.5em]" />
        <Input
          className="placeholder:text-gray-400 rounded-full border-gray-400"
          placeholder="Search chat..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <GrSend
          size={"1.5em"}
          className={inputValue ? "text-white" : "text-gray-400"}
        />
      </div>
    </div>
  );
};

export default ChatValue;
