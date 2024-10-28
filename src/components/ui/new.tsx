import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const New = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex-shrink-0 rounded-full flex justify-center items-center w-[62px] h-[62px] hover:bg-[url('https://i.gifer.com/EAoe.gif')] bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90% cursor-pointer overflow-hidden">
        <div className="w-[58px] h-[58px] overflow-hidden rounded-full border-black border-2">
          <Avatar className="w-full h-full rounded-full flex flex-col justify-center items-center">
            <AvatarImage src={user.avatar} alt={user.first_name} />
            <AvatarFallback>
              {user.first_name[0]}
              {user.last_name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-sm w-[5em] font-light truncate ...">
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
};

export default New;
