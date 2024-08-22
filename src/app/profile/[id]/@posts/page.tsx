import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { GiCard4Hearts } from "react-icons/gi";
import { MdVideoLibrary } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";

const Posts = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <>
          <AspectRatio
            ratio={1 / 1}
            className="bg-muted max-h-[30em] cursor-pointer relative aspect-ratio"
          >
            <Image
              src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
              alt="Photo by Drew Beamer"
              fill
              className="object-cover"
            />
            <div className="overlay">
              <div className="flex flex-row gap-4">
                <div className="text-sm items-center flex flex-row gap-1">
                  <FaHeart />
                  <span>100</span>
                </div>
                <div className="text-sm items-center flex flex-row gap-1">
                  <IoIosChatbubbles />
                  <span>26</span>
                </div>
              </div>
            </div>
            <GiCard4Hearts className="text-xl bg-opacity-10 absolute top-2 right-2" />
          </AspectRatio>
          <AspectRatio
            ratio={1 / 1}
            className="bg-muted max-h-[30em] cursor-pointer relative aspect-ratio"
          >
            <Image
              src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
              alt="Photo by Drew Beamer"
              fill
              className="object-cover"
            />
            <MdVideoLibrary className="text-xl bg-opacity-10 absolute top-2 right-2" />
            <div className="overlay">
              <div className="flex flex-row gap-4">
                <div className="text-sm items-center flex flex-row gap-1">
                  <FaHeart />
                  <span>100</span>
                </div>
                <div className="text-sm items-center flex flex-row gap-1">
                  <IoIosChatbubbles />
                  <span>26</span>
                </div>
              </div>
            </div>
          </AspectRatio>
        </>
      ))}
    </div>
  );
};

export default Posts;