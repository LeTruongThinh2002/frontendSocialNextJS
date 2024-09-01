import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileNew from "@/components/ui/profile-new";

const News = async () => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    return Array.from({ length: 10 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();
  return (
    <div className="flex flex-row gap-5 w-full px-2">
      <Carousel className="w-full max-h-[30em]">
        <CarouselContent>
          {newsItems.map((_, index) => (
            <CarouselItem className="basis-[24%] md:basis-[18%]" key={index}>
              <ProfileNew />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default News;
