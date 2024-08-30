import PostsLoading from "@/app/profile/[id]/@posts/loading";
import ReelsLoading from "@/app/profile/[id]/@reels/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, ReactNode, Suspense } from "react";
import { GiSpiderWeb } from "react-icons/gi";
import { PiFilmReelThin } from "react-icons/pi";

type Props = {
  posts: ReactNode;
  reels: ReactNode;
};

const ProfileTab: FC<Props> = ({ posts, reels }) => {
  return (
    <Tabs
      defaultValue="posts"
      className="w-full border-opacity-50 border-t border-t-white"
    >
      <TabsList className=" flex w-full md:gap-10 gap-5 items-center justify-center flex-row">
        <TabsTrigger className="flex text-lg flex-row gap-2" value="posts">
          <GiSpiderWeb />
          <span>Post</span>
        </TabsTrigger>
        <TabsTrigger className="flex text-lg flex-row gap-2" value="reels">
          <PiFilmReelThin /> <span>Reel</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Suspense fallback={<PostsLoading />}>{posts}</Suspense>
      </TabsContent>
      <TabsContent value="reels">
        <Suspense fallback={<ReelsLoading />}>{reels}</Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTab;
