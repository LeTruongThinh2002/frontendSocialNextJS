"use client";
import { Suspense } from "react";
import FriendsList from "../ui/friends-list";
import NotablePosts, { NotablePostsSkeleton } from "../ui/notable-posts";
import ProfileIntro from "../ui/profile-intro";
import WebInfo from "../ui/web-info";

const SidebarProfileRight = ({ ...prop }) => {
  return (
    <div {...prop}>
      <div className="flex flex-col gap-2">
        <ProfileIntro />
        <Suspense fallback={<NotablePostsSkeleton />}>
          <NotablePosts />
        </Suspense>
        <FriendsList />
        <WebInfo />
      </div>
    </div>
  );
};

export default SidebarProfileRight;
