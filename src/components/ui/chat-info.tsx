import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { TbBackground, TbLockOff } from "react-icons/tb";
import { TbPhotoVideo } from "react-icons/tb";

const ChatInfo = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Avatar className="h-[3em] w-[3em] p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="font-bold text-md">User name</span>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col p-2 gap-1 items-center text-sm font-light hover:bg-white/10 cursor-pointer rounded-md ">
          <RxAvatar size={"1.5em"} />
          <span>Profile</span>
        </div>
        <div className="flex flex-col p-2 gap-1 items-center text-sm font-light hover:bg-white/10 cursor-pointer rounded-md ">
          <TbLockOff size={"1.5em"} />
          <span>Block</span>
        </div>
        <div className="flex flex-col p-2 gap-1 items-center text-sm font-light hover:bg-white/10 cursor-pointer rounded-md ">
          <AiOutlineDelete size={"1.5em"} />
          <span>Delete</span>
        </div>
      </div>
      <div className="flex flex-row gap-1 p-2 hover:bg-white/10 cursor-pointer text-sm rounded-md">
        <TbPhotoVideo size={"1.5em"} />
        <span>See all media files</span>
      </div>
      <div className="flex flex-row gap-1 p-2 hover:bg-white/10 cursor-pointer text-sm rounded-md">
        <TbBackground size={"1.5em"} />
        <span>Change background</span>
      </div>
    </div>
  );
};

export default ChatInfo;
