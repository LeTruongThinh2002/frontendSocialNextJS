"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import TruncatedText from "./truncate-text";

interface NewsReviewProps {
  apiData: {
    media: File[];
    description: string;
  };
  currentUser: {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

const NewsReview = ({ apiData, currentUser }: NewsReviewProps) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  const isVideo = apiData.media[0].type.startsWith("video/");

  useEffect(() => {
    const url = URL.createObjectURL(apiData.media[0]);
    setMediaUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [apiData.media]);

  const updateVideoProgress = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  }, []);

  const updateImageProgress = useCallback(() => {
    const now = Date.now();
    const deltaTime = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;

    setProgress((oldProgress) => {
      const increment = (deltaTime / 5000) * 100; // 5000ms = 5 seconds for full progress
      const newProgress = oldProgress + increment;
      return newProgress < 100 ? newProgress : 0;
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (isVideo && videoRef.current) {
        videoRef.current
          .play()
          .catch((error) => console.error("Error playing video:", error));
      } else if (!isVideo) {
        lastUpdateTimeRef.current = Date.now();
        progressIntervalRef.current = setInterval(updateImageProgress, 16); // ~60 fps
      }
    } else {
      if (isVideo && videoRef.current) {
        videoRef.current.pause();
      } else if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, isVideo, updateImageProgress]);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    if (isVideo && currentVideoRef) {
      const handleTimeUpdate = () => {
        updateVideoProgress();
      };

      const handleLoadedMetadata = () => {
        if (isPlaying) {
          currentVideoRef
            .play()
            .catch((error) => console.error("Error playing video:", error));
        }
      };

      currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
      currentVideoRef.addEventListener("loadedmetadata", handleLoadedMetadata);
      currentVideoRef.muted = isMuted;

      return () => {
        currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
        currentVideoRef.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [isVideo, isMuted, updateVideoProgress, isPlaying]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isVideo) {
      setProgress(0);
      lastUpdateTimeRef.current = Date.now();
    }
  }, [isVideo]);

  if (!mediaUrl) return null;

  return (
    <div className="mx-auto max-h-[100vh] max-w-[100vw]">
      <div className="w-[50vh] h-[90vh] relative">
        <AspectRatio className="w-[50vh] h-[90vh]">
          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="object-cover object-center rounded-md w-full h-full"
              playsInline
              loop
              muted={isMuted}
            />
          ) : (
            <Image
              fill
              alt={apiData.description || "News image"}
              src={mediaUrl}
              className="object-cover object-center rounded-md"
            />
          )}
        </AspectRatio>
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[45vh]">
          <div className="flex justify-center gap-1 mt-2">
            <div className="h-0.5 w-[45vh] bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-4 px-[1em] left-0 flex flex-row items-center w-[50vh]">
          <div className="flex flex-row gap-1 items-center select-none w-full">
            <Avatar className="h-[2em] w-[2em] p-0.5 bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
              <AvatarImage
                className="rounded-full border-2 border-black"
                src={currentUser.avatar || "https://github.com/shadcn.png"}
                alt={currentUser.first_name || "User"}
              />
              <AvatarFallback>
                {(currentUser.first_name?.charAt(0) || "") +
                  (currentUser.last_name?.charAt(0) || "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-[0.8em] font-light">
              {currentUser.first_name} {currentUser.last_name}
            </span>
          </div>
          <div className="ml-auto flex flex-row">
            <Button
              variant="ghost"
              className="rounded-full"
              size="sm"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-[1.2em] w-[1.2em]" />
              ) : (
                <Play className="h-[1.2em] w-[1.2em]" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            {isVideo && (
              <Button
                variant="ghost"
                className="rounded-full"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-[1.2em] w-[1.2em]" />
                ) : (
                  <Volume2 className="h-[1.2em] w-[1.2em]" />
                )}
                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            )}
          </div>
        </div>
        <div className="absolute w-full bottom-0 px-1 left-0 backdrop-contrast-200 bg-black/50">
          <TruncatedText
            maxWidth={"15em"}
            text={apiData.description || "No description available"}
            textSize="text-[0.8em]"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsReview;
