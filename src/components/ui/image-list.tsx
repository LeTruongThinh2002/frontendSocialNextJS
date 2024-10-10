import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "./aspect-ratio";
import Image from "next/image";
const ImageList = ({ images }: { images: string[] | string }) => {
  return (
    <div className="w-full h-fit flex justify-center">
      <Carousel className="w-full h-[90vh]">
        <CarouselContent className="h-[90vh]">
          {Array.isArray(images) ? (
            images.map((image, index) => (
              <CarouselItem key={index} className="h-[90vh]">
                <AspectRatio ratio={4 / 5} className="bg-muted h-[90vh]">
                  <Image
                    src={image}
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md h-[90vh] object-cover"
                    priority
                  />
                </AspectRatio>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="h-[90vh]">
              <AspectRatio ratio={4 / 5} className="bg-muted h-[90vh]">
                <Image
                  src={images}
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md h-[90vh] object-cover"
                  priority
                />
              </AspectRatio>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default ImageList;
