import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import New from "@/components/ui/new";

const News = async () => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return Array.from({ length: 10 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();

  return (
    <>
      <div className="flex flex-row gap-5 w-full px-2">
        <Carousel className="w-full max-h-[30em]">
          <CarouselContent>
            {newsItems.map((_, index) => (
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
