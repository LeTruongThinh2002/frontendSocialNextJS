"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Comment, { CommentSkeleton } from "./comment";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Input } from "./input";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState, useCallback } from "react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { createReelComment, fetchReelComments } from "@/redux/reel/reel.action";
import DescriptionPost from "./description-post";
import { Button } from "./button";

const CommentDrawer = ({
  children,
  reel,
}: {
  children: React.ReactNode;
  reel: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userAuth } = useSelector((state: RootState) => state.user);
  const [cmt, setCmt] = useState("");
  const [error, setError] = useState("");
  const { loading, comments } = useSelector((state: RootState) => state.reel);

  const fetchComment = useCallback(async () => {
    if (reel) {
      await dispatch(fetchReelComments(reel.id));
    }
  }, [reel, dispatch]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  // if (!reel || !userAuth || !comments)
  //   return <div className="h-full w-full spinner-loading"></div>;

  const handleSubmit = async () => {
    if (cmt.trim() === "") {
      setError("Comment cannot be empty!");
      return;
    }
    await dispatch(
      createReelComment({
        reels_id: reel.id,
        parent_comment_id: null,
        comment: cmt,
      })
    );
    setCmt("");
    setError("");
  };

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="bg-transparent backdrop-blur-md">
        <DrawerHeader>
          <DrawerTitle>
            <div className="h-2 w-[100px] rounded-full bg-gray-500" />
          </DrawerTitle>
        </DrawerHeader>
        <div className="md:w-1/2 lg:w-1/3 flex flex-col gap-1 w-full bg-black border-l border-r rounded-b-none border-slate-500 rounded-lg h-full">
          <div className="h-full w-full flex flex-col gap-2 overflow-y-auto p-2">
            <DescriptionPost post={reel} />
            {loading && !comments ? (
              <CommentSkeleton />
            ) : (
              comments.map((comment: any, index: number) => (
                <Comment key={index} comment={comment} type={"reel"} />
              ))
            )}
          </div>
          <div className="p-2 flex flex-row items-center gap-2 border-t border-slate-500">
            <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
              <AvatarImage
                className="rounded-full border-2 border-black "
                src={userAuth.avatar}
                alt={userAuth.first_name + " " + userAuth.last_name}
              />
              <AvatarFallback>
                {userAuth.first_name.charAt(0) + userAuth.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Input
              className="placeholder:text-gray-400 border-0"
              placeholder={
                error.trim() !== "" ? error : "Enter your comment..."
              }
              onChange={(e): any => setCmt(e.target.value)}
              value={cmt}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <Button
              className="cursor-pointer hover:text-sky-500 text-sm"
              disabled={cmt.trim() === ""}
              onClick={handleSubmit}
            >
              <AiOutlineSend />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
