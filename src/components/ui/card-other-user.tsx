import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HiCheckBadge } from "react-icons/hi2";

const CardOtherUser = () => {
  return (
    <>
      <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1">
          <span className="font-bold">user name </span>
          <HiCheckBadge className="text-sky-600" size={"0.8em"} />
        </div>

        <span className="text-sm font-light text-gray-400">
          email@gmail.com
        </span>
      </div>
    </>
  );
};

export default CardOtherUser;
