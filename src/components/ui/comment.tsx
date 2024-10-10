"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";
import TruncatedText from "./truncate-text";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Button } from "./button";
import { useState } from "react";
import { Input } from "./input";
import { AiOutlineSend } from "react-icons/ai";
import { Skeleton } from "./skeleton";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import SearchUserFromData from "../model/SearchUserFromData";
import { createComment, likeComment } from "@/redux/post/post.action";
import { createReelComment, likeReelComment } from "@/redux/reel/reel.action";

const Comment = ({
  comment,

  type,
}: {
  comment: any;

  type: string;
}) => {
  const [reply, setReply] = useState(false);
  const [cmt, setCmt] = useState("");
  const [replies, setReplies] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.post);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { loading: loadingReel } = useSelector(
    (state: RootState) => state.reel
  );

  const handleReply = () => {
    if (type === "post") {
      dispatch(
        createComment({
          post_id: comment.post_id,
          comment: cmt,
          parent_comment_id: comment.parent_comment_id
            ? comment.parent_comment_id
            : comment.id,
        })
      );
    } else {
      dispatch(
        createReelComment({
          reels_id: comment.reels_id,
          comment: cmt,
          parent_comment_id: comment.parent_comment_id
            ? comment.parent_comment_id
            : comment.id,
        })
      );
    }
    setCmt("");
    setReply(false);
  };

  const handleLike = () => {
    if (type === "post") {
      dispatch(likeComment(comment.id));
    } else if (type === "reel") {
      dispatch(likeReelComment(comment.id));
    }
  };

  return (
    <div className="flex flex-col gap-1 bg-slate-400/10 rounded-lg p-1">
      <div className="flex flex-row items-center gap-2 text-sm ">
        <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src={
              comment.user?.avatar === undefined
                ? "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
                : comment.user.avatar
            }
            alt={comment.user.first_name + " " + comment.user.last_name}
          />
          <AvatarFallback>
            {comment.user.first_name.charAt(0) +
              comment.user.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <Link
              href={`/profile/${comment.user.id}`}
              className="font-bold md:w-[7em] w-[5em] truncate ..."
            >
              <span>
                {comment.user.first_name + " " + comment.user.last_name}
              </span>
            </Link>
            <HiCheckBadge className="text-sky-600" size={"0.8em"} />
          </div>

          <span className="text-[1em] font-semibold text-gray-400">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        {comment.like.some((like: any) => like.id === userAuth.id) ? (
          <Button className="ml-auto" onClick={handleLike}>
            <GoHeartFill className="text-red-500" />
          </Button>
        ) : (
          <Button className="ml-auto" onClick={handleLike}>
            <GoHeart />
          </Button>
        )}
      </div>
      <TruncatedText text={`${comment.comment}`} maxWidth={"100%"} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 text-gray-400 text-sm ">
          <SearchUserFromData type="friend" data={comment.like}>
            <span className="cursor-pointer hover:underline ">
              {Object.keys(comment.like).length} like
            </span>
          </SearchUserFromData>
          {!comment.parent_comment_id && (
            <span
              onClick={() => {
                if (Object.keys(comment.reply).length > 0) {
                  setReplies(!replies);
                }
              }}
              className={`pl-2 cursor-pointer hover:underline `}
            >
              {Object.keys(comment.reply).length} reply
            </span>
          )}
          <span
            onClick={() => setReply(!reply)}
            className="ml-auto text-white hover:underline cursor-pointer"
          >
            Reply
          </span>
        </div>
        <div className="pl-5 flex flex-col gap-2">
          {replies &&
            comment.reply.map((reply: any) => (
              <Comment key={reply.id} comment={reply} type={type} />
            ))}
        </div>
      </div>
      {reply && (
        <div className="p-2 flex flex-row items-center gap-2 border-t border-slate-500">
          <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
            <AvatarImage
              className="rounded-full border-2 border-black "
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
          <Input
            className="placeholder:text-gray-400 border-0"
            placeholder="Enter your comment..."
            disabled={loading || loadingReel}
            onChange={(e): any => setCmt(e.target.value)}
          />
          <AiOutlineSend
            size={"1.5em"}
            onClick={handleReply}
            className={`${
              cmt
                ? "cursor-pointer hover:text-sky-500 "
                : "text-gray-500 cursor-not-allowed "
            }
                 ${
                   loading || loadingReel
                     ? "spinner-loading cursor-not-allowed"
                     : ""
                 }
                `}
          />
        </div>
      )}
    </div>
  );
};

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 bg-slate-400/10 rounded-lg p-1">
      <div className="flex flex-row items-center gap-2 text-sm">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-8 ml-auto" />
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="flex flex-row gap-2 text-gray-400 text-sm">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12 ml-auto" />
      </div>
    </div>
  );
};

export { CommentSkeleton };

export default Comment;
