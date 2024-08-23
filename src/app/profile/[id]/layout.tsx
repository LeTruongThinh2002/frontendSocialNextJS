"use client";
import HeaderTop from "@/components/Layouts/Header-top";
import LayoutHome from "@/components/Layouts/Layout-Home";
import SidebarProfileRight from "@/components/Layouts/Sidebar-profile-right";
import FriendsList from "@/components/ui/friends-list";
import NotablePosts from "@/components/ui/notable-posts";
import ProfileIntro from "@/components/ui/profile-intro";
import ProfileTab from "@/components/ui/profile-tab";
import { FC, ReactNode } from "react";

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
            {children}
            <div className="z-10 w-full flex flex-col gap-5">
              <div className="lg:hidden grid md:grid-cols-3 grid-cols-1 gap-1">
                <ProfileIntro />
                <NotablePosts />
                <FriendsList />
              </div>
              {news}
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
