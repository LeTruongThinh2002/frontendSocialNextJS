"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchTopPosts } from "@/redux/post/post.action";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopPostsLoading from "./loading";
import CurrentPost from "@/components/model/CurrentPost";

const TopPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topPosts, topPostsLoading, topPostsError } = useSelector(
    (state: RootState) => state.post
  );
  const { userById, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const fetchPosts = useCallback(async () => {
    try {
      await dispatch(fetchTopPosts(userById?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, userById?.id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (topPostsLoading || loading || error) {
    return <TopPostsLoading />;
  }

  if (topPostsError && !topPostsLoading) {
    fetchPosts();
    return <TopPostsLoading />;
  }

  if (topPosts.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-3 rounded-md md:bg-white/10 bg-transparent p-4">
      <span className="font-bold text-lg">Top posts</span>
      <div className="grid grid-cols-3 gap-1 h-full w-full">
        {topPosts.map((post, key) => (
          <CurrentPost key={post.id || key} type="post" post={post}>
            <AspectRatio ratio={1 / 1} className="bg-muted max-h-[30em]">
              <Image
                src={post.media[0]}
                alt={post.description}
                fill
                className="object-cover"
              />
            </AspectRatio>
          </CurrentPost>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
