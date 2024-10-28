"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CardHeader, CardTitle } from "./card";
import { HiCheckBadge } from "react-icons/hi2";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PostActionHeader from "./post-action-header";

const HeaderPost = ({ post }: { post: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userAuth } = useSelector((state: RootState) => state.user);

  return (
    <CardHeader className="flex-shrink-0">
      <CardTitle className="flex flex-row items-center gap-2">
        <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src={
              post.user.avatar ||
              "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
            }
            alt={post.user.first_name + " " + post.user.last_name}
          />
          <AvatarFallback>
            {post.user.first_name.charAt(0) + post.user.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <Link
              href={`/profile/${post.user.id}`}
              className="cursor-pointer  md:w-[7em] w-[5em] truncate ..."
            >
              <span className="text-lg font-bold">
                {post.user.first_name + " " + post.user.last_name}
              </span>
            </Link>
            <HiCheckBadge className="text-sky-600" size={"0.8em"} />
            <span className="text-sm font-light text-gray-400">
              {new Date(post.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-500">
            {userAuth?.friends.some((friend: any) => friend.id === post.user.id)
              ? "Friend"
              : userAuth?.userFollow.some(
                  (follow: any) => follow.id === post.user.id
                )
              ? "Following"
              : "Suggestion for you."}
          </span>
        </div>
      </CardTitle>
      <PostActionHeader post={post} userAuth={userAuth} />
    </CardHeader>
  );
};

export default HeaderPost;
