"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./aspect-ratio";

type MediaItem = {
  url: string;
  type: "image" | "video";
};

const ImageList = ({
  images,
}: {
  images: File[] | File | string[] | string;
}) => {
  const createdUrlsRef = useRef<string[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  useEffect(() => {
    const processImages = async () => {
      const imageArray =
        images instanceof FileList
          ? Array.from(images)
          : Array.isArray(images)
          ? images
          : [images];

      const processed = await Promise.all(
        imageArray.map(async (item) => {
          let url: string;
          let type: "image" | "video";

          if (item instanceof File) {
            url = URL.createObjectURL(item);
            createdUrlsRef.current.push(url);
            type = item.type.startsWith("video/") ? "video" : "image";
          } else if (typeof item === "string") {
            url = item;
            type = item.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image";
          } else {
            return null;
          }

          return { url, type };
        })
      );

      setMediaList(processed.filter(Boolean) as MediaItem[]);
    };

    processImages();

    return () => {
      createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      createdUrlsRef.current = [];
    };
  }, [images]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSlideChange = () => {
      const newIndex = carouselApi.selectedScrollSnap();
      setCurrentPlaying(newIndex);

      // Pause all videos except the one on the current slide
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === newIndex) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    };

    carouselApi.on("select", handleSlideChange);

    return () => {
      carouselApi.off("select", handleSlideChange);
    };
  }, [carouselApi]);

  return (
    <div className="w-full h-fit flex justify-center">
      <Carousel className="w-full h-[80vh]" setApi={setCarouselApi}>
        <CarouselContent className="h-[80vh]">
          {mediaList.map((item, index) => (
            <CarouselItem key={index} className="h-[80vh] ">
              {item.type === "video" ? (
                <div className="flex justify-center items-center">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }} // Store reference to each video element
                    src={item.url}
                    className="rounded-md h-[80vh] object-contain"
                    onClick={(e) => {
                      const videoElement = e.currentTarget as HTMLVideoElement;
                      if (videoElement.paused) {
                        videoElement.play();
                      } else {
                        videoElement.pause();
                      }
                    }}
                    muted={currentPlaying !== index} // Mute videos that are not active
                  />
                </div>
              ) : (
                <AspectRatio ratio={4 / 5} className="bg-muted h-[80vh]">
                  <Image
                    src={item.url}
                    alt={`Media ${index + 1}`}
                    fill
                    className="rounded-md h-[80vh] object-contain"
                    priority
                  />
                </AspectRatio>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ImageList;
