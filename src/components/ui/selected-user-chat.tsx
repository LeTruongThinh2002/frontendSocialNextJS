import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Input } from "./input";

const SelectedUserChat = ({ keyId }: any) => {
  return (
    <label
      htmlFor={keyId}
      className="hover:bg-white/50 flex flex-row gap-1 items-center w-full p-2"
    >
      <Avatar className="h-[2.5em] w-[2.5em] p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
        <AvatarImage
          className="rounded-full border-2 border-black "
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <span className="text-sm font-semibold">User name</span>
      <Input id={keyId} className="ml-auto w-[1em] h-[1em]" type="checkbox" />
    </label>
  );
};

export default SelectedUserChat;
