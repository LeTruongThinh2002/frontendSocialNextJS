"use client";
import ProfileIntro from "../ui/profile-intro";
import WebInfo from "../ui/web-info";

const SidebarProfileRight = ({ topPosts, friends, ...prop }: any) => {
  return (
    <div {...prop}>
      <div className="flex flex-col gap-2">
        <ProfileIntro />
        {topPosts}
        {friends}
        <WebInfo />
      </div>
    </div>
  );
};

export default SidebarProfileRight;
