"use client";
import { Button } from "@/components/ui/button";
import Friend from "@/components/ui/friend";
import { useSelector } from "react-redux";
import FriendsLoading from "./loading";
import SearchUserFromData from "@/components/model/SearchUserFromData";

const Friends = () => {
  const { userById } = useSelector((state: any) => state.user);

  if (!userById) return <FriendsLoading />;

  return (
    <div className="flex flex-col gap-3 rounded-md md:bg-white/10 bg-transparent p-4">
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Friend</span>
          <span className="text-sm font-light text-gray-400 hover:text-gray-300">
            {userById.friends ? Object.keys(userById.friends).length : 0}{" "}
            friends
          </span>
        </div>
        <SearchUserFromData
          data={userById.friends}
          type="friend"
          props={{
            className: "ml-auto",
          }}
        >
          <Button variant={"ghost"} className="ml-auto rounded-md text-sky-500">
            See all friends
          </Button>
        </SearchUserFromData>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {userById.friends.slice(0, 9).map((friend: any) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
