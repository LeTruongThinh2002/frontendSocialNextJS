"use client";
import { Button } from "../ui/button";
import CardOrtherUser from "../ui/card-orther-user";
import RecommendForYou from "../ui/recommend-for-you";
import WebInfo from "../ui/web-info";

const SidebarRight = ({ ...prop }) => {
  return (
    <div {...prop}>
      <div className="flex flex-row gap-2">
        <CardOrtherUser />
        <Button className="ml-auto text-sm font-semibold">Logout</Button>
      </div>
      <RecommendForYou />
      <WebInfo />
    </div>
  );
};

export default SidebarRight;
