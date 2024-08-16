import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Reel from "@/components/ui/reel";

const Reels = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <Carousel
          orientation="vertical"
          className="md:w-1/3 w-full h-full flex justify-center items-center"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                className="flex justify-center items-center"
                key={index}
              >
                <Reel />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </>
  );
};

export default Reels;
