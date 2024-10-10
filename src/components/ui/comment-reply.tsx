import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";
import TruncatedText from "./truncate-text";
import { GoHeart } from "react-icons/go";
import { Button } from "./button";
import { useState } from "react";
import { Input } from "./input";
import { AiOutlineSend } from "react-icons/ai";

const CommentReply = () => {
  const [reply, setReply] = useState(false);
  const [cmt, setCmt] = useState("");

  return (
    <div className="flex flex-col gap-1 bg-slate-400/10 rounded-lg p-1">
      <div className="flex flex-row items-center gap-2 text-sm ">
        <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <span className="font-bold">user name </span>
            <HiCheckBadge className="text-sky-600" size={"0.8em"} />
          </div>

          <span className="text-[1em] font-semibold text-gray-400">
            1 ngày trước
          </span>
        </div>
        <Button className="ml-auto">
          <GoHeart />
        </Button>
      </div>
      <TruncatedText
        textSize={"text-sm"}
        text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 text-gray-400 text-sm ">
          <span className="cursor-pointer hover:underline ">10 like</span>
          <span
            onClick={() => setReply(!reply)}
            className="ml-auto text-white hover:underline cursor-pointer"
          >
            Reply
          </span>
        </div>
      </div>
      {reply && (
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
      )}
    </div>
  );
};

export default CommentReply;
