import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Friend = ({ friend }: any) => {
  return (
    <Link href={`/profile/${friend.id}`} className="flex flex-col gap-1">
      <Avatar className="rounded-none cursor-pointer h-[5em] w-[5em]">
        <AvatarImage
          src={friend.avatar}
          alt={friend.first_name + " " + friend.last_name}
        />
        <AvatarFallback>
          {friend.first_name.charAt(0)}
          {friend.last_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-semibold hover:underline cursor-pointer truncate ...">
        {friend.first_name + " " + friend.last_name}
      </span>
    </Link>
  );
};

export default Friend;
