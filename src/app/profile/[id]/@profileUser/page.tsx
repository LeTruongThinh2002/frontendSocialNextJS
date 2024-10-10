"use client";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { RootState } from "@/redux/store";
import ProfileLoading from "./loading";
import ImageLargeView from "@/components/model/ImageLargeView";
import SearchUserFromData from "@/components/model/SearchUserFromData";

const ProfileUser = () => {
  const { userById, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  if (loading || error || !userById) {
    return <ProfileLoading />;
  }

  return (
    <div className="relative max-h-[18em] w-full">
      {userById && (
        <>
          <ImageLargeView
            url={
              userById.background ||
              "https://images.pexels.com/photos/209728/pexels-photo-209728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          >
            <AspectRatio className="max-h-[18em] z-0">
              <Image
                src={
                  userById.background ||
                  "https://images.pexels.com/photos/209728/pexels-photo-209728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt={userById.first_name}
                fill
                className="rounded-md object-center object-cover"
              />
            </AspectRatio>
          </ImageLargeView>
          <Avatar className="absolute h-[10em] w-[10em] -bottom-24 left-5 p-0.5 cursor-pointer">
            <ImageLargeView
              url={
                userById.avatar ||
                "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
              }
            >
              <AvatarImage
                className="rounded-full"
                src={
                  userById.avatar ||
                  "https://www.golden-forum.com/ext/dark1/memberavatarstatus/image/avatar.png"
                }
                alt={userById.first_name + " " + userById.last_name}
              />
            </ImageLargeView>
            <AvatarFallback>{userById.first_name}</AvatarFallback>
          </Avatar>
          <div className="absolute md:-bottom-20 -bottom-24 left-52">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-3xl">
                {userById.first_name} {userById.last_name}
              </span>
              <div className="flex flex-row gap-5 font-semibold text-gray-500">
                <SearchUserFromData data={userById.userFollow} type="friend">
                  <span className="cursor-pointer hover:underline hover:text-gray-400">
                    {userById.userFollow
                      ? Object.keys(userById.userFollow).length
                      : 0}{" "}
                    followers
                  </span>
                </SearchUserFromData>
                <SearchUserFromData data={userById.userFollower} type="friend">
                  <span className="cursor-pointer hover:underline hover:text-gray-400">
                    {userById.userFollower
                      ? Object.keys(userById.userFollower).length
                      : 0}{" "}
                    followings
                  </span>
                </SearchUserFromData>
                <span className="hover:text-gray-400">
                  {userById.countPost} posts
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
