import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileNew from "@/components/ui/profile-new";

const News = () => {
  return (
    <>
      <div className="flex flex-row gap-5 w-full px-2">
        <Carousel className="w-full max-h-[30em]">
          <CarouselContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem className="basis-[24%] md:basis-[18%]" key={index}>
                <ProfileNew />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default News;
