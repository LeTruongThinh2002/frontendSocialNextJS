"use client";
import HeaderTop from "@/components/Layouts/Header-top";
import LayoutHome from "@/components/Layouts/Layout-Home";
import SidebarProfileRight from "@/components/Layouts/Sidebar-profile-right";
import FriendsList from "@/components/ui/friends-list";
import NotablePosts, {
  NotablePostsSkeleton,
} from "@/components/ui/notable-posts";
import ProfileIntro from "@/components/ui/profile-intro";
import ProfileTab from "@/components/ui/profile-tab";
import { FC, ReactNode, Suspense } from "react";
import ProfileNewsLoading from "./@news/loading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type LayoutProps = {
  children: ReactNode;
  posts: ReactNode;
  news: ReactNode;
  reels: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, posts, news, reels }) => {
  return (
    <LayoutHome>
      <div className="grid lg:grid-cols-12 grid-rows-12 w-full h-full">
        <HeaderTop className="lg:hidden block row-start-1 row-end-2 col-start-1 col-end-13" />
        <div className="md:px-5 py-4 overflow-y-auto scrollable-content lg:col-start-1 lg:col-end-9 lg:row-start-1 col-start-1 col-end-13 row-start-2 row-end-13">
          <div className=" flex flex-col gap-32 justify-center items-center">
            <div className="w-full flex flex-col items-center">
              <div className="relative max-h-[18em] w-full">
                {children}
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
            <div className="z-10 w-full flex flex-col gap-5">
              <div className="lg:hidden grid md:grid-cols-3 grid-cols-1 gap-1">
                <ProfileIntro />
                <Suspense fallback={<NotablePostsSkeleton />}>
                  <NotablePosts />
                </Suspense>
                <FriendsList />
              </div>
              <Suspense fallback={<ProfileNewsLoading />}>{news}</Suspense>
              <ProfileTab posts={posts} reels={reels} />
            </div>
          </div>
        </div>
        <SidebarProfileRight className="overflow-y-auto py-4 px-10 lg:block hidden lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-13" />
      </div>
    </LayoutHome>
  );
};

export default Layout;
