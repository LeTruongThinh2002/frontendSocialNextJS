import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Reel from "@/components/ui/reel";

const Reels = async () => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return Array.from({ length: 10 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();
  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <Carousel
          orientation="vertical"
          className="md:w-1/3 w-full h-full flex justify-center items-center"
        >
          <CarouselContent>
            {newsItems.map((_, index) => (
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
