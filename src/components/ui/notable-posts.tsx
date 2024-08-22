import { AspectRatio } from "./aspect-ratio";
import Image from "next/image";

const NotablePosts = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white/10 p-4">
      <span className="font-bold text-lg">Notable posts</span>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <>
            <AspectRatio
              key={index}
              ratio={1 / 1}
              className="bg-muted max-h-[30em]"
            >
              <Image
                src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
                alt="Photo by Drew Beamer"
                fill
                className="object-cover"
              />
            </AspectRatio>
          </>
        ))}
      </div>
    </div>
  );
};

export default NotablePosts;
