import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const SearchUserValue = ({ item }: any) => {
  return (
    <Link
      href={`/profile/${item.id}`}
      className="hover:bg-white/50 flex flex-row gap-1 items-center w-full p-2"
    >
      <Avatar className="h-[2.5em] w-[2.5em] p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src={item.avatar}
          alt={item.first_name}
        />
        <AvatarFallback>
          {item.first_name.charAt(0) + item.last_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-semibold">
        {item.first_name} {item.last_name}
      </span>
    </Link>
  );
};

export default SearchUserValue;
