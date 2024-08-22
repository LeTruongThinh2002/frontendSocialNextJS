import { Button } from "./button";
import Friend from "./friend";

const FriendsList = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white/10 p-4">
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Friend</span>
          <span className="text-sm font-light text-gray-400 hover:text-gray-300">
            10 friends
          </span>
        </div>
        <Button variant={"ghost"} className="ml-auto rounded-md text-sky-500">
          See all friends
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <Friend key={index} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
