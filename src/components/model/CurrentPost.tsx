"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import ImageList from "../ui/image-list";
import { Card, CardContent } from "../ui/card";
import Comment, { CommentSkeleton } from "../ui/comment";
import { fetchComments } from "@/redux/post/post.action";
import { fetchReelComments } from "@/redux/reel/reel.action";
import HeaderPost from "../ui/header-post";
import DescriptionPost from "../ui/description-post";
import ActionCurrentPost from "../ui/action-current-post";
import SearchUserFromData from "./SearchUserFromData";

const CurrentPost = ({
  post,
  children,
  type,
}: {
  post: any;
  children: React.ReactNode;
  type: "post" | "reel";
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.post
  );
  const {
    comments: reelComments,
    loading: reelLoading,
    error: reelError,
  } = useSelector((state: RootState) => state.reel);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    if (type === "post") {
      dispatch(fetchComments(post.id));
    } else {
      dispatch(fetchReelComments(post.id));
    }
  }, [dispatch, post.id, type]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="w-full"
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex md:flex-row flex-col md:max-w-[70vw] max-w-[70vh] max-h-[90vh] md:overflow-hidden overflow-y-auto p-0 border-0 bg-zinc-950"
      >
        <DialogTitle></DialogTitle>
        <div className="md:w-1/2 h-full flex items-center justify-center">
          <ImageList images={post.media} />
        </div>
        <Card className="md:w-1/2 h-[90vh] flex flex-col border-0 md:overflow-hidden">
          <HeaderPost post={post} />
          <CardContent className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-300px)]">
              <div className="flex flex-col gap-2 p-2 ">
                <DescriptionPost post={post} />
                {(loading || reelLoading) && !comments && !reelComments ? (
                  <CommentSkeleton />
                ) : type === "post" ? (
                  comments.map((comment: any, index: number) => (
                    <Comment key={index} comment={comment} type={type} />
                  ))
                ) : (
                  reelComments.map((comment: any, index: number) => (
                    <Comment key={index} comment={comment} type={type} />
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-auto">
              <SearchUserFromData data={post.like} type="friend">
                <div className="font-semibold text-sm cursor-pointer">
                  {Object.keys(post.like).length || 0} like
                </div>
              </SearchUserFromData>
              <div className="ml-auto font-semibold text-sm">
                {post.comments || 0} comments
              </div>
            </div>
          </CardContent>
          <ActionCurrentPost post={post} type={type} />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CurrentPost;
