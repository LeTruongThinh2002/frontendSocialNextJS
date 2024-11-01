"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { HiCheckBadge } from "react-icons/hi2";
import ImageList from "./image-list";
import TruncatedText from "./truncate-text";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PostActionHeader from "./post-action-header";
import CurrentPost from "../model/CurrentPost";
import ActionComment from "./action-comment";
import ActionLike from "./action-like";
import PostsLoading from "@/app/home/@posts/loading";

const Post = ({ post, follow }: { post: any; follow: boolean }) => {
  const { userAuth } = useSelector((state: RootState) => state.user);

  if (!userAuth) return <PostsLoading />;

  return (
    <Card className="w-full border-0 rounded-none">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2">
          <Avatar className="p-0.5 cursor-pointer bg-gradient-to-tr from-yellow-300 via-rose-500 to-indigo-500 to-90%">
            <AvatarImage
              className="rounded-full border-2 border-black "
              src={post?.user?.avatar}
              alt={post?.user?.first_name}
            />
            <AvatarFallback>
              {post?.user?.first_name.charAt(0)}
              {post?.user?.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-1">
              <Link
                href={`/profile/${post?.user?.id}`}
                className="cursor-pointer"
              >
                <span className="text-lg font-bold">
                  {post?.user?.first_name} {post?.user?.last_name}
                </span>
              </Link>
              <HiCheckBadge className="text-sky-600" size={"0.8em"} />
              <span className="text-sm font-light text-gray-400">
                {post?.created_at &&
                  new Date(post?.created_at).toLocaleDateString()}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {follow ? "Followed" : "Recommend for you"}
            </span>
          </div>
        </CardTitle>
        <PostActionHeader post={post} userAuth={userAuth} type="post" />
      </CardHeader>
      <CardContent>
        <ImageList images={post?.media} />
      </CardContent>
      <CardContent className="py-0 flex flex-row items-center">
        <ActionLike post={post} type="post" />
        <div className="ml-auto font-semibold text-sm">
          {Object.keys(post?.like).length} like
        </div>
      </CardContent>
      <CardContent className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <span className="font-bold text-sm">
            {post?.user?.first_name} {post?.user?.last_name}
          </span>
          <HiCheckBadge className="text-sky-600" size={"0.8em"} />
        </div>
        {/* <span className={`text-sm font-light ${!seeMore && ` truncate ...`}`}>
          
        </span> */}
        <TruncatedText text={post?.description} textSize={"text-sm"} />
        <CurrentPost post={post} type="post">
          <div className="pt-1 text-sm text-gray-400 font-semibold hover:underline cursor-pointer">
            {post?.comments > 0
              ? `See ${post?.comments} comments`
              : "0 comments"}
          </div>
        </CurrentPost>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
        <CurrentPost post={post} type="post">
          <ActionComment post={post} type="post" />
        </CurrentPost>
      </CardFooter>
    </Card>
  );
};

export default Post;
