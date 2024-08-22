"use client";
import FriendsList from "../ui/friends-list";
import NotablePosts from "../ui/notable-posts";
import ProfileIntro from "../ui/profile-intro";
import WebInfo from "../ui/web-info";

const SidebarProfileRight = ({ ...prop }) => {
  return (
    <div {...prop}>
      <div className="flex flex-col gap-2">
        <ProfileIntro />
        <NotablePosts />
        <FriendsList />
        <WebInfo />
      </div>
    </div>
  );
};

export default SidebarProfileRight;
