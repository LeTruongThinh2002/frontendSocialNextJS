"use client";
import { useEffect, useRef, useState } from "react";
import {
  IoPlayCircleOutline,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import { Button } from "./button";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import CardUserPost from "./card-user-post";
import TruncatedText from "./truncate-text";
import CommentDrawer from "./comment-drawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import ReelLoading from "@/app/reel/@reel/loading";
import { likeReel } from "@/redux/reel/reel.action";
import PostActionHeader from "./post-action-header";

const Reel = ({
  isPlaying,
  index,
  reel,
}: {
  isPlaying: boolean;
  index: number;
  reel: any;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { userAuth } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/reel/${reel.id}`,
      "_blank"
    );
  };

  const handleLike = async () => {
    await dispatch(likeReel(reel.id));
  };

  if (!userAuth) return <ReelLoading />;

  return (
    <div className="relative w-full lg:h-full h-[95%]">
      <video
        ref={videoRef}
        src={reel.media}
        className="rounded-md object-cover object-center w-full h-full"
        controls={false}
        onClick={handlePlayPause}
        loop
        muted={isMuted}
      />
      <Button
        onClick={handlePlayPause}
        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 text-white text-3xl rounded-full"
      >
        {isVideoPlaying ? "" : <IoPlayCircleOutline size={"2em"} />}
      </Button>
      <Button
        variant={"ghost"}
        className="absolute top-2 right-2 p-2 text-white text-2xl rounded-full bg-white/5"
        onClick={handleMuteUnmute}
      >
        {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
      </Button>
      <div className="absolute top-1/2 right-2 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <Button
            variant={"ghost"}
            className="p-2  text-2xl rounded-full bg-white/5"
            onClick={handleLike}
          >
            {reel.like.some((like: any) => like.id === userAuth.id) ? (
              <GoHeartFill className="text-red-500" />
            ) : (
              <GoHeart className="text-white" />
            )}
          </Button>
          <span className="text-sm">{Object.keys(reel.like).length}</span>
        </div>
        <div className="flex flex-col items-center">
          <CommentDrawer reel={reel}>
            <Button
              variant={"ghost"}
              className="p-2 text-white text-2xl rounded-full bg-white/5"
            >
              <AiOutlineComment />
            </Button>
          </CommentDrawer>
          <span className="text-sm">{reel.comments}</span>
        </div>
        <Button
          variant={"ghost"}
          className="p-2 text-white text-2xl rounded-full bg-white/5"
          onClick={handleShare}
        >
          <LiaTelegramPlane />
        </Button>
      </div>
      <Button
        variant={"ghost"}
        className="absolute bottom-2 right-2 max-h-[2.8em] max-w-[2.8em] rounded-full bg-white/5"
      >
        <PostActionHeader post={reel} userAuth={userAuth} type="reel" />
      </Button>
      <div className="absolute bottom-4 left-2 flex flex-col gap-2 max-w-[50vh]">
        <CardUserPost createdAt={reel.created_at} user={reel.user} />
        <TruncatedText
          maxWidth={"50vh"}
          textSize={"text-sm"}
          text={reel.description}
        />
      </div>
    </div>
  );
};

export default Reel;
