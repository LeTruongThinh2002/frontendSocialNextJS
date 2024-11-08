import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";

const CardOtherUser = ({ user }: { user: any }) => {
  return (
    <>
      <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src={user.avatar}
          alt={user.first_name}
        />
        <AvatarFallback>
          {user.first_name.charAt(0).toUpperCase()}
          {user.last_name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          <span className="font-bold max-w-[10em] truncate ...">
            {user.first_name} {user.last_name}
          </span>
          <HiCheckBadge className="text-sky-600" size={"0.8em"} />
        </div>
        {user.follow_count && (
          <span className="text-sm font-light text-gray-400">
            {user.follow_count} Followers
          </span>
        )}
      </div>
    </>
  );
};

export default CardOtherUser;
