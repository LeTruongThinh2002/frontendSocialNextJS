"use client";
import { useEffect, useRef, useState } from "react";
import {
  IoPlayCircleOutline,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import { Button } from "./button";
import { GoHeartFill } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import TruncatedText from "./truncate-text";
import { LuMoreHorizontal } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";

const ReelReview = ({ reel }: { reel: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(reel.media[0]);
    setMediaUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [reel.media]);

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

  return (
    <div className="relative w-full lg:h-full h-[50%]">
      {mediaUrl && (
        <video
          ref={videoRef}
          src={mediaUrl}
          className="rounded-md object-cover object-center w-full h-full"
          controls={false}
          onClick={handlePlayPause}
          loop
          muted={isMuted}
        />
      )}
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
          >
            <GoHeartFill className="text-red-500" />
          </Button>
          <span className="text-sm">99</span>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant={"ghost"}
            className="p-2 text-white text-2xl rounded-full bg-white/5"
          >
            <AiOutlineComment />
          </Button>
          <span className="text-sm">99</span>
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
        className="absolute bottom-2 right-2 max-h-[2.8em] max-w-[2.8em] text-lg rounded-full bg-white/5"
      >
        <LuMoreHorizontal className="ml-auto" color="white" size={"1.5em"} />
      </Button>
      <div className="absolute bottom-4 left-2 flex flex-col gap-2 max-w-[50vh]">
        <div className="flex flex-row items-center gap-2 text-sm">
          <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
            <AvatarImage
              className="rounded-full border-2 border-black "
              src={reel.user.avatar}
              alt={reel.user.first_name + " " + reel.user.last_name}
            />
            <AvatarFallback>
              {reel.user.first_name.charAt(0) + reel.user.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-1">
              <span className="font-bold">
                {reel.user.first_name + " " + reel.user.last_name}
              </span>
              <HiCheckBadge className="text-sky-600" size={"2em"} />
            </div>

            <span className="text-sm font-semibold text-gray-400">
              {new Date().toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <span className="text-xl font-bold">•</span>
          <Button
            className={`
            text-red-500 hover:text-red-400 border-red-500 hover:border-red-400
        `}
            size={"sm"}
            variant={"ghost"}
          >
            Follow
          </Button>
        </div>
        <TruncatedText
          maxWidth={"50vh"}
          textSize={"text-sm"}
          text={reel.description}
        />
      </div>
    </div>
  );
};

export default ReelReview;
