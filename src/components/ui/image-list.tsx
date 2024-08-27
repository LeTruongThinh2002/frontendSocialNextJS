import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "./aspect-ratio";
import Image from "next/image";
const ImageList = () => {
  return (
    <div className="w-full flex justify-center">
      <Carousel className="w-full max-h-[30em]">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={4 / 5} className="bg-muted  max-h-[30em]">
                <Image
                  src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-md object-cover"
                  priority
                />
              </AspectRatio>
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
