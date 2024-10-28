"use client";
import PostCard from "@/components/ui/post";
import { fetchFollowedPosts } from "@/redux/post/post.action";
import { AppDispatch, RootState } from "@/redux/store";
import { Key, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import PostsLoading from "./loading";
import PostEndFollow from "@/components/ui/post-end-follow";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { followedPosts, loading, error } = useSelector(
    (state: RootState) => state.post
  );

  const fetchFollowedPost = useCallback(async () => {
    try {
      await dispatch(fetchFollowedPosts()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFollowedPost();
  }, [fetchFollowedPost]);

  if (error && !loading && !followedPosts) {
    toast.error(error);
    fetchFollowedPosts();
  }
  if ((error && loading) || (loading && !followedPosts)) {
    return <PostsLoading />;
  }

  if (loading && !followedPosts) {
    return <PostsLoading />;
  }

  if (!followedPosts) {
    return <PostEndFollow />;
  }

  return (
    <>
      <div className="flex flex-col gap-5 h-full w-full">
        {followedPosts?.data?.map(
          (post: any, index: Key | null | undefined) => (
            <PostCard key={index} post={post} follow={true} />
          )
        )}
        <PostEndFollow />
      </div>
    </>
    // <div>post</div>
  );
};

export default Posts;
