"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { HiCheckBadge } from "react-icons/hi2";
import ImageList from "./image-list";
import TruncatedText from "./truncate-text";
import { LuMoreHorizontal } from "react-icons/lu";
import { Button } from "./button";
import { AiOutlineComment, AiOutlineSend } from "react-icons/ai";
import { Input } from "./input";
import { GoHeartFill } from "react-icons/go";
import { LiaTelegramPlane } from "react-icons/lia";

const PostReview = ({ post, userAuth }: { post: any, userAuth: any }) => { 
  return (
    <Card className="w-full border-0 rounded-none">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
            <AvatarImage
              className="rounded-full border-2 border-black "
              src={userAuth.avatar}
              alt={userAuth.first_name}
            />
            <AvatarFallback>
              {userAuth.first_name.charAt(0)}
              {userAuth.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-1">
              <span className="text-lg font-bold">
                {userAuth.first_name} {userAuth.last_name}
              </span>
              <HiCheckBadge className="text-sky-600" size={"0.8em"} />
              <span className="text-sm font-light text-gray-400">
                {new Date(Date.now()).toLocaleDateString()}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {"You post"}
            </span>
          </div>
        </CardTitle>
        <LuMoreHorizontal size={"1.5em"} className="ml-auto" />
      </CardHeader>
      <CardContent>
        <ImageList images={post?.media} />
      </CardContent>
      <CardContent className="py-0 flex flex-row items-center">
        <div className="flex flex-row items-center gap-4">
          <Button className="cursor-pointer p-0">
            <GoHeartFill size={"1.5em"} className="text-red-500" />
          </Button>
          <label className="cursor-pointer" htmlFor="comment">
            <AiOutlineComment size={"1.5em"} />
          </label>
          <Button className="cursor-pointer p-0">
            <LiaTelegramPlane size={"1.5em"} />
          </Button>
        </div>
        <div className="ml-auto font-semibold text-sm">99 like</div>
      </CardContent>
      <CardContent className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <span className="font-bold text-sm">
            {userAuth.first_name} {userAuth.last_name}
          </span>
          <HiCheckBadge className="text-sky-600" size={"0.8em"} />
        </div>
        <TruncatedText text={post?.description.html} textSize={"text-sm"} />
        <div className="pt-1 text-sm text-gray-400 font-semibold hover:underline cursor-pointer">
          99 comments
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <div className="p-2 pb-0 w-full flex flex-row items-center gap-2 border-t border-slate-500">
          <Avatar className="p-0.5 cursor-pointer max-w-9 max-h-9 bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90% rounded-full">
            <AvatarImage
              className="rounded-full border border-black"
              src={
                userAuth.avatar ||
                "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
              }
              alt={userAuth.first_name + " " + userAuth.last_name}
            />
            <AvatarFallback>
              {userAuth.first_name.charAt(0) + userAuth.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row items-center gap-2 flex-grow">
            <Input
              id="comment"
              className="placeholder:text-gray-400 border-0"
              placeholder="Enter your comment..."
            />
            <Button
              className={"cursor-pointer hover:text-sky-500"}
              disabled={true}
            >
              <AiOutlineSend size={"1.5em"} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostReview;
