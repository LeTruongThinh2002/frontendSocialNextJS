"use client";
import { CardContent } from "./card";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiOutlineComment, AiOutlineSend } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createComment, likePostAction } from "@/redux/post/post.action";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Input } from "./input";
import { Button } from "./button";
import { createReelComment, likeReel } from "@/redux/reel/reel.action";
import { useState } from "react";
import { toast } from "sonner";

const ActionCurrentPost = ({ post, type }: { post: any; type: string }) => {
  const { loading, error } = useSelector((state: RootState) => state.post);
  const { userAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [cmt, setCmt] = useState("");
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

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (type === "post") {
      dispatch(likePostAction(post.id));
    } else {
      dispatch(likeReel(post.id));
    }
    console.log(post.like);
  };

  const handleShareFacebook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=frontend-social-next-js.vercel.app/post/${post.id}`,
      "_blank"
    );
  };

  return (
    <CardContent className="flex flex-col gap-1 mt-auto">
      <div className="flex flex-row items-center gap-4">
        <Button onClick={handleLike} className="cursor-pointer p-0">
          {post.like.some((like: any) => like.id === userAuth.id) ? (
            <GoHeartFill size={"1.5em"} className="text-red-500" />
          ) : (
            <GoHeart size={"1.5em"} />
          )}
        </Button>
        <label className="cursor-pointer" htmlFor="comment">
          <AiOutlineComment size={"1.5em"} />
        </label>
        <Button onClick={handleShareFacebook} className="cursor-pointer p-0">
          <LiaTelegramPlane size={"1.5em"} />
        </Button>
      </div>

      <div className="flex-shrink-0 p-2 pb-0 flex flex-row items-center gap-2 border-t border-slate-500">
        <Avatar className="p-0.5 cursor-pointer">
          <AvatarImage
            className="rounded-full"
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
    </CardContent>
  );
};

export default ActionCurrentPost;
