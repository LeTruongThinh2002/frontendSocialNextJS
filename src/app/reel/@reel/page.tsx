"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Reel from "@/components/ui/reel";
import { fetchReels } from "@/redux/reel/reel.action";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReelLoading from "./loading";

const Reels = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reels, loading, error } = useSelector(
    (state: RootState) => state.reel
  );
  const [currentPlaying, setCurrentPlaying] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const fetchReelsAction = useCallback(async () => {
    await dispatch(fetchReels());
  }, [dispatch]);

  useEffect(() => {
    fetchReelsAction();
  }, [fetchReelsAction]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("select", () => {
      setCurrentPlaying(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  if (loading && !reels) {
    return <ReelLoading />;
  }

  if (error && !loading && !reels) {
    fetchReelsAction();
    return <ReelLoading />;
  }

  if (!loading && !reels.length) {
    return <></>;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <Carousel
          orientation="vertical"
          className="max-w-[60vh] h-full flex justify-center items-center"
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {reels.map((reel, index) => (
              <CarouselItem
                className="flex justify-center items-center max-h-[100vh]"
                key={index}
              >
                <Reel
                  isPlaying={currentPlaying === index}
                  index={index}
                  reel={reel}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Reels;
