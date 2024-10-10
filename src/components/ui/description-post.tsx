"use client";
import TruncatedText from "./truncate-text";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";

const DescriptionPost = ({ post }: { post: any }) => {
  return (
    <div className="flex flex-col gap-1 bg-slate-400/10 rounded-lg p-1">
      <div className="flex flex-row items-center gap-2 text-sm ">
        <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src={post.user.avatar}
            alt={post.user.first_name + " " + post.user.last_name}
          />
          <AvatarFallback>
            {post.user.first_name.charAt(0) + post.user.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <span className="font-bold  md:w-[7em] w-[5em] truncate ...">
              {post.user.first_name + " " + post.user.last_name}
            </span>
            <HiCheckBadge className="text-sky-600" size={"0.8em"} />
          </div>

          <span className="text-[1em] font-semibold text-gray-400">
            {post.created_at === post.updated_at
              ? new Date(post.created_at).toLocaleDateString("vi-VN")
              : "updated " +
                new Date(post.updated_at).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
      <TruncatedText text={`${post.description}`} maxWidth={"100%"} />
    </div>
  );
};

export default DescriptionPost;
