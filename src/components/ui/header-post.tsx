"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CardHeader, CardTitle } from "./card";
import { HiCheckBadge } from "react-icons/hi2";
import { Button } from "./button";
import { LuMoreHorizontal } from "react-icons/lu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "../model/EditPost";
import { blockUserAction, followUserAction } from "@/redux/user/user.action";

const HeaderPost = ({ post }: { post: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userAuth } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);

  const handleFollow = async () => {
    await dispatch(followUserAction(post.user.id));

    console.log(userAuth);
  };

  const handleBlock = () => {
    dispatch(blockUserAction(post.user.id));
  };

  const handleShare = (id: number) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      "_blank"
    );
  };

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="ml-auto text-white"
          >
            <LuMoreHorizontal size={"1.5em"} />
          </Button>
        </DialogTrigger>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className="flex border-0 flex-col justify-center items-center bg-slate-800"
        >
          {post.user.id !== userAuth?.id && (
            <Button
              className="w-full py-2"
              variant="ghost"
              onClick={handleFollow}
            >
              {userAuth?.userFollow.some(
                (follow: any) => follow.id === post.user.id
              )
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
          {post.user.id === userAuth?.id && (
            <EditPost post={post}>
              <Button className="w-full py-2">Edit post</Button>
            </EditPost>
          )}

          {post.user.id !== userAuth?.id && (
            <Button
              className="w-full py-2"
              variant="ghost"
              onClick={() => {
                handleBlock();
                setOpen(false);
              }}
            >
              Block this account
            </Button>
          )}
          <Button className="w-full py-2" variant="ghost">
            Go to post
          </Button>
          <Button
            className="w-full py-2"
            variant="ghost"
            onClick={() => {
              handleShare(post.id);
              setOpen(false);
            }}
          >
            Share this account
          </Button>
          <Button
            className="w-full py-2"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </CardHeader>
  );
};

export default HeaderPost;
