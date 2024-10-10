import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ProfileNew = ({ news }: any) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex-shrink-0 rounded-full flex justify-center items-center w-[74px] h-[74px] bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90% cursor-pointer overflow-hidden">
        <div className="w-[70px] h-[70px] overflow-hidden rounded-full border-black border-2">
          <Avatar className="w-full h-full rounded-full flex flex-col justify-center items-center">
            <AvatarImage src={news.media} alt="@shadcn" />
            <AvatarFallback>{news.description}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-[70px] truncate ...">
        <span className="text-sm font-light ">{news.description}</span>
      </div>
    </div>
  );
};

export default ProfileNew;
