"use client";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";
import { Button } from "./button";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { followUserAction } from "@/redux/user/user.action";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

const CardUserPost = ({
  user,
  createdAt,
}: {
  user: any;
  createdAt: string;
}) => {
  const { userAuth } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(
      userAuth.userFollow.some((follower: any) => follower.id === user.id)
    );
  }, [userAuth.userFollow, user.id]);

  const handleFollow = async () => {
    await dispatch(followUserAction(user.id));
  };

  return (
    <div className="flex flex-row items-center gap-2 text-sm">
      <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src={user.avatar}
          alt={user.first_name + " " + user.last_name}
        />
        <AvatarFallback>
          {user.first_name.charAt(0) + user.last_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          <Link href={`/profile/${user.id}`}>
            <span className="font-bold">
              {user.first_name + " " + user.last_name}
            </span>
          </Link>
          <HiCheckBadge className="text-sky-600" size={"2em"} />
        </div>

        <span className="text-sm font-semibold text-gray-400">
          {new Date(createdAt).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <span className="text-xl font-bold">•</span>
      <Button
        className={`${
          isFollow
            ? "text-red-500 hover:text-red-400 border-red-500 hover:border-red-400"
            : "text-sky-500 hover:text-sky-400 border border-slate-700 "
        }`}
        size={"sm"}
        variant={"ghost"}
        onClick={handleFollow}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default CardUserPost;
