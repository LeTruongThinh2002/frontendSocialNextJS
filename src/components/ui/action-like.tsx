"use client";

import { AiOutlineComment } from "react-icons/ai";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { LiaTelegramPlane } from "react-icons/lia";
import { Button } from "./button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction } from "@/redux/post/post.action";
import { likeReel } from "@/redux/reel/reel.action";

const ActionLike = ({ post, type }: { post: any; type: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userAuth } = useSelector((state: RootState) => state.user);

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
  );
};

export default ActionLike;
