"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TruncatedText from "./truncate-text";

const CarouselNews = ({ apiData, currentUser, innerCurrentNews }: any) => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(currentUser || 0);
  const [innerCurrent, setInnerCurrent] = React.useState(innerCurrentNews || 0);
  const [progress, setProgress] = React.useState(0);
  const [shouldResetProgress, setShouldResetProgress] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);

  const isLastSlide = current === apiData.length - 1;
  const isLastInnerSlide = innerCurrent === apiData[current].news.length - 1;
  const isLastItem = isLastSlide && isLastInnerSlide;
  const isCurrentItemVideo =
    apiData[current].news[innerCurrent].media.endsWith(".mp4");

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setInnerCurrent(0);
      setProgress(0);
    });
  }, [api]);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (shouldResetProgress) {
          setShouldResetProgress(false);
          return 0;
        }

        const increment = isCurrentItemVideo ? (100 / videoDuration) * 0.05 : 2;
        const newProgress = oldProgress + increment;

        if (newProgress >= 100) {
          if (isLastItem) {
            return 100;
          } else if (innerCurrent < apiData[current].news.length - 1) {
            setInnerCurrent(innerCurrent + 1);
          } else if (current < apiData.length - 1) {
            api?.scrollNext();
          }
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [
    api,
    current,
    innerCurrent,
    isLastItem,
    shouldResetProgress,
    isCurrentItemVideo,
    videoDuration,
    isPlaying,
    apiData,
  ]);

  React.useEffect(() => {
    const currentItem = apiData[current].news[innerCurrent];
    const currentVideoRef = videoRef.current;
    if (currentItem.media.endsWith(".mp4") && currentVideoRef) {
      if (isPlaying) {
        currentVideoRef.play();
      } else {
        currentVideoRef.pause();
      }
      currentVideoRef.muted = isMuted;
      setVideoDuration(currentVideoRef.duration);
    }
    return () => {
      if (currentVideoRef) {
        currentVideoRef.pause();
      }
    };
  }, [current, innerCurrent, isPlaying, isMuted, apiData]);

  const handleNext = React.useCallback(() => {
    setShouldResetProgress(true);
    if (innerCurrent < apiData[current].news.length - 1) {
      setInnerCurrent(innerCurrent + 1);
    } else if (current < apiData.length - 1) {
      api?.scrollNext();
      setInnerCurrent(0);
    } else {
      api?.scrollTo(0);
      setInnerCurrent(0);
    }
  }, [api, current, innerCurrent, apiData]);

  const handlePrevious = React.useCallback(() => {
    setShouldResetProgress(true);
    if (innerCurrent > 0) {
      setInnerCurrent(innerCurrent - 1);
    } else if (current > 0) {
      api?.scrollPrev();
      setInnerCurrent(apiData[current - 1].news.length - 1);
    } else {
      api?.scrollTo(apiData.length - 1);
      setInnerCurrent(apiData[apiData.length - 1].news.length - 1);
    }
  }, [api, current, innerCurrent, apiData]);

  const handleVideoLoadedMetadata = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setVideoDuration(e.currentTarget.duration);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="mx-auto max-h-[100vh] max-w-[100vw]">
      <Carousel
        setApi={setApi}
        className="w-[50vh] h-[90vh] top-1/2 -translate-y-1/2"
      >
        <CarouselContent className="w-full h-full">
          {apiData.map((item: any) => (
            <CarouselItem key={item.id} className="w-full h-full">
              <AspectRatio className="w-[50vh] h-[90vh]">
                {item.news[innerCurrent].media.endsWith(".mp4") ? (
                  <video
                    ref={videoRef}
                    src={item.news[innerCurrent].media}
                    className="object-cover object-center rounded-md w-full h-full"
                    playsInline
                    onLoadedMetadata={handleVideoLoadedMetadata}
                  />
                ) : (
                  <Image
                    fill
                    alt={item.title}
                    src={item.news[innerCurrent].media}
                    className="object-cover object-center rounded-md"
                  />
                )}
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute md:left-[-40px] left-0 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
        </div>
        <div className="absolute md:right-[-40px] right-0 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[45vh]">
          <div className="flex justify-center gap-1 mt-2">
            {apiData[current].news.map((item: any, innerIndex: any) => (
              <div
                key={innerIndex}
                className="h-0.5 w-[40vh] bg-muted rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-50 ease-linear"
                  style={{
                    width:
                      innerIndex === innerCurrent
                        ? `${progress}%`
                        : innerIndex < innerCurrent
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-4 px-[1em] left-0 flex flex-row items-center w-[50vh]">
          <div className="flex flex-row gap-1 items-center  select-none w-full">
            <Avatar className="h-[2em] w-[2em] p-0.5 bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
              <AvatarImage
                className="rounded-full border-2 border-black "
                src={
                  apiData[current].user.avatar ||
                  "https://github.com/shadcn.png"
                }
                alt={apiData[current].user.first_name}
              />

              <AvatarFallback>
                {apiData[current].user.first_name.charAt(0) +
                  apiData[current].user.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <span className="text-[0.8em] font-light">
              {apiData[current].user.first_name}{" "}
              {apiData[current].user.last_name}
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
                <Pause className="h-[1.2em] w-[1.2em] " />
              ) : (
                <Play className="h-[1.2em] w-[1.2em] " />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            {isCurrentItemVideo && (
              <Button
                variant="ghost"
                className="rounded-full"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-[1.2em] w-[1.2em] " />
                ) : (
                  <Volume2 className="h-[1.2em] w-[1.2em] " />
                )}
                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            )}
          </div>
        </div>
        <div className="absolute w-full bottom-0 px-1 left-0 backdrop-contrast-200 bg-black/50">
          <TruncatedText
            maxWidth={"15em"}
            text={apiData[current].news[innerCurrent].description}
            textSize="text-[0.8em]"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselNews;
