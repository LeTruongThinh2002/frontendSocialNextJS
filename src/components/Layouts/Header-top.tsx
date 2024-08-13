"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";

const HeaderTop = ({ ...props }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div {...props}>
      <div className="border-b  border-gray-700 flex flex-row items-center h-full w-full px-5">
        <Link href={"/home"}>
          <h1 className="text-2xl font-bold edu-vic-wa-nt-beginner-700 bg-clip-text text-transparent bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90% cursor-pointer">
            Spider
          </h1>
        </Link>
        <div className="ml-auto w-2/3 md:w-1/2 relative">
          <Input
            className="border-0 placeholder:text-gray-400 bg-slate-700 pr-10"
            placeholder="Search user..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <BiSearchAlt
              size={"1.4em"}
              className={inputValue ? "text-white" : "text-gray-400"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
