"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Comment from "./comment";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Input } from "./input";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";

const CommentDrawer = ({ children }: any) => {
  const [cmt, setCmt] = useState("");

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="bg-slate-800">
        <DrawerHeader>
          <DrawerTitle>
            <div className="h-2 w-[100px] rounded-full bg-gray-500" />
          </DrawerTitle>
        </DrawerHeader>
        <div className="md:w-1/2 lg:w-1/3 flex flex-col gap-1 w-full bg-black border-l border-r rounded-b-none border-slate-500 rounded-lg h-full">
          <div className="h-full w-full flex flex-col gap-2 overflow-y-auto p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Comment key={index} />
            ))}
          </div>
          <div className="p-2 flex flex-row items-center gap-2 border-t border-slate-500">
            <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
              <AvatarImage
                className="rounded-full border-2 border-black "
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Input
              className="placeholder:text-gray-400 border-0"
              placeholder="Enter your comment..."
              onChange={(e): any => setCmt(e.target.value)}
            />
            <AiOutlineSend
              size={"1.5em"}
              className={
                cmt
                  ? "cursor-pointer hover:text-sky-500"
                  : "text-gray-500 cursor-none"
              }
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
