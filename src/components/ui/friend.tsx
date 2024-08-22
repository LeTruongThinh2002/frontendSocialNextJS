import Image from "next/image";
import { AspectRatio } from "./aspect-ratio";

const Friend = () => {
  return (
    <div className="flex flex-col gap-1">
      <AspectRatio ratio={1 / 1} className="bg-muted max-h-[30em]">
        <Image
          src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
      <span className="text-sm font-semibold hover:underline cursor-pointer truncate ...">
        admin text friend
      </span>
    </div>
  );
};

export default Friend;
