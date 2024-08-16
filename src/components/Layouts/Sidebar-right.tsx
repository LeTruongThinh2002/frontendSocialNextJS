"use client";
import { Button } from "../ui/button";
import CardOtherUser from "../ui/card-other-user";
import RecommendForYou from "../ui/recommend-for-you";
import WebInfo from "../ui/web-info";

const SidebarRight = ({ ...prop }) => {
  return (
    <div {...prop}>
      <div className="flex flex-row items-center gap-2">
        <CardOtherUser />
        <Button className="ml-auto text-sm font-semibold">Logout</Button>
      </div>
      <RecommendForYou />
      <WebInfo />
    </div>
  );
};

export default SidebarRight;
