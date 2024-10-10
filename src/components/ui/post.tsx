"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { LuMoreHorizontal } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { LiaTelegramPlane } from "react-icons/lia";
import { HiCheckBadge } from "react-icons/hi2";
import { AiOutlineSend } from "react-icons/ai";
import ImageList from "./image-list";
import { Input } from "./input";
import { useState } from "react";
import TruncatedText from "./truncate-text";
import Link from "next/link";

const Post = () => {
  const [cmt, setCmt] = useState("");

  return (
    <Card className="w-full border-0 rounded-none">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
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
              <Link href={"/profile"} className="cursor-pointer">
                <span className="text-lg font-bold">name user</span>
              </Link>
              <HiCheckBadge className="text-sky-600" size={"0.8em"} />
              <span className="text-sm font-light text-gray-400">2 mouth</span>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              description
            </span>
          </div>
        </CardTitle>
        <Button className="ml-auto text-white">
          <LuMoreHorizontal size={"1.5em"} />
        </Button>
      </CardHeader>
      <CardContent>
        <ImageList
          images={[
            "https://images.pexels.com/photos/14590086/pexels-photo-14590086.jpeg",
          ]}
        />
        <ImageList
          images={[
            "https://images.pexels.com/photos/14590086/pexels-photo-14590086.jpeg",
          ]}
        />
      </CardContent>
      <CardContent className="flex flex-row gap-4">
        <GoHeart size={"1.5em"} />
        <AiOutlineComment size={"1.5em"} />
        <LiaTelegramPlane size={"1.5em"} />
        <div className="ml-auto font-semibold text-sm">123.000 like</div>
      </CardContent>
      <CardContent className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <span className="font-bold text-sm">user name</span>
          <HiCheckBadge className="text-sky-600" size={"0.8em"} />
        </div>
        {/* <span className={`text-sm font-light ${!seeMore && ` truncate ...`}`}>
          
        </span> */}
        <TruncatedText
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
          turpis vel neque ultrices placerat. Nullam non enim vel velit semper
          pellentesque.`}
          textSize={"text-sm"}
        />
        <div className="pt-1 text-sm text-gray-400 font-semibold hover:underline cursor-pointer">
          See 188 comments
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
          <AvatarImage
            className="rounded-full border-2 border-black "
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          className="border-0 placeholder:text-gray-400 border-b border-gray-400 rounded-none"
          placeholder="Enter your comment..."
          onChange={(e): any => setCmt(e.target.value)}
        />
        <AiOutlineSend
          size={"1.5em"}
          className={
            cmt
              ? "cursor-pointer hover:text-sky-500"
              : "text-gray-500 cursor-none"
          }
        />
      </CardFooter>
    </Card>
  );
};

export default Post;
