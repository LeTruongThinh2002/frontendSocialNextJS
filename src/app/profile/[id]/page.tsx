"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative max-h-[18em] w-full">
        <AspectRatio className="max-h-[18em] z-0">
          <Image
            src="https://images.pexels.com/photos/27354543/pexels-photo-27354543/free-photo-of-thanh-ph-d-ng-ph-toa-nha-ki-n-truc-s.jpeg"
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-center object-cover"
          />
        </AspectRatio>
        <Avatar className="absolute h-[10em] w-[10em] -bottom-24 left-5 p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="absolute md:-bottom-20 -bottom-24 left-52">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-3xl">user name</span>
            <div className="flex flex-row gap-5 font-semibold text-gray-500">
              <span className="cursor-pointer hover:underline hover:text-gray-400">
                10 followers
              </span>
              <span className="cursor-pointer hover:underline hover:text-gray-400">
                200 followings
              </span>
              <span className="hover:text-gray-400">712 posts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
