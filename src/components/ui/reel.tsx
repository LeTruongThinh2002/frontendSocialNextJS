"use client";
import { useEffect, useRef, useState } from "react";
import {
  IoPlayCircleOutline,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import { Button } from "./button";
import { GoHeart } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { MdOutlineMoreVert } from "react-icons/md";
import CardUserPost from "./card-user-post";
import TruncatedText from "./truncate-text";
import CommentDrawer from "./comment-drawer";

const Reel = () => {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleEnded = () => {
      setIsPlaying(false);
    };

    video?.addEventListener("ended", handleEnded);
    return () => {
      video?.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="relative w-full lg:h-full h-[95%]">
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dd0tbhnzl/video/upload/v1723724134/Tainhanh.net_Youtube_T-R-I-Sau-chia-tay-ai-cung-khac-Official-M-V-Lyrics_5LVE529RtAI_720p_dsienw.mp4"
        className="rounded-md object-cover object-center w-full h-full"
        controls={false}
        onClick={handlePlayPause}
      />
      <Button
        onClick={handlePlayPause}
        className="absolute left-1/2 bottom-1/2 -translate-x-1/2 text-white text-3xl rounded-full"
      >
        {isPlaying ? "" : <IoPlayCircleOutline size={"2em"} />}
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
            className="p-2 text-white text-2xl rounded-full bg-white/5"
          >
            <GoHeart />
          </Button>
          <span className="text-sm">102N</span>
        </div>
        <div className="flex flex-col items-center">
          <CommentDrawer>
            <Button
              variant={"ghost"}
              className="p-2 text-white text-2xl rounded-full bg-white/5"
            >
              <AiOutlineComment />
            </Button>
          </CommentDrawer>
          <span className="text-sm">1.202</span>
        </div>
        <Button
          variant={"ghost"}
          className="p-2 text-white text-2xl rounded-full bg-white/5"
        >
          <LiaTelegramPlane />
        </Button>
      </div>
      <Button
        variant={"ghost"}
        className="absolute bottom-2 right-2 p-2 text-white text-2xl rounded-full bg-white/5"
      >
        <MdOutlineMoreVert />
      </Button>
      <div className="absolute bottom-4 left-2 flex flex-col gap-2">
        <CardUserPost />
        <TruncatedText
          maxWidth={"15em"}
          textSize={"text-sm"}
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.`}
        />
      </div>
    </div>
  );
};

export default Reel;
