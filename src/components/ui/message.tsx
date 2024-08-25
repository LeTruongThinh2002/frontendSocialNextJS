import { AspectRatio } from "./aspect-ratio";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const Message = ({ media, right }: any) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`max-w-[50%] ${right && "ml-auto"}`}>
          <div
            className={`bg-slate-800/80 w-fit p-2 ${
              media
                ? `rounded-lg flex flex-col gap-1  min-w-[10em]`
                : `rounded-md`
            }`}
          >
            <span className="text-md font-light">?</span>
            {media && (
              <div className="grid md:grid-cols-3 grid-cols-2 gap-1 h-full w-full">
                {Array.from({ length: 9 }).map((_, index) => (
                  <AspectRatio key={index} ratio={1 / 1} className="bg-muted">
                    <Image
                      src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
                      alt="Photo by Drew Beamer"
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                ))}
              </div>
            )}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm text-white">15:20, 15-2-2020</div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Message;
