import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import New from "@/components/ui/new";

const News = () => {
  return (
    <>
      <div className="flex flex-row gap-5 w-full px-2">
        <Carousel className="w-full max-h-[30em]">
          <CarouselContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem className="basis-[18%] md:basis-[12%]" key={index}>
                <New />
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
