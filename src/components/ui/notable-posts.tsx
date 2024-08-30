import { AspectRatio } from "./aspect-ratio";
import Image from "next/image";
import { Skeleton } from "./skeleton";

const NotablePosts = async () => {
  // Thay thế setTimeout bằng một hàm fetch thực tế
  const fetchNews = async () => {
    // Giả lập fetch data
    return Array.from({ length: 9 }, (_, index) => ({ id: index }));
  };

  const newsItems = await fetchNews();
  return (
    <div className="flex flex-col gap-3 rounded-md md:bg-white/10 bg-transparent p-4">
      <span className="font-bold text-lg">Notable posts</span>
      <div className="grid grid-cols-3 gap-1 h-full w-full">
        {newsItems.map((_, key) => (
          <div key={key}>
            <AspectRatio ratio={1 / 1} className="bg-muted max-h-[30em]">
              <Image
                src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
                alt="Photo by Drew Beamer"
                fill
                className="object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotablePostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-transparent p-4">
      <span className="font-bold text-lg">
        <Skeleton className="h-6 w-32" />
      </span>
      <div className="grid grid-cols-3 gap-1 h-full w-full">
        {Array.from({ length: 9 }).map((_, key) => (
          <div key={key}>
            <AspectRatio
              ratio={1 / 1}
              className="bg-muted max-h-[30em] overflow-hidden"
            >
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NotablePostsSkeleton };
export default NotablePosts;
