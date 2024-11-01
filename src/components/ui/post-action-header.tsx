import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { useState } from "react";
import { LuMoreHorizontal } from "react-icons/lu";
import EditPost from "../model/EditPost";
import { Button } from "./button";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { followUserAction, blockUserAction } from "@/redux/user/user.action";

const PostActionHeader = ({
  post,
  userAuth,
  type = "post",
}: {
  post: any;
  userAuth: any;
  type: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

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
            <Button className="w-full py-2">
              Edit {type === "post" ? "post" : "reel"}
            </Button>
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
          Go to {type === "post" ? "post" : "reel"}
        </Button>
        <Button
          className="w-full py-2"
          variant="ghost"
          onClick={() => {
            handleShare(post.id);
            setOpen(false);
          }}
        >
          Share this {type === "post" ? "post" : "reel"}
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
  );
};

export default PostActionHeader;
