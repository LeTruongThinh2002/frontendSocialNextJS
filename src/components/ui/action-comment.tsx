"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "./input";
import { AiOutlineSend } from "react-icons/ai";
import { Button } from "./button";
import { createComment } from "@/redux/post/post.action";
import { createReelComment } from "@/redux/reel/reel.action";
import { RootState, AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { fetchAuthUserInfoAction } from "@/redux/user/user.action";

const ActionComment = ({ post, type }: { post: any; type: string }) => {
  const { loading, error } = useSelector((state: RootState) => state.post);
  const { userAuth, loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [cmt, setCmt] = useState("");

  if (!userAuth && !userLoading) {
    dispatch(fetchAuthUserInfoAction());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "post") {
      await dispatch(
        createComment({
          post_id: post.id,
          parent_comment_id: null,
          comment: cmt,
        })
      );
    } else {
      await dispatch(
        createReelComment({
          reels_id: post.id,
          parent_comment_id: null,
          comment: cmt,
        })
      );
    }
    if (error) {
      toast.error(error);
    }
    setCmt("");
  };
  if (!userAuth) return <></>;
  return (
    <div className="p-2 pb-0 w-full flex flex-row items-center gap-2 border-t border-slate-500">
      <Avatar className="p-0.5 cursor-pointer max-w-9 max-h-9 bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90% rounded-full">
        <AvatarImage
          className="rounded-full border border-black"
          src={
            userAuth.avatar ||
            "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
          }
          alt={userAuth.first_name + " " + userAuth.last_name}
        />
        <AvatarFallback>
          {userAuth.first_name.charAt(0) + userAuth.last_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <form
        className="flex flex-row items-center gap-2 flex-grow"
        onSubmit={handleSubmit}
      >
        <Input
          id="comment"
          className="placeholder:text-gray-400 border-0"
          placeholder="Enter your comment..."
          onChange={(e): any => setCmt(e.target.value)}
        />
        <Button
          type="submit"
          className={
            cmt
              ? "cursor-pointer hover:text-sky-500"
              : "text-gray-500 cursor-not-allowed"
          }
          disabled={cmt === "" || loading}
        >
          <AiOutlineSend size={"1.5em"} />
        </Button>
      </form>
    </div>
  );
};

export default ActionComment;
