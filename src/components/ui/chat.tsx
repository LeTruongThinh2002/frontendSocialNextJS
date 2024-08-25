import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const Chat = () => {
  return (
    <div className="flex flex-row items-center w-full gap-2 py-2 group">
      <Avatar className="h-[3em] w-[3em] p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-md truncate ...">User name</span>
        <span className="font-light text-sm text-gray-400 truncate ...">
          last message * 1 day
        </span>
      </div>
      <Popover>
        <PopoverTrigger className="md:group-hover:bg-white/10 rounded-full text-xl p-1 ml-auto">
          <LuMoreHorizontal />
        </PopoverTrigger>
        <PopoverContent className="bg-slate-800 border-0 flex flex-col w-fit">
          <Button className="flex flex-row gap-1" variant={"ghost"}>
            <MdOutlineDriveFileRenameOutline className="text-[1.5em]" />
            <span>Change name</span>
          </Button>
          <Button className="flex flex-row gap-1" variant={"ghost"}>
            <AiOutlineDelete className="text-[1.5em]" />
            <span>Delete chat</span>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Chat;
